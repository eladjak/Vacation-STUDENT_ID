import bcryptjs from 'bcryptjs';
import logger from './logger';

export const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcryptjs.genSalt(SALT_ROUNDS);
        const hash = await bcryptjs.hash(password, salt);
        logger.info('Password hashed successfully');
        return hash;
    } catch (error) {
        logger.error('Error hashing password:', error);
        throw error;
    }
};

export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
        const isMatch = await bcryptjs.compare(plainPassword, hashedPassword);
        logger.info(`Password comparison result: ${isMatch}`);
        return isMatch;
    } catch (error) {
        logger.error('Error comparing passwords:', error);
        throw error;
    }
};

export const createTestHash = async (password: string): Promise<string> => {
    const hash = await hashPassword(password);
    console.log('Test hash created:', hash);
    return hash;
}; 