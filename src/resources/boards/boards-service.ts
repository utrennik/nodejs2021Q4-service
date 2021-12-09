import { FastifyRequest, FastifyReply } from 'fastify';
import boardsRepo from './boards-repo';
import tasksRepo from '../tasks/tasks-repo';
import Board from './board-model';
import {
  IGetBoardByIDRequest,
  IPostBoardRequest,
  IUpdateBoardRequest,
  IBoardData,
  IDeleteBoardRequest,
} from './types';

/**
 * Sends all Boards to the client (Promise)
 * @param req FastifyRequest (client request)
 * @param res FastifyReply (server reply)
 * @returns Promise<void>
 */
const getAllBoards = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  const allBoards: Board[] = await boardsRepo.getAllBoards();
  res.send(allBoards);
};

/**
 * Sends the Board by Board id to the client
 * @param req FastifyRequest (client request with id param)
 * @param res FastifyReply (server reply)
 * @returns Promise<void>
 */
const getBoardByID = async (
  req: FastifyRequest<IGetBoardByIDRequest>,
  res: FastifyReply
): Promise<void> => {
  const { id } = req.params;

  const board: Board | null = await boardsRepo.getBoardByID(id);
  if (!board)
    res.status(404).send(new Error(`Board with ID ${id} doesn't exist`));

  res.send(board);
};

/**
 * Posts the board from the client to the server
 * @param req FastifyRequest (client request with board data)
 * @param res FastifyReply (server reply)
 * @returns Promise<void>
 */
const postBoard = async (
  req: FastifyRequest<IPostBoardRequest>,
  res: FastifyReply
): Promise<void> => {
  const { title, columns } = req.body;

  const board = new Board({ title, columns });

  const createdBoard = await boardsRepo.postBoard(board);

  res.status(201).send(createdBoard);
};

/**
 * Updates the Board with data from the client
 * @param req FastifyRequest (client request with id of the Board param and with Board data to update in body)
 * @param res FastifyReply (server reply)
 * @returns Promise<void>
 */
const updateBoard = async (
  req: FastifyRequest<IUpdateBoardRequest>,
  res: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  const dataToUpdate: IBoardData = req.body;

  const updatedBoard: Board | null = await boardsRepo.updateBoard(
    id,
    dataToUpdate
  );
  if (!updatedBoard)
    res.status(404).send(new Error(`Board with ID ${id} doesn't exist`));

  res.send(updatedBoard);
};

/**
 * Deletes the Board by id
 * @param req FastifyRequest (client request with id of the board param)
 * @param res FastifyReply (server reply)
 * @returns Promise<void>
 */
const deleteBoard = async (
  req: FastifyRequest<IDeleteBoardRequest>,
  res: FastifyReply
) => {
  const { id } = req.params;

  const isDeleted: boolean = await boardsRepo.deleteBoard(id);

  if (!isDeleted)
    res.status(404).send(new Error(`Board with ID ${id} doesn't exist`));
  await tasksRepo.deleteTasksByBoardId(id);
  res.status(204).send();
};

export { getAllBoards, getBoardByID, postBoard, updateBoard, deleteBoard };
