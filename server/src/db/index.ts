import mysql from 'mysql2/promise';
import logger from '../utils/logger';

// הגדרת Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'vacation_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// בדיקת חיבור למסד הנתונים עם ניסיונות חוזרים
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

export const testConnection = async (retries = MAX_RETRIES): Promise<void> => {
    try {
        const connection = await pool.getConnection();
        logger.info('Successfully connected to database');
        connection.release();
    } catch (error) {
        if (retries > 0) {
            logger.warn(`Failed to connect to database. Retrying in ${RETRY_DELAY/1000} seconds... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return testConnection(retries - 1);
        }
        logger.error('Failed to connect to database after all retries');
        throw error;
    }
};

export default pool;
