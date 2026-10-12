import { ERROR_DICTIONARY } from "../errors/errorDictionary.js";

export const errorHandler = (error, req, res, next) => {

    if (error.isOperational) {

        return res.status(error.statusCode).json({
            status: 'error',
            code: error.code,
            message: error.message,
            ...(
                error.details &&
                {
                    details: error.details
                }
            )
        });
    }

    return res
        .status(ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.statusCode)
        .json({
            status: 'error',
            code: ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.code,
            message: ERROR_DICTIONARY.INTERNAL_SERVER_ERROR.message
        });
};  