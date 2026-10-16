import { ROLES } from '../constants/roles.constants.js';
import { generateMockUser } from '../mocks/user.mock.js';

export const generateMockCourier = () => {
    return generateMockUser(ROLES.COURIER);
};

export const generateMockCouriers = (quantity = 1) => {
    return Array.from(
        { length: quantity },
        () => generateMockCourier()
    );
}

