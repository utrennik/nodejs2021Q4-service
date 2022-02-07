<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

NodeJS2021Q4 service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker = [Download & Install Docker](https://docs.docker.com/desktop/).

## Downloading

```bash
git clone -b nest-app {repository URL}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ docker compose up --build
```

## Test

```bash
# tests with authorization
$ npm run test:auth
```

## Authorization
This application uses Bearer JWT token authentication for authentication to all routes besides `/`, `api` and `/files` (GET method).

To get the JWT token you must send the login and password in http request to `/login`.

## Usage

## Swagger is available at `/api`

- `Files` (`/files` route)
  - `GET /files/:fileNamw` - get the file by fileName (ex. “/files/log.txt”)
  - `POST /files` - upload file (the file should be sent as multipart/formdata, with 'file' key in request body)
  - `DELETE /files/:fileName` - delete file by fileName
- `User` (`/users` route)
  - `GET /users` - get all users
  - `GET /users/:userId` - get the user by id (ex. “/users/123”)
  - `POST /users` - create user
  - `PUT /users/:userId` - update user
  - `DELETE /users/:userId` - delete user
- `Board` (`/boards` route)
  - `GET /boards` - get all boards
  - `GET /boards/:boardId` - get the board by id
  - `POST /boards` - create board
  - `PUT /boards/:boardId` - update board
  - `DELETE /boards/:boardId` - delete board
- `Task` (`boards/:boardId/tasks` route)
  - `GET boards/:boardId/tasks` - get all tasks
  - `GET boards/:boardId/tasks/:taskId` - get the task by id
  - `POST boards/:boardId/tasks` - create task
  - `PUT boards/:boardId/tasks/:taskId` - update task
  - `DELETE boards/:boardId/tasks/:taskId` - delete task

##

# Performance comparsion

## Express

|                    |         |
| ------------------ | ------- |
| http.codes.200:    | 928     |
| http.codes.201:    | 232     |
| http.request_rate: | 106/sec |
| http.requests:     | 1160    |
| http.response_time:
| min: | 1
| max: | 207
| median: | 10.1
| p95: | 44.3
| p99: | 94.6
| http.responses: | 1160
| vusers.completed: | 232
| vusers.created: | 232
| vusers.created_by_name.test /boards: | 232
| vusers.session_length:
| min: | 20.9
| max: | 374.6
| median: | 71.5
| p95: | 194.4
| p99: | 347.3

## Fastify

|                    |        |
| ------------------ | ------ |
| http.codes.200:    | 864    |
| http.codes.201:    | 216    |
| http.request_rate: | 98/sec |
| http.requests:     | 1080   |
| http.response_time:
| min: | 1
| max: | 115
| median: | 7
| p95: | 21.1
| p99: | 55.2
| http.responses: | 1080
| vusers.completed: | 216
| vusers.created: | 216
| vusers.created_by_name.test /boards: | 216
| vusers.session_length:
| min: | 19.2
| max: | 241.9
| median: | 47
| p95: | 106.7
| p99: | 183.1
