import { db } from '../db';
import { hashPassword } from './auth';
import logger from './logger';
import { ResultSetHeader } from 'mysql2';

export const createDefaultUsers = async (): Promise<void> => {
    try {
        // מחיקת כל המשתמשים הקיימים
        await db.query('DELETE FROM users');
        logger.info('All existing users deleted');
        
        // יצירת משתמשים חדשים
        const defaultUsers = [
            { username: 'admin', password: 'admin123', role: 'admin' },
            { username: 'user', password: 'user123', role: 'user' }
        ];

        for (const user of defaultUsers) {
            const hashedPassword = await hashPassword(user.password);
            console.log(`Generated hash for ${user.username}:`, hashedPassword);
            
            const [result] = await db.query<ResultSetHeader>(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [user.username, hashedPassword, user.role]
            );
            
            logger.info(`Created default user: ${user.username} with ID: ${result.insertId}`);
        }
        
        logger.info('Default users created successfully');
    } catch (error) {
        logger.error('Error creating default users:', error);
        throw error;
    }
}; 