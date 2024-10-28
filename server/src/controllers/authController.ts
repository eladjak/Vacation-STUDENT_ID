import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db';
import logger from '../utils/logger';
import passport from 'passport';

// הגדרת טיפוס User
interface User {
  id: number;
  username: string;
  role: 'user' | 'admin';
}

// פונקציה ליצירת משתמשים ברירת מחדל
export const createDefaultUsers = async (): Promise<void> => {
  try {
    const [existingUsers]: any = await pool.query('SELECT * FROM users LIMIT 1');
    
    if (existingUsers.length === 0) {
      logger.info('Creating default users...');
      
      const defaultUsers = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user', password: 'user123', role: 'user' }
      ];

      for (const user of defaultUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await pool.query(
          'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
          [user.username, hashedPassword, user.role]
        );
        logger.info(`Created default user: ${user.username}`);
      }
    }
  } catch (error) {
    logger.error('Error creating default users:', error);
    throw error;
  }
};

export const login = (req: Request, res: Response): void => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) {
            logger.error('Login error:', err);
            res.status(500).json({ message: 'שגיאת שרת פנימית' });
            return;
        }

        if (!user) {
            logger.warn('Login failed:', info.message);
            res.status(401).json({ message: info.message });
            return;
        }

        req.logIn(user, (err) => {
            if (err) {
                logger.error('Session error:', err);
                res.status(500).json({ message: 'שגיאת שרת פנימית' });
                return;
            }

            logger.info(`User logged in successfully: ${user.username}`);
            res.json({
                id: user.id,
                username: user.username,
                role: user.role
            });
        });
    })(req, res);
};

// קבלת פרטי משתמש
export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      logger.warn('User ID not found in request');
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const [rows] = await pool.query(
      'SELECT id, username, role FROM users WHERE id = ?',
      [userId]
    ) as [User[], any];

    if (!rows || rows.length === 0) {
      logger.warn(`User not found with ID: ${userId}`);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = rows[0];
    logger.info(`User details retrieved successfully: ${user.username}`);
    res.json({
      id: user.id,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    logger.error('Error retrieving user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
