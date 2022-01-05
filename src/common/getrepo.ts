import { getConnection, EntityTarget, Repository } from 'typeorm';
import UserEntity from '../entities/user-entity';
import ormConfig from './ormconfig';

/**
 * Gets the Database repository by entity
 * @param entity Entity to get the repository
 * @returns Database Repository for the Entity
 */
const getRepo = (entity: EntityTarget<UserEntity>): Repository<UserEntity> => {
  const connection = getConnection(ormConfig.name);
  const repo = connection.getRepository(entity);
  return repo;
};

export default getRepo;
