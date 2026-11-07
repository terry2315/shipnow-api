import mongoose from 'mongoose';
import { before, after } from 'mocha';
import dns from 'node:dns';
import { env } from '../../src/config/env.config.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);

before(async () => {

    if (env.NODE_ENV !== 'test') {
        throw new Error(
            'Los tests solo pueden ejecutarse con NODE_ENV=test'
        );
    }

    await mongoose.connect(env.MONGODB_URI);

    const databaseName = mongoose.connection.name;

    if (!databaseName.toLowerCase().includes('test')) {

        await mongoose.disconnect();

        throw new Error(
            `Base de datos insegura para testing: ${databaseName}. ` +
            'La base utilizada por los tests debe incluir "test" en su nombre.'
        );
    }

    await mongoose.connection.db.dropDatabase();
});

after(async () => {

    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.db.dropDatabase();
    }

    await mongoose.disconnect();
});