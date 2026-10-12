const requiredFields = (data = {}) => {
    const requiredData = ['name', 'address', 'owner'];

    return requiredData.filter((field) => {
        const value = data[field];
        return value === undefined || value === null ||
            (typeof value === 'string' && value.trim() === '');
    });
};

export const validateCreateStore = (data = {}) => {
    const errors = {};
    const missingFields = requiredFields(data);

    missingFields.forEach((field) => {
        errors[field] = `El campo ${field} es obligatorio`;
    });

    const { name, address } = data;

    if (!errors.name && (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100)) {
        errors.name = 'El nombre debe contener entre 2 y 100 caracteres';
    }

    if (!errors.address && (typeof address !== 'string' || address.trim().length < 5)) {
        errors.address = 'La dirección debe contener al menos 5 caracteres';
    }

    return errors;
};
