import { IBoardData } from './types';
import Board from './board-model';
import BoardEntity from '../../entities/board-entity';
import getRepo from '../../common/getrepo';

const BOARD_RELATIONS = { relations: ['columns'] };

/**
 * Returns all Boards in the repo (Promise)
 * @returns All Boards (Promise)
 */
const getAllBoards = async (): Promise<Board[]> => {
  const repo = getRepo(BoardEntity);

  const boards = await repo.find(BOARD_RELATIONS);

  return boards;
};

/**
 * Returns the Board by Board id
 * @param id Board id
 * @returns Board or null if not found (Promise)
 */
const getBoardByID = async (id: string): Promise<Board | null> => {
  const repo = getRepo(BoardEntity);

  const resultBoard = await repo.findOne(id, BOARD_RELATIONS);

  return resultBoard || null;
};

/**
 * Adds a Board to repository
 * @param board board object
 * @returns added board (Promise)
 */
const postBoard = async (board: Board): Promise<Board> => {
  const repo = getRepo(BoardEntity);

  await repo.save(board);

  return board;
};

/**
 * Updates a Board by id
 * @param id id of the Board to get updated
 * @param newBoardData data to update Board
 * @returns updated Board or null if not found (Promise)
 */
const updateBoard = async (
  id: string,
  newBoardData: IBoardData
): Promise<Board | null> => {
  const repo = getRepo(BoardEntity);

  const resultBoard = await repo.findOne(id);

  if (!resultBoard) return null;

  const updatedBoard = { ...resultBoard, ...newBoardData };

  let savedBoard;

  try {
    await repo.save(updatedBoard);
    savedBoard = await repo.findOne(id, BOARD_RELATIONS);
  } catch (e) {
    console.error(`FAILED TO UPDATE BOARD: ${e}`);
  }

  return savedBoard || null;
};

/**
 * Deletes a board from the repository
 * @param id id of the board to be deleted
 * @returns true if the board is deleted or false if not found (Promise)
 */
const deleteBoard = async (id: string): Promise<boolean> => {
  const repo = getRepo(BoardEntity);

  const deleteResult = await repo.delete(id);

  return !!deleteResult.affected;
};

export default {
  getAllBoards,
  getBoardByID,
  postBoard,
  updateBoard,
  deleteBoard,
};
