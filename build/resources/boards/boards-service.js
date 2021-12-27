"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const boardsRepo = require('./boards-repo');
const { deleteTasksByBoardId } = require('../tasks/tasks-repo');
const Board = require('./board-model');
const getAllBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBoards = yield boardsRepo.getAllBoards();
    res.send(allBoards);
});
const getBoardByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const board = yield boardsRepo.getBoardByID(id);
    if (!board)
        res.status(404).send(new Error(`Board with ID ${id} doesn't exist`));
    res.send(board);
});
const postBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const board = new Board(Object.assign({}, req.body));
    const createdBoard = yield boardsRepo.postBoard(board);
    res.status(201).send(createdBoard);
});
const updateBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const updatedBoard = yield boardsRepo.updateBoard(id, dataToUpdate);
    if (!updatedBoard)
        res.status(404).send(new Error(`Board with ID ${id} doesn't exist`));
    res.send(updatedBoard);
});
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isDeleted = yield boardsRepo.deleteBoard(id);
    if (!isDeleted)
        res.status(404).send(new Error(`Board with ID ${id} doesn't exist`));
    yield deleteTasksByBoardId(id);
    res.status(204).send();
});
module.exports = {
    getAllBoards,
    getBoardByID,
    postBoard,
    updateBoard,
    deleteBoard,
};
