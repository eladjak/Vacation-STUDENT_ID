DELETE FROM users WHERE username IN ('admin', 'user');
INSERT INTO users (username, password, role) VALUES
('admin', '$2a$10$YourHashedPasswordHere', 'admin'),
('user', '$2a$10$YourHashedPasswordHere', 'user'); 