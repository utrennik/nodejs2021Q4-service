const users = [];

const getAllUsers = async () => users;

const getUserByID = async (id) => users.find((user) => user.id === id);

const postUser = async (user) => {
  users.push(user);
  return user;
};

const updateUser = async (id, newUserData) => {
  let userIndex;

  const oldUserData = users.find((user, i) => {
    if (user.id === id) {
      userIndex = i;
      return true;
    }
    return false;
  });

  if (userIndex !== undefined) {
    users[userIndex] = { ...oldUserData, ...newUserData };
    return users[userIndex];
  }

  return null;
};

const deleteUser = async (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
};

export default { getAllUsers, getUserByID, postUser, updateUser, deleteUser };
