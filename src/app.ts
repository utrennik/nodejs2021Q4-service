import path from 'path';
import { fastify, FastifyReply, FastifyRequest, FastifyError } from 'fastify';
// import { Pool } from 'pg';
import usersRouter from './resources/users/users-router';
import boardsRouter from './resources/boards/boards-router';
import tasksRouter from './resources/tasks/tasks-router';
import logger from './logger';
import config from './common/config';
import ClientError from './errors/client-error';
import ServerError from './errors/server-error';

const logFilePath = path.resolve(__dirname, config.COMMON_LOG_FILE);
const errorLogFilePath = path.resolve(__dirname, config.ERROR_LOG_FILE);

const app = fastify({
  disableRequestLogging: true,
  logger: {
    level: config.loggingLevel,
    file: logFilePath,
    prettyPrint: {
      ignore: 'pid,time,hostname,req.headers,reqId,log',
      colorize: false,
    },
  },
});

app.setErrorHandler((e: Error, _req: FastifyRequest, res: FastifyReply) => {
  if (e instanceof ClientError || e instanceof ServerError) {
    res.status(e.statusCode).send(e);
  } else if ((e as FastifyError).validation) {
    const err = new ClientError(e.message);
    res.status(err.statusCode).send(err);
  } else {
    const err = new ServerError(e.message);
    res.status(err.statusCode).send(err);
  }
});

logger(app, errorLogFilePath);

app.log.debug('Example Debug log');
app.log.warn('Example warn log');

// Promise.reject(Error('Oops!'));
// throw Error('Oops!');

app.register(usersRouter, { prefix: '/users' });
app.register(boardsRouter, { prefix: '/boards' });
app.register(tasksRouter, { prefix: '/boards' });

// TODO: implement DB storage, check here DB container connectivity

// const { poolConfing } = config;

// const pool = new Pool(poolConfing);

// pool
//   .connect()
//   .then(() => {
//     console.log('DB client connected');
//   })
//   .catch((e) => {
//     console.log(`DB client NOT connected: ${e}`);
//   });

export default app;
