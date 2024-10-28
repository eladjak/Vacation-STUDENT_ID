import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface AppError extends Error {
    status?: number;
}

export const errorHandler = (
    err: AppError, 
    _req: Request, 
    res: Response, 
    _next: NextFunction
): void => {
    logger.error('Error:', err);
    
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(status).json({ error: message });
};

export default errorHandler;
