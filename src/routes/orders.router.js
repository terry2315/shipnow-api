import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/order.controller.js';

const router = Router();

router.post('/', asyncHandler(createOrder));

router.get('/', asyncHandler(getAllOrders));

router.get('/:oid', asyncHandler(getOrderById));

router.patch('/:oid', asyncHandler(updateOrder));

router.delete('/:oid', asyncHandler(deleteOrder));

export default router;
