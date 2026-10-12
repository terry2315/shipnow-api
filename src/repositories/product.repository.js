import ProductModel from '../models/product.model.js';

export const createProductRepository = async (data) => {
    return await ProductModel.create(data);
};

export const getAllProductsRepository = async () => {
    return ProductModel
        .find()
        .sort({ createdAt: -1 })
        .lean();
};

export const getProductByIdRepository = async (id) => {
    return ProductModel
        .findById(id)
        .lean();
};

export const updateProductRepository = async (id, data) => {

    return ProductModel.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );

};

export const deleteProductRepository = async (id) => {
    return await ProductModel.findByIdAndDelete(id);
};