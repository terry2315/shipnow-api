import { faker } from '@faker-js/faker';
import { ROLES } from '../constants/roles.constants.js';

export const generateMockUser = (role = ROLES.USER) => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const baseEmail = faker.internet.email({
        firstName,
        lastName
    }).toLowerCase();


    const [localPart, domain] = baseEmail.split('@');

    const uniqueSuffix = faker.string.alphanumeric(6).toLowerCase();

    const email = `${localPart}.${uniqueSuffix}@${domain}`;

    return {
        firstName,
        lastName,
        email,
        password: faker.internet.password({ length: 12 }),
        role,
        documents: []
    };

};

export const generateMockUsers = (quantity = 1) => {
    return Array.from({ length: quantity }, () => generateMockUser(ROLES.USER));
};