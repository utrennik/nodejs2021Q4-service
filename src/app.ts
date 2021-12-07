import { fastify } from 'fastify';
import usersRouter from './resources/users/users-router';
import boardsRouter from './resources/boards/boards-router';
import tasksRouter from './resources/tasks/tasks-router';

const app = fastify({ logger: true });

app.register(usersRouter, { prefix: '/users' });
app.register(boardsRouter, { prefix: '/boards' });
app.register(tasksRouter, { prefix: '/boards' });

export default app;
