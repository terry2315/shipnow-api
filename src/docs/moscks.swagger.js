/**
 * @openapi
 * /api/mocks/users:
 *
 *   get:
 *     tags:
 *       - Mocks
 *       - Users
 *     summary: Generar usuarios mock
 *     description: >
 *       Genera usuarios simulados utilizando Faker.
 *       Los datos son devueltos en la respuesta y no se persisten en MongoDB.
 *       Si no se envía qty, se generan 10 registros por defecto.
 *
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de usuarios mock a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 3
 *
 *     responses:
 *
 *       200:
 *         description: Usuarios mock generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 quantity:
 *                   type: integer
 *                   example: 3
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidMockQuantity'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 * /api/mocks/couriers:
 *
 *   get:
 *     tags:
 *       - Mocks
 *       - Users
 *     summary: Generar repartidores mock
 *     description: >
 *       Genera usuarios simulados con role courier.
 *       Los datos son devueltos en la respuesta y no se persisten en MongoDB.
 *       Si no se envía qty, se generan 10 registros por defecto.
 *
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de couriers mock a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 3
 *
 *     responses:
 *
 *       200:
 *         description: Couriers mock generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 quantity:
 *                   type: integer
 *                   example: 3
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidMockQuantity'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 * /api/mocks/orders:
 *
 *   get:
 *     tags:
 *       - Mocks
 *       - Orders
 *     summary: Generar pedidos mock
 *     description: >
 *       Genera pedidos simulados relacionados con usuarios y stores
 *       creados temporalmente para el mock.
 *       Estos pedidos no se persisten en MongoDB.
 *       Si no se envía qty, se generan 10 registros por defecto.
 *
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de pedidos mock a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 3
 *
 *     responses:
 *
 *       200:
 *         description: Pedidos mock generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 quantity:
 *                   type: integer
 *                   example: 3
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidMockQuantity'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 * /api/mocks/deliveries:
 *
 *   get:
 *     tags:
 *       - Mocks
 *       - Deliveries
 *     summary: Generar entregas mock
 *     description: >
 *       Genera entregas simuladas asociadas a pedidos y couriers mock.
 *       Los registros no se persisten en MongoDB.
 *       Si no se envía qty, se generan 10 registros por defecto.
 *
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: Cantidad de deliveries mock a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 3
 *
 *     responses:
 *
 *       200:
 *         description: Deliveries mock generadas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 quantity:
 *                   type: integer
 *                   example: 3
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Delivery'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidMockQuantity'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 * /api/mocks/seed:
 *
 *   post:
 *     tags:
 *       - Mocks
 *     summary: Insertar datos mock en MongoDB
 *     description: >
 *       Genera e inserta datos de prueba relacionados en MongoDB.
 *       Crea users, couriers, stores, orders y deliveries.
 *       Este endpoint no requiere request body.
 *       La cantidad se recibe mediante el query parameter qty.
 *
 *     parameters:
 *       - in: query
 *         name: qty
 *         required: false
 *         description: >
 *           Cantidad base de registros a generar.
 *           Si no se proporciona, se utiliza 10 por defecto.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 3
 *
 *     responses:
 *
 *       201:
 *         description: Datos de prueba insertados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Datos de prueba insertados exitosamente
 *                 payload:
 *                   $ref: '#/components/schemas/MockSeedResult'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidMockQuantity'
 *
 *       500:
 *         $ref: '#/components/responses/MockSeedFailed'
 */