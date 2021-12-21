import path from 'path';
import { fastify } from 'fastify';
import usersRouter from './resources/users/users-router';
import boardsRouter from './resources/boards/boards-router';
import tasksRouter from './resources/tasks/tasks-router';
import logger from './logger';
import config from './common/config';

const logFilePath = path.resolve(__dirname, config.COMMON_LOG_FILE);

const app = fastify({
  disableRequestLogging: true,
  logger: {
    level: config.LOGGING_LEVEL,
    file: logFilePath,
    prettyPrint: {
      ignore: 'pid,time,hostname,req.headers,reqId,log',
      colorize: false,
    },
  },
});

logger(app);

app.register(usersRouter, { prefix: '/users' });
app.register(boardsRouter, { prefix: '/boards' });
app.register(tasksRouter, { prefix: '/boards' });

export default app;
