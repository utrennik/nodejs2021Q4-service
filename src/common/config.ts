import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const loggingLevels = {
  0: 'error',
  1: 'warning',
  2: 'notice',
  3: 'info',
  4: 'debug',
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
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  loggingLevel: loggingLevels[loggingLevel as keyof object],
  COMMON_LOG_FILE: './logs/common_log.txt',
  ERROR_LOG_FILE: './logs/error_log.txt',
  HTTP_CODES: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  loggingLevelCode: +loggingLevel,
  APP_HOST: process.env.APP_HOST || '0.0.0.0',
  STATIC_FILES_DIR: process.env.STATIC_FILES_DIR || './',
  CRYPT_SALT: 10,
};

export default config;
