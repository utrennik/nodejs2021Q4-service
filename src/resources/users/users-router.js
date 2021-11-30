const { getAllUsers, getUserByID } = require('./users-service');

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

const usersRouter = (fastify, options, done) => {
  fastify.get('/', getAllUsersOpts);
  fastify.get('/:id', getUserOpts);
  done();
};

module.exports = usersRouter;
