import { Request, Response } from 'express';
import { vacationService } from '../services/vacationService';
import logger from '../utils/logger';

export const vacationController = {
    // קבלת כל החופשות
    async getVacations(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;
            const vacations = await vacationService.getAllVacations(userId);
            res.json(vacations);
        } catch (error) {
            logger.error('Error in getVacations:', error);
            res.status(500).json({ message: 'שגיאה בטעינת החופשות' });
        }
    },

    // הוספת חופשה חדשה
    async addVacation(req: Request, res: Response): Promise<void> {
        try {
            const newVacationId = await vacationService.addVacation(req.body);
            res.status(201).json({ id: newVacationId });
        } catch (error) {
            logger.error('Error in addVacation:', error);
            res.status(500).json({ message: 'שגיאה בהוספת החופשה' });
        }
    },

    // מדכון חופשה
    async updateVacation(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await vacationService.updateVacation(parseInt(id), req.body);
            res.json({ message: 'החופשה עודכנה בהצלחה' });
        } catch (error) {
            logger.error('Error in updateVacation:', error);
            res.status(500).json({ message: 'שגיאה בעדכון החופשה' });
        }
    },

    // מחיקת חופשה
    async deleteVacation(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await vacationService.deleteVacation(parseInt(id));
            res.json({ message: 'החופשה נמחקה בהצלחה' });
        } catch (error) {
            logger.error('Error in deleteVacation:', error);
            res.status(500).json({ message: 'שגיאה במחיקת החופשה' });
        }
    },

    // מעקב אחר חופשה
    async followVacation(req: Request, res: Response): Promise<void> {
        try {
            const { vacationId } = req.params;
            const userId = req.user?.id;
            
            if (!userId) {
                res.status(401).json({ message: 'משתמש לא מחובר' });
                return;
            }

            await vacationService.followVacation(userId, parseInt(vacationId));
            res.json({ message: 'המעקב נוסף בהצלחה' });
        } catch (error) {
            logger.error('Error in followVacation:', error);
            res.status(500).json({ message: 'שגיאה בהוספת מעקב' });
        }
    },

    // ביטול מעקב אחר חופשה
    async unfollowVacation(req: Request, res: Response): Promise<void> {
        try {
            const { vacationId } = req.params;
            const userId = req.user?.id;
            
            if (!userId) {
                res.status(401).json({ message: 'משתמש לא מחובר' });
                return;
            }

            await vacationService.unfollowVacation(userId, parseInt(vacationId));
            res.json({ message: 'המעקב הוסר בהצלחה' });
        } catch (error) {
            logger.error('Error in unfollowVacation:', error);
            res.status(500).json({ message: 'שגיאה בהסרת מעקב' });
        }
    }
};
