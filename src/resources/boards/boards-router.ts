import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginCallback,
} from 'fastify';
import checkJWT from '../../auth/check-jwt';
import {
  getAllBoards,
  getBoardByID,
  postBoard,
  updateBoard,
  deleteBoard,
} from './boards-service';

const typeString = { type: 'string' };

const typeColumn = {
  type: 'object',
  properties: {
    id: typeString,
    title: typeString,
    order: { type: 'number' },
  },
};

const typeBoard = {
  type: 'object',
  properties: {
    id: typeString,
    title: typeString,
    columns: {
      type: 'array',
      items: typeColumn,
    },
  },
};

const getAllBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: typeBoard,
      },
    },
  },
  preHandler: checkJWT,
  handler: getAllBoards,
};

const getBoardOpts = {
  schema: {
    params: {
      id: typeString,
    },
    response: {
      200: typeBoard,
    },
  },
  preHandler: checkJWT,
  handler: getBoardByID,
};

const postBoardOpts = {
  schema: {
    body: {
      ...typeBoard,
      required: ['title', 'columns'],
    },
    response: {
      201: typeBoard,
    },
  },
  preHandler: checkJWT,
  handler: postBoard,
};

const putBoardOpts = {
  schema: {
    params: {
      id: typeString,
    },
    body: {
      ...typeBoard,
      required: ['title', 'columns'],
    },
    response: {
      200: typeBoard,
    },
  },
  preHandler: checkJWT,
  handler: updateBoard,
};

const deleteBoardOpts = {
  schema: {
    params: {
      id: typeString,
    },
  },
  preHandler: checkJWT,
  handler: deleteBoard,
};

/**
 * Returns the Fastify Plugin Callback for (boards route)
 * @param fastify Fastify Instance
 * @param _ Fastify plugin options object
 * @param done finish callback
 * @returns Fastify plugin callback
 */
const boardsRouter: FastifyPluginCallback = async (
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done
) => {
  fastify.get('/', getAllBoardsOpts);
  fastify.get('/:id', getBoardOpts);
  fastify.post('/', postBoardOpts);
  fastify.put('/:id', putBoardOpts);
  fastify.delete('/:id', deleteBoardOpts);
  done();
};

export default boardsRouter;
