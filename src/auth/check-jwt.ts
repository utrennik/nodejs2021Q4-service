import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

const checkJWT = async (req: FastifyRequest, res: FastifyReply) => {
  // console.info('Checking JWT...');
  return { req, res };
};

export default checkJWT;
