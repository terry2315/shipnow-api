import request from 'supertest';
import { expect } from 'chai';

import app from '../src/app.js';


describe('Swagger Documentation', () => {

    describe('GET /api/docs/', () => {

        it('debe servir correctamente la documentación Swagger', async () => {

            const response = await request(app)
                .get('/api/docs/');


            expect(response.status)
                .to.equal(200);


            expect(response.headers['content-type'])
                .to.include('text/html');


            expect(response.text)
                .to.include('Swagger UI');

        });

    });

});