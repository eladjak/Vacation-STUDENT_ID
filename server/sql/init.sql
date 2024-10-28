-- הענקת הרשאות למשתמש root
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'rootpassword';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- יצירת מסד הנתונים אם לא קיים
CREATE DATABASE IF NOT EXISTS vacation_db;
USE vacation_db;

-- הגדרת קידוד
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Drop tables if they exist
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS vacations;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create vacations table
CREATE TABLE vacations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create followers table
CREATE TABLE followers (
    user_id INT,
    vacation_id INT,
    PRIMARY KEY (user_id, vacation_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vacation_id) REFERENCES vacations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- מחיקת נתונים קיימים
DELETE FROM followers;
DELETE FROM vacations;
DELETE FROM users;

-- הוספת משתמשים עם הסיסמאות המוצפנות
INSERT INTO users (username, password, role) VALUES 
('admin', '$2a$10$Sj1dmbipkwIma5YFgy1Beu7pEX3U.FceCZB0o.wUqsGW91lLIGvqC', 'admin'),
('user', '$2a$10$k0XvVhWM8UKeLpu5gK/6rezsAwx2lGy5y0QVXC1EmsC8TkdLYb6Ia', 'user');

-- הענקת הרשאות
GRANT ALL PRIVILEGES ON vacation_db.* TO 'root'@'%';
FLUSH PRIVILEGES;
