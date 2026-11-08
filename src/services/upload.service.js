import { USER_DOCUMENT_TYPES, ORDER_PROOF_TYPE } from '../constants/upload.constants.js';
import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { createError } from '../utils/createError.js';
import { validateId } from '../utils/validateId.js';
import { buildFileMetadata, removeUploadedFile } from '../utils/file.utils.js';
import { getUserByIdRepository, addUserDocumentRepository } from '../repositories/user.repository.js';
import { getOrderByIdRepository, addOrderProofRepository } from '../repositories/order.repository.js';
import { logger } from '../config/logger.config.js';

export const uploadUserDocumentService = async ({ userId, documentType, file }) => {
    if (!file) throw createError(ERROR_DICTIONARY.FILE_REQUIRED);

    try {
        if (!validateId(userId)) throw createError(ERROR_DICTIONARY.INVALID_ID);

        const allowedDocumentTypes = Object.values(USER_DOCUMENT_TYPES);

        if (!documentType || !allowedDocumentTypes.includes(documentType)) {
            logger.warning(`Tipo de documento inválido: ${documentType}`);
            throw createError({
                ...ERROR_DICTIONARY.DOCUMENT_TYPE_INVALID,
                details: { documentType, allowedTypes: allowedDocumentTypes }
            });
        }

        const user = await getUserByIdRepository(userId);
        if (!user) throw createError(ERROR_DICTIONARY.USER_NOT_FOUND);

        const metadata = buildFileMetadata(file, documentType);
        const updatedUser = await addUserDocumentRepository(userId, metadata);
        if (!updatedUser) throw createError(ERROR_DICTIONARY.FILE_SAVE_FAILED);

        logger.info(`Documento cargado correctamente para usuario ${userId}: ${file.filename}`);

        return { document: metadata, user: updatedUser };
    } catch (error) {
        await removeUploadedFile(file);
        if (error.isOperational) throw error;

        logger.error(`Error al guardar documento del usuario ${userId}: ${error.message}`);
        throw createError({
            ...ERROR_DICTIONARY.FILE_SAVE_FAILED,
            details: { reason: error.message }
        });
    }
};

export const uploadOrderProofService = async ({ orderId, file }) => {
    if (!file) throw createError(ERROR_DICTIONARY.FILE_REQUIRED);

    try {
        if (!validateId(orderId)) throw createError(ERROR_DICTIONARY.INVALID_ID);

        const order = await getOrderByIdRepository(orderId);
        if (!order) throw createError(ERROR_DICTIONARY.ORDER_NOT_FOUND);

        const metadata = buildFileMetadata(file, ORDER_PROOF_TYPE);
        const updatedOrder = await addOrderProofRepository(orderId, metadata);
        if (!updatedOrder) throw createError(ERROR_DICTIONARY.FILE_SAVE_FAILED);

        logger.info(`Comprobante ${file.filename} asociado al pedido ${orderId}`);

        return { proof: metadata, order: updatedOrder };
    } catch (error) {
        await removeUploadedFile(file);
        if (error.isOperational) throw error;

        logger.error(`Error al asociar comprobante al pedido ${orderId}: ${error.message}`);
        throw createError({
            ...ERROR_DICTIONARY.FILE_SAVE_FAILED,
            details: { reason: error.message }
        });
    }
};

