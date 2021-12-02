const app = require('fastify').default({ logger: true });
const usersRouter = require('./resources/users/users-router');
const boardsRouter = require('./resources/boards/boards-router');
const tasksRouter = require('./resources/tasks/tasks-router');

app.register(usersRouter, { prefix: '/users' });
app.register(boardsRouter, { prefix: '/boards' });
app.register(tasksRouter, { prefix: '/boards' });

module.exports = app;
