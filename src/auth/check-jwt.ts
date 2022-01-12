import { FastifyRequest, FastifyReply } from 'fastify';
import ClientError from '../errors/client-error';
import config from '../common/config';

const checkJWT = async (req: FastifyRequest, res: FastifyReply) => {
  const authHeader = req.headers.authorization;

  const splitted = authHeader ? authHeader.split(' ') : null;

  if (authHeader && splitted && splitted[0] === 'Bearer' && splitted[1]) {
    const token = splitted[1];

    console.log(`Token: ${token}`);

    return { req, res };
  }

  throw new ClientError('Unauthorized error', config.HTTP_CODES.UNAUTHORIZED);
};

export default checkJWT;
