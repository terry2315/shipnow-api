import request from 'supertest';
import { expect } from 'chai';

import app from '../src/app.js';


describe('Global Routes', () => {

    describe('Ruta inexistente', () => {

        it('debe responder ROUTE_NOT_FOUND cuando la ruta no existe', async () => {

            const response = await request(app)
                .get('/api/route-that-does-not-exist');


            expect(response.status)
                .to.equal(404);


            expect(response.body)
                .to.deep.include({
                    status: 'error',
                    code: 'ROUTE_NOT_FOUND',
                    message: 'Ruta no encontrada'
                });

        });

    });

});
