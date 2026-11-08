import { Router } from "express";
import { asyncHandler } from '../utils/asyncHandler.js';

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

import { uploadUserDocument } from '../middlewares/uploads.middleware.js';
import { uploadUserDocumentController } from '../controllers/upload.controller.js';

const router = Router();

router.post('/', asyncHandler(createUser));

router.get('/', asyncHandler(getAllUsers));

router.get('/:uid', asyncHandler(getUserById));

router.patch('/:uid', asyncHandler(updateUser));

router.delete('/:uid', asyncHandler(deleteUser));

router.post('/:uid/documents', uploadUserDocument, asyncHandler(uploadUserDocumentController));

export default router;
