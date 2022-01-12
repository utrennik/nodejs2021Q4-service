import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
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
      codes.NOT_FOUND
    );
  }

  const encryptedPassword = user.password;

  const isPasswordOk = await bcrypt.compare(password, encryptedPassword);

  if (!isPasswordOk) {
    throw new ClientError(`Incorrect password`, codes.FORBIDDEN);
  }

  res.send({ token: 'fsdfsdfsdfs' });
};

export default loginHandler;
