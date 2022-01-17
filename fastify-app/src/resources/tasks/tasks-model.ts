import * as uuid from 'uuid';

export default class Task {
  id: string;

  title: string;

  order: number | null;

  description: string | null;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    id = uuid.v4(),
    title = 'New Task',
    order = null as number | null,
    description = null as string | null,
    userId = null as string | null,
    boardId = null as string | null,
    columnId = null as string | null,
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
