import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'task' })
export default class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'integer' })
  order?: number | null;

  @Column({ nullable: true, type: 'text' })
  description?: string | null;

  @Column({ nullable: true, type: 'text' })
  userId?: string | null;

  @Column({ nullable: true, type: 'text' })
  boardId?: string | null;

  @Column({ nullable: true, type: 'text' })
  columnId?: string | null;
}
