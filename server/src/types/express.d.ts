import { User } from '../models/user';

declare global {
    namespace Express {
        interface User {
            id: number;
            username: string;
            role: 'user' | 'admin';
            password?: string;
        }
    }
}

export {};
