import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/order.controller.js';

import { uploadOrderProof } from '../middlewares/uploads.middleware.js';
import { uploadOrderProofController } from '../controllers/upload.controller.js';

const router = Router();

router.post('/', asyncHandler(createOrder));

router.get('/', asyncHandler(getAllOrders));

router.get('/:oid', asyncHandler(getOrderById));

router.patch('/:oid', asyncHandler(updateOrder));

router.delete('/:oid', asyncHandler(deleteOrder));

router.post('/:oid/proofs', uploadOrderProof, asyncHandler(uploadOrderProofController));

export default router;
