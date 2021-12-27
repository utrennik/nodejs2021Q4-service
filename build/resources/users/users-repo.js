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
const users = [];
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return users; });
const getUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () { return users.find((user) => user.id === id); });
const postUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    users.push(user);
    return user;
});
const updateUser = (id, newUserData) => __awaiter(void 0, void 0, void 0, function* () {
    let userIndex;
    const oldUserData = users.find((user, i) => {
        if (user.id === id) {
            userIndex = i;
            return true;
        }
        return false;
    });
    if (userIndex !== undefined) {
        users[userIndex] = Object.assign(Object.assign({}, oldUserData), newUserData);
        return users[userIndex];
    }
    return null;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return true;
    }
    return false;
});
module.exports = { getAllUsers, getUserByID, postUser, updateUser, deleteUser };
