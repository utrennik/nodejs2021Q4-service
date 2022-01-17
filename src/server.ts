import config from './common/config';
import app from './app';

const PORT = config.PORT || 4000;
const HOST = config.APP_HOST;

app.listen(
  PORT,
  HOST,
  () => console.log(`App is running on ${HOST}:${PORT}`) // eslint-disable-line no-console
);
