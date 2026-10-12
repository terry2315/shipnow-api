export const buildUpdateProduct = (data = {}) => {

    const updateData = {};

    if (data.name !== undefined) {
        updateData.name = data.name.trim();
    }

    if (data.description !== undefined) {
        updateData.description = data.description.trim();
    }

    if (data.price !== undefined) {
        updateData.price = data.price;
    }

    if (data.stock !== undefined) {
        updateData.stock = data.stock;
    }

    return updateData;
};