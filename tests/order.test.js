import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

import app from '../src/app.js';


describe('Orders API', () => {

    let customerId;
    let storeId;


    const createDependencies = async () => {

        const userResponse = await request(app)
            .post('/api/users')
            .send({
                firstName: 'Order',
                lastName: 'Tester',
                email: 'order.tester@gmail.com',
                password: 'Test1234'
            });


        expect(userResponse.status)
            .to.equal(201);


        customerId =
            userResponse.body.payload._id;


        const storeObjectId =
            new mongoose.Types.ObjectId();


        await mongoose.connection
            .collection('stores')
            .insertOne({
                _id: storeObjectId,
                name: 'Test Store',
                address: '100 Test Street',
                owner: new mongoose.Types.ObjectId(customerId),
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            });


        storeId =
            storeObjectId.toString();
    };


    const createTestOrder = async () => {

        const response = await request(app)
            .post('/api/orders')
            .send({
                customer: customerId,
                store: storeId,
                items: [
                    {
                        name: 'Test Keyboard',
                        quantity: 2,
                        price: 25
                    }
                ],
                deliveryAddress: '500 Test Avenue',
                priority: 'normal'
            });


        expect(response.status)
            .to.equal(201);


        expect(response.body)
            .to.have.property(
                'status',
                'success'
            );


        expect(response.body)
            .to.have.property('payload');


        return response.body.payload;
    };


    beforeEach(async () => {

        await mongoose.connection
            .collection('orders')
            .deleteMany({});


        await mongoose.connection
            .collection('stores')
            .deleteMany({});


        await mongoose.connection
            .collection('users')
            .deleteMany({});


        await createDependencies();
    });


    describe('GET /api/orders', () => {

        it('debe obtener la lista de pedidos correctamente', async () => {

            await createTestOrder();


            const response = await request(app)
                .get('/api/orders');


            expect(response.status)
                .to.equal(200);


            expect(response.body)
                .to.have.property(
                    'status',
                    'success'
                );


            expect(response.body)
                .to.have.property('payload');


            expect(response.body.payload)
                .to.be.an('array');


            expect(response.body.payload)
                .to.have.lengthOf(1);


            const order =
                response.body.payload[0];


            expect(order)
                .to.have.property('_id');


            expect(order)
                .to.have.property('customer');


            expect(order)
                .to.have.property('store');


            expect(order)
                .to.have.property('items');


            expect(order.items)
                .to.be.an('array');


            expect(order)
                .to.have.property(
                    'status',
                    'created'
                );


            expect(order)
                .to.have.property(
                    'priority',
                    'normal'
                );


            expect(order)
                .to.have.property(
                    'total',
                    50
                );

        });

    });


    describe('POST /api/orders', () => {

        it('debe crear un pedido correctamente', async () => {

            const response = await request(app)
                .post('/api/orders')
                .send({
                    customer: customerId,
                    store: storeId,
                    items: [
                        {
                            name: 'Wireless Mouse',
                            quantity: 2,
                            price: 30
                        },
                        {
                            name: 'Keyboard',
                            quantity: 1,
                            price: 40
                        }
                    ],
                    deliveryAddress:
                        '800 Testing Road',
                    priority: 'high'
                });


            expect(response.status)
                .to.equal(201);


            expect(response.body)
                .to.have.property(
                    'status',
                    'success'
                );


            expect(response.body)
                .to.have.property(
                    'message',
                    'Pedido creado exitosamente'
                );


            expect(response.body)
                .to.have.property('payload');


            const order =
                response.body.payload;


            expect(order)
                .to.have.property('_id');


            expect(order)
                .to.have.property(
                    'customer',
                    customerId
                );


            expect(order)
                .to.have.property(
                    'store',
                    storeId
                );


            expect(order.items)
                .to.be.an('array')
                .with.lengthOf(2);


            expect(order)
                .to.have.property(
                    'deliveryAddress',
                    '800 Testing Road'
                );


            expect(order)
                .to.have.property(
                    'total',
                    100
                );


            expect(order)
                .to.have.property(
                    'status',
                    'created'
                );


            expect(order)
                .to.have.property(
                    'priority',
                    'high'
                );

        });


        it('debe responder INVALID_DATA cuando faltan datos obligatorios', async () => {

            const response = await request(app)
                .post('/api/orders')
                .send({
                    customer: customerId,
                    store: storeId
                });


            expect(response.status)
                .to.equal(400);


            expect(response.body)
                .to.have.property(
                    'status',
                    'error'
                );


            expect(response.body)
                .to.have.property(
                    'code',
                    'INVALID_DATA'
                );


            expect(response.body)
                .to.have.property(
                    'message',
                    'Los datos proporcionados son inválidos'
                );


            expect(response.body)
                .to.have.property('details');

        });

    });


    describe('GET /api/orders/:oid', () => {

        it('debe obtener un pedido existente por ID', async () => {

            const createdOrder =
                await createTestOrder();


            const response = await request(app)
                .get(
                    `/api/orders/${createdOrder._id}`
                );


            expect(response.status)
                .to.equal(200);


            expect(response.body)
                .to.have.property(
                    'status',
                    'success'
                );


            expect(response.body)
                .to.have.property('payload');


            expect(response.body.payload)
                .to.have.property(
                    '_id',
                    createdOrder._id
                );

        });


        it('debe responder ORDER_NOT_FOUND cuando el pedido no existe', async () => {

            const nonExistingId =
                new mongoose.Types.ObjectId()
                    .toString();


            const response = await request(app)
                .get(
                    `/api/orders/${nonExistingId}`
                );


            expect(response.status)
                .to.equal(404);


            expect(response.body)
                .to.deep.include({
                    status: 'error',
                    code: 'ORDER_NOT_FOUND',
                    message: 'Pedido no encontrado'
                });

        });

    });


    describe('PATCH /api/orders/:oid', () => {

        it('debe actualizar el estado del pedido correctamente', async () => {

            const createdOrder =
                await createTestOrder();


            const response = await request(app)
                .patch(
                    `/api/orders/${createdOrder._id}`
                )
                .send({
                    status: 'assigned'
                });


            expect(response.status)
                .to.equal(200);


            expect(response.body)
                .to.have.property(
                    'status',
                    'success'
                );


            expect(response.body)
                .to.have.property(
                    'message',
                    'Pedido actualizado exitosamente'
                );


            expect(response.body)
                .to.have.property('payload');


            expect(response.body.payload)
                .to.have.property(
                    '_id',
                    createdOrder._id
                );


            expect(response.body.payload)
                .to.have.property(
                    'status',
                    'assigned'
                );

        });


        it('debe responder INVALID_ORDER_STATUS cuando el estado es inválido', async () => {

            const createdOrder =
                await createTestOrder();


            const response = await request(app)
                .patch(
                    `/api/orders/${createdOrder._id}`
                )
                .send({
                    status: 'unknown'
                });


            expect(response.status)
                .to.equal(400);


            expect(response.body)
                .to.have.property(
                    'status',
                    'error'
                );


            expect(response.body)
                .to.have.property(
                    'code',
                    'INVALID_ORDER_STATUS'
                );


            expect(response.body)
                .to.have.property(
                    'message',
                    'El estado del pedido no es válido'
                );


            expect(response.body)
                .to.have.property('details');


            expect(response.body.details)
                .to.have.property('status');

        });


        it('debe responder ORDER_NOT_FOUND al actualizar un pedido inexistente', async () => {

            const nonExistingId =
                new mongoose.Types.ObjectId()
                    .toString();


            const response = await request(app)
                .patch(
                    `/api/orders/${nonExistingId}`
                )
                .send({
                    status: 'created'
                });


            expect(response.status)
                .to.equal(404);


            expect(response.body)
                .to.deep.include({
                    status: 'error',
                    code: 'ORDER_NOT_FOUND',
                    message: 'Pedido no encontrado'
                });

        });

    });

});