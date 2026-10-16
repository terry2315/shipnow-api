import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';

import {
    getMockUsers,
    getMockCouriers,
    getMockOrders,
    getMockDeliveries,
    seedMocks
} from '../controllers/mock.controller.js';

const router = Router();

router.get('/users', asyncHandler(getMockUsers));

router.get('/couriers', asyncHandler(getMockCouriers));

router.get('/orders', asyncHandler(getMockOrders));

router.get('/deliveries', asyncHandler(getMockDeliveries));

router.post('/seed', asyncHandler(seedMocks));


export default router;