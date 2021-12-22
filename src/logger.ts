import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs';
import config from './common/config';

const { loggingLevelCode } = config;

/**
 * Returns current date and time in string
 * @returns time and date
 */
const getDateTime = (): string => new Date().toLocaleString();

/**
 * Adds a cusom logger to the Fastify instance
 * @param fastify Fastify Instance
 * @param errorLogFilePath path to the errors log file
 * @returns void (Promise)
 */
const logger = async (
  fastify: FastifyInstance,
  errorLogFilePath: string
): Promise<void> => {
  const errorFileWriteStream = fs.createWriteStream(errorLogFilePath, 'utf-8');

  process.on('uncaughtException', (e) => {
    const errorMessage = `ERROR: ${getDateTime()} ${e.message}\n`;

    errorFileWriteStream.write(errorMessage, () => {
      console.log(errorMessage); // eslint-disable-line no-console
      process.exit(1);
    });
  });

  process.on('unhandledRejection', (e) => {
    const errorMessage = `ERROR: ${getDateTime()} ${(e as Error).message}\n`;

    errorFileWriteStream.write(errorMessage, () => {
      console.log(errorMessage); // eslint-disable-line no-console
      process.exit(1);
    });
  });

  fastify.addHook(
    'onError',
    async (_req: FastifyRequest, _res: FastifyReply, e: Error, done) => {
      const logMessage = `ERROR: ${getDateTime()} ${e.message}\n`;

      errorFileWriteStream.write(logMessage, () => {
        done();
      });
    }
  );

  fastify.addHook(
    'preHandler',
    (req: FastifyRequest, _: FastifyReply, done) => {
      const { hostname, url, params, body } = req;

      if (loggingLevelCode >= 2) {
        req.log.info(
          `${getDateTime()} Received request from URL: ${hostname}${url}, query params: ${JSON.stringify(
            params
          )}, body: ${JSON.stringify(body as string)}`
        );
      }

      done();
    }
  );

  fastify.addHook(
    'onResponse',
    (_: FastifyRequest, res: FastifyReply, done) => {
      const { statusCode } = res.raw;

      if (loggingLevelCode >= 2) {
        res.log.info(
          `${getDateTime()} Request completed with status code ${statusCode}`
        );
        done();
      }
    }
  );
};

export default logger;
