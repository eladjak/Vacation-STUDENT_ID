import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.isAuthenticated()) {
        logger.warn('Unauthorized access attempt');
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    next();
};
