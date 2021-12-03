const usersRepo = require('./users-repo');
const { unassignTasks } = require('../tasks/tasks-repo');
const User = require('./user-model');

const getAllUsers = async (req, res) => {
  const allUsers = await usersRepo.getAllUsers();
  res.send(allUsers);
};

const getUserByID = async (req, res) => {
  const { id } = req.params;

  const user = await usersRepo.getUserByID(id);
  if (!user)
    res.status(404).send(new Error(`User with ID ${id} doesn't exist`));

  res.send(user);
};

const postUser = async (req, res) => {
  const user = new User({ ...req.body });

  const createdUser = await usersRepo.postUser(user);
  res.status(201).send(createdUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  const updatedUser = await usersRepo.updateUser(id, dataToUpdate);
  if (!updatedUser)
    res.status(404).send(new Error(`User with ID ${id} doesn't exist`));

  res.send(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const isDeleted = await usersRepo.deleteUser(id);
  if (!isDeleted)
    res.status(404).send(new Error(`User with ID ${id} doesn't exist`));

  await unassignTasks(id);

  res.status(204).send();
};

module.exports = { getAllUsers, getUserByID, postUser, updateUser, deleteUser };
