-- Set character encoding
USE master;
GO

-- Create database if not exists
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'vacation_db')
BEGIN
    CREATE DATABASE vacation_db;
END
GO

USE vacation_db;
GO

-- Create users table if not exists
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[users] (
        [id] INT IDENTITY(1,1) NOT NULL,
        [username] NVARCHAR(50) NOT NULL,
        [password] NVARCHAR(255) NOT NULL,
        [role] NVARCHAR(10) NOT NULL CONSTRAINT DF_Users_Role DEFAULT 'user',
        [created_at] DATETIME2 DEFAULT GETDATE(),
        [updated_at] DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [UQ_Users_Username] UNIQUE NONCLUSTERED ([username] ASC)
    );

    -- הוספת משתמש ברירת מחדל
    INSERT INTO [dbo].[users] ([username], [password], [role])
    VALUES 
        ('admin', '$2b$10$YourHashedPasswordHere', 'admin'),
        ('user', '$2b$10$YourHashedPasswordHere', 'user');
END
GO

-- Create vacations table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[vacations]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[vacations] (
        [id] INT IDENTITY(1,1) NOT NULL,
        [destination] NVARCHAR(100) NOT NULL,
        [description] NTEXT NOT NULL,
        [image_url] NVARCHAR(255) NULL,
        [start_date] DATE NOT NULL,
        [end_date] DATE NOT NULL,
        [price] DECIMAL(10,2) NOT NULL,
        [followers_count] INT DEFAULT 0,
        [is_active] BIT DEFAULT 1,
        [created_at] DATETIME2 DEFAULT GETDATE(),
        [updated_at] DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT [PK_Vacations] PRIMARY KEY CLUSTERED ([id] ASC)
    );
END
GO

-- Create vacation_followers table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[vacation_followers]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[vacation_followers] (
        [user_id] INT NOT NULL,
        [vacation_id] INT NOT NULL,
        [created_at] DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT [PK_VacationFollowers] PRIMARY KEY CLUSTERED ([user_id] ASC, [vacation_id] ASC),
        CONSTRAINT [FK_VacationFollowers_Users] FOREIGN KEY ([user_id]) 
            REFERENCES [dbo].[users] ([id]) ON DELETE CASCADE,
        CONSTRAINT [FK_VacationFollowers_Vacations] FOREIGN KEY ([vacation_id]) 
            REFERENCES [dbo].[vacations] ([id]) ON DELETE CASCADE
    );
END
GO

-- Create indexes
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IDX_Vacation_Dates' AND object_id = OBJECT_ID('vacations'))
BEGIN
    CREATE INDEX [IDX_Vacation_Dates] ON [dbo].[vacations] ([start_date], [end_date]);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IDX_Vacation_Followers' AND object_id = OBJECT_ID('vacation_followers'))
BEGIN
    CREATE INDEX [IDX_Vacation_Followers] ON [dbo].[vacation_followers] ([vacation_id]);
END
GO

-- Update followers count
UPDATE v
SET v.followers_count = (
    SELECT COUNT(*)
    FROM vacation_followers vf
    WHERE vf.vacation_id = v.id
)
FROM vacations v;
GO
