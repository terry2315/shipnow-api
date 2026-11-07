import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { createError } from '../utils/createError.js';


export const notFoundHandler = (req, res, next) => {

    const error = createError(
        ERROR_DICTIONARY.ROUTE_NOT_FOUND
    );

    next(error);
};