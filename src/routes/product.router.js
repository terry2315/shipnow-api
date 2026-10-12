import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';

const router = Router();

router.post('/', asyncHandler(createProduct));

router.get('/', asyncHandler(getAllProducts));

router.get('/:pid', asyncHandler(getProductById));

router.patch('/:pid', asyncHandler(updateProduct));

router.delete('/:pid', asyncHandler(deleteProduct));

export default router;