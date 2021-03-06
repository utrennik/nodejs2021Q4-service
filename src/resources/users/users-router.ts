import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginCallback,
} from 'fastify';
import checkJWT from '../../auth/check-jwt';
import {
  getAllUsers,
  getUserByID,
  postUser,
  updateUser,
  deleteUser,
} from './users-service';

const typeString = { type: 'string' };
const typeUser = {
  type: 'object',
  properties: {
    id: typeString,
    name: typeString,
    login: typeString,
  },
};
const typeUserWithPass = {
  type: 'object',
  properties: {
    id: typeString,
    name: typeString,
    login: typeString,
    password: typeString,
  },
};

const getAllUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: typeUser,
      },
    },
  },
  preHandler: checkJWT,
  handler: getAllUsers,
};

const getUserOpts = {
  schema: {
    params: {
      id: typeString,
    },
    response: {
      200: typeUser,
    },
  },
  preHandler: checkJWT,
  handler: getUserByID,
};

const postUserOpts = {
  schema: {
    body: {
      ...typeUserWithPass,
      required: ['name'],
    },
    response: {
      201: typeUser,
    },
  },
  preHandler: checkJWT,
  handler: postUser,
};

const putUserOpts = {
  schema: {
    params: {
      id: typeString,
    },
    body: {
      ...typeUserWithPass,
      required: ['name'],
    },
    response: {
      200: typeUser,
    },
  },
  preHandler: checkJWT,
  handler: updateUser,
};

const deleteUserOpts = {
  schema: {
    params: {
      id: typeString,
    },
  },
  preHandler: checkJWT,
  handler: deleteUser,
};

/**
 * Returns the Fastify Plugin Callback (users route)
 * @param fastify Fastify Instance
 * @param _ Fastify plugin options object
 * @param done finish callback
 * @returns Fastify plugin callback
 */
const usersRouter: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done
) => {
  fastify.get('/', getAllUsersOpts);
  fastify.get('/:id', getUserOpts);
  fastify.post('/', postUserOpts);
  fastify.put('/:id', putUserOpts);
  fastify.delete('/:id', deleteUserOpts);
  done();
};

export default usersRouter;
