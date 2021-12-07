import { IBoardData } from './types';
import { Board } from './board-model';

const boards: Board[] = [];

const getAllBoards = async (): Promise<Board[]> => boards;

const getBoardByID = async (id: string): Promise<Board | null> => {
  const resultBoard: Board | undefined = boards.find(
    (board) => board.id === id
  );
  return resultBoard || null;
};

const postBoard = async (board: Board): Promise<Board> => {
  boards.push(board);
  return board;
};

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
