import mysql from 'mysql2/promise';

import logger from './utils/logger';



// הגדרות בסיסיות לחיבור למסד הנתונים
const pool = mysql.createPool({

  host: process.env.DB_HOST || 'db',

  user: process.env.DB_USER || 'root',

  password: process.env.DB_PASSWORD || 'rootpassword',

  database: process.env.DB_NAME || 'vacation_db',

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0,

  enableKeepAlive: true,

  keepAliveInitialDelay: 0,

  connectTimeout: 60000,

  multipleStatements: true,

  dateStrings: true

});

// הוספת לוג לבדיקת הגדרות החיבור
logger.info('Database connection settings:', {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'vacation_db'
});





// פונקציה לבדיקת חיבור למסד הנתונים עם ניסיונות חוזרים
const testConnection = async (retries = 5, delay = 5000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const connection = await pool.getConnection();
            logger.info(`Successfully connected to the database (attempt ${attempt}/${retries})`);
            
            // בדיקת הרשאות בסיסית
            await connection.query('SELECT 1');
            logger.info('Database permissions verified successfully');
            
            connection.release();
            return true;
        } catch (error) {
            logger.error(`Database connection attempt ${attempt}/${retries} failed:`, error);
            
            if (attempt === retries) {
                logger.error('Max retry attempts reached');
                throw error;
            }
            
            logger.info(`Waiting ${delay/1000} seconds before next attempt...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    return false;
};

// פונקציה ליצירת טבלאות אם לא קיימות
const initializeDatabase = async () => {
    try {
        const connection = await pool.getConnection();
        logger.info('Running database initialization...');
        
        // יצירת הטבלאות הבסיסיות
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin') DEFAULT 'user'
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

            CREATE TABLE IF NOT EXISTS vacations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                description TEXT NOT NULL,
                destination VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                startDate DATE NOT NULL,
                endDate DATE NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                followersCount INT DEFAULT 0
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

            CREATE TABLE IF NOT EXISTS followers (
                userId INT NOT NULL,
                vacationId INT NOT NULL,
                PRIMARY KEY (userId, vacationId),
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (vacationId) REFERENCES vacations(id) ON DELETE CASCADE
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);
        
        connection.release();
        logger.info('Database initialization completed successfully');
    } catch (error) {
        logger.error('Failed to initialize database:', error);
        throw error;
    }
};

export { testConnection, initializeDatabase };
export default pool;
