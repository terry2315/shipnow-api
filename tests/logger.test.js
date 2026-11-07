import request from 'supertest';
import { expect } from 'chai';

import app from '../src/app.js';


describe('Logger API', () => {

    describe('GET /api/logger-test', () => {

        it('debe ejecutar correctamente todos los niveles del logger', async () => {

            const response = await request(app)
                .get('/api/logger-test');


            expect(response.status)
                .to.equal(200);


            expect(response.body)
                .to.deep.equal({
                    status: 'success',
                    message: 'Todos los niveles del logger fueron ejecutados'
                });

        });

    });

});