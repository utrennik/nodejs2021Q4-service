import { IUserData } from './types';
import User from './user-model';

const users: User[] = [];

const getAllUsers = async (): Promise<User[]> => users;

const getUserByID = async (id: string): Promise<User | null> => {
  const resultUser: User | undefined = users.find((user) => user.id === id);
  return resultUser ? resultUser : null;
};

const postUser = async (user: User): Promise<User> => {
  users.push(user);
  return user;
};

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

const deleteUser = async (id: string): Promise<boolean> => {
  const userIndex: number = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
};

export default { getAllUsers, getUserByID, postUser, updateUser, deleteUser };
