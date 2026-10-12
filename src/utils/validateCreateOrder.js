import { ORDER_PRIORITY } from '../constants/order.constants.js';

const requiredFields = (data = {}) => {

    const requiredData = ['customer', 'store', 'items', 'deliveryAddress'];

    return requiredData.filter((field) => {
        const value = data[field];

        return value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '');
    });
};

export const validateCreateOrder = (data = {}) => {
    const errors = {};

    const allowedFields = ['customer', 'store', 'items', 'deliveryAddress', 'priority'];

    const invalidFields = Object.keys(data).filter((field) => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
        errors.invalidFields = `Campos no permitidos: ${invalidFields.join(', ')}`;
    }

    const missingFields = requiredFields(data);
    missingFields.forEach((field) => { errors[field] = `El campo ${field} es obligatorio`; });

    const { customer, store, items, deliveryAddress, priority } = data;

    if (!errors.customer && (typeof customer !== 'string' || customer.trim() === '')) {
        errors.customer = 'El identificador del customer no es válido';
    }

    if (!errors.store && (typeof store !== 'string' || store.trim() === '')) {
        errors.store = 'El identificador de la tienda no es válido';
    }

    if (!errors.deliveryAddress && (typeof deliveryAddress !== 'string' || deliveryAddress.trim().length < 5)) {
        errors.deliveryAddress = 'La dirección de entrega debe contener al menos 5 caracteres';
    }

    if (!errors.items && !Array.isArray(items)) {
        errors.items = 'Los items deben enviarse en un array';
    }

    if (!errors.items && Array.isArray(items) && items.length === 0) {
        errors.items = 'El pedido debe contener al menos un item';
    }

    if (!errors.items && Array.isArray(items)) {
        const itemErrors = {};

        items.forEach((item, index) => {
            const errorsForItem = {};

            if (!item || typeof item !== 'object' || Array.isArray(item)) {
                itemErrors[index] = 'El item debe ser un objeto válido';
                return;
            }

            if (typeof item.name !== 'string' || item.name.trim() === '') {
                errorsForItem.name = 'El nombre del producto es obligatorio';
            }

            if (!Number.isInteger(item.quantity) || item.quantity < 1) {
                errorsForItem.quantity = 'La cantidad debe ser un número entero mayor o igual a 1';
            }

            if (typeof item.price !== 'number' || !Number.isFinite(item.price) || item.price < 0) {
                errorsForItem.price = 'El precio debe ser un número mayor o igual a 0';
            }

            if (Object.keys(errorsForItem).length > 0) {
                itemErrors[index] = errorsForItem;
            }
        });

        if (Object.keys(itemErrors).length > 0) {
            errors.items = itemErrors;
        }
    }

    if (priority !== undefined && !Object.values(ORDER_PRIORITY).includes(priority)) {
        errors.priority = `La prioridad debe ser uno de estos valores: ${Object.values(ORDER_PRIORITY).join(', ')}`;
    }

    return errors;
};
