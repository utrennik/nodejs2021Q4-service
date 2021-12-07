let tasks = [];

const getTasksByBoardId = async (id) => {
  const resultTasks = tasks.filter((task) => task.boardId === id);

  return resultTasks.length === 0 ? null : resultTasks;
};

const deleteTasksByBoardId = async (id) => {
  const newTasks = tasks.filter((task) => task.boardId !== id);
  tasks = newTasks;
};

const unassignTasks = async (userId) => {
  const newTasks = tasks.map((task) => {
    if (task.userId === userId) return { ...task, userId: null };
    return task;
  });

  tasks = newTasks;
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

export default {
  getTasksByBoardId,
  getTask,
  postTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  unassignTasks,
};
