import { IUserData } from './types';
import User from './user-model';

const users: User[] = [];

/**
 * Returns all Users in the repo (Promise)
 * @returns All Users (Promise)
 */
const getAllUsers = async (): Promise<User[]> => users;

/**
 * Returns the User by User id
 * @param id User id
 * @returns User with given id (Promise)
 */
const getUserByID = async (id: string): Promise<User | null> => {
  const resultUser: User | undefined = users.find((user) => user.id === id);
  return resultUser || null;
};

/**
 * Adds a User to repository
 * @param user user object
 * @returns added user (Promise)
 */
const postUser = async (user: User): Promise<User> => {
  users.push(user);
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
  let userIndex: number | undefined;

  const oldUserData: User | undefined = users.find((user, i) => {
    if (user.id === id) {
      userIndex = i;
      return true;
    }
    return false;
  });

  if (userIndex !== undefined) {
    users[userIndex] = { ...oldUserData, ...newUserData } as User;
    return users[userIndex];
  }

  return null;
};

/**
 * Deletes a User from the repository
 * @param id id of the User to be deleted
 * @returns true if the User is deleted or false if not found (Promise)
 */
const deleteUser = async (id: string): Promise<boolean> => {
  const userIndex: number = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
};

export default { getAllUsers, getUserByID, postUser, updateUser, deleteUser };
