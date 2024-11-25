import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import logger from '../utils/logger';

// הרחבת הטיפוס Request להכיל מידע על המשתמש
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                username: string;
                role: string;
            }
        }
    }
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            res.status(401).json({ message: 'לא נמצא טוקן אימות' });
            return;
        }

        const token = authHeader.split(' ')[1]; // Bearer TOKEN
        
        if (!token) {
            res.status(401).json({ message: 'לא נמצא טוקן אימות' });
            return;
        }

        try {
            const decoded = jwt.verify(token, config.jwt.secret) as {
                id: number;
                username: string;
                role: string;
            };

            // הוספת מידע המשתמש לאובייקט הבקשה
            req.user = decoded;
            next();
            return;
        } catch (jwtError) {
            logger.error('JWT verification failed:', jwtError);
            res.status(401).json({ message: 'טוקן לא תקין' });
            return;
        }
    } catch (error) {
        logger.error('Auth middleware error:', error);
        res.status(500).json({ message: 'שגיאת אימות' });
        return;
    }
};

// middleware לבדיקת הרשאות מנהל
export const adminMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (!req.user) {
        res.status(401).json({ message: 'נדרשת התחברות' });
        return;
    }

    if (req.user.role !== 'admin') {
        res.status(403).json({ message: 'אין הרשאות מתאימות' });
        return;
    }

    next();
    return;
}; 