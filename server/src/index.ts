import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import authRoutes from './routes/auth';
import vacationRoutes from './routes/vacations';
import healthRoutes from './routes/health';
import { db } from './db';
import logger from './utils/logger';

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vacations', vacationRoutes);
app.use('/api/health', healthRoutes);

// Error handling - using underscore for unused parameters
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Server error:', err);
  res.status(500).json({ message: 'שגיאת שרת פנימית' });
});

// בדיקת חיבור למסד הנתונים והפעלת השרת
const startServer = async () => {
  try {
    // בדיקת חיבור למסד הנתונים
    await db.query('SELECT 1');
    logger.info('Database connection successful');

    // הפעלת השרת
    app.listen(config.server.port, () => {
      logger.info(`Server is running on port ${config.server.port}`);
      logger.info(`Environment: ${config.server.nodeEnv}`);
      logger.info(`Client URL: ${config.server.clientUrl}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
