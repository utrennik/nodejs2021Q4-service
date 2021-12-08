import { FastifyReply, FastifyRequest } from 'fastify';
import tasksRepo from '../tasks/tasks-repo';
import usersRepo from './users-repo';
import User from './user-model';
import {
  IDeleteUserRequest,
  IGetUserByIdRequest,
  IPostUserRequest,
  IUpdateUserRequest,
  IUserData,
} from './types';

const getAllUsers = async (req: FastifyRequest, res: FastifyReply) => {
  const allUsers = await usersRepo.getAllUsers();
  res.send(allUsers);
};

const getUserByID = async (
  req: FastifyRequest<IGetUserByIdRequest>,
  res: FastifyReply
): Promise<void> => {
  const { id } = req.params;

  const user: User | null = await usersRepo.getUserByID(id);

  if (!user)
    res.status(404).send(new Error(`User with ID ${id} doesn't exist`));

  res.send(user);
};

const postUser = async (
  req: FastifyRequest<IPostUserRequest>,
  res: FastifyReply
): Promise<void> => {
  const user = new User({ ...req.body });

  const createdUser: User = await usersRepo.postUser(user);
  res.status(201).send(createdUser);
};

const updateUser = async (
  req: FastifyRequest<IUpdateUserRequest>,
  res: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  const dataToUpdate: IUserData = req.body;

  const updatedUser: User | null = await usersRepo.updateUser(id, dataToUpdate);

  if (!updatedUser)
    res.status(404).send(new Error(`User with ID ${id} doesn't exist`));

  res.send(updatedUser);
};

const deleteUser = async (
  req: FastifyRequest<IDeleteUserRequest>,
  res: FastifyReply
): Promise<void> => {
  const { id } = req.params;

  const isDeleted: boolean = await usersRepo.deleteUser(id);

  if (!isDeleted)
    res.status(404).send(new Error(`User with ID ${id} doesn't exist`));

  await tasksRepo.unassignTasks(id);

  res.status(204).send();
};

export { getAllUsers, getUserByID, postUser, updateUser, deleteUser };
