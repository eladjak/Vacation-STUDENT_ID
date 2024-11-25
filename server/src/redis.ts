import { createClient } from 'redis';
import logger from './utils/logger';
import { config } from './config';

export let redisClient: ReturnType<typeof createClient> | null = null;

export const initRedis = async () => {
    try {
        redisClient = createClient({
            url: `redis://${config.redis.host}:${config.redis.port}`
        });

        redisClient.on('error', (error) => {
            logger.error('Redis Client Error:', error);
        });

        redisClient.on('connect', () => {
            logger.info('Connected to Redis successfully');
        });

        await redisClient.connect();
        
        return redisClient;
    } catch (error) {
        logger.error('Redis connection error:', error);
        return null;
    }
};

export const getRedisClient = () => {
    if (!redisClient) {
        throw new Error('Redis client not initialized');
    }
    return redisClient;
};
