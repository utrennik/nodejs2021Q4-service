import { Module } from '@nestjs/common';
import { TasksService } from "../tasks/tasks.service";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TasksService],
})
export class UsersModule {}
