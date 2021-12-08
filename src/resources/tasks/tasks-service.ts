import { FastifyRequest, FastifyReply } from 'fastify';
import tasksRepo from './tasks-repo';
import boardsRepo from '../boards/boards-repo';
import Task from './tasks-model';
import {
  IGetTasksByBoardIdRequest,
  IGetTaskRequest,
  IPostTaskRequest,
  IUpdateTaskRequest,
  IDeleteTaskRequest,
} from './types';
import Board from '../boards/board-model';

const getTasksByBoardId = async (
  req: FastifyRequest<IGetTasksByBoardIdRequest>,
  res: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;
  const tasks: Task[] | null = await tasksRepo.getTasksByBoardId(boardId);

  if (!tasks)
    res
      .status(404)
      .send(new Error(`There are no tasks with board ID ${boardId}`));

  res.send(tasks);
};

const getTask = async (
  req: FastifyRequest<IGetTaskRequest>,
  res: FastifyReply
): Promise<void> => {
  const { boardId, taskId } = req.params;

  const task: Task | null = await tasksRepo.getTask(boardId, taskId);

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

const postTask = async (
  req: FastifyRequest<IPostTaskRequest>,
  res: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;

  const task: Task = new Task({ ...req.body, boardId });

  const board: Board | null = await boardsRepo.getBoardByID(
    task.boardId as string
  );

  if (!board)
    res.status(400).send(new Error(`Board with ID ${boardId} not found!`));

  const createdTask: Task = await tasksRepo.postTask(task);

  res.status(201).send(createdTask);
};

const updateTask = async (
  req: FastifyRequest<IUpdateTaskRequest>,
  res: FastifyReply
): Promise<void> => {
  const { boardId, taskId } = req.params;
  const dataToUpdate = req.body;

  const board: Board | null = await boardsRepo.getBoardByID(boardId);

  if (!board)
    res.status(400).send(new Error(`Board with ID ${boardId} not found!`));

  const updatedTask: Task | null = await tasksRepo.updateTask(
    boardId,
    taskId,
    dataToUpdate
  );
  if (!updatedTask)
    res.status(404).send(new Error(`Task with ID ${taskId} not found!`));

  res.send(updatedTask);
};

const deleteTask = async (
  req: FastifyRequest<IDeleteTaskRequest>,
  res: FastifyReply
) => {
  const { boardId, taskId } = req.params;

  const board: Board | null = await boardsRepo.getBoardByID(boardId);

  if (!board)
    res.status(400).send(new Error(`Board with ID ${boardId} not found!`));

  const isDeleted: boolean = await tasksRepo.deleteTask(boardId, taskId);
  if (!isDeleted)
    res.status(404).send(new Error(`Task with ID ${taskId} doesn't exist`));

  res.status(204).send();
};

export { getTasksByBoardId, getTask, postTask, updateTask, deleteTask };
