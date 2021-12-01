const boards = [];

const getAllBoards = async () => boards;

const getBoardByID = async (id) => boards.find((board) => board.id === id);

const postBoard = async (board) => {
  boards.push(board);
  return board;
};

const updateBoard = async (id, newBoardData) => {
  let boardIndex;

  const oldBoardData = boards.find((board, i) => {
    if (board.id === id) {
      boardIndex = i;
      return true;
    }
    return false;
  });

  if (boardIndex !== undefined) {
    boards[boardIndex] = { ...oldBoardData, ...newBoardData };
    return boards[boardIndex];
  }

  return null;
};

const deleteBoard = async (id) => {
  const boardIndex = boards.findIndex((board) => board.id === id);
  if (boardIndex !== 1) {
    boards.splice(boardIndex, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAllBoards,
  getBoardByID,
  postBoard,
  updateBoard,
  deleteBoard,
};
