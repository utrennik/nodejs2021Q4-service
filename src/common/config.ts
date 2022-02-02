import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const loggingLevels = {
  0: 'error',
  1: 'warn',
  2: 'info',
  3: 'debug',
  4: 'trace',
};

const defaultLoggingLevel = '4';

const loggingLevel: string =
  process.env.LOGGING_LEVEL !== undefined && +process.env.LOGGING_LEVEL < 5
    ? process.env.LOGGING_LEVEL
    : defaultLoggingLevel;

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret-dafault',
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  loggingLevel: loggingLevels[loggingLevel as keyof object],
  COMMON_LOG_FILE: '../logs/common_log.txt',
  ERROR_LOG_FILE: '../logs/error_log.txt',
  HTTP_CODES: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  loggingLevelCode: +loggingLevel,
  APP_HOST: process.env.APP_HOST || '0.0.0.0',

  poolConfing: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
    host: process.env.POSTGRES_HOST,
  },
};

export default config;
