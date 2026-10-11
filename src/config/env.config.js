import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVariables = [
    'PORT',
    'MONGODB_URI',
    'NODE_ENV'
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        throw new Error(`Falta la variable de entorno obligatoria: ${variable}`);
    }
};

export const env = Object.freeze({
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV
});