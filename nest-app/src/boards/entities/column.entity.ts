/* eslint import/no-cycle: 0 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import BoardEntity from './board.entity';

@Entity({ name: 'column' })
export default class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'integer', nullable: true })
  order: number | null;

  @ManyToOne(() => BoardEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board: BoardEntity;
}
