/**
 * @openapi
 * /api/users/{uid}/documents:
 *   post:
 *     tags:
 *       - Users
 *     summary: Subir documento de usuario
 *     description: >
 *       Permite cargar un documento asociado a un usuario existente.
 *       El archivo se guarda físicamente en el servidor y MongoDB almacena
 *       únicamente sus metadatos.
 *
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *         example: 507f1f77bcf86cd799439011
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *               - documentType
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF, JPG o PNG. Máximo 5 MB.
 *
 *               documentType:
 *                 type: string
 *                 description: Tipo de documento
 *                 enum:
 *                   - identity
 *                   - passport
 *                   - driver_license
 *                 example: identity
 *
 *     responses:
 *
 *       201:
 *         description: Documento cargado correctamente
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
 *                   example: Documento cargado exitosamente
 *                 payload:
 *                   type: object
 *                   properties:
 *                     document:
 *                       $ref: '#/components/schemas/FileMetadata'
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *
 *       400:
 *         description: Archivo, campo o tipo de documento inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *
 *               fileRequired:
 *                 summary: Archivo requerido
 *                 value:
 *                   status: error
 *                   code: FILE_REQUIRED
 *                   message: El archivo es obligatorio
 *
 *               fileTypeInvalid:
 *                 summary: Tipo de archivo no permitido
 *                 value:
 *                   status: error
 *                   code: FILE_TYPE_INVALID
 *                   message: El tipo de archivo no está permitido
 *
 *               fileFieldInvalid:
 *                 summary: Campo de archivo inválido
 *                 value:
 *                   status: error
 *                   code: FILE_FIELD_INVALID
 *                   message: El campo de archivo enviado es inválido
 *
 *               documentTypeInvalid:
 *                 summary: Tipo de documento inválido
 *                 value:
 *                   status: error
 *                   code: DOCUMENT_TYPE_INVALID
 *                   message: El tipo de documento no es válido
 *
 *               invalidId:
 *                 summary: ID inválido
 *                 value:
 *                   status: error
 *                   code: INVALID_ID
 *                   message: El identificador proporcionado es inválido
 *
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: USER_NOT_FOUND
 *               message: Usuario no encontrado
 *
 *       413:
 *         description: Archivo demasiado grande
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: FILE_TOO_LARGE
 *               message: El archivo supera el tamaño máximo permitido
 *               details:
 *                 maxSize: 5242880
 *
 *       500:
 *         description: Error al guardar el archivo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: FILE_SAVE_FAILED
 *               message: No fue posible guardar el archivo
 *
 *
 * /api/orders/{oid}/proofs:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Subir comprobante de pedido
 *     description: >
 *       Permite cargar un comprobante asociado a un pedido existente.
 *       El archivo se almacena físicamente en el servidor y se registran
 *       únicamente sus metadatos en MongoDB.
 *
 *     parameters:
 *       - in: path
 *         name: oid
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *         example: 507f1f77bcf86cd799439011
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - proof
 *             properties:
 *               proof:
 *                 type: string
 *                 format: binary
 *                 description: Comprobante PDF, JPG o PNG. Máximo 5 MB.
 *
 *     responses:
 *
 *       201:
 *         description: Comprobante cargado correctamente
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
 *                   example: Comprobante cargado exitosamente
 *                 payload:
 *                   type: object
 *                   properties:
 *                     proof:
 *                       $ref: '#/components/schemas/FileMetadata'
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 *
 *       400:
 *         description: Archivo, campo o ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *
 *               fileRequired:
 *                 summary: Archivo requerido
 *                 value:
 *                   status: error
 *                   code: FILE_REQUIRED
 *                   message: El archivo es obligatorio
 *
 *               fileTypeInvalid:
 *                 summary: Tipo de archivo no permitido
 *                 value:
 *                   status: error
 *                   code: FILE_TYPE_INVALID
 *                   message: El tipo de archivo no está permitido
 *
 *               fileFieldInvalid:
 *                 summary: Campo de archivo inválido
 *                 value:
 *                   status: error
 *                   code: FILE_FIELD_INVALID
 *                   message: El campo de archivo enviado es inválido
 *
 *               invalidId:
 *                 summary: ID inválido
 *                 value:
 *                   status: error
 *                   code: INVALID_ID
 *                   message: El identificador proporcionado es inválido
 *
 *       404:
 *         description: Pedido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: ORDER_NOT_FOUND
 *               message: Pedido no encontrado
 *
 *       413:
 *         description: Archivo demasiado grande
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: FILE_TOO_LARGE
 *               message: El archivo supera el tamaño máximo permitido
 *               details:
 *                 maxSize: 5242880
 *
 *       500:
 *         description: Error al guardar el comprobante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: error
 *               code: FILE_SAVE_FAILED
 *               message: No fue posible guardar el archivo
 */