import express from 'express';
import { vacationController } from '../controllers/vacationController';
import { isAuthenticated } from '../middleware/auth';

const router = express.Router();

// הוספת middleware אימות לכל הנתיבים
router.use(isAuthenticated);

// קבלת כל החופשות
router.get('/', vacationController.getVacations);

// הוספת חופשה חדשה
router.post('/', vacationController.addVacation);

// עדכון חופשה
router.put('/:id', vacationController.updateVacation);

// מחיקת חופשה
router.delete('/:id', vacationController.deleteVacation);

// מעקב אחר חופשה
router.post('/:vacationId/follow', vacationController.followVacation);

// ביטול מעקב אחר חופשה
router.delete('/:vacationId/follow', vacationController.unfollowVacation);

export default router;
