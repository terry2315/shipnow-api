const requiredFields = (data = {}) => {

    const requiredData = [
        'name',
        'description',
        'price',
        'stock'
    ];

    return requiredData.filter((field) => {

        const value = data[field];

        return (
            value === undefined ||
            value === null ||
            (
                typeof value === 'string' &&
                value.trim() === ''
            )
        );
    });
};

export const validateCreateProduct = (data = {}) => {

    const errors = {};

    const missingFields = requiredFields(data);

    missingFields.forEach((field) => {
        errors[field] = `El campo ${field} es obligatorio`;
    });

    const {
        name,
        description,
        price,
        stock
    } = data;

    if (
        !errors.name &&
        (
            typeof name !== 'string' ||
            name.trim().length < 2 ||
            name.trim().length > 100
        )
    ) {
        errors.name = 'El nombre debe contener entre 2 y 100 caracteres';
    }

    if (
        !errors.description &&
        typeof description !== 'string'
    ) {
        errors.description = 'La descripción debe ser un texto válido';
    }

    if (
        !errors.price &&
        (
            typeof price !== 'number' ||
            !Number.isFinite(price) ||
            price < 0
        )
    ) {
        errors.price = 'El precio debe ser un número mayor o igual a 0';
    }

    if (
        !errors.stock &&
        (
            !Number.isInteger(stock) ||
            stock < 0
        )
    ) {
        errors.stock = 'El stock debe ser un número entero mayor o igual a 0';
    }

    return errors;
};