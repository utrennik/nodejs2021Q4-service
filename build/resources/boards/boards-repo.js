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
const boards = [];
const getAllBoards = () => __awaiter(void 0, void 0, void 0, function* () { return boards; });
const getBoardByID = (id) => __awaiter(void 0, void 0, void 0, function* () { return boards.find((board) => board.id === id); });
const postBoard = (board) => __awaiter(void 0, void 0, void 0, function* () {
    boards.push(board);
    return board;
});
const updateBoard = (id, newBoardData) => __awaiter(void 0, void 0, void 0, function* () {
    let boardIndex;
    const oldBoardData = boards.find((board, i) => {
        if (board.id === id) {
            boardIndex = i;
            return true;
        }
        return false;
    });
    if (boardIndex !== undefined) {
        boards[boardIndex] = Object.assign(Object.assign({}, oldBoardData), newBoardData);
        return boards[boardIndex];
    }
    return null;
});
const deleteBoard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const boardIndex = boards.findIndex((board) => board.id === id);
    if (boardIndex !== -1) {
        boards.splice(boardIndex, 1);
        return true;
    }
    return false;
});
module.exports = {
    getAllBoards,
    getBoardByID,
    postBoard,
    updateBoard,
    deleteBoard,
};
