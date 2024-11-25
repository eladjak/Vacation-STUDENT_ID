interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

interface ServerConfig {
  port: string | number;
}

interface RedisConfig {
  enabled: boolean;
  host: string;
  port: number;
}

interface JwtConfig {
  secret: string;
}

interface Config {
  db: DatabaseConfig;
  server: ServerConfig;
  redis: RedisConfig;
  jwt: JwtConfig;
}

const config: Config = {
  server: {
    port: process.env.PORT || 3005
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'vacation_db'
  },
  redis: {
    enabled: process.env.REDIS_ENABLED === 'true',
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379')
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key'
  }
};

export { config };
export type { Config, DatabaseConfig, ServerConfig, RedisConfig, JwtConfig }; 