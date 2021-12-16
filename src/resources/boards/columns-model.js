const uuid = require('uuid');

class Column {
  constructor({ id = uuid.v4(), title = 'My Column', tasks = [] } = {}) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }
}

module.exports = Column;
