import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const ormConfig = {
  type: 'postgres',
  name: 'postgres-app-connection',
  synchronize: true,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.PORSGRES_PORT,
  autoReconnect: true,
};

export default ormConfig as ConnectionOptions;
