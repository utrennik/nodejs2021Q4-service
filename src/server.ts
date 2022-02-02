import config from './common/config';
import app from './app';
import { handleDBConnect } from './db';

const PORT = config.PORT || 4000;
const HOST = config.APP_HOST;

/**
 * Runs the database initialization and starts the app
 *  @returns Promise<void>
 */
const start = async (): Promise<void> => {
  await handleDBConnect();

  app.listen(
    PORT,
    HOST,
    () => console.log(`App is running on ${HOST}:${PORT}`) // eslint-disable-line no-console
  );
};

start();
