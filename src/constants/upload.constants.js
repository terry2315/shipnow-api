export const FILE_UPLOAD = Object.freeze({
    MAX_SIZE: 5 * 1024 * 1024,

    USER_DOCUMENT_FIELD: 'document',

    ORDER_PROOF_FIELD: 'proof',

    ALLOWED_MIME_TYPES: Object.freeze([
        'application/pdf',
        'image/jpeg',
        'image/png'
    ])
});


export const USER_DOCUMENT_TYPES = Object.freeze({
    IDENTITY: 'identity',
    PASSPORT: 'passport',
    DRIVER_LICENSE: 'driver_license'
});


export const ORDER_PROOF_TYPE = 'order_proof';