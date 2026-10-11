import UserModel from '../models/user.model.js';

export const createUserRepository = async (data) => {
    return UserModel.create(data);
};

export const getUserByEmailRepository = async (email) => {
    return await UserModel
        .findOne({ email })
        .select('-password')
        .lean();
}

export const getAllUsersRepository = async (page = 1, limit = 10) => {

    const skip = (page - 1) * limit;

    return UserModel
        .find()
        .select('-password')
        .lean()
        .skip(skip)
        .limit(limit);
};

export const getUserByIdRepository = async (id) => {
    return await UserModel
        .findById(id)
        .select('-password')
        .lean();
};

export const updateUserRepository = async (id, data) => {

    return UserModel.findOneAndUpdate(
        { _id: id },
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteUserRepository = async (id) => {
    return UserModel
        .findByIdAndDelete(id)
        .select('-password');
};
