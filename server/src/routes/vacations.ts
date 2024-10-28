import express from 'express';

import { getVacations, getVacationById } from '../controllers/vacationController';

const router = express.Router();

router.get('/', getVacations);
router.get('/:id', getVacationById);

export default router;
