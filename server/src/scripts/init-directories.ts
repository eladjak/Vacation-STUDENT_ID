import fs from 'fs';
import path from 'path';
import logger from '../utils/logger';

const directories = [
    'src/config',
    'src/controllers',
    'src/middleware',
    'src/routes',
    'src/utils',
    'src/types',
    'src/models',
    'src/services',
    'src/tests',
    'src/tests/unit',
    'src/tests/integration',
    'src/tests/e2e',
    'public/images',
    'logs',
    'sql'
];

export const initDirectories = () => {
    try {
        directories.forEach(dir => {
            const fullPath = path.join(process.cwd(), dir);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
                logger.info(`Created directory: ${dir}`);
            }
        });
        logger.info('All directories initialized successfully');
    } catch (error) {
        logger.error('Error creating directories:', error);
        throw error;
    }
};

// הרצה אם הקובץ מורץ ישירות
if (require.main === module) {
    initDirectories();
} 