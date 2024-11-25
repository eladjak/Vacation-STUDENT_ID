import { Router } from 'express';
import authRoutes from './auth';
import vacationRoutes from './vacations';

const router = Router();

router.use('/auth', authRoutes);
router.use('/vacations', vacationRoutes);

export default router; 