const tasks = [];

const getTasksByBoardId = async (id) => {
  const resultTasks = tasks.map((task) => task.boardId === id);

  return resultTasks.length === 0 ? null : resultTasks;
};

const getTask = async (boardId, taskId) => {
  const resultTask = tasks.find(
    (task) => task.boardId === boardId && task.id === taskId
  );

  return resultTask;
};

const postTask = async (task) => {
  tasks.push(task);
  return task;
};

const updateTask = async (boardId, taskId, newTaskData) => {
  let taskIndex;

  const oldTaskData = tasks.find((task, i) => {
    if (task.id === taskId && task.boardId === boardId) {
      taskIndex = i;
      return true;
    }
    return false;
  });

  if (taskIndex !== undefined) {
    tasks[taskIndex] = { ...oldTaskData, ...newTaskData };
    return tasks[taskIndex];
  }

  return null;
};

const deleteTask = async (boardId, taskId) => {
  const taskIndex = tasks.findIndex(
    (task) => task.id === taskId && task.boardId === boardId
  );
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
};

module.exports = {
  getTasksByBoardId,
  getTask,
  postTask,
  updateTask,
  deleteTask,
};
