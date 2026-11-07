import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

import app from '../src/app.js';


const testUser = {
    firstName: 'Terry',
    lastName: 'Tester',
    email: 'testing.user@gmail.com',
    password: 'Test1234'
};


const createTestUser = async () => {

    const response = await request(app)
        .post('/api/users')
        .send(testUser);

    expect(response.status).to.equal(201);

    expect(response.body)
        .to.have.property('status', 'success');

    expect(response.body)
        .to.have.property('payload');

    return response.body.payload;
};


describe('Users API', () => {

    beforeEach(async () => {

        await mongoose.connection
            .collection('users')
            .deleteMany({});

    });


    describe('GET /api/users', () => {

        it('debe obtener la lista de usuarios correctamente', async () => {

            await createTestUser();

            const response = await request(app)
                .get('/api/users')
                .query({
                    page: 1,
                    limit: 10
                });


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


            const user = response.body.payload[0];


            expect(user)
                .to.have.property('_id');


            expect(user)
                .to.have.property(
                    'firstName',
                    'Terry'
                );


            expect(user)
                .to.have.property(
                    'lastName',
                    'Tester'
                );


            expect(user)
                .to.have.property(
                    'email',
                    'testing.user@gmail.com'
                );


            expect(user)
                .to.have.property('role');


            expect(user)
                .to.have.property('documents');


            expect(user)
                .to.have.property('createdAt');


            expect(user)
                .to.have.property('updatedAt');


            expect(user)
                .to.not.have.property('password');

        });

    });


    describe('GET /api/users/:uid', () => {

        it('debe obtener un usuario existente por ID', async () => {

            const createdUser = await createTestUser();


            const response = await request(app)
                .get(
                    `/api/users/${createdUser._id}`
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
                    createdUser._id
                );


            expect(response.body.payload)
                .to.have.property(
                    'email',
                    'testing.user@gmail.com'
                );


            expect(response.body.payload)
                .to.not.have.property('password');

        });


        it('debe responder INVALID_ID cuando el ID es inválido', async () => {

            const response = await request(app)
                .get('/api/users/123');


            expect(response.status)
                .to.equal(400);


            expect(response.body)
                .to.deep.include({
                    status: 'error',
                    code: 'INVALID_ID',
                    message:
                        'El identificador proporcionado es inválido'
                });

        });


        it('debe responder USER_NOT_FOUND cuando el usuario no existe', async () => {

            const nonExistingId =
                new mongoose.Types.ObjectId()
                    .toString();


            const response = await request(app)
                .get(
                    `/api/users/${nonExistingId}`
                );


            expect(response.status)
                .to.equal(404);


            expect(response.body)
                .to.deep.include({
                    status: 'error',
                    code: 'USER_NOT_FOUND',
                    message:
                        'Usuario no encontrado'
                });

        });

    });

});