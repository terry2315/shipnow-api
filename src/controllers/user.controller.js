import {
    createUserService,
    getAllUsersServices,
    getUserByIdService,
    updateUserService,
    deleteUserService,
} from '../services/user.service.js';

export const createUser = async (req, res) => {

    const data = req.body;

    const user = await createUserService(data);

    return res.status(201).json({
        status: 'success',
        message: 'Usuario creado exitosamente',
        payload: user
    });

};

export const getAllUsers = async (req, res) => {

    const {
        page = 1,
        limit = 10
    } = req.query;

    const users = await getAllUsersServices(
        Number(page),
        Number(limit)
    );

    return res.status(200).json({
        status: 'success',
        payload: users
    });

};

export const getUserById = async (req, res) => {

    const { uid } = req.params;

    const userId = await getUserByIdService(uid);

    return res.status(200).json({
        status: 'success',
        payload: userId
    });

};

export const updateUser = async (req, res) => {

    const { uid } = req.params;
    const data = req.body;

    const dataUser = await updateUserService(uid, data);

    return res.status(200).json({
        status: 'success',
        message: 'Usuario actualizado con exito',
        payload: dataUser
    });

};

export const deleteUser = async (req, res) => {

    const { uid } = req.params;

    const user = await deleteUserService(uid);

    return res.status(200).json({
        status: 'success',
        message: 'Usuario eliminado exitosamenete',
        payload: user
    });
}