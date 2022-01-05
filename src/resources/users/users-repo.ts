import { IUserData } from './types';
import User from './user-model';
import UserEntity from '../../entities/user-entity';
import getRepo from '../../common/getrepo';

/**
 * Returns all Users in the repo (Promise)
 * @returns All Users (Promise)
 */
const getAllUsers = async (): Promise<User[]> => {
  const repo = getRepo(UserEntity);

  const users = await repo.find({ where: {} });

  return users;
};

/**
 * Returns the User by User id
 * @param id User id
 * @returns User with given id (Promise)
 */
const getUserByID = async (id: string): Promise<User | null> => {
  const repo = getRepo(UserEntity);

  const resultUser: User | undefined = await repo.findOne(id);
  return resultUser || null;
};

/**
 * Adds a User to repository
 * @param user user object
 * @returns added user (Promise)
 */
const postUser = async (user: User): Promise<User> => {
  const repo = getRepo(UserEntity);

  const newUser = await repo.create(user);

  await repo.save(newUser);
  return user;
};

/**
 * Updates a User by id
 * @param id id of the User to get updated
 * @param newUserData data to update User
 * @returns updated User or null if not found (Promise)
 */
const updateUser = async (
  id: string,
  newUserData: IUserData
): Promise<User | null> => {
  const repo = getRepo(UserEntity);

  const resultUser: User | undefined = await repo.findOne(id);

  if (!resultUser) return null;

  await repo.update(id, newUserData);

  const updatedUser = await repo.findOne(id);

  return updatedUser || null;
};

/**
 * Deletes a User from the repository
 * @param id id of the User to be deleted
 * @returns true if the User is deleted or false if not found (Promise)
 */
const deleteUser = async (id: string): Promise<boolean> => {
  const repo = getRepo(UserEntity);

  const deleteResult = await repo.delete(id);

  return !!deleteResult.affected;
};

export default { getAllUsers, getUserByID, postUser, updateUser, deleteUser };
