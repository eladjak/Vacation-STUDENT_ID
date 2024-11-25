import mysql from 'mysql2/promise';
import winston from 'winston';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'vacation_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        winston.info('Successfully connected to MySQL database');
        connection.release();
    } catch (error) {
        winston.error('Error connecting to MySQL:', error);
        throw error;
    }
};

export default pool;
