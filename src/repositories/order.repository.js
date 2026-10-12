import OrderModel from '../models/order.model.js';

export const createOrderRepository = async (data) => {
    return OrderModel.create(data);
};

export const getAllOrdersRepository = async () => {

    return OrderModel
        .find()
        .populate(
            'customer',
            'firstName lastName email role'
        )
        .populate(
            'store',
            'name address isActive'
        )
        .sort({
            createdAt: -1
        })
        .lean();
};

export const getOrderByIdRepository = async (id) => {

    return OrderModel
        .findById(id)
        .populate(
            'customer',
            'firstName lastName email role'
        )
        .populate(
            'store',
            'name address isActive'
        )
        .lean();
};

export const updateOrderRepository = async (id, data) => {

    return OrderModel
        .findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )
        .populate(
            'customer',
            'firstName lastName email role'
        )
        .populate(
            'store',
            'name address isActive'
        );
};

export const deleteOrderRepository = async (id) => {

    return OrderModel
        .findByIdAndDelete(id)
        .populate(
            'customer',
            'firstName lastName email role'
        )
        .populate(
            'store',
            'name address isActive'
        );
};