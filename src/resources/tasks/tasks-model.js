const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'New Task',
    order,
    description,
    userId = null,
    boardId,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
