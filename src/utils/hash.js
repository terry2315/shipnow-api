import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const passwordHash = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export const passwordCompare = async (password, passwordDB) => {
    return await bcrypt.compare(password, passwordDB);
};