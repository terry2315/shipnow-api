import {
    createStoreService,
    getAllStoresService,
    getStoreByIdService,
    updateStoreService,
    deleteStoreService
} from '../services/store.service.js';

export const createStore = async (req, res) => {

    const store = req.body;

    const newStore = await createStoreService(store);

    return res.status(201).json({
        status: 'success',
        message: 'Tienda creada exitosamente',
        payload: newStore
    });

};

export const getAllStores = async (req, res) => {

    const stores = await getAllStoresService();

    return res.status(200).json({
        status: 'success',
        payload: stores
    });

};

export const getStoreById = async (req, res) => {

    const { sid } = req.params;

    const store = await getStoreByIdService(sid);

    return res.status(200).json({
        status: 'success',
        payload: store
    });

};

export const updatedStore = async (req, res) => {

    const { sid } = req.params;
    const data = req.body;

    const updateStore = await updateStoreService(sid, data);

    return res.status(200).json({
        status: 'success',
        message: 'Tienda actualizada exitosamente',
        payload: updateStore
    });

};

export const deleteStore = async (req, res) => {

    const { sid } = req.params;

    const store = await deleteStoreService(sid);

    return res.status(200).json({
        status: 'success',
        message: 'Tienda eliminada exitosamente',
        payload: store
    });

};