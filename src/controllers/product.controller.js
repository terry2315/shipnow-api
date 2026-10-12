import {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
} from '../services/product.service.js';

export const createProduct = async (req, res) => {

    const data = req.body;

    const newProduct = await createProductService(data);

    return res.status(201).json({
        status: 'success',
        message: 'Producto creado exitosamente',
        payload: newProduct
    });

};

export const getAllProducts = async (req, res) => {

    const products = await getAllProductsService();

    return res.status(200).json({
        status: 'success',
        payload: products
    });

};

export const getProductById = async (req, res) => {

    const { pid } = req.params;

    const product = await getProductByIdService(pid);

    return res.status(200).json({
        status: 'success',
        payload: product
    });

};

export const updateProduct = async (req, res) => {

    const { pid } = req.params;
    const data = req.body;

    const updateProduct = await updateProductService(pid, data);

    return res.status(200).json({
        status: 'success',
        message: 'Producto actualizado exitosamente',
        payload: updateProduct
    });

};

export const deleteProduct = async (req, res) => {

    const { pid } = req.params;

    const product = await deleteProductService(pid);

    return res.status(200).json({
        status: 'success',
        message: 'Psoducto eliminado con exito',
        payload: product
    });

};