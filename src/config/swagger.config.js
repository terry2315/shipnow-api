import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';


const swaggerDefinition = {
    openapi: '3.0.3',

    info: {
        title: 'ShipNow API',
        version: '1.0.0',
        description:
            'API REST para la gestión de usuarios, tiendas, pedidos, entregas, datos mock, manejo profesional de errores y monitoreo de ShipNow.'
    },

    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Servidor local'
        }
    ],

    tags: [
        {
            name: 'Users',
            description: 'Gestión de usuarios'
        },
        {
            name: 'Orders',
            description: 'Gestión de pedidos'
        },
        {
            name: 'Deliveries',
            description:
                'Gestión y representación de entregas'
        },
        {
            name: 'Mocks',
            description:
                'Generación y carga de datos de prueba'
        },
        {
            name: 'Logger',
            description:
                'Herramientas internas para validar el sistema de logging'
        }
    ]
};


const docsPath = path
    .resolve(
        process.cwd(),
        'src/docs/*.swagger.js'
    )
    .replace(/\\/g, '/');


const options = {
    definition: swaggerDefinition,

    apis: [
        docsPath
    ]
};


export const swaggerSpec = swaggerJSDoc(options);