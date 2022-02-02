import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginCallback,
} from 'fastify';
import loginHandler from './login-handler';

const typeString = { type: 'string' };

const loginOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        login: typeString,
        password: typeString,
      },
      required: ['login', 'password'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          token: typeString,
        },
      },
    },
  },
  handler: loginHandler,
};

/**
 * Returns the Fastify Plugin Callback (login route)
 * @param fastify Fastify Instance
 * @param _ Fastify plugin options object
 * @param done finish callback
 * @returns Fastify plugin callback
 */
const loginRouter: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done
) => {
  fastify.post('/', loginOpts);
  done();
};

export default loginRouter;
