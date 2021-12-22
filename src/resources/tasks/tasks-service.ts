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
import ClientError from '../../errors/client-error';
import config from '../../common/config';

const codes = config.HTTP_CODES;

/**
 * Sends the Tasks by Board id to the client
 * @param req FastifyRequest (client request with boardId param)
 * @param res FastifyReply (server reply)
 * @returns Promise<void>
 */
const getTasksByBoardId = async (
  req: FastifyRequest<IGetTasksByBoardIdRequest>,
  res: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;
  const tasks: Task[] | null = await tasksRepo.getTasksByBoardId(boardId);

  if (!tasks) {
    throw new ClientError(
      `There are no tasks with board ID ${boardId}`,
      codes.NOT_FOUND
    );
  }

  res.send(tasks);
};

/**
 * Sends the Task by Board id and Task id to the client
 * @param req FastifyRequest (client request with boardId and taskId params)
 * @param res FastifyReply (server reply)
 * @returns Promise<void>
 */
const getTask = async (
  req: FastifyRequest<IGetTaskRequest>,
  res: FastifyReply
): Promise<void> => {
  const { boardId, taskId } = req.params;

  const task: Task | null = await tasksRepo.getTask(boardId, taskId);

  if (!task) {
    throw new ClientError(
      `Task with ID ${taskId} on board with ID ${boardId} not found!`,
      codes.NOT_FOUND
    );
  }

  res.send(task);
};

/**
 * Posts the new Task to the server
 * @param req FastifyRequest (client request with boardId param and Task data object in the body)
 * @param res FastifyReply (server reply)
 * @returns Promise<void>
 */
const postTask = async (
  req: FastifyRequest<IPostTaskRequest>,
  res: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;

  const task: Task = new Task({ ...req.body, boardId });

  const board: Board | null = await boardsRepo.getBoardByID(
    task.boardId as string
  );

  if (!board) {
    throw new ClientError(
      `Board with ID ${boardId} not found!`,
      codes.NOT_FOUND
    );
  }
  const createdTask: Task = await tasksRepo.postTask(task);
  res.status(codes.CREATED).send(createdTask);
};

/**
 * Updates an existing Task on the server
 * @param req FastifyRequest (client request with boardId and taskId params, and Task update data object in the body)
 * @param res FastifyReply (server reply)
 * @returns Promise<void>
 */
const updateTask = async (
  req: FastifyRequest<IUpdateTaskRequest>,
  res: FastifyReply
): Promise<void> => {
  const { boardId, taskId } = req.params;
  const dataToUpdate = req.body;

  const board: Board | null = await boardsRepo.getBoardByID(boardId);

  if (!board) {
    throw new ClientError(
      `Board with ID ${boardId} not found!`,
      codes.NOT_FOUND
    );
  }

  const updatedTask: Task | null = await tasksRepo.updateTask(
    boardId,
    taskId,
    dataToUpdate
  );

  if (!updatedTask) {
    throw new ClientError(`Task with ID ${taskId} not found!`, codes.NOT_FOUND);
  }

  res.send(updatedTask);
};

/**
 * Deletes the existing Task on the server
 * @param req FastifyRequest (client request with boardId and taskId params)
 * @param res FastifyReply (server reply)
 * @returns Promise<void>
 */
const deleteTask = async (
  req: FastifyRequest<IDeleteTaskRequest>,
  res: FastifyReply
) => {
  const { boardId, taskId } = req.params;

  const board: Board | null = await boardsRepo.getBoardByID(boardId);

  if (!board) {
    throw new ClientError(
      `Board with ID ${boardId} not found!`,
      codes.NOT_FOUND
    );
  }

  const isDeleted: boolean = await tasksRepo.deleteTask(boardId, taskId);

  if (!isDeleted) {
    throw new ClientError(
      `Task with ID ${taskId} doesn't exist`,
      codes.NOT_FOUND
    );
  }

  res.status(codes.NO_CONTENT).send();
};

export { getTasksByBoardId, getTask, postTask, updateTask, deleteTask };
