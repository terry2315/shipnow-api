export const ERROR_DICTIONARY = Object.freeze({

    INVALID_DATA: {
        code: 'INVALID_DATA',
        statusCode: 400,
        message: 'Los datos proporcionados son inválidos'
    },

    INVALID_ID: {
        code: 'INVALID_ID',
        statusCode: 400,
        message: 'El identificador proporcionado es inválido'
    },

    USER_NOT_FOUND: {
        code: 'USER_NOT_FOUND',
        statusCode: 404,
        message: 'Usuario no encontrado'
    },

    USER_ALREADY_EXISTS: {
        code: 'USER_ALREADY_EXISTS',
        statusCode: 409,
        message: 'El usuario ya existe'
    },

    PRODUCT_NOT_FOUND: {
        code: 'PRODUCT_NOT_FOUND',
        statusCode: 404,
        message: 'Producto no encontrado'
    },

    STORE_NOT_FOUND: {
        code: 'STORE_NOT_FOUND',
        statusCode: 404,
        message: 'Tienda no encontrada'
    },

    ORDER_NOT_FOUND: {
        code: 'ORDER_NOT_FOUND',
        statusCode: 404,
        message: 'Pedido no encontrado'
    },

    INVALID_ORDER_STATUS: {
        code: 'INVALID_ORDER_STATUS',
        statusCode: 400,
        message: 'El estado del pedido no es válido'
    },

    INVALID_ORDER_PRIORITY: {
        code: 'INVALID_ORDER_PRIORITY',
        statusCode: 400,
        message: 'La prioridad del pedido no es válida'
    },

    INVALID_MOCK_QUANTITY: {
        code: 'INVALID_MOCK_QUANTITY',
        statusCode: 400,
        message: 'La cantidad de datos de prueba es inválida'
    },

    MOCK_SEED_FAILED: {
        code: 'MOCK_SEED_FAILED',
        statusCode: 500,
        message: 'No fue posible insertar los datos de prueba'
    },

    ROUTE_NOT_FOUND: {
        code: 'ROUTE_NOT_FOUND',
        statusCode: 404,
        message: 'Ruta no encontrada'
    },

    INTERNAL_SERVER_ERROR: {
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        message: 'Error interno del servidor'
    }

});