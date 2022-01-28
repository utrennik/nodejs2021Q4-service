import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Task from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
  ) {}

  /**
   * Adds a new Task
   * @param task Task data object
   * @returns created Task (Promise)
   */
  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const newTaskData = { ...createTaskDto, boardId };

    const newTask = await this.repo.create(newTaskData);

    await this.repo.save(newTask);

    return newTask;
  }

  /**
   * Returns the Tasks by Board id
   * @param boardId Board id
   * @returns Array of Tasks (Promise)
   */
  async findAll(boardId: string): Promise<Task[]> {
    const resultTasks: Task[] = await this.repo.find({ boardId });

    return resultTasks;
  }

  /**
   * Returns the Task by Board id and Task id
   * @param boardId Board id to find the Task
   * @param taskId  Task id
   * @returns Task (Promise)
   * @throws NotFoundException if the task not found
   */
  async findOne(boardId: string, taskId: string): Promise<Task> {
    const resultTask = await this.repo.findOne({ boardId, id: taskId });

    if (!resultTask) throw new NotFoundException(`Task not found`);
    return resultTask;
  }

  /**
   * Updates an existing task
   * @param boardId id of the Board to find a Task
   * @param taskId id of the Task to update
   * @param updateTaskDto data to update the Task
   * @returns updated Task (Promise)
   * @throws NotFoundException if the task not found
   */
  async update(
    boardId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const resultTask: Task | undefined = await this.repo.findOne({
      boardId,
      id: taskId,
    });

    if (!resultTask) throw new NotFoundException(`Task to update not found`);

    await this.repo.update(resultTask.id, updateTaskDto);

    const updatedTask = await this.repo.findOne({ boardId, id: taskId });

    return updatedTask;
  }

  /**
   * Removes the task
   * @param boardId id of the Board to find a Task
   * @param taskId id of the Task to delete
   * @returns void (Promise)
   * @throws NotFoundException if the Task not found
   */
  async remove(boardId: string, taskId: string): Promise<void> {
    const deleteResult = await this.repo.delete({ boardId, id: taskId });

    if (!deleteResult.affected)
      throw new NotFoundException(`Task to remove not found`);
  }

  /**
   * Removes the Task by id
   * @param boardId Board id
   * @returns void (Promise)
   */
  async removeByBoardId(boardId: string): Promise<void> {
    await this.repo.delete({ boardId });
  }

  /**
   * Unassigns Tasks associated with User by userId
   * @param userId User id
   * @returns void (Promise)
   */
  async unassgnTasks(userId: string): Promise<void> {
    await this.repo.update({ userId }, { userId: null });
  }
}
