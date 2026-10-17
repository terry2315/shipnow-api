import { Router } from 'express';
import { testLogger } from '../controllers/logger.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(testLogger));


export default router;