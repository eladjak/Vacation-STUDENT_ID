import { db } from '../db';
import bcryptjs from 'bcryptjs';
import logger from '../utils/logger';

const SALT_ROUNDS = 10;

async function resetDb() {
    try {
        // מחיקת משתמשים קיימים
        await db.query('DELETE FROM users');
        logger.info('נמחקו כל המשתמשים הקיימים');

        // יצירת סיסמה מוצפנת למשתמש admin
        const adminPassword = await bcryptjs.hash('admin123', SALT_ROUNDS);
        
        // יצירת משתמש admin חדש
        await db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            ['admin', adminPassword, 'admin']
        );
        logger.info('נוצר משתמש admin חדש');

        // יצירת סיסמה מוצפנת למשתמש רגיל
        const userPassword = await bcryptjs.hash('user123', SALT_ROUNDS);
        
        // יצירת משתמש רגיל חדש
        await db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            ['user', userPassword, 'user']
        );
        logger.info('נוצר משתמש רגיל חדש');

        logger.info('איפוס מסד הנתונים הושלם בהצלחה');
        process.exit(0);
    } catch (error) {
        logger.error('שגיאה באיפוס מסד הנתונים:', error);
        process.exit(1);
    }
}

resetDb(); 