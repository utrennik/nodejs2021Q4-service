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
const tasksRepo = require('./tasks-repo');
const boardsRepo = require('../boards/boards-repo');
const Task = require('./tasks-model');
const getTasksByBoardId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    const tasks = yield tasksRepo.getTasksByBoardId(boardId);
    if (!tasks)
        res
            .status(404)
            .send(new Error(`There are no tasks with board ID ${boardId}`));
    res.send(tasks);
});
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId, taskId } = req.params;
    const task = yield tasksRepo.getTask(boardId, taskId);
    if (!task)
        res
            .status(404)
            .send(new Error(`Task with ID ${taskId} on board with ID ${boardId} not found!`));
    res.send(task);
});
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    const task = new Task(Object.assign(Object.assign({}, req.body), { boardId }));
    const board = boardsRepo.getBoardByID(task.boardId);
    if (!board)
        res.status(400).send(new Error(`Board with ID ${boardId} not found!`));
    const createdTask = yield tasksRepo.postTask(task);
    res.status(201).send(createdTask);
});
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId, taskId } = req.params;
    const dataToUpdate = req.body;
    const board = boardsRepo.getBoardByID(boardId);
    if (!board)
        res.status(400).send(new Error(`Board with ID ${boardId} not found!`));
    const updatedTask = yield tasksRepo.updateTask(boardId, taskId, dataToUpdate);
    if (!updatedTask)
        res.status(404).send(new Error(`Task with ID ${taskId} not found!`));
    res.send(updatedTask);
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId, taskId } = req.params;
    const board = boardsRepo.getBoardByID(boardId);
    if (!board)
        res.status(400).send(new Error(`Board with ID ${boardId} not found!`));
    const isDeleted = yield tasksRepo.deleteTask(boardId, taskId);
    if (!isDeleted)
        res.status(404).send(new Error(`Task with ID ${taskId} doesn't exist`));
    res.status(204).send();
});
module.exports = {
    getTasksByBoardId,
    getTask,
    postTask,
    updateTask,
    deleteTask,
};
