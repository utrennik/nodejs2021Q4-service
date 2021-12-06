import fastify = require('fastify');
import usersRouter = require('./resources/users/users-router');
import boardsRouter = require('./resources/boards/boards-router');
import tasksRouter = require('./resources/tasks/tasks-router');

const app = fastify.default({ logger: true });

app.register(usersRouter, { prefix: '/users' });
app.register(boardsRouter, { prefix: '/boards' });
app.register(tasksRouter, { prefix: '/boards' });

module.exports = app;
