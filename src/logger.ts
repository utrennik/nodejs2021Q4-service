import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs';

const getDateTime = (): string => {
  return new Date().toLocaleString();
};

const logger = async (
  fastify: FastifyInstance,
  errorLogFilePath: string
): Promise<void> => {
  const errorFileWriteStream = fs.createWriteStream(errorLogFilePath, 'utf-8');

  process.on('uncaughtException', (e) => {
    const errorMessage = `ERROR: ${getDateTime()} ${e.message}\n`;

    errorFileWriteStream.write(errorMessage, () => {
      console.log(errorMessage);
      process.exit(1);
    });
  });

  process.on('unhandledRejection', (e) => {
    const errorMessage = `ERROR: ${getDateTime()} ${(e as Error).message}\n`;

    errorFileWriteStream.write(errorMessage, () => {
      console.log(errorMessage);
      process.exit(1);
    });
  });

  fastify.addHook(
    'onError',
    (_req: FastifyRequest, _res: FastifyReply, e: Error, done) => {
      const errorMessage = `ERROR: ${getDateTime()} ${(e as Error).message}\n`;

      errorFileWriteStream.write(errorMessage, () => {
        done();
      });
    }
  );

  fastify.addHook(
    'preHandler',
    (req: FastifyRequest, _: FastifyReply, done) => {
      const { hostname, url, params, body } = req;

      req.log.info(
        `${getDateTime()} Received request from URL: ${hostname}${url}, query params: ${JSON.stringify(
          params
        )}, body: ${JSON.stringify(body as string)}`
      );
      done();
    }
  );

  fastify.addHook(
    'onResponse',
    (_: FastifyRequest, res: FastifyReply, done) => {
      const { statusCode } = res.raw;

      res.log.info(
        `${getDateTime()} Request completed with status code ${statusCode}`
      );
      done();
    }
  );
};

export default logger;
