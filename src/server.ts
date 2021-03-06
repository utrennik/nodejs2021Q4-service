import app from './app';
import { handleDBConnect } from './db';
import usersRepo from './resources/users/users-repo';
import User from './resources/users/user-model';
import config from './common/config';

const PORT = config.PORT || 4000;
const HOST = config.APP_HOST;

/**
 * Runs the database initialization and starts the app
 *  @returns Promise<void>
 */
const start = async (): Promise<void> => {
  await handleDBConnect();

  // init admin user
  await usersRepo.postUser(
    new User({ name: 'Admin', login: 'admin', password: 'admin' })
  );

  app.listen(
    PORT,
    HOST,
    () => console.log(`App is running on ${HOST}:${PORT}`) // eslint-disable-line no-console
  );
};

start();
