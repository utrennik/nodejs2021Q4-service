import * as uuid from 'uuid';
import Column from './columns-model';

export default class Board {
  id: string;

  title: string;

  columns: Column[];

  constructor({
    id = uuid.v4(),
    title = 'My Board',
    columns = [] as Column[],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
