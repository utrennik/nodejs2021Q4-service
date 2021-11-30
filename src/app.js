const app = require('fastify').default({ logger: true });
const usersRouter = require('./resources/users/users-router');

app.register(usersRouter, { prefix: '/users' });

module.exports = app;
