// טיפוסים בסיסיים למשתמש
export interface BaseUser {
    id: number;
    username: string;
    role: 'user' | 'admin';
    first_name?: string;
    last_name?: string;
}

// טיפוס מורחב למשתמש עם כל השדות
export interface User extends BaseUser {
    password: string;
    created_at: Date;
    updated_at: Date;
}

// הרחבת טיפוסי Express
declare global {
    namespace Express {
        // מוודא שיש לנו את כל השדות הנדרשים
        interface User extends BaseUser {
            id: number;
            username: string;
            role: 'user' | 'admin';
        }
    }
} 