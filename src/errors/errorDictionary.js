export const ERROR_DICTIONARY = Object.freeze({

    INVALID_DATA: {
        code: 'INVALID_DATA',
        statusCode: 400,
        message: 'Los datos proporcionados son inválidos'
    },

    INVALID_ID: {
        code: 'INVALID_ID',
        statusCode: 400,
        message: 'El identificador proporcionado no es válido'
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

    INVALID_MOCK_QUANTITY: {
        code: 'INVALID_MOCK_QUANTITY',
        statusCode: 400,
        message: 'La cantidad de datos mock no es válida'
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
    },

    EMAIL_ALREADY_VERIFIED: {
        code: 'EMAIL_ALREADY_VERIFIED',
        statusCode: 409,
        message: 'El correo ya ha sido verificado'
    },

    INVALID_VERIFICATION_TOKEN: {
        code: 'INVALID_VERIFICATION_TOKEN',
        statusCode: 400,
        message: 'El token de verificación no es válido'
    },

    VERIFICATION_TOKEN_EXPIRED: {
        code: 'VERIFICATION_TOKEN_EXPIRED',
        statusCode: 400,
        message: 'El token de verificación ha expirado'
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

    INVALID_ORDER_ITEMS: {
        code: 'INVALID_ORDER_ITEMS',
        statusCode: 400,
        message: 'Los items del pedido no son válidos'
    },

    INVALID_ORDER_STATUS: {
        code: 'INVALID_ORDER_STATUS',
        statusCode: 400,
        message: 'El estado del pedido no es válido'
    }

});