import { Request, Response, NextFunction } from 'express';

export const validateLoginInput = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'נדרשים שם משתמש וסיסמה' });
        return;
    }

    if (username.length < 2 || username.length > 50) {
        res.status(400).json({ message: 'שם משתמש חייב להיות באורך 2-50 תווים' });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({ message: 'סיסמה חייבת להכיל לפחות 6 תווים' });
        return;
    }

    next();
};

export const validateRegistrationInput = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'נדרשים שם משתמש וסיסמה' });
        return;
    }

    if (username.length < 2 || username.length > 50) {
        res.status(400).json({ message: 'שם משתמש חייב להיות באורך 2-50 תווים' });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({ message: 'סיסמה חייבת להכיל לפחות 6 תווים' });
        return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'הסיסמה חייבת להכיל לפחות אות אחת ומספר אחד' });
        return;
    }

    next();
}; 