import { IBoardData } from './types';
import Board from './board-model';

const boards: Board[] = [];

/**
 * Returns all Boards in the repo (Promise)
 * @returns All Boards (Promise)
 */
const getAllBoards = async (): Promise<Board[]> => boards;

/**
 * Returns the Board by Board id
 * @param id Board id
 * @returns Board or null if not found (Promise)
 */
const getBoardByID = async (id: string): Promise<Board | null> => {
  const resultBoard: Board | undefined = boards.find(
    (board) => board.id === id
  );
  return resultBoard || null;
};

/**
 * Adds a Board to repository
 * @param board board object
 * @returns added board (Promise)
 */
const postBoard = async (board: Board): Promise<Board> => {
  boards.push(board);
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
  let boardIndex: number | undefined;

  const oldBoardData: Board | undefined = boards.find((board, i) => {
    if (board.id === id) {
      boardIndex = i;
      return true;
    }
    return false;
  });

  if (boardIndex !== undefined && oldBoardData) {
    boards[boardIndex] = { ...oldBoardData, ...newBoardData };
    return boards[boardIndex];
  }

  return null;
};

/**
 * Deletes a board from the repository
 * @param id id of the board to be deleted
 * @returns true if the board is deleted or false if not found (Promise)
 */
const deleteBoard = async (id: string): Promise<boolean> => {
  const boardIndex: number = boards.findIndex((board) => board.id === id);

  if (boardIndex !== -1) {
    boards.splice(boardIndex, 1);
    return true;
  }
  return false;
};

export default {
  getAllBoards,
  getBoardByID,
  postBoard,
  updateBoard,
  deleteBoard,
};
