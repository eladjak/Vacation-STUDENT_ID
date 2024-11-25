import bcryptjs from 'bcryptjs';
import logger from '../utils/logger';

async function testPassword() {
    try {
        const password = 'admin123';
        logger.info('בודק הצפנת סיסמה...', { password });

        // יצירת hash חדש
        const hash = await bcryptjs.hash(password, 10);
        logger.info('סיסמה מוצפנת:', { hash });

        // בדיקת התאמה
        const isValid = await bcryptjs.compare(password, hash);
        logger.info('בדיקת התאמה:', { isValid });

        // בדיקת אורך ופורמט
        logger.info('פרטי ההצפנה:', {
            hashLength: hash.length,
            startsWithPrefix: hash.startsWith('$2a$10$'),
            format: 'bcrypt'
        });

        process.exit(0);
    } catch (error) {
        logger.error('שגיאה בבדיקת הצפנה:', error);
        process.exit(1);
    }
}

testPassword(); 