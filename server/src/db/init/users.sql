-- הוספת משתמשים ראשוניים למערכת
INSERT INTO users (username, password, role, email) VALUES
-- מנהל המערכת
('admin', '$2b$10$YourHashedPasswordHere', 'admin', 'admin@example.com'),
-- משתמשים רגילים
('user1', '$2b$10$YourHashedPasswordHere', 'user', 'user1@example.com'),
('user2', '$2b$10$YourHashedPasswordHere', 'user', 'user2@example.com');

-- סיסמאות לפני ההצפנה (לשימוש בפיתוח בלבד):
-- admin: Admin123!
-- user1: User1234!
-- user2: User5678! 