import { faker } from '@faker-js/faker';

import { createError } from '../utils/createError.js';
import { ERROR_DICTIONARY } from '../errors/errorDictionary.js';
import { passwordHash } from '../utils/hash.js';

import { generateMockUsers } from '../mocks/user.mock.js';
import { generateMockCouriers } from '../mocks/courier.mock.js';
import { generateMockStores } from '../mocks/store.mock.js';
import { generateMockOrders } from '../mocks/order.mock.js';

import {
    generateMockDeliveries,
    generateMockDeliveriesFromOrders
} from '../mocks/delivery.mock.js';

import {
    insertMockUsersRepository,
    insertMockStoresRepository,
    insertMockOrdersRepository,
    insertMockDeliveriesRepository
} from '../repositories/mock.repository.js';


const validateQuantity = (qty) => {
    const quantity = qty === undefined ? 10 : Number(qty);

    if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 100
    ) {
        throw createError({
            ...ERROR_DICTIONARY.INVALID_DATA,
            details: {
                qty: 'La cantidad debe ser un número entero entre 1 y 100'
            }
        });
    }

    return quantity;
};


const generateMockId = () => {
    return faker.database.mongodbObjectId();
};


const removePassword = (user) => {
    const { password, ...safeUser } = user;
    return safeUser;
};


export const getMockUsersService = async (qty) => {
    const quantity = validateQuantity(qty);

    return generateMockUsers(quantity)
        .map((user) => ({
            _id: generateMockId(),
            ...user
        }))
        .map(removePassword);
};


export const getMockCouriersService = async (qty) => {
    const quantity = validateQuantity(qty);

    return generateMockCouriers(quantity)
        .map((courier) => ({
            _id: generateMockId(),
            ...courier
        }))
        .map(removePassword);
};


export const getMockOrdersService = async (qty) => {
    const quantity = validateQuantity(qty);

    const customers = generateMockUsers(quantity).map((user) => ({
        _id: generateMockId(),
        ...user
    }));

    const customerIds = customers.map(
        (customer) => customer._id
    );

    const storeQuantity = Math.max(
        1,
        Math.ceil(quantity / 3)
    );

    const stores = generateMockStores({
        quantity: storeQuantity,
        ownerIds: customerIds
    }).map((store) => ({
        _id: generateMockId(),
        ...store
    }));

    const storeIds = stores.map(
        (store) => store._id
    );

    return generateMockOrders({
        quantity,
        customerIds,
        storeIds
    });
};


export const getMockDeliveriesService = async (qty) => {
    const quantity = validateQuantity(qty);

    const orderIds = Array.from(
        { length: quantity },
        () => generateMockId()
    );

    const couriers = generateMockCouriers(quantity).map((courier) => ({
        _id: generateMockId(),
        ...courier
    }));

    const courierIds = couriers.map(
        (courier) => courier._id
    );

    return generateMockDeliveries({
        orderIds,
        courierIds
    });
};


export const seedMocksService = async (qty) => {
    const quantity = validateQuantity(qty);

    const users = generateMockUsers(quantity);

    const hashedUsers = await Promise.all(
        users.map(async (user) => ({
            ...user,
            password: await passwordHash(user.password)
        }))
    );

    const couriers = generateMockCouriers(quantity);

    const hashedCouriers = await Promise.all(
        couriers.map(async (courier) => ({
            ...courier,
            password: await passwordHash(courier.password)
        }))
    );

    const insertedUsers = await insertMockUsersRepository([
        ...hashedUsers,
        ...hashedCouriers
    ]);

    const persistedCustomers = insertedUsers.slice(
        0,
        hashedUsers.length
    );

    const persistedCouriers = insertedUsers.slice(
        hashedUsers.length
    );

    const customerIds = persistedCustomers.map(
        (user) => user._id
    );

    const storeQuantity = Math.max(
        1,
        Math.ceil(quantity / 3)
    );

    const stores = generateMockStores({
        quantity: storeQuantity,
        ownerIds: customerIds
    });

    const insertedStores =
        await insertMockStoresRepository(stores);

    const storeIds = insertedStores.map(
        (store) => store._id
    );

    const orders = generateMockOrders({
        quantity,
        customerIds,
        storeIds
    });

    const insertedOrders =
        await insertMockOrdersRepository(orders);

    const courierIds = persistedCouriers.map(
        (courier) => courier._id
    );

    const deliveries =
        generateMockDeliveriesFromOrders({
            orders: insertedOrders,
            courierIds
        });

    const insertedDeliveries =
        await insertMockDeliveriesRepository(
            deliveries
        );

    return {
        users: persistedCustomers.length,
        couriers: persistedCouriers.length,
        stores: insertedStores.length,
        orders: insertedOrders.length,
        deliveries: insertedDeliveries.length
    };
};