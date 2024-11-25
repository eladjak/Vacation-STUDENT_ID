import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { comparePasswords } from '../utils/auth';
import { db } from '../db';
import { RowDataPacket } from 'mysql2';
import { User, BaseUser } from '../types/user';
import logger from '../utils/logger';

// הגדרת טיפוס לפונקציית done
type DoneCallback = (error: any, user?: any, options?: { message: string }) => void;

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username: string, password: string, done: DoneCallback) => {
        try {
            const [rows] = await db.execute<RowDataPacket[]>(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );

            if (!rows.length) {
                logger.warn(`Login attempt failed: username ${username} not found`);
                return done(null, false, { message: 'שם משתמש לא קיים' });
            }

            const user = rows[0] as User;
            const isValid = await comparePasswords(password, user.password);

            if (!isValid) {
                logger.warn(`Login attempt failed: invalid password for user ${username}`);
                return done(null, false, { message: 'סיסמה שגויה' });
            }

            // שליחת רק את המידע הבסיסי ללא סיסמה
            const baseUser: BaseUser = {
                id: user.id,
                username: user.username,
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name
            };

            logger.info(`User ${username} logged in successfully`);
            return done(null, baseUser);
        } catch (error) {
            logger.error('Login error:', error);
            return done(error);
        }
    }
));

passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const [rows] = await db.execute<RowDataPacket[]>(
            'SELECT id, username, role, first_name, last_name FROM users WHERE id = ?',
            [id]
        );
        
        if (!rows.length) {
            logger.warn(`User deserialization failed: user ${id} not found`);
            return done(new Error('משתמש לא נמצא'));
        }

        const user = rows[0] as BaseUser;
        logger.debug(`User ${id} deserialized successfully`);
        done(null, user);
    } catch (error) {
        logger.error('User deserialization error:', error);
        done(error);
    }
});

export default passport; 