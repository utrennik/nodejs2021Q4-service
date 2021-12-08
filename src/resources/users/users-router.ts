import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginCallback,
} from 'fastify';
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

const getAllUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: typeUser,
      },
    },
  },

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
  handler: getUserByID,
};

const postUserOpts = {
  schema: {
    body: {
      ...typeUser,
      required: ['name'],
    },
    response: {
      201: typeUser,
    },
  },
  handler: postUser,
};

const putUserOpts = {
  schema: {
    params: {
      id: typeString,
    },
    body: {
      type: 'object',
      properties: {
        id: typeString,
        name: typeString,
        login: typeString,
        password: typeString,
      },
      required: ['name'],
    },
    response: {
      200: typeUser,
    },
  },
  handler: updateUser,
};

const deleteUserOpts = {
  schema: {
    params: {
      id: typeString,
    },
  },
  handler: deleteUser,
};

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
