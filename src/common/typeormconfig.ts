import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

function getMigrationDirectory() {
  const directory =
    process.env.NODE_ENV === 'migration' ? 'src' : `${__dirname}`;
  return `${directory}/migrations/**/*{.ts,.js}`;
}

const typeOrmConfig = {
  type: 'postgres',
  synchronize: true,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  autoReconnect: true,
  entities: [`${path.join(__dirname, '../**', '*.entity.{ts,js}')}`],
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default typeOrmConfig as ConnectionOptions;
