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
const usersRepo = require('./users-repo');
const { unassignTasks } = require('../tasks/tasks-repo');
const User = require('./user-model');
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield usersRepo.getAllUsers();
    res.send(allUsers);
});
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield usersRepo.getUserByID(id);
    if (!user)
        res.status(404).send(new Error(`User with ID ${id} doesn't exist`));
    res.send(user);
});
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User(Object.assign({}, req.body));
    const createdUser = yield usersRepo.postUser(user);
    res.status(201).send(createdUser);
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const updatedUser = yield usersRepo.updateUser(id, dataToUpdate);
    if (!updatedUser)
        res.status(404).send(new Error(`User with ID ${id} doesn't exist`));
    res.send(updatedUser);
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isDeleted = yield usersRepo.deleteUser(id);
    if (!isDeleted)
        res.status(404).send(new Error(`User with ID ${id} doesn't exist`));
    yield unassignTasks(id);
    res.status(204).send();
});
module.exports = { getAllUsers, getUserByID, postUser, updateUser, deleteUser };
