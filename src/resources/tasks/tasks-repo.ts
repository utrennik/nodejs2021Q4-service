import { ITaskData } from './types';
import Task from './tasks-model';

let tasks: Task[] = [];

/**
 * Returns the Tasks by Board id
 * @param id Board id
 * @returns Array of Tasks or null if there are no Tasks (Promise)
 */
const getTasksByBoardId = async (id: string): Promise<Task[] | null> => {
  const resultTasks: Task[] = tasks.filter((task) => task.boardId === id);

  return resultTasks.length === 0 ? null : resultTasks;
};

/**
 * Deletes the Task by id
 * @param id Task id
 * @returns void (Promise)
 */
const deleteTasksByBoardId = async (id: string): Promise<void> => {
  const newTasks: Task[] = tasks.filter((task) => task.boardId !== id);
  tasks = newTasks;
};

/**
 * Unassigns Tasks associated with User by userId
 * @param id User id
 * @returns void (Promise)
 */
const unassignTasks = async (userId: string): Promise<void> => {
  const newTasks: Task[] = tasks.map((task) => {
    if (task.userId === userId) return { ...task, userId: null };
    return task;
  });

  tasks = newTasks;
};

/**
 * Returns the Task by Board id and Task id
 * @param boardId Board id to find the Task
 * @param taskId  Task id
 * @returns Task or null (Promise)
 */
const getTask = async (
  boardId: string,
  taskId: string
): Promise<Task | null> => {
  const resultTask: Task | undefined = tasks.find(
    (task) => task.boardId === boardId && task.id === taskId
  );

  return resultTask || null;
};

/**
 * Adds a new Task
 * @param task Task data object
 * @returns created Task (Promise)
 */
const postTask = async (task: Task): Promise<Task> => {
  tasks.push(task);

  return task;
};

/**
 * Updates an existing task
 * @param boardId id of the Board to find a Task
 * @param taskId id of the Task to update
 * @param newTaskData data to update the Task
 * @returns updated Task on success or null if not found (Promise)
 */
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

/**
 * Deletes the task
 * @param boardId id of the Board to find a Task
 * @param taskId id of the Task to delete
 * @returns true if deleted or false if not found (Promise)
 */
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
