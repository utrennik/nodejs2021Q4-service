import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const ormConfig = {
  type: 'postgres',
  name: 'postgres-app-connection',
  synchronize: false,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
  autoReconnect: true,
  entities: [`${path.join(__dirname, '**', '*.entity.{ts,js}')}`],
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDirDir: 'src/entities',
  },
};

function getMigrationDirectory() {
  const directory =
    process.env.NODE_ENV === 'migration' ? 'src' : `${__dirname}`;
  return `${directory}/migrations/**/*{.ts,.js}`;
}

export default ormConfig as ConnectionOptions;
