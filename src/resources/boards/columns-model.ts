import * as uuid from 'uuid';

export default class Column {
  id: string;

  title: string;

  order: number | null;

  constructor({
    id = uuid.v4(),
    title = 'My Column',
    order = null as number | null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
