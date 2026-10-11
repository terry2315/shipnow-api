import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { createError } from '../utils/createError.js';

export const notFoundHandler = (req, res, next) => {

    return next(
        createError({
            ...ERROR_DICTIONARY.ROUTE_NOT_FOUND,
            details: {
                method: req.method,
                path: req.originalUrl
            }
        })
    );
};