import { faker } from '@faker-js/faker';

import {
    DELIVERY_STATUS
} from '../constants/delivery.constants.js';

import {
    ORDER_STATUS
} from '../constants/order.constants.js';


const ORDER_TO_DELIVERY_STATUS = Object.freeze({
    [ORDER_STATUS.CREATED]: DELIVERY_STATUS.PENDING,
    [ORDER_STATUS.ASSIGNED]: DELIVERY_STATUS.ASSIGNED,
    [ORDER_STATUS.PICKED_UP]: DELIVERY_STATUS.PICKED_UP,
    [ORDER_STATUS.IN_TRANSIT]: DELIVERY_STATUS.IN_TRANSIT,
    [ORDER_STATUS.DELIVERED]: DELIVERY_STATUS.DELIVERED,
    [ORDER_STATUS.CANCELLED]: DELIVERY_STATUS.CANCELLED
});


export const generateMockDelivery = ({
    orderId,
    courierId = null
}) => {

    const status = courierId
        ? faker.helpers.arrayElement([
            DELIVERY_STATUS.ASSIGNED,
            DELIVERY_STATUS.PICKED_UP,
            DELIVERY_STATUS.IN_TRANSIT,
            DELIVERY_STATUS.DELIVERED
        ])
        : DELIVERY_STATUS.PENDING;

    let assignedAt = null;
    let deliveredAt = null;

    if (courierId) {
        assignedAt = faker.date.recent({
            days: 10
        });
    }

    if (status === DELIVERY_STATUS.DELIVERED) {
        deliveredAt = faker.date.between({
            from: assignedAt,
            to: new Date()
        });
    }

    return {
        order: orderId,
        courier: courierId,
        status,
        assignedAt,
        deliveredAt
    };
};


export const generateMockDeliveries = ({
    orderIds = [],
    courierIds = []
}) => {

    return orderIds.map((orderId) => {

        const shouldAssignCourier =
            courierIds.length > 0 &&
            faker.datatype.boolean();

        const courierId = shouldAssignCourier
            ? faker.helpers.arrayElement(courierIds)
            : null;

        return generateMockDelivery({
            orderId,
            courierId
        });
    });
};


export const generateMockDeliveriesFromOrders = ({
    orders = [],
    courierIds = []
}) => {

    return orders.map((order) => {

        const deliveryStatus =
            ORDER_TO_DELIVERY_STATUS[order.status];

        const requiresCourier = [
            DELIVERY_STATUS.ASSIGNED,
            DELIVERY_STATUS.PICKED_UP,
            DELIVERY_STATUS.IN_TRANSIT,
            DELIVERY_STATUS.DELIVERED
        ].includes(deliveryStatus);

        const courierId =
            requiresCourier && courierIds.length > 0
                ? faker.helpers.arrayElement(courierIds)
                : null;

        let assignedAt = null;
        let deliveredAt = null;

        if (courierId) {
            assignedAt = faker.date.recent({
                days: 10
            });
        }

        if (
            deliveryStatus === DELIVERY_STATUS.DELIVERED &&
            assignedAt
        ) {
            deliveredAt = faker.date.between({
                from: assignedAt,
                to: new Date()
            });
        }

        return {
            order: order._id,
            courier: courierId,
            status: deliveryStatus,
            assignedAt,
            deliveredAt
        };
    });
};