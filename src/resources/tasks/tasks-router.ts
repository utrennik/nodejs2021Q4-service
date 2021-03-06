import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginCallback,
} from 'fastify';
import checkJWT from '../../auth/check-jwt';
import {
  getTasksByBoardId,
  getTask,
  postTask,
  updateTask,
  deleteTask,
} from './tasks-service';

const typeString = { type: 'string' };
const typeStringOrNull = { type: ['string', 'null'] };

const typeTask = {
  type: 'object',
  properties: {
    id: typeString,
    title: typeString,
    order: { type: 'number' },
    description: typeString,
    userId: typeStringOrNull,
    boardId: typeString,
    columnId: typeStringOrNull,
  },
};

const getTasksByIdOpts = {
  schema: {
    params: {
      boardId: typeString,
    },
    response: {
      200: {
        type: 'array',
        items: typeTask,
      },
    },
  },
  preHandler: checkJWT,
  handler: getTasksByBoardId,
};

const getTaskOpts = {
  schema: {
    params: {
      boardId: typeString,
      taskId: typeString,
    },
    response: {
      200: typeTask,
    },
  },
  preHandler: checkJWT,
  handler: getTask,
};

const postTaskOpts = {
  schema: {
    params: {
      boardId: typeString,
    },
    body: {
      ...typeTask,
      required: ['title', 'order'],
    },
    response: {
      201: typeTask,
    },
  },
  preHandler: checkJWT,
  handler: postTask,
};

const putTaskOpts = {
  schema: {
    params: {
      boardId: typeString,
      taskId: typeString,
    },
    body: {
      ...typeTask,
      required: ['order', 'boardId', 'columnId'],
    },
    response: {
      200: typeTask,
    },
  },
  preHandler: checkJWT,
  handler: updateTask,
};

const deleteTaskOpts = {
  schema: {
    params: {
      boardId: typeString,
      taskId: typeString,
    },
  },
  preHandler: checkJWT,
  handler: deleteTask,
};

/**
 * Returns the Fastify Plugin Callback (tasks route)
 * @param fastify Fastify Instance
 * @param _ Fastify plugin options object
 * @param done finish callback
 * @returns Fastify plugin callback
 */
const tasksRouter: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done
) => {
  fastify.get('/:boardId/tasks', getTasksByIdOpts);
  fastify.get('/:boardId/tasks/:taskId', getTaskOpts);
  fastify.post('/:boardId/tasks', postTaskOpts);
  fastify.put('/:boardId/tasks/:taskId', putTaskOpts);
  fastify.delete('/:boardId/tasks/:taskId', deleteTaskOpts);
  done();
};

export default tasksRouter;
