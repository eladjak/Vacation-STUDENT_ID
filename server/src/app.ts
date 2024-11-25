import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import vacationRoutes from './routes/vacationRoutes';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';
import { config } from './config';
import healthRoutes from './routes/health';

const app = express();

// Middleware
app.use(cors({
    origin: config.server.clientUrl,
    credentials: true
}));

app.use(express.json());

// Logging middleware
app.use((req, _, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});

// Health check - basic endpoint
app.get('/health', (_, res) => {
    res.status(200).json({ status: 'OK' });
});

// Routes
app.use('/api/health', healthRoutes); // נתיב מורחב לבדיקת בריאות
app.use('/api/auth', authRoutes);
app.use('/api/vacations', vacationRoutes);

// 404 handler
app.use((_, res) => {
    logger.warn('Route not found');
    res.status(404).json({ message: 'הנתיב המבוקש לא נמצא' });
});

// Error handling
app.use(errorHandler);

export default app;
