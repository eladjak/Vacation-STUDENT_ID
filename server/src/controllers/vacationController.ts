import { Request, Response } from 'express';
import pool from '../db';
import logger from '../utils/logger';

export const getVacations = async (_req: Request, res: Response): Promise<void> => {
    try {
        const [vacations] = await pool.query('SELECT * FROM vacations ORDER BY start_date');
        res.json(vacations);
    } catch (error) {
        logger.error('Error fetching vacations:', error);
        res.status(500).json({ message: 'שגיאה בטעינת החופשות' });
    }
};

export const getVacationById = async (req: Request, res: Response): Promise<void> => {
    try {
        const [vacation] = await pool.query('SELECT * FROM vacations WHERE id = ?', [req.params.id]);
        if (!vacation) {
            res.status(404).json({ message: 'החופשה לא נמצאה' });
            return;
        }
        res.json(vacation);
    } catch (error) {
        logger.error('Error fetching vacation:', error);
        res.status(500).json({ message: 'שגיאה בטעינת החופשה' });
    }
};

// יתר הפונקציות יתווספו בהמשך
