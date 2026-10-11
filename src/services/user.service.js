import { createError } from '../utils/createError.js';
import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { validateCreateUser } from '../utils/validateCreateUser.js';
import { passwordHash } from '../utils/hash.js';
import { validateId } from '../utils/validateId.js';
import { validateUpdateUser } from '../utils/validateUpdateUser.js';

import {
    createUserRepository,
    getUserByEmailRepository,
    getAllUsersRepository,
    getUserByIdRepository,
    updateUserRepository,
    deleteUserRepository,
} from '../repositories/user.repository.js';

export const createUserService = async (data) => {

    const { firstName, lastName, email, password } = data;

    const newErrors = validateCreateUser(data);

    if (Object.keys(newErrors).length > 0) {
        throw createError({
            ...ERROR_DICTIONARY.INVALID_DATA,
            details: newErrors
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const userExists = await getUserByEmailRepository(normalizedEmail);

    if (userExists) {
        throw createError(ERROR_DICTIONARY.USER_ALREADY_EXISTS)
    }

    if (userExists) {
        throw createError(ERROR_DICTIONARY.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await passwordHash(password);

    const newUser = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        password: hashedPassword
    };

    const createdUser = await createUserRepository(newUser);

    const userResponse = createdUser.toObject();

    delete userResponse.password;

    return userResponse;

};

export const getAllUsersServices = async () => {
    return await getAllUsersRepository();
};

export const getUserByIdService = async (id) => {

    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    const user = await getUserByIdRepository(id);

    if (!user) {
        throw createError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }

    return user;

};

export const updateUserService = async (id, data) => {

    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }

    const newErrors = validateUpdateUser(data);

    if (Object.keys(newErrors).length > 0) {
        throw createError({
            ...ERROR_DICTIONARY.INVALID_DATA,
            details: newErrors
        });
    }

    const { firstName, lastName } = data;

    const updateData = {
        firstName,
        lastName
    };

    const updateUser = await updateUserRepository(id, updateData);

    if (!updateUser) {
        throw createError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }

    return updateUser;

};

export const deleteUserService = async (id) => {
    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }

    const deleteUser = await deleteUserRepository(id);

    if (!deleteUser) {
        throw createError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }

    return deleteUser;

}