import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { config } from '../config';
import logger from '../utils/logger';

// הגדרת טיפוס User
interface User {
  id: number;
  username: string;
  role: 'user' | 'admin';
}

// פונקציה ליצירת משתמשים ברירת מחדל
export const createDefaultUsers = async (): Promise<void> => {
  try {
    const [existingUsers]: any = await db.query('SELECT * FROM users LIMIT 1');
    
    if (existingUsers.length === 0) {
      logger.info('Creating default users...');
      
      const defaultUsers = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user', password: 'user123', role: 'user' }
      ];

      for (const user of defaultUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await db.query(
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

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // בדיקת קלט
    if (!username || !password) {
      res.status(400).json({ message: 'נדרשים שם משתמש וסיסמה' });
      return;
    }

    // שליפת המשתמש מהדאטהבייס
    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    ) as [any[], any];

    const user = users[0];

    if (!user) {
      logger.warn(`Failed login attempt for username: ${username}`);
      res.status(401).json({ message: 'שם משתמש או סיסמה שגויים' });
      return;
    }

    // בדיקת הסיסמה
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      logger.warn(`Invalid password for username: ${username}`);
      res.status(401).json({ message: 'שם משתמש או סיסמה שגויים' });
      return;
    }

    // יצירת טוקן
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    logger.info(`User logged in successfully: ${username}`);
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ message: 'שגיאת שרת פנימית' });
  }
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

    const [rows] = await db.query(
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
