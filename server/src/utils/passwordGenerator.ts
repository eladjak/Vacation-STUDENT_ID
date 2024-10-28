import bcrypt from 'bcryptjs';
import logger from './logger';

async function generateHash(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        logger.info(`Password hash generated successfully`);
        return hash;
    } catch (error) {
        logger.error('Error generating password hash:', error);
        throw error;
    }
}

export async function generateDefaultPasswords(): Promise<{ [key: string]: string }> {
    const passwords = {
        admin: 'admin123',
        user: 'user123'
    };

    const hashedPasswords: { [key: string]: string } = {};

    for (const [username, password] of Object.entries(passwords)) {
        hashedPasswords[username] = await generateHash(password);
    }

    return hashedPasswords;
}

// רק אם נרצה להריץ את הסקריפט באופן עצמאי
if (require.main === module) {
    generateDefaultPasswords()
        .then(hashes => {
            console.log('Generated password hashes:', hashes);
        })
        .catch(error => {
            console.error('Error:', error);
            process.exit(1);
        });
}
