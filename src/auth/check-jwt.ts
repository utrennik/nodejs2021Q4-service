import { FastifyRequest, FastifyReply } from 'fastify';
import ClientError from '../errors/client-error';
import jwt from 'jsonwebtoken';
import usersRepo from '../resources/users/users-repo';
import { IAuthTokenPayload } from './types';
import config from '../common/config';

const checkJWT = async (req: FastifyRequest, res: FastifyReply) => {
  const authHeader = req.headers.authorization;

  const splitted = authHeader ? authHeader.split(' ') : null;

  if (authHeader && splitted && splitted[0] === 'Bearer' && splitted[1]) {
    const token = splitted[1];

    const payload = await new Promise((res, rej) => {
      jwt.verify(token, config.JWT_SECRET_KEY, (err, payload) => {
        if (err) rej(err);
        res(payload);
      });
    }).catch((e) => {
      throw new ClientError(e.message, config.HTTP_CODES.UNAUTHORIZED);
    });

    console.log(`Token payload: ${JSON.stringify(payload)}`);

    const { userId, login } = payload as IAuthTokenPayload;

    const userById = await usersRepo.getUserByID(userId);
    if (!userById)
      throw new ClientError(
        'Userid defined in Authorization token not found',
        config.HTTP_CODES.UNAUTHORIZED
      );

    const userByLogin = await usersRepo.getUserByLogin(login as string);
    if (!userByLogin)
      throw new ClientError(
        'Username defined in the authorization token not found',
        config.HTTP_CODES.UNAUTHORIZED
      );

    return { req, res };
  }

  throw new ClientError('Unauthorized error', config.HTTP_CODES.UNAUTHORIZED);
};

export default checkJWT;
