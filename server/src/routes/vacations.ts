import express from 'express';
import * as vacationController from '../controllers/vacationController';

const router = express.Router();

router.get('/', vacationController.getAllVacations);
router.post('/', vacationController.createVacation);
router.put('/:id', vacationController.updateVacation);
router.delete('/:id', vacationController.deleteVacation);

export default router;
