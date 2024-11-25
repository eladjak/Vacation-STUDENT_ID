import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import logger from '../utils/logger';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                username: string;
                role: string;
            };
        }
    }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            logger.warn('Authentication failed: No token provided');
            res.status(401).json({ message: 'נדרשת התחברות' });
            return;
        }

        try {
            const decoded = jwt.verify(token, config.jwt.secret) as {
                id: number;
                username: string;
                role: string;
            };

            req.user = decoded;
            logger.debug('User authenticated:', { userId: decoded.id, role: decoded.role });
            next();
        } catch (jwtError) {
            logger.error('JWT verification failed:', jwtError);
            res.status(401).json({ message: 'טוקן לא תקין' });
            return;
        }
    } catch (error) {
        logger.error('Authentication error:', error);
        res.status(500).json({ message: 'שגיאת שרת בתהליך האימות' });
        return;
    }
};
