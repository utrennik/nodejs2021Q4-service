import * as winston from 'winston';
import config from '../common/config';

const logFormat = winston.format.printf((info) => {
  const formattedDate = info.timestamp.replace('T', ' ').replace('Z', '');
  return `${formattedDate} | ${info.level} | ${info.message};`;
});

const loggerSettings = {
  level: config.loggingLevel,
  format: winston.format.combine(winston.format.timestamp(), logFormat),

  transports: [
    new winston.transports.File({
      filename: config.ERROR_LOG_FILE,
      level: 'error',
    }),
    new winston.transports.File({ filename: config.COMMON_LOG_FILE }),
    new winston.transports.Console({ level: 'info' }),
  ],
};

export default loggerSettings;
