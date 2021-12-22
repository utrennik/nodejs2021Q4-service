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

const loggingLevel: string = process.env.LOGGING_LEVEL || '4';

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOGGING_LEVEL: loggingLevels[loggingLevel as keyof object],
  COMMON_LOG_FILE: '../common_log.txt',
  ERROR_LOG_FILE: '../error_log.txt',
};

export default config;