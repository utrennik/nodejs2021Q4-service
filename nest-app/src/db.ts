import { Connection, createConnection } from 'typeorm';
import 'reflect-metadata';
import ormConfig from './common/ormconfig';

let dbConnection: Connection | undefined;

/**
 * Initializes the database connection
 * @returns Promise<void>
 */
const handleDBConnect = async (): Promise<void> => {
  try {
    if (!dbConnection) {
      console.info('Creating new DB connection...');
      dbConnection = await createConnection(ormConfig);
    }

    if (dbConnection && !dbConnection.isConnected) {
      console.info('Connecting to DB...');
      await dbConnection.connect();
    }
    console.info('DB successfully Connected...');
    // await dbConnection.runMigrations();
    // console.info('Migrations completed...');
  } catch (e) {
    console.error(e);
    console.error('DB Error: DB is not connected!');
    process.exit(1);
  }
};

export { handleDBConnect };
