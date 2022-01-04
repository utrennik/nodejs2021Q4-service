import { Connection, createConnection, getConnection } from 'typeorm';
import ormConfig from './common/ormconfig';

const connectToDB = async () => {
  const CONNECTION_NAME = 'postgres_db_connection';

  let connection: Connection | undefined;

  try {
    connection = getConnection(CONNECTION_NAME);
  } catch (e) {}

  if (!connection) connection = await createConnection(ormConfig);

  if (!connection.isConnected) await connection.connect();

  return connection;
};

const handleDBConnect = async (): Promise<Connection | undefined> => {
  try {
    const connection = await connectToDB();
    console.info('DB successfully connected');
    return connection;
  } catch (e) {
    console.error(e);
    console.error('DB Error: DB is not connected!');
    process.exit(1);
  }
};

export default handleDBConnect;
