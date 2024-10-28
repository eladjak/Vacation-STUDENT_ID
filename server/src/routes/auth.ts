import express from 'express';
import { login } from '../controllers/authController';
import logger from '../utils/logger';

const router = express.Router();

router.post('/login', login);

router.get('/check-users', async (_req, res) => {
    try {
        res.json({ message: 'Users check endpoint' });
    } catch (error) {
        logger.error('Error checking users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
