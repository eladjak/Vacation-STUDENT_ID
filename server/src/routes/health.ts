import express from 'express';
import { db } from '../db';
import logger from '../utils/logger';

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        // בדיקת חיבור למסד הנתונים
        await db.query('SELECT 1');
        
        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            database: 'connected'
        });
    } catch (error) {
        logger.error('Health check failed:', error);
        res.status(500).json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router; 