/**
 * @openapi
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Crear un pedido
 *     description: >
 *       Crea un nuevo pedido asociado a un usuario y una tienda existentes.
 *       El backend valida customer, store, items, dirección de entrega y prioridad.
 *       El total del pedido se calcula automáticamente.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - store
 *               - items
 *               - deliveryAddress
 *             properties:
 *               customer:
 *                 type: string
 *                 example: 68f2cdb13ab40a1d793e08f2
 *
 *               store:
 *                 type: string
 *                 example: 68f2cdb13ab40a1d793e08f4
 *
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *
 *               deliveryAddress:
 *                 type: string
 *                 example: 123 Main Street
 *
 *               priority:
 *                 type: string
 *                 enum:
 *                   - normal
 *                   - high
 *                 default: normal
 *                 example: normal
 *
 *     responses:
 *
 *       201:
 *         description: Pedido creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                  message: 
 *                   type: string
 *                   example: Pedido creado exitosamente
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *
 *       400:
 *         description: Datos o identificadores inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *
 *               invalidData:
 *                 summary: Datos inválidos
 *                 value:
 *                   status: error
 *                   code: INVALID_DATA
 *                   message: Los datos proporcionados son inválidos
 *
 *               invalidId:
 *                 summary: Identificador inválido
 *                 value:
 *                   status: error
 *                   code: INVALID_ID
 *                   message: El identificador proporcionado es inválido
 *
 *               invalidPriority:
 *                 summary: Prioridad inválida
 *                 value:
 *                   status: error
 *                   code: INVALID_ORDER_PRIORITY
 *                   message: La prioridad del pedido no es válida
 *
 *       404:
 *         description: Usuario o tienda no encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *
 *               userNotFound:
 *                 summary: Usuario no encontrado
 *                 value:
 *                   status: error
 *                   code: USER_NOT_FOUND
 *                   message: Usuario no encontrado
 *
 *               storeNotFound:
 *                 summary: Tienda no encontrada
 *                 value:
 *                   status: error
 *                   code: STORE_NOT_FOUND
 *                   message: Tienda no encontrada
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener pedidos
 *     description: Obtiene todos los pedidos registrados en ShipNow.
 *
 *     responses:
 *
 *       200:
 *         description: Lista de pedidos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 * /api/orders/{oid}:
 *
 *   get:
 *     tags:
 *       - Orders
 *     summary: Obtener pedido por ID
 *     description: Busca un pedido utilizando su ObjectId de MongoDB.
 *
 *     parameters:
 *       - in: path
 *         name: oid
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *         example: 68f2cdb13ab40a1d793e08f3
 *
 *     responses:
 *
 *       200:
 *         description: Pedido encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidId'
 *
 *       404:
 *         $ref: '#/components/responses/OrderNotFound'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 *   patch:
 *     tags:
 *       - Orders
 *     summary: Actualizar un pedido
 *     description: >
 *       Actualiza parcialmente los campos permitidos de un pedido.
 *       El ID debe ser válido y el pedido debe existir.
 *
 *     parameters:
 *       - in: path
 *         name: oid
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *         example: 68f2cdb13ab40a1d793e08f3
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *
 *               deliveryAddress:
 *                 type: string
 *                 example: 500 Ocean Drive
 *
 *               status:
 *                 type: string
 *                 enum:
 *                   - created
 *                   - assigned
 *                   - picked_up
 *                   - in_transit
 *                   - delivered
 *                   - cancelled
 *                 example: assigned
 *
 *               priority:
 *                 type: string
 *                 enum:
 *                   - normal
 *                   - high
 *                 example: high
 *
 *     responses:
 *
 *       200:
 *         description: Pedido actualizado correctamente
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
 *                   example: Pedido actualizado exitosamente
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *
 *       400:
 *         description: ID, datos, estado o prioridad inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *
 *               invalidId:
 *                 summary: Identificador inválido
 *                 value:
 *                   status: error
 *                   code: INVALID_ID
 *                   message: El identificador proporcionado es inválido
 *
 *               invalidData:
 *                 summary: Datos inválidos
 *                 value:
 *                   status: error
 *                   code: INVALID_DATA
 *                   message: Los datos proporcionados son inválidos
 *
 *               invalidStatus:
 *                 summary: Estado inválido
 *                 value:
 *                   status: error
 *                   code: INVALID_ORDER_STATUS
 *                   message: El estado del pedido no es válido
 *
 *               invalidPriority:
 *                 summary: Prioridad inválida
 *                 value:
 *                   status: error
 *                   code: INVALID_ORDER_PRIORITY
 *                   message: La prioridad del pedido no es válida
 *
 *       404:
 *         $ref: '#/components/responses/OrderNotFound'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Eliminar un pedido
 *     description: Elimina un pedido utilizando su ObjectId.
 *
 *     parameters:
 *       - in: path
 *         name: oid
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *         example: 68f2cdb13ab40a1d793e08f3
 *
 *     responses:
 *
 *       200:
 *         description: Pedido eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidId'
 *
 *       404:
 *         $ref: '#/components/responses/OrderNotFound'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */