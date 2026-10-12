export const validateUpdateProduct = (data = {}) => {

    const errors = {};

    const allowedFields = [
        'name',
        'description',
        'price',
        'stock'
    ];

    if (Object.keys(data).length === 0) {
        errors.body = 'Debe proporcionar al menos un campo para actualizar';

        return errors;
    }

    const invalidFields = Object.keys(data).filter((field) =>
        !allowedFields.includes(field)
    );


    if (invalidFields.length > 0) {
        errors.invalidFields = `Campos no permitidos: ${invalidFields.join(', ')}`;
    }

    const {
        name,
        description,
        price,
        stock
    } = data;

    if (name !== undefined) {

        if (typeof name !== 'string' || name.trim() === '') {
            errors.name = 'El nombre no puede estar vacío';
        } else if (name.trim().length < 2 || name.trim().length > 100) {
            errors.name = 'El nombre debe contener entre 2 y 100 caracteres';
        }
    }

    if (description !== undefined) {

        if (typeof description !== 'string') {
            errors.description = 'La descripción debe ser un texto válido';
        }
    }

    if (price !== undefined) {

        if (
            typeof price !== 'number' ||
            !Number.isFinite(price) ||
            price < 0
        ) {
            errors.price = 'El precio debe ser un número mayor o igual a 0';
        }
    }

    if (stock !== undefined) {

        if (!Number.isInteger(stock) || stock < 0) {
            errors.stock = 'El stock debe ser un número entero mayor o igual a 0';
        }
    }

    return errors;
};