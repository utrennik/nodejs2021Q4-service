import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import config from '../common/config';
import { ValidationPipe } from '../common/validation.pipe';
import { UsersService } from './users.service';
import { TasksService } from '../tasks/tasks.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from "../auth/auth.guard";

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {
    // Initial admin for tests
    const adminDto: CreateUserDto = {
      name: 'admin',
      login: 'admin',
      password: 'admin',
    };

    (async () => {
      const admin = await this.usersService.findOneByLogin(adminDto.login);
      if (!admin) await this.usersService.create(adminDto);
    })();
  }

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(config.HTTP_CODES.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);

    await this.tasksService.unassgnTasks(id);
  }
}
