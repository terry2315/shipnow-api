import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import app from '../src/app.js';

describe('Uploads API', () => {
    let userId;
    let storeId;
    let orderId;

    const testUploadDirectory = path.resolve(process.cwd(), 'uploads', 'test');

    const cleanTestUploads = async () => {
        await fs.rm(testUploadDirectory, { recursive: true, force: true });
    };

    const createUser = async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                firstName: 'Upload',
                lastName: 'Tester',
                email: 'upload.tester@gmail.com',
                password: 'Test1234'
            });

        expect(response.status).to.equal(201);

        return response.body.payload;
    };

    const createOrderDependencies = async () => {
        const user = await createUser();

        userId = user._id;

        const storeObjectId = new mongoose.Types.ObjectId();

        await mongoose.connection.collection('stores').insertOne({
            _id: storeObjectId,
            name: 'Upload Test Store',
            address: '100 Upload Street',
            owner: new mongoose.Types.ObjectId(userId),
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        storeId = storeObjectId.toString();

        const orderResponse = await request(app)
            .post('/api/orders')
            .send({
                customer: userId,
                store: storeId,
                items: [
                    {
                        name: 'Upload Test Product',
                        quantity: 1,
                        price: 25
                    }
                ],
                deliveryAddress: '500 Upload Avenue',
                priority: 'normal'
            });

        expect(orderResponse.status).to.equal(201);

        orderId = orderResponse.body.payload._id;
    };

    beforeEach(async () => {
        await mongoose.connection.collection('orders').deleteMany({});
        await mongoose.connection.collection('stores').deleteMany({});
        await mongoose.connection.collection('users').deleteMany({});
        await cleanTestUploads();
    });

    afterEach(async () => {
        await cleanTestUploads();
    });

    describe('POST /api/users/:uid/documents', () => {
        it('debe cargar correctamente un documento de usuario', async () => {
            const user = await createUser();

            const response = await request(app)
                .post(`/api/users/${user._id}/documents`)
                .field('documentType', 'identity')
                .attach('document', Buffer.from('test image content'), {
                    filename: 'identity.png',
                    contentType: 'image/png'
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('message', 'Documento cargado exitosamente');
            expect(response.body).to.have.property('payload');

            const document = response.body.payload.document;

            expect(document).to.have.property('originalName', 'identity.png');
            expect(document).to.have.property('filename');
            expect(document).to.have.property('mimeType', 'image/png');
            expect(document).to.have.property('documentType', 'identity');
            expect(document).to.have.property('size');
            expect(document).to.have.property('uploadedAt');
            expect(document.path).to.include('uploads/test/users/documents');
            expect(response.body.payload.user.documents).to.be.an('array').with.lengthOf(1);
        });

        it('debe responder FILE_REQUIRED cuando falta el archivo', async () => {
            const user = await createUser();

            const response = await request(app)
                .post(`/api/users/${user._id}/documents`)
                .field('documentType', 'identity');

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'FILE_REQUIRED',
                message: 'El archivo es obligatorio'
            });
        });

        it('debe responder DOCUMENT_TYPE_INVALID cuando el tipo de documento es inválido', async () => {
            const user = await createUser();

            const response = await request(app)
                .post(`/api/users/${user._id}/documents`)
                .field('documentType', 'social_security')
                .attach('document', Buffer.from('test image content'), {
                    filename: 'identity.png',
                    contentType: 'image/png'
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'DOCUMENT_TYPE_INVALID',
                message: 'El tipo de documento no es válido'
            });

            expect(response.body).to.have.property('details');
        });

        it('debe responder USER_NOT_FOUND cuando el usuario no existe', async () => {
            const nonExistingId = new mongoose.Types.ObjectId().toString();

            const response = await request(app)
                .post(`/api/users/${nonExistingId}/documents`)
                .field('documentType', 'identity')
                .attach('document', Buffer.from('test image content'), {
                    filename: 'identity.png',
                    contentType: 'image/png'
                });

            expect(response.status).to.equal(404);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'USER_NOT_FOUND',
                message: 'Usuario no encontrado'
            });
        });

        it('debe responder FILE_TYPE_INVALID cuando el tipo de archivo no está permitido', async () => {
            const user = await createUser();

            const response = await request(app)
                .post(`/api/users/${user._id}/documents`)
                .field('documentType', 'identity')
                .attach('document', Buffer.from('plain text content'), {
                    filename: 'document.txt',
                    contentType: 'text/plain'
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'FILE_TYPE_INVALID',
                message: 'El tipo de archivo no está permitido'
            });

            expect(response.body).to.have.property('details');
        });
    });

    describe('POST /api/orders/:oid/proofs', () => {
        it('debe cargar correctamente un comprobante de pedido', async () => {
            await createOrderDependencies();

            const response = await request(app)
                .post(`/api/orders/${orderId}/proofs`)
                .attach('proof', Buffer.from('test proof content'), {
                    filename: 'proof.jpg',
                    contentType: 'image/jpeg'
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('message', 'Comprobante cargado exitosamente');
            expect(response.body).to.have.property('payload');

            const proof = response.body.payload.proof;

            expect(proof).to.have.property('originalName', 'proof.jpg');
            expect(proof).to.have.property('filename');
            expect(proof).to.have.property('mimeType', 'image/jpeg');
            expect(proof).to.have.property('documentType', 'order_proof');
            expect(proof).to.have.property('size');
            expect(proof).to.have.property('uploadedAt');
            expect(proof.path).to.include('uploads/test/orders/proofs');
            expect(response.body.payload.order.proofs).to.be.an('array').with.lengthOf(1);
        });

        it('debe responder FILE_REQUIRED cuando falta el comprobante', async () => {
            await createOrderDependencies();

            const response = await request(app)
                .post(`/api/orders/${orderId}/proofs`);

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'FILE_REQUIRED',
                message: 'El archivo es obligatorio'
            });
        });

        it('debe responder ORDER_NOT_FOUND cuando el pedido no existe', async () => {
            const nonExistingId = new mongoose.Types.ObjectId().toString();

            const response = await request(app)
                .post(`/api/orders/${nonExistingId}/proofs`)
                .attach('proof', Buffer.from('test proof content'), {
                    filename: 'proof.jpg',
                    contentType: 'image/jpeg'
                });

            expect(response.status).to.equal(404);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'ORDER_NOT_FOUND',
                message: 'Pedido no encontrado'
            });
        });

        it('debe responder FILE_TYPE_INVALID cuando el comprobante no está permitido', async () => {
            await createOrderDependencies();

            const response = await request(app)
                .post(`/api/orders/${orderId}/proofs`)
                .attach('proof', Buffer.from('plain text content'), {
                    filename: 'proof.txt',
                    contentType: 'text/plain'
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.include({
                status: 'error',
                code: 'FILE_TYPE_INVALID',
                message: 'El tipo de archivo no está permitido'
            });

            expect(response.body).to.have.property('details');
        });
    });
});