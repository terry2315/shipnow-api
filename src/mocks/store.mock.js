import { faker } from '@faker-js/faker';

export const generateMockStore = ({ ownerId }) => {

    return {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        owner: ownerId,
        isActive: true
    };
};

export const generateMockStores = ({
    quantity = 1,
    ownerIds = []
}) => {

    return Array.from({ length: quantity }, () => {
        const ownerId = faker.helpers.arrayElement(ownerIds);

        return generateMockStore({ ownerId });
    });

};  