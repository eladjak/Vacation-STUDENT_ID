-- מחיקת כל המשתמשים
DELETE FROM users;

-- יצירת משתמש admin חדש עם סיסמה מוצפנת ידועה
INSERT INTO users (username, password, role) 
VALUES (
    'admin',
    '$2a$10$n/g7GHoY1oNPhy/oPXIxOOj.U0I0c4Hs4w.YQpB7PhKxJ4iuZ6OZi', -- הסיסמה היא 'admin123'
    'admin'
); 