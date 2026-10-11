export const createError = ({ code, message, statusCode, details = null }) => {

    const error = new Error(message);

    error.name = 'AppError';
    error.code = code;
    error.statusCode = statusCode;
    error.details = details;
    error.isOperational = true;

    Error.captureStackTrace(error, createError);

    return error;

};