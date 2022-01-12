import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ClientError from '../errors/client-error';
import { ILoginRequest } from '../resources/users/types';
import usersRepo from '../resources/users/users-repo';
import config from '../common/config';

const loginHandler = async (
  req: FastifyRequest<ILoginRequest>,
  res: FastifyReply
) => {
  const codes = config.HTTP_CODES;

  const { login, password } = req.body;

  const user = await usersRepo.getUserByLogin(login);

  if (!user) {
    throw new ClientError(
      `User with login ${login} doesn't exist`,
      codes.FORBIDDEN
    );
  }

  const encryptedPassword = user.password;

  const isPasswordOk = await bcrypt.compare(password, encryptedPassword);

  if (!isPasswordOk) {
    throw new ClientError(`Incorrect password`, codes.FORBIDDEN);
  }

  const tokenData = { userId: user.id, login: user.login };

  const token = await jwt.sign(tokenData, config.JWT_SECRET_KEY);

  res.send({ token });
};

export default loginHandler;
