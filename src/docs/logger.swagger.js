/**
 * @openapi
 * /api/logger-test:
 *
 *   get:
 *     tags:
 *       - Logger
 *     summary: Probar todos los niveles del logger
 *     description: >
 *       Endpoint interno utilizado exclusivamente para validar la configuración
 *       del sistema de logging de ShipNow con Winston.
 *       Genera logs en los niveles debug, http, info, warning, error y fatal.
 *       Este endpoint es una herramienta técnica de validación y no representa
 *       una funcionalidad de negocio de la aplicación.
 *
 *     responses:
 *
 *       200:
 *         description: Todos los niveles del logger fueron ejecutados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *
 *                 message:
 *                   type: string
 *                   example: Todos los niveles del logger fueron ejecutados
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */