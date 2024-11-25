import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    try {
        if (!req.user) {
            logger.warn('Unauthorized access attempt: No user found');
            res.status(401).json({ message: 'נדרשת התחברות' });
            return;
        }

        if (req.user.role !== 'admin') {
            logger.warn(`Access denied for user ${req.user.id}: Not an admin`);
            res.status(403).json({ message: 'גישה למנהלים בלבד' });
            return;
        }

        logger.info(`Admin access granted for user ${req.user.id}`);
        next();
        return;
    } catch (error) {
        logger.error('Error in isAdmin middleware:', error);
        res.status(500).json({ message: 'שגיאת שרת' });
        return;
    }
};
