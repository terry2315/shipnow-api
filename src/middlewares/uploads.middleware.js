import multer from 'multer';
import { userDocumentUploader, orderProofUploader } from '../config/upload.config.js';
import { FILE_UPLOAD } from '../constants/upload.constants.js';
import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { createError } from '../utils/createError.js';

const handleUpload = (uploadMiddleware, expectedField) => (req, res, next) => {
    uploadMiddleware(req, res, (error) => {
        if (!error) return next();

        if (error instanceof multer.MulterError) {
            if (error.code === 'LIMIT_FILE_SIZE' || error.code === 'LIMIT_UNEXPECTED_FILE') {
                return next(createError({
                    ...ERROR_DICTIONARY.FILE_TOO_LARGE,
                    details: { maxSize: FILE_UPLOAD.MAX_SIZE }
                }));
            }

            if (error.code === 'LIMIT_UNEXPECTED_FILE') {
                return next(createError({
                    ...ERROR_DICTIONARY.FILE_FIELD_INVALID,
                    details: { expectedField }
                }));
            }

            return next(createError({
                ...ERROR_DICTIONARY.FILE_SAVE_FAILED,
                details: { multerCode: error.code }
            }));
        }

        next(error);
    });
};

export const uploadUserDocument = handleUpload(
    userDocumentUploader.single(FILE_UPLOAD.USER_DOCUMENT_FIELD),
    FILE_UPLOAD.USER_DOCUMENT_FIELD
);

export const uploadOrderProof = handleUpload(
    orderProofUploader.single(FILE_UPLOAD.ORDER_PROOF_FIELD),
    FILE_UPLOAD.ORDER_PROOF_FIELD
);
