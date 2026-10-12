import {
    createProductRepository,
    getAllProductsRepository,
    getProductByIdRepository,
    updateProductRepository,
    deleteProductRepository,
} from "../repositories/product.repository.js";

import { validateCreateProduct } from "../utils/validateCreateProduct.js";
import { createError } from '../utils/createError.js';
import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { PRODUCT_STATUS } from '../constants/product.constants.js';
import { validateId } from '../utils/validateId.js';
import { validateUpdateProduct } from "../utils/validateUpdateProduct.js";
import { buildUpdateProduct } from "../utils/buildUpdateProduct.js";


export const createProductService = async (data) => {


    const errors = validateCreateProduct(data);

    if (Object.keys(errors).length > 0) {
        throw createError({
            ...ERROR_DICTIONARY.INVALID_DATA,
            details: errors
        });
    }

    const {
        name,
        description,
        price,
        stock
    } = data;

    const status = stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK;

    const newProduct = {
        name: name.trim(),
        description: description.trim(),
        price,
        stock,
        status
    };

    return createProductRepository(newProduct);

};

export const getAllProductsService = async () => {

    return getAllProductsRepository();

};

export const getProductByIdService = async (id) => {

    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.INVALID_ID);
    }

    const product = await getProductByIdRepository(id);

    if (!product) {
        throw createError(ERROR_DICTIONARY.PRODUCT_NOT_FOUND);
    }

    return product;

};

export const updateProductService = async (id, data) => {

    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.INVALID_ID);
    }

    if (!data) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    const errors = validateUpdateProduct(data);

    if (Object.keys(errors).length > 0) {
        throw createError({
            ...ERROR_DICTIONARY.INVALID_DATA,
            details: errors
        })
    }

    const updateData = buildUpdateProduct(data);

    if (data.stock !== undefined) {
        updateData.status =
            data.stock > 0
                ? PRODUCT_STATUS.AVAILABLE
                : PRODUCT_STATUS.OUT_OF_STOCK;
    }

    const updateProduct = await updateProductRepository(id, updateData);

    if (!updateProduct) {
        throw createError(ERROR_DICTIONARY.PRODUCT_NOT_FOUND);
    }

    return updateProduct;

};

export const deleteProductService = async (id) => {

    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.INVALID_ID);
    }

    const product = await deleteProductRepository(id);

    if (!product) {
        throw createError(ERROR_DICTIONARY.PRODUCT_NOT_FOUND);
    }

    return product

};