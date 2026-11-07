import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Mocks API', () => {
    describe('GET /api/mocks/users', () => {
        it('debe generar usuarios mock correctamente', async () => {
            const response = await request(app)
                .get('/api/mocks/users')
                .query({ qty: 3 });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('quantity', 3);
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.be.an('array').with.lengthOf(3);

            response.body.payload.forEach((user) => {
                expect(user).to.have.property('_id');
                expect(user).to.have.property('firstName');
                expect(user).to.have.property('lastName');
                expect(user).to.have.property('email');
                expect(user).to.have.property('role', 'user');
                expect(user).to.not.have.property('password');
            });
        });

        it('debe responder INVALID_MOCK_QUANTITY cuando qty es inválido', async () => {
            const response = await request(app)
                .get('/api/mocks/users')
                .query({ qty: 0 });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'INVALID_MOCK_QUANTITY',
                message: 'La cantidad de datos de prueba es inválida'
            });
            expect(response.body).to.have.property('details');
            expect(response.body.details).to.have.property('qty');
        });
    });

    describe('GET /api/mocks/couriers', () => {
        it('debe generar couriers mock correctamente', async () => {
            const response = await request(app)
                .get('/api/mocks/couriers')
                .query({ qty: 3 });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('quantity', 3);
            expect(response.body.payload).to.be.an('array').with.lengthOf(3);

            response.body.payload.forEach((courier) => {
                expect(courier).to.have.property('role', 'courier');
                expect(courier).to.not.have.property('password');
            });
        });
    });

    describe('GET /api/mocks/orders', () => {
        it('debe generar pedidos mock correctamente', async () => {
            const response = await request(app)
                .get('/api/mocks/orders')
                .query({ qty: 3 });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('quantity', 3);
            expect(response.body.payload).to.be.an('array').with.lengthOf(3);

            response.body.payload.forEach((order) => {
                expect(order).to.have.property('customer');
                expect(order).to.have.property('store');
                expect(order).to.have.property('items');
                expect(order.items).to.be.an('array');
                expect(order).to.have.property('total');
                expect(order).to.have.property('status');
                expect(order).to.have.property('priority');
            });
        });
    });

    describe('GET /api/mocks/deliveries', () => {
        it('debe generar deliveries mock correctamente', async () => {
            const response = await request(app)
                .get('/api/mocks/deliveries')
                .query({ qty: 3 });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('quantity', 3);
            expect(response.body.payload).to.be.an('array').with.lengthOf(3);

            response.body.payload.forEach((delivery) => {
                expect(delivery).to.have.property('order');
                expect(delivery).to.have.property('status');
                expect(delivery).to.have.property('courier');
                expect(delivery).to.have.property('assignedAt');
                expect(delivery).to.have.property('deliveredAt');
            });
        });
    });
});
