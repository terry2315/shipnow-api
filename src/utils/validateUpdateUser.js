import expressions from "./expressions.js";

export const validateUpdateUser = (data = {}) => {

    const errors = {};

    const { firstName, lastName } = data;

    if (firstName !== undefined && !expressions.firstName.test(firstName)) {
        errors = 'El nombre tiene que ser de 4 a 16 caracteres de tipo letras';
    }

    if (lastName !== undefined && !expressions.lastName.test(lastName)) {
        errors = 'El apellido tiene que ser de 4 a 16 caracteres de tipo letras';
    }

    return errors;

};