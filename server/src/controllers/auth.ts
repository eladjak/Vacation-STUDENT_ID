import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { config } from '../config';
import logger from '../utils/logger';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
    id: number;
    username: string;
    password: string;
    role: string;
}

const authController = {
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            logger.info('Login attempt - Request body:', { username });

            if (!username || !password) {
                logger.warn('Login failed: Missing username or password');
                res.status(400).json({ message: 'Username and password are required' });
                return;
            }

            const [users] = await db.query<UserRow[]>(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );
            
            const user = users[0];
            logger.info('User found:', { userId: user?.id, username: user?.username });

            if (!user) {
                logger.warn(`User not found: ${username}`);
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const isValidPassword = await bcryptjs.compare(password, user.password);
            logger.info('Password validation result:', { isValid: isValidPassword });

            if (!isValidPassword) {
                logger.warn(`Invalid password for user: ${username}`);
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                config.jwt.secret,
                { expiresIn: '24h' }
            );

            logger.info(`Login successful: ${username}`);
            
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
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default authController;
    