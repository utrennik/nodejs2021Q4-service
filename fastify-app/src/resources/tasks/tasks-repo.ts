import { ITaskData } from './types';
import Task from './tasks-model';
import TaskEntity from '../../entities/task-entity';
import getRepo from '../../common/getrepo';

/**
 * Returns the Tasks by Board id
 * @param id Board id
 * @returns Array of Tasks or null if there are no Tasks (Promise)
 */
const getTasksByBoardId = async (id: string): Promise<Task[] | null> => {
  const repo = getRepo(TaskEntity);

  const resultTasks: Task[] = await repo.find({ boardId: id });

  return resultTasks.length === 0 ? null : resultTasks;
};

/**
 * Deletes the Task by id
 * @param id Task id
 * @returns void (Promise)
 */
const deleteTasksByBoardId = async (id: string): Promise<boolean> => {
  const repo = getRepo(TaskEntity);

  const deleteResult = await repo.delete({ boardId: id });

  return !!deleteResult.affected;
};

/**
 * Unassigns Tasks associated with User by userId
 * @param userId User id
 * @returns void (Promise)
 */
const unassignTasks = async (userId: string): Promise<void> => {
  const repo = getRepo(TaskEntity);

  await repo.update({ userId }, { userId: null });
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
  const repo = getRepo(TaskEntity);

  const resultTask = await repo.findOne({ boardId, id: taskId });

  return resultTask || null;
};

/**
 * Adds a new Task
 * @param task Task data object
 * @returns created Task (Promise)
 */
const postTask = async (task: Task): Promise<Task> => {
  const repo = getRepo(TaskEntity);

  const newTask = await repo.create(task);

  await repo.save(newTask);

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
): Promise<Task | null> => {
  const repo = getRepo(TaskEntity);

  const resultTask: Task | undefined = await repo.findOne({
    boardId,
    id: taskId,
  });

  if (!resultTask) return null;

  await repo.update(resultTask.id, newTaskData);

  const updatedTask = await repo.findOne({ boardId, id: taskId });

  return updatedTask || null;
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
  const repo = getRepo(TaskEntity);

  const deleteResult = await repo.delete({ boardId, id: taskId });

  return !!deleteResult.affected;
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
