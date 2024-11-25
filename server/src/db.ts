import mysql from 'mysql2/promise';
import { config } from './config';
import logger from './utils/logger';

const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// בדיקת חיבור למסד הנתונים
pool.getConnection()
  .then(connection => {
    logger.info('Successfully connected to database');
    connection.release();
  })
  .catch(err => {
    logger.error('Database connection error:', err);
  });

export const db = pool;
