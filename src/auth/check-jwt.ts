import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import ClientError from '../errors/client-error';
import usersRepo from '../resources/users/users-repo';
import { IAuthTokenPayload } from './types';
import config from '../common/config';

const checkJWT = async (req: FastifyRequest, res: FastifyReply) => {
  const authHeader = req.headers.authorization;

  const splittedHeader = authHeader ? authHeader.split(' ') : null;

  if (
    !(
      authHeader &&
      splittedHeader &&
      splittedHeader[0] === 'Bearer' &&
      splittedHeader[1]
    )
  ) {
    throw new ClientError('Unauthorized error', config.HTTP_CODES.UNAUTHORIZED);
  }

  const token = splittedHeader[1];

  const tokenPayload = await new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET_KEY, (err, payload) => {
      if (err) reject(err);

      resolve(payload);
    });
  }).catch((e) => {
    throw new ClientError(e.message, config.HTTP_CODES.UNAUTHORIZED);
  });

  console.warn(
    `FOR CROSSCHECK! Token payload: ${JSON.stringify(tokenPayload)}`
  );

  const { userId, login } = tokenPayload as IAuthTokenPayload;

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
};

export default checkJWT;
