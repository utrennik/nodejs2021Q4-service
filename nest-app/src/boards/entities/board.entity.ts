/* eslint import/no-cycle: 0 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import ColumnEntity from './column.entity';

@Entity({ name: 'board' })
export default class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, {
    cascade: true,
  })
  columns: ColumnEntity[];
}
