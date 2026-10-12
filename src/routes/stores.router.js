import { Router } from "express";
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  createStore,
  getAllStores,
  getStoreById,
  updatedStore,
  deleteStore,
} from '../controllers/store.controller.js';

const router = Router();

router.post('/', asyncHandler(createStore));

router.get('/', asyncHandler(getAllStores));

router.get('/:sid', asyncHandler(getStoreById));

router.patch('/:sid', asyncHandler(updatedStore));

router.delete('/:sid', asyncHandler(deleteStore));

export default router;
