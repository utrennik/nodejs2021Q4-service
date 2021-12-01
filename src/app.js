const app = require('fastify').default({ logger: true });
const usersRouter = require('./resources/users/users-router');
const boardsRouter = require('./resources/boards/boards-router');

app.register(usersRouter, { prefix: '/users' });
app.register(boardsRouter, { prefix: '/boards' });

module.exports = app;
