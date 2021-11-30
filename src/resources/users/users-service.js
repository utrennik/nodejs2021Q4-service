const usersRepo = require('./users-repo');

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

module.exports = { getAllUsers, getUserByID };
