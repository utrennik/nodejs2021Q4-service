import { getConnection, EntityTarget, Repository, BaseEntity } from 'typeorm';
import ormConfig from './ormconfig';

/**
 * Gets the Database repository by entity
 * @param entity Entity to get the repository
 * @returns Database Repository for the Entity
 */

const getRepo = <T extends BaseEntity>(
  entity: EntityTarget<T>
): Repository<T> => {
  const connection = getConnection(ormConfig.name);
  const repo = connection.getRepository(entity);
  return repo;
};

export default getRepo;
