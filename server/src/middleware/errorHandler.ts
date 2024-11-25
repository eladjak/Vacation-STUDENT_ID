import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface CustomError extends Error {
    status?: number;
    code?: string;
}

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    // Log error details
    logger.error('Error details:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        code: err.code
    });

    // Handle specific error types
    if (err.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ 
            message: 'רשומה כפולה במסד הנתונים',
            error: err.message 
        });
        return;
    }

    // Default error response
    const statusCode = err.status || 500;
    res.status(statusCode).json({ 
        message: 'שגיאת שרת פנימית',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
    return;
};
