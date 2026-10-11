import { Router } from "express";
import { asyncHandler } from '../utils/asyncHandler.js';

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

const router = Router();

router.post('/', asyncHandler(createUser));

router.get('/', asyncHandler(getAllUsers));

router.get('/:uid', asyncHandler(getUserById));

router.patch('/:uid', asyncHandler(updateUser));

router.delete('/:uid', asyncHandler(deleteUser));

export default router;
