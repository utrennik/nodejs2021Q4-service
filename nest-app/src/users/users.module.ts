import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { TasksService } from '../tasks/tasks.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TasksModule],
  controllers: [UsersController],
  providers: [UsersService, TasksService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
