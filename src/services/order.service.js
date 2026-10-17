import { createError } from '../utils/createError.js';
import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { ORDER_STATUS, ORDER_PRIORITY } from '../constants/order.constants.js';
import { validateCreateOrder } from '../utils/validateCreateOrder.js';
import { validateId } from '../utils/validateId.js';
import { getUserByIdRepository } from '../repositories/user.repository.js';
import { getStoreByIdRepository } from '../repositories/store.repository.js';
import { logger } from '../config/logger.config.js';

import {
    createOrderRepository,
    getAllOrdersRepository,
    getOrderByIdRepository,
    updateOrderRepository,
    deleteOrderRepository
} from '../repositories/order.repository.js';

export const createOrderService = async (data) => {
    if (!data) throw createError(ERROR_DICTIONARY.INVALID_DATA);

    const errors = validateCreateOrder(data);
    if (Object.keys(errors).length > 0) {
        throw createError({ ...ERROR_DICTIONARY.INVALID_DATA, details: errors });
    }

    const { customer, store, items, deliveryAddress, priority } = data;

    if (!validateId(customer)) throw createError(ERROR_DICTIONARY.INVALID_ID);
    const customerUser = await getUserByIdRepository(customer);
    if (!customerUser) throw createError(ERROR_DICTIONARY.USER_NOT_FOUND);

    if (!validateId(store)) throw createError(ERROR_DICTIONARY.INVALID_ID);
    const storeExists = await getStoreByIdRepository(store);
    if (!storeExists) throw createError(ERROR_DICTIONARY.STORE_NOT_FOUND);
    if (!storeExists.isActive) {
        throw createError({ ...ERROR_DICTIONARY.INVALID_DATA, details: { store: 'No se pueden crear pedidos en una tienda inactiva' } });
    }

    const normalizedItems = items.map((item) => ({
        name: item.name.trim(),
        quantity: item.quantity,
        price: item.price
    }));

    const total = normalizedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const newOrder = {
        customer,
        store,
        items: normalizedItems,
        deliveryAddress: deliveryAddress.trim(),
        total,
        status: ORDER_STATUS.CREATED,
        priority: priority ?? ORDER_PRIORITY.NORMAL
    };

    const createOrder = await createOrderRepository(newOrder);

    logger.info(`Pedido creado correctamente: ${createOrder._id}`);

    return createOrder;
};

export const getAllOrdersService = async () => {
    return getAllOrdersRepository();
};

export const getOrderByIdService = async (id) => {

    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.INVALID_ID);
    }

    const order = await getOrderByIdRepository(id);
    if (!order) {
        throw createError(ERROR_DICTIONARY.ORDER_NOT_FOUND);
    }

    return order;
};

export const updateOrderService = async (id, data) => {

    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.INVALID_ID);
    }

    if (!data || Object.keys(data).length === 0) {
        throw createError({
            ...ERROR_DICTIONARY.INVALID_DATA, details:
                { body: 'Debes proporcionar al menos un campo para actualizar' }
        });
    }

    const updateData = {};

    if (data.deliveryAddress !== undefined) {
        if (typeof data.deliveryAddress !== 'string' || data.deliveryAddress.trim().length < 5) {
            throw createError({ ...ERROR_DICTIONARY.INVALID_DATA, details: { deliveryAddress: 'La dirección debe contener al menos 5 caracteres' } });
        }
        updateData.deliveryAddress = data.deliveryAddress.trim();
    }

    if (data.priority !== undefined) {
        if (!Object.values(ORDER_PRIORITY).includes(data.priority)) {
            throw createError({ ...ERROR_DICTIONARY.INVALID_DATA, details: { priority: `La prioridad debe ser: ${Object.values(ORDER_PRIORITY).join(', ')}` } });
        }
        updateData.priority = data.priority;
    }

    if (data.status !== undefined) {
        if (!Object.values(ORDER_STATUS).includes(data.status)) {
            throw createError({ ...ERROR_DICTIONARY.INVALID_DATA, details: { status: `El estado debe ser: ${Object.values(ORDER_STATUS).join(', ')}` } });
        }
        updateData.status = data.status;
    }

    const updatedOrder = await updateOrderRepository(id, updateData);
    if (!updatedOrder) throw createError(ERROR_DICTIONARY.ORDER_NOT_FOUND);

    return updatedOrder;
};

export const deleteOrderService = async (id) => {
    if (!id) {
        throw createError(ERROR_DICTIONARY.INVALID_DATA);
    }

    if (!validateId(id)) {
        throw createError(ERROR_DICTIONARY.INVALID_ID);
    }

    const deletedOrder = await deleteOrderRepository(id);
    if (!deletedOrder) {
        throw createError(ERROR_DICTIONARY.ORDER_NOT_FOUND);
    }

    return deletedOrder;
};
