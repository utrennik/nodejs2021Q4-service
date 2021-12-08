import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginCallback,
} from 'fastify';
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
  handler: updateTask,
};

const deleteTaskOpts = {
  schema: {
    params: {
      boardId: typeString,
      taskId: typeString,
    },
  },
  handler: deleteTask,
};

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
