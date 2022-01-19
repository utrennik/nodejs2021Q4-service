import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [UsersModule, TasksModule, BoardsModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
