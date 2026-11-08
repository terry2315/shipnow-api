import fs from 'fs/promises';
import path from 'path';
import { logger } from '../config/logger.config.js';

export const buildFileMetadata = (file, documentType) => {
    const relativePath = path.relative(process.cwd(), file.path).replaceAll('\\', '/');

    return {
        originalName: file.originalname,
        filename: file.filename,
        path: relativePath,
        mimeType: file.mimetype,
        size: file.size,
        documentType,
        uploadedAt: new Date()
    };
};

export const removeUploadedFile = async (file) => {
    if (!file?.path) return;

    try {
        await fs.unlink(file.path);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            logger.warning(`No fue posible eliminar archivo temporal: ${file.path}`);
        }
    }
};
