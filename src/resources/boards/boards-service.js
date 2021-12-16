const boardsRepo = require('./boards-repo');
const { deleteTasksByBoardId } = require('../tasks/tasks-repo');
const Board = require('./board-model');

const getAllBoards = async (req, res) => {
  const allBoards = await boardsRepo.getAllBoards();
  res.send(allBoards);
};

const getBoardByID = async (req, res) => {
  const { id } = req.params;

  const board = await boardsRepo.getBoardByID(id);
  if (!board)
    res.status(404).send(new Error(`Board with ID ${id} doesn't exist`));

  res.send(board);
};

const postBoard = async (req, res) => {
  const board = new Board({ ...req.body });

  const createdBoard = await boardsRepo.postBoard(board);

  res.status(201).send(createdBoard);
};

const updateBoard = async (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  const updatedBoard = await boardsRepo.updateBoard(id, dataToUpdate);
  if (!updatedBoard)
    res.status(404).send(new Error(`Board with ID ${id} doesn't exist`));

  res.send(updatedBoard);
};

const deleteBoard = async (req, res) => {
  const { id } = req.params;

  const isDeleted = await boardsRepo.deleteBoard(id);
  if (!isDeleted)
    res.status(404).send(new Error(`Board with ID ${id} doesn't exist`));
  await deleteTasksByBoardId(id);
  res.status(204).send();
};

module.exports = {
  getAllBoards,
  getBoardByID,
  postBoard,
  updateBoard,
  deleteBoard,
};
