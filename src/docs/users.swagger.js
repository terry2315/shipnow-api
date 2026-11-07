/**
 * @openapi
 * /api/users:
 *
 *   post:
 *     tags:
 *       - Users
 *     summary: Crear un usuario
 *     description: >
 *       Crea un nuevo usuario en ShipNow.
 *       El email debe ser único y los datos deben cumplir
 *       las validaciones definidas por la aplicación.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *
 *               firstName:
 *                 type: string
 *                 example: Terry
 *
 *               lastName:
 *                 type: string
 *                 example: Guzman
 *
 *               email:
 *                 type: string
 *                 format: email
 *                 example: terry@example.com
 *
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *
 *     responses:
 *
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidData'
 *
 *       409:
 *         $ref: '#/components/responses/UserAlreadyExists'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener usuarios
 *     description: >
 *       Obtiene la lista de usuarios registrados utilizando
 *       parámetros de paginación.
 *
 *     parameters:
 *
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número de página solicitada.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Cantidad máxima de usuarios por página.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         example: 10
 *
 *     responses:
 *
 *       200:
 *         description: Lista de usuarios obtenida correctamente
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
 *                     $ref: '#/components/schemas/User'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidData'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 * /api/users/{uid}:
 *
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener usuario por ID
 *     description: >
 *       Busca un usuario utilizando su ObjectId de MongoDB.
 *
 *     parameters:
 *
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *         example: 68f2cdb13ab40a1d793e08f2
 *
 *     responses:
 *
 *       200:
 *         description: Usuario encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidId'
 *
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 *   patch:
 *     tags:
 *       - Users
 *     summary: Actualizar usuario
 *     description: >
 *       Actualiza parcialmente los campos permitidos de un usuario.
 *       El usuario debe existir y el ID debe ser válido.
 *
 *     parameters:
 *
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *         example: 68f2cdb13ab40a1d793e08f2
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *
 *               firstName:
 *                 type: string
 *                 example: Terry
 *
 *               lastName:
 *                 type: string
 *                 example: Guzman
 *
 *               email:
 *                 type: string
 *                 format: email
 *                 example: terry.updated@example.com
 *
 *               password:
 *                 type: string
 *                 format: password
 *                 example: newPassword123
 *
 *     responses:
 *
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Usuario eliminado exitosamente
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *
 *       400:
 *         description: ID o datos inválidos
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
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *
 *       409:
 *         $ref: '#/components/responses/UserAlreadyExists'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar usuario
 *     description: >
 *       Elimina un usuario utilizando su ObjectId.
 *
 *     parameters:
 *
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *         example: 68f2cdb13ab40a1d793e08f2
 *
 *     responses:
 *
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *
 *       400:
 *         $ref: '#/components/responses/InvalidId'
 *
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */