import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const logger = async (fastify: FastifyInstance): Promise<void> => {
  fastify.addHook(
    'preHandler',
    (req: FastifyRequest, _: FastifyReply, done) => {
      const { hostname, url, params, body } = req;

      req.log.info(
        `Received request from URL: ${hostname}${url}, query params: ${JSON.stringify(
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

      res.log.info(`Request completed with status code ${statusCode}`);
      done();
    }
  );
};

export default logger;
