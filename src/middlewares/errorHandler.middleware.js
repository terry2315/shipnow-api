import { logger } from '../config/logger.config.js';
import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';

export const errorHandler = (error, req, res, next) => {
    if (error.isOperational) {
        const logMessage = `${error.code} - ${error.message} - ${req.method} ${req.originalUrl}`;

        if (error.statusCode >= 500) {
            logger.error(logMessage);
        } else {
            logger.warning(logMessage);
        }

        return res.status(error.statusCode).json({
            status: 'error',
            code: error.code,
            message: error.message,
            ...(error.details && { details: error.details })
        });
    }

    logger.error(`UNEXPECTED_ERROR - ${req.method} ${req.originalUrl} - ${error.stack || error.message}`);

    return res.status(ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.statusCode).json({
        status: 'error',
        code: ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.code,
        message: ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.message
    });
};
