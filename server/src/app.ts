import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import passport from 'passport';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { loginLimiter } from './middleware/rateLimiter';
import logger from './utils/logger';
import authRoutes from './routes/authRoutes';
import vacationRoutes from './routes/vacationRoutes';

const app = express();

// Redis client setup
const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => logger.error('Redis Client Error:', err));
redisClient.on('connect', () => logger.info('Connected to Redis successfully'));

redisClient.connect().catch(console.error);

// Session store setup
const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'vacation:'
});

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'http://localhost:3003' : '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    store: redisStore,
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/vacations', vacationRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Error handling
app.use(errorHandler);

export default app;
