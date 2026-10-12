import StoreModel from '../models/store.model.js';

export const createStoreRepository = async (data) => {
    return await StoreModel.create(data);
};

export const getAllStoresRepository = async () => {

    return StoreModel
        .find()
        .populate(
            'owner',
            'firstName lastName email role'
        )
        .sort({ createdAt: -1 })
        .lean();
};

export const getStoreByIdRepository = async (id) => {

    return StoreModel
        .findById(id)
        .populate(
            'owner',
            'firstName lastName email role'
        )
        .lean();
};

export const updateStoreRepository = async (id, data) => {

    return StoreModel
        .findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )
        .populate(
            'owner',
            'firstName lastName email role'
        );
};

export const deleteStoreRepository = async (id) => {
    return await StoreModel.findByIdAndDelete(id);
};
