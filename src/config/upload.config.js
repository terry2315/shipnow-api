import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { env } from './env.config.js';
import { FILE_UPLOAD } from '../constants/upload.constants.js';
import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { createError } from '../utils/createError.js';

const baseUploadDirectory = env.NODE_ENV === 'test'
    ? path.resolve(process.cwd(), 'uploads', 'test')
    : path.resolve(process.cwd(), 'uploads');

export const UPLOAD_DIRECTORIES = Object.freeze({
    USER_DOCUMENTS: path.join(baseUploadDirectory, 'users', 'documents'),
    ORDER_PROOFS: path.join(baseUploadDirectory, 'orders', 'proofs')
});

const ensureDirectory = (directory) => {
    fs.mkdirSync(directory, { recursive: true });
};

const createStorage = (directory) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            ensureDirectory(directory);
            callback(null, directory);
        },
        filename: (req, file, callback) => {
            const extension = path.extname(file.originalname).toLowerCase();
            const filename = `${Date.now()}-${randomUUID()}${extension}`;
            callback(null, filename);
        }
    });
};

const fileFilter = (req, file, callback) => {
    const isAllowed = FILE_UPLOAD.ALLOWED_MIME_TYPES.includes(file.mimetype);

    if (!isAllowed) {
        return callback(
            createError({
                ...ERROR_DICTIONARY.FILE_TYPE_INVALID,
                details: {
                    mimetype: file.mimetype,
                    allowedTypes: FILE_UPLOAD.ALLOWED_MIME_TYPES
                }
            })
        );
    }

    callback(null, true);
};

const createUploader = (directory) => {
    return multer({
        storage: createStorage(directory),
        fileFilter,
        limits: {
            fileSize: FILE_UPLOAD.MAX_SIZE,
            files: 1
        }
    });
};

export const userDocumentUploader = createUploader(UPLOAD_DIRECTORIES.USER_DOCUMENTS);
export const orderProofUploader = createUploader(UPLOAD_DIRECTORIES.ORDER_PROOFS);
