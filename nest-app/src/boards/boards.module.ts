import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { TasksService } from '../tasks/tasks.service';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import Board from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), TasksModule],
  controllers: [BoardsController],
  providers: [BoardsService, TasksService],
})
export class BoardsModule {}
