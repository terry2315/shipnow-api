/**
 * @openapi
 * components:
 *
 *   schemas:
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68f2cdb13ab40a1d793e08f2
 *
 *         firstName:
 *           type: string
 *           example: Terry
 *
 *         lastName:
 *           type: string
 *           example: Guzman
 *
 *         email:
 *           type: string
 *           format: email
 *           example: terry@example.com
 *
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 *             - courier
 *           example: user
 *
 *         documents:
 *           type: array
 *           items:
 *             type: object
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-10-13T23:10:50.582Z
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-11-07T15:51:16.093Z
 *
 *
 *     Store:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6aceba7a51821b08105156a6
 *
 *         name:
 *           type: string
 *           example: Schroeder Group
 *
 *         address:
 *           type: string
 *           example: 5509 Waterloo Road
 *
 *         isActive:
 *           type: boolean
 *           example: true
 *
 *
 *     OrderItem:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           example: Wireless Keyboard
 *
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           example: 2
 *
 *         price:
 *           type: number
 *           format: double
 *           minimum: 0
 *           example: 45.50
 *
 *
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68f2cdb13ab40a1d793e08f3
 *
 *         customer:
 *           oneOf:
 *             - type: string
 *               example: 68f2cdb13ab40a1d793e08f2
 *             - $ref: '#/components/schemas/User'
 *
 *         store:
 *           oneOf:
 *             - type: string
 *               example: 6aceba7a51821b08105156a6
 *             - $ref: '#/components/schemas/Store'
 *
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *
 *         deliveryAddress:
 *           type: string
 *           example: 123 Main Street
 *
 *         total:
 *           type: number
 *           format: double
 *           example: 91
 *
 *         status:
 *           type: string
 *           enum:
 *             - created
 *             - assigned
 *             - picked_up
 *             - in_transit
 *             - delivered
 *             - cancelled
 *           example: created
 *
 *         priority:
 *           type: string
 *           enum:
 *             - normal
 *             - high
 *           example: normal
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *
 *     Delivery:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68f2cdb13ab40a1d793e08f5
 *
 *         order:
 *           type: string
 *           example: 68f2cdb13ab40a1d793e08f3
 *
 *         courier:
 *           type: string
 *           nullable: true
 *           example: 68f2cdb13ab40a1d793e08f6
 *
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - assigned
 *             - picked_up
 *             - in_transit
 *             - delivered
 *             - cancelled
 *           example: assigned
 *
 *         assignedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *
 *     ErrorResponse:
 *       type: object
 *       required:
 *         - status
 *         - code
 *         - message
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - error
 *           example: error
 *
 *         code:
 *           type: string
 *           example: INVALID_DATA
 *
 *         message:
 *           type: string
 *           example: Los datos proporcionados son inválidos
 *
 *         details:
 *           type: object
 *           nullable: true
 *           additionalProperties: true
 *
 *
 *     SuccessResponse:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - success
 *           example: success
 *
 *         message:
 *           type: string
 *           example: Operación realizada correctamente
 *
 *         payload:
 *           nullable: true
 *
 *
 *     MockSeedResult:
 *       type: object
 *       properties:
 *         users:
 *           type: integer
 *           example: 3
 *
 *         couriers:
 *           type: integer
 *           example: 3
 *
 *         stores:
 *           type: integer
 *           example: 1
 *
 *         orders:
 *           type: integer
 *           example: 3
 *
 *         deliveries:
 *           type: integer
 *           example: 3
 *
 *
 *   responses:
 *
 *     InvalidData:
 *       description: Los datos proporcionados son inválidos
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: INVALID_DATA
 *             message: Los datos proporcionados son inválidos
 *
 *
 *     InvalidId:
 *       description: El identificador proporcionado es inválido
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: INVALID_ID
 *             message: El identificador proporcionado es inválido
 *
 *
 *     UserNotFound:
 *       description: Usuario no encontrado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: USER_NOT_FOUND
 *             message: Usuario no encontrado
 *
 *
 *     UserAlreadyExists:
 *       description: El usuario ya existe
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: USER_ALREADY_EXISTS
 *             message: El usuario ya existe
 *
 *
 *     ProductNotFound:
 *       description: Producto no encontrado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: PRODUCT_NOT_FOUND
 *             message: Producto no encontrado
 *
 *
 *     StoreNotFound:
 *       description: Tienda no encontrada
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: STORE_NOT_FOUND
 *             message: Tienda no encontrada
 *
 *
 *     OrderNotFound:
 *       description: Pedido no encontrado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: ORDER_NOT_FOUND
 *             message: Pedido no encontrado
 *
 *
 *     InvalidOrderStatus:
 *       description: El estado del pedido no es válido
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: INVALID_ORDER_STATUS
 *             message: El estado del pedido no es válido
 *
 *
 *     InvalidOrderPriority:
 *       description: La prioridad del pedido no es válida
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: INVALID_ORDER_PRIORITY
 *             message: La prioridad del pedido no es válida
 *
 *
 *     InvalidMockQuantity:
 *       description: La cantidad de datos de prueba es inválida
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: INVALID_MOCK_QUANTITY
 *             message: La cantidad de datos de prueba es inválida
 *             details:
 *               qty: La cantidad debe ser un número entero entre 1 y 100
 *
 *
 *     MockSeedFailed:
 *       description: No fue posible insertar los datos de prueba
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: MOCK_SEED_FAILED
 *             message: No fue posible insertar los datos de prueba
 *
 *
 *     RouteNotFound:
 *       description: Ruta no encontrada
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: ROUTE_NOT_FOUND
 *             message: Ruta no encontrada
 *
 *
 *     InternalServerError:
 *       description: Error interno del servidor
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             status: error
 *             code: INTERNAL_SERVER_ERROR
 *             message: Error interno del servidor
 */