import dotenv from 'dotenv';

dotenv.config();

export const config = {
  db: {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'vacation_db',
  },
  server: {
    port: process.env.PORT || 3005,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
  },
};
