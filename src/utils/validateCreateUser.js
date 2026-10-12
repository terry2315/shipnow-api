import expressions from "./expressions.js";

const requiredFields = (data = {}) => {

    const requiredData = [
        'firstName',
        'lastName',
        'email',
        'password'
    ];



    return requiredData.filter((field) => {

        const value = data[field];

        return (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim() === '')
        );
    });
};

export const validateCreateUser = (data = {}) => {

    const errors = {};

    const missingFields = requiredFields(data);

    missingFields.forEach((field) => {
        errors[field] = `El campo ${field} es obligatorio`;
    });

    const {
        firstName,
        lastName,
        email,
        password
    } = data;

    if (
        !errors.firstName &&
        !expressions.firstName.test(firstName)
    ) {
        errors.firstName =
            'El nombre tiene que ser de 4 a 16 caracteres de tipo letras';
    }

    if (
        !errors.lastName &&
        !expressions.lastName.test(lastName)
    ) {
        errors.lastName =
            'El apellido tiene que ser de 4 a 16 caracteres de tipo letras';
    }

    if (
        !errors.email &&
        !expressions.email.test(email)
    ) {
        errors.email =
            'El correo no es válido';
    }

    if (
        !errors.password &&
        !expressions.password.test(password)
    ) {
        errors.password =
            'La contraseña debe tener entre 4 y 12 caracteres';
    }

    return errors;
};