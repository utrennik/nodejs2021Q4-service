import * as uuid from 'uuid';
import { Task } from '../tasks/tasks-model';

export class Column {
  id: string;

  title: string;

  tasks: Task[];

  constructor({ id = uuid.v4(), title = 'My Column', tasks = [] } = {}) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }
}
