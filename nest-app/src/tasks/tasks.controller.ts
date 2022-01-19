import { ValidationPipe } from './../common/validation.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  create(
    @Param('boardId') boardId: string,
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get(':boardId/tasks')
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':boardId/tasks/:taskId')
  findOne(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    return this.tasksService.findOne(boardId, taskId);
  }

  @Patch(':boardId/tasks/:taskId')
  update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(boardId, taskId, updateTaskDto);
  }

  @Delete(':boardId/tasks/:taskId')
  remove(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    return this.tasksService.remove(boardId, taskId);
  }
}
