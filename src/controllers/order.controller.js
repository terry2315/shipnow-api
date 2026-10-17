import {
    createOrderService,
    getAllOrdersService,
    getOrderByIdService,
    updateOrderService,
    deleteOrderService
} from '../services/order.service.js';


export const createOrder = async (req, res) => {

    const data = req.body;

    const newOrder = await createOrderService(data);

    return res.status(201).json({
        status: 'success',
        message: 'Pedido creado exitosamente',
        payload: newOrder
    });
};

export const getAllOrders = async (req, res) => {

    const orders = await getAllOrdersService();

    return res.status(200).json({
        status: 'success',
        payload: orders
    });
};

export const getOrderById = async (req, res) => {

    const { oid } = req.params;

    const order = await getOrderByIdService(oid);

    return res.status(200).json({
        status: 'success',
        payload: order
    });
};

export const updateOrder = async (req, res) => {

    const { oid } = req.params;
    const data = req.body;

    const updatedOrder = await updateOrderService(
        oid,
        data
    );

    return res.status(200).json({
        status: 'success',
        message: 'Pedido actualizado exitosamente',
        payload: updatedOrder
    });
};

export const deleteOrder = async (req, res) => {

    const { oid } = req.params;

    const deletedOrder = await deleteOrderService(oid);

    return res.status(200).json({
        status: 'success',
        message: 'Pedido eliminado exitosamente',
        payload: deletedOrder
    });
};