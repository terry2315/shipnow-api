import UserModel from '../models/user.model.js';
import StoreModel from '../models/store.model.js';
import OrderModel from '../models/order.model.js';
import DeliveryModel from '../models/delivery.model.js';

export const insertMockUsersRepository = async (users) => {
    return UserModel.insertMany(users);
};

export const insertMockStoresRepository = async (stores) => {
    return StoreModel.insertMany(stores);
};

export const insertMockOrdersRepository = async (orders) => {
    return OrderModel.insertMany(orders);
};

export const insertMockDeliveriesRepository = async (deliveries) => {
    return DeliveryModel.insertMany(deliveries);
};