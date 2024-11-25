import { db } from '../db';
import bcryptjs from 'bcryptjs';
import logger from '../utils/logger';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
    id: number;
    username: string;
    password: string;
    role: string;
}

async function testConnection() {
    try {
        // בדיקת חיבור בסיסית
        logger.info('בודק חיבור למסד הנתונים...');
        const [result] = await db.query('SELECT 1');
        logger.info('חיבור למסד הנתונים תקין', result);

        // בדיקת טבלת משתמשים
        logger.info('בודק טבלת משתמשים...');
        const [users] = await db.query<UserRow[]>('SELECT * FROM users');
        logger.info('נמצאו משתמשים:', users.map(u => ({ id: u.id, username: u.username, role: u.role })));

        // בדיקת התחברות עם admin
        logger.info('בודק התחברות משתמש admin...');
        const [adminUser] = await db.query<UserRow[]>('SELECT * FROM users WHERE username = ?', ['admin']);
        if (adminUser[0]) {
            const isValidPassword = await bcryptjs.compare('admin123', adminUser[0].password);
            logger.info('בדיקת סיסמת admin:', { 
                isValid: isValidPassword,
                storedHash: adminUser[0].password
            });
        }

        logger.info('כל הבדיקות הושלמו בהצלחה');
        process.exit(0);
    } catch (error) {
        logger.error('שגיאה בבדיקת החיבור:', error);
        process.exit(1);
    }
}

testConnection(); 