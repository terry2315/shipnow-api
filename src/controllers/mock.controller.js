import {
    getMockUsersService,
    getMockCouriersService,
    getMockOrdersService,
    getMockDeliveriesService,
    seedMocksService
} from '../services/mock.service.js';


export const getMockUsers = async (req, res) => {
    const { qty } = req.query;

    const users = await getMockUsersService(qty);

    return res.status(200).json({
        status: 'success',
        quantity: users.length,
        payload: users
    });
};


export const getMockCouriers = async (req, res) => {
    const { qty } = req.query;

    const couriers = await getMockCouriersService(qty);

    return res.status(200).json({
        status: 'success',
        quantity: couriers.length,
        payload: couriers
    });
};


export const getMockOrders = async (req, res) => {
    const { qty } = req.query;

    const orders = await getMockOrdersService(qty);

    return res.status(200).json({
        status: 'success',
        quantity: orders.length,
        payload: orders
    });
};


export const getMockDeliveries = async (req, res) => {
    const { qty } = req.query;

    const deliveries = await getMockDeliveriesService(qty);

    return res.status(200).json({
        status: 'success',
        quantity: deliveries.length,
        payload: deliveries
    });
};


export const seedMocks = async (req, res) => {
    const { qty } = req.query;

    const result = await seedMocksService(qty);

    return res.status(201).json({
        status: 'success',
        message: 'Datos de prueba insertados exitosamente',
        payload: result
    });
};