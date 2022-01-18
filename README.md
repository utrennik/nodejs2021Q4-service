# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker = [Download & Install Docker](https://docs.docker.com/desktop/).

## Downloading

```
git clone {repository URL}
```

# Getting started:

## To start app and database:

```
docker compose up
```

## To run tests and linter please install dependencies locally

```
npm i
```

## Testing

When application is running open new terminal and type:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

### Auto-fix and format

```
npm run lint
```
