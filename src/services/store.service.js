import { createError } from '../utils/createError.js';
import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { validateCreateStore } from '../utils/validateCreateStore.js';
import { getUserByIdRepository } from '../repositories/user.repository.js';
import { validateId } from '../utils/validateId.js';
import { validateUpdateStore } from '../utils/validateUpdateStore.js';

import {
    createStoreRepository,
    getAllStoresRepository,
    getStoreByIdRepository,
    updateStoreRepository,
    deleteStoreRepository,
} from '../repositories/store.repository.js';

export const createStoreService = async (data) => {

    if (!data) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    const errors = validateCreateStore(data);

    if (Object.keys(errors).length > 0) {
        throw createError({
            ...ERROR_DICTIONARY.INVALID_DATA,
            details: errors
        });
    }

    if (!validateId(data.owner)) {
        throw createError(ERROR_DICTIONARY.INVALID_ID);
    }

    const ownerUser = await getUserByIdRepository(data.owner);

    if (!ownerUser) {
        throw createError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }

    const { name, address, owner } = data;

    const newStore = {
        name: name.trim(),
        address: address.trim(),
        owner,
        isActive: true
    }

    return createStoreRepository(newStore);

};

export const getAllStoresService = async () => {
    return await getAllStoresRepository();
};

export const getStoreByIdService = async (id) => {

    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.INVALID_ID);
    }

    const store = await getStoreByIdRepository(id);

    if (!store) {
        throw createError(ERROR_DICTIONARY.STORE_NOT_FOUND);
    }

    return store;

};

export const updateStoreService = async (id, data) => {

    if (!id) throw createError(ERROR_DICTIONARY.INVALID_DATA);
    if (!validateId(id)) throw createError(ERROR_DICTIONARY.INVALID_ID);

    const errors = validateUpdateStore(data);
    if (Object.keys(errors).length > 0) {
        throw createError({ ...ERROR_DICTIONARY.INVALID_DATA, details: errors });
    }

    if (data.owner !== undefined && !validateId(data.owner)) {
        throw createError(ERROR_DICTIONARY.INVALID_ID);
    }

    if (data.owner !== undefined) {
        const owner = await getUserByIdRepository(data.owner);
        if (!owner) throw createError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }

    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.address !== undefined) updateData.address = data.address.trim();
    if (data.owner !== undefined) updateData.owner = data.owner;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const updatedStore = await updateStoreRepository(id, updateData);
    if (!updatedStore) throw createError(ERROR_DICTIONARY.STORE_NOT_FOUND);

    return updatedStore;
};

export const deleteStoreService = async (id) => {

    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.INVALID_ID);
    }

    const store = await deleteStoreRepository(id);

    if (!store) {
        throw createError(ERROR_DICTIONARY.STORE_NOT_FOUND);
    }

    return store;

};
