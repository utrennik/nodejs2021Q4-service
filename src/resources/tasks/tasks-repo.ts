import { ITaskData } from './types';
import Task from './tasks-model';

let tasks: Task[] = [];

const getTasksByBoardId = async (id: string): Promise<Task[] | null> => {
  const resultTasks: Task[] = tasks.filter((task) => task.boardId === id);

  return resultTasks.length === 0 ? null : resultTasks;
};

const deleteTasksByBoardId = async (id: string): Promise<void> => {
  const newTasks: Task[] = tasks.filter((task) => task.boardId !== id);
  tasks = newTasks;
};

const unassignTasks = async (userId: string): Promise<void> => {
  const newTasks: Task[] = tasks.map((task) => {
    if (task.userId === userId) return { ...task, userId: null };
    return task;
  });

  tasks = newTasks;
};

const getTask = async (
  boardId: string,
  taskId: string
): Promise<Task | null> => {
  const resultTask: Task | undefined = tasks.find(
    (task) => task.boardId === boardId && task.id === taskId
  );

  return resultTask || null;
};

const postTask = async (task: Task): Promise<Task> => {
  tasks.push(task);

  return task;
};

const updateTask = async (
  boardId: string,
  taskId: string,
  newTaskData: ITaskData
) => {
  let taskIndex: number | undefined;

  const oldTaskData: Task | undefined = tasks.find((task, i) => {
    if (task.id === taskId && task.boardId === boardId) {
      taskIndex = i;
      return true;
    }
    return false;
  });

  if (taskIndex !== undefined && oldTaskData) {
    tasks[taskIndex] = { ...oldTaskData, ...newTaskData };
    return tasks[taskIndex];
  }

  return null;
};

const deleteTask = async (
  boardId: string,
  taskId: string
): Promise<boolean> => {
  const taskIndex: number = tasks.findIndex(
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
