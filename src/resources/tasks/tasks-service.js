import tasksRepo from './tasks-repo';
import boardsRepo from '../boards/boards-repo';
import { Task } from './tasks-model';

const getTasksByBoardId = async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksRepo.getTasksByBoardId(boardId);

  if (!tasks)
    res
      .status(404)
      .send(new Error(`There are no tasks with board ID ${boardId}`));

  res.send(tasks);
};

const getTask = async (req, res) => {
  const { boardId, taskId } = req.params;

  const task = await tasksRepo.getTask(boardId, taskId);

  if (!task)
    res
      .status(404)
      .send(
        new Error(
          `Task with ID ${taskId} on board with ID ${boardId} not found!`
        )
      );

  res.send(task);
};

const postTask = async (req, res) => {
  const { boardId } = req.params;

  const task = new Task({ ...req.body, boardId });

  const board = boardsRepo.getBoardByID(task.boardId);

  if (!board)
    res.status(400).send(new Error(`Board with ID ${boardId} not found!`));

  const createdTask = await tasksRepo.postTask(task);

  res.status(201).send(createdTask);
};

const updateTask = async (req, res) => {
  const { boardId, taskId } = req.params;
  const dataToUpdate = req.body;

  const board = boardsRepo.getBoardByID(boardId);

  if (!board)
    res.status(400).send(new Error(`Board with ID ${boardId} not found!`));

  const updatedTask = await tasksRepo.updateTask(boardId, taskId, dataToUpdate);
  if (!updatedTask)
    res.status(404).send(new Error(`Task with ID ${taskId} not found!`));

  res.send(updatedTask);
};

const deleteTask = async (req, res) => {
  const { boardId, taskId } = req.params;

  const board = boardsRepo.getBoardByID(boardId);

  if (!board)
    res.status(400).send(new Error(`Board with ID ${boardId} not found!`));

  const isDeleted = await tasksRepo.deleteTask(boardId, taskId);
  if (!isDeleted)
    res.status(404).send(new Error(`Task with ID ${taskId} doesn't exist`));

  res.status(204).send();
};

export { getTasksByBoardId, getTask, postTask, updateTask, deleteTask };
