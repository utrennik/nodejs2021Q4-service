const users = [
  {
    id: '1',
    name: 'Alex',
    login: 'Ligon',
    password: 'passw',
  },
];

const getAllUsers = async () => users;

const getUserByID = async (id) => users.find((user) => user.id === id);

const addUser = async (user) => {
  users.push(user);
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

  if (userIndex) {
    users[userIndex] = { ...oldUserData, ...newUserData };
    return users[userIndex];
  }

  return false;
};

const deleteUser = async (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== 1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
};

module.exports = { getAllUsers, getUserByID, addUser, updateUser, deleteUser };
