import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import pool from '../db';
import logger from '../utils/logger';
import { RowDataPacket } from 'mysql2';

interface UserRecord extends RowDataPacket {
    id: number;
    username: string;
    password: string;
    role: 'user' | 'admin';
}

passport.use(new LocalStrategy(async (username: string, password: string, done) => {
    try {
        const [users] = await pool.query<UserRecord[]>(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (!users || users.length === 0) {
            logger.warn(`User not found: ${username}`);
            return done(null, false, { message: 'שם משתמש או סיסמה שגויים' });
        }

        const user = users[0];
        const isValid = await bcrypt.compare(password, user.password || '');
        
        if (!isValid) {
            logger.warn(`Invalid password for user: ${username}`);
            return done(null, false, { message: 'שם משתמש או סיסמה שגויים' });
        }

        logger.info(`User logged in successfully: ${username}`);
        return done(null, user);
    } catch (error) {
        logger.error('Error during authentication:', error);
        return done(error);
    }
}));

passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const [users] = await pool.query<UserRecord[]>(
            'SELECT id, username, role FROM users WHERE id = ?',
            [id]
        );
        
        if (!users || users.length === 0) {
            return done(new Error('User not found'));
        }
        
        done(null, users[0]);
    } catch (error) {
        done(error);
    }
});

export default passport;
