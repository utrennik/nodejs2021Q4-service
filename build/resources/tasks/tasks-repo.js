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
let tasks = [];
const getTasksByBoardId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resultTasks = tasks.filter((task) => task.boardId === id);
    return resultTasks.length === 0 ? null : resultTasks;
});
const deleteTasksByBoardId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newTasks = tasks.filter((task) => task.boardId !== id);
    tasks = newTasks;
});
const unassignTasks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newTasks = tasks.map((task) => {
        if (task.userId === userId)
            return Object.assign(Object.assign({}, task), { userId: null });
        return task;
    });
    tasks = newTasks;
});
const getTask = (boardId, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const resultTask = tasks.find((task) => task.boardId === boardId && task.id === taskId);
    return resultTask;
});
const postTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    tasks.push(task);
    return task;
});
const updateTask = (boardId, taskId, newTaskData) => __awaiter(void 0, void 0, void 0, function* () {
    let taskIndex;
    const oldTaskData = tasks.find((task, i) => {
        if (task.id === taskId && task.boardId === boardId) {
            taskIndex = i;
            return true;
        }
        return false;
    });
    if (taskIndex !== undefined) {
        tasks[taskIndex] = Object.assign(Object.assign({}, oldTaskData), newTaskData);
        return tasks[taskIndex];
    }
    return null;
});
const deleteTask = (boardId, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const taskIndex = tasks.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        return true;
    }
    return false;
});
module.exports = {
    getTasksByBoardId,
    getTask,
    postTask,
    updateTask,
    deleteTask,
    deleteTasksByBoardId,
    unassignTasks,
};
