"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require("fastify");
const usersRouter = require("./resources/users/users-router");
const boardsRouter = require("./resources/boards/boards-router");
const tasksRouter = require("./resources/tasks/tasks-router");
const app = fastify.default({ logger: true });
app.register(usersRouter, { prefix: '/users' });
app.register(boardsRouter, { prefix: '/boards' });
app.register(tasksRouter, { prefix: '/boards' });
module.exports = app;
