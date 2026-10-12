export const validateUpdateStore = (data = {}) => {

    const errors = {};

    const allowedFields = ['name', 'address', 'owner', 'isActive'];

    if (Object.keys(data).length === 0) {
        errors.body = 'Debes proporcionar al menos un campo para actualizar';

        return errors;
    }

    const invalidFields = Object.keys(data).filter((field) => !allowedFields.includes(field));
    
    if (invalidFields.length > 0) {
        errors.invalidFields = `Campos no permitidos: ${invalidFields.join(', ')}`;
    }

    const { name, address, owner, isActive } = data;

    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === '') {
            errors.name = 'El nombre no puede estar vacío';
        } else if (name.trim().length < 2 || name.trim().length > 100) {
            errors.name = 'El nombre debe contener entre 2 y 100 caracteres';
        }
    }

    if (address !== undefined) {
        if (typeof address !== 'string' || address.trim() === '') {
            errors.address = 'La dirección no puede estar vacía';
        } else if (address.trim().length < 5) {
            errors.address = 'La dirección debe contener al menos 5 caracteres';
        }
    }

    if (owner !== undefined && (typeof owner !== 'string' || owner.trim() === '')) {
        errors.owner = 'El identificador del propietario no es válido';
    }

    if (isActive !== undefined && typeof isActive !== 'boolean') {
        errors.isActive = 'isActive debe ser un valor booleano';
    }

    return errors;
};
