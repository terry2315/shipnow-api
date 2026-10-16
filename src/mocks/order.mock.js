import { faker } from '@faker-js/faker';
import { ORDER_STATUS, ORDER_PRIORITY } from '../constants/order.constants.js';

export const generateMockOrderItems = () => {

    const quantity = faker.number.int({
        min: 1,
        max: 4
    });

    return Array.from(
        { length: quantity },
        () => generateMockOrderItem()
    );
};

export const generateMockOrderItem = () => {

    return {
        name: faker.commerce.productName(),

        quantity: faker.number.int({
            min: 1,
            max: 5
        }),

        price: faker.number.float({
            min: 5,
            max: 500,
            fractionDigits: 2
        })
    };
};

export const generateMockOrder = ({
    customerId,
    storeId
}) => {

    const items = generateMockOrderItems();

    const total = items.reduce(
        (accumulator, item) => {
            return accumulator +
                item.price * item.quantity;
        },
        0
    );

    return {
        customer: customerId,
        store: storeId,
        items,
        deliveryAddress: faker.location.streetAddress(),
        total: Number(total.toFixed(2)),
        status: faker.helpers.arrayElement(
            Object.values(ORDER_STATUS)
        ),
        priority: faker.helpers.arrayElement(
            Object.values(ORDER_PRIORITY)
        )
    };
};


export const generateMockOrders = ({
    quantity = 1,
    customerIds = [],
    storeIds = []
}) => {

    if (customerIds.length === 0) {
        throw new Error(
            'No hay customerIds disponibles para generar órdenes'
        );
    }

    if (storeIds.length === 0) {
        throw new Error(
            'No hay storeIds disponibles para generar órdenes'
        );
    }

    return Array.from(
        { length: quantity },
        () => {

            const customerId =
                faker.helpers.arrayElement(customerIds);

            const storeId =
                faker.helpers.arrayElement(storeIds);

            return generateMockOrder({
                customerId,
                storeId
            });
        }
    );
};


