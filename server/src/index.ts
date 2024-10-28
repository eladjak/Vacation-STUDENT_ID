import express, { Request, Response } from 'express';
import cors from 'cors';
import vacationRoutes from './routes/vacations';
import authRoutes from './routes/auth';
import { authenticateToken } from './middleware/auth';
import { testConnection } from './db';
import logger from './utils/logger';
import { createDefaultUsers } from './controllers/authController';
import app from './app';  // שינוי מ-import { app }
import pool from './db';
import { Server } from 'http';

const PORT = process.env.PORT || 3005;
let server: Server;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vacations', authenticateToken, vacationRoutes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    logger.info('Health check request received');
    res.status(200).json({ status: 'OK' });
});

// Graceful shutdown handler
const gracefulShutdown = () => {
    logger.info('Received shutdown signal. Starting graceful shutdown...');
    
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            
            pool.end().then(() => {
                logger.info('Database connection closed');
                process.exit(0);
            }).catch(err => {
                logger.error('Error closing database connection:', err);
                process.exit(1);
            });
        });
    } else {
        process.exit(0);
    }
};

// Start server
const startServer = async () => {
    try {
        await testConnection();
        await createDefaultUsers();
        
        server = app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
        
        // Graceful shutdown handlers
        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);
        
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;
