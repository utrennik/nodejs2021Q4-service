import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import getRepo from '../common/getrepo';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { UpdateUserReturnDto } from './dto/update-user-return.dto';

@Injectable()
export class UsersService {
  public repo: Repository<User>;

  constructor() {
    this.repo = getRepo(User);
  }

  /**
   * Adds a User to repository
   * @param createUserDto CreateUserDto
   * @returns added User (Promise)
   */
  async create(createUserDto: CreateUserDto): Promise<UpdateUserReturnDto> {
    const newUser = await this.repo.create(createUserDto);

    await this.repo.save(newUser);

    const userDataToReturn = new UpdateUserReturnDto({ ...newUser });

    return userDataToReturn;
  }

  /**
   * Returns all Users in the repo (Promise)
   * @returns All Users (Promise)
   */
  async findAll(): Promise<User[]> {
    const users = await this.repo.find({ where: {} });

    return users;
  }

  /**
   * Returns the User by User id
   * @param id User id
   * @returns User with given id (Promise) or null if not found
   */
  async findOne(id: string): Promise<User> {
    const resultUser: User | undefined = await this.repo.findOne(id);

    if (!resultUser)
      throw new NotFoundException(`User with id:${id} not found`);

    return resultUser;
  }

  /**
   * Updates a User by id
   * @param id id of the User to get updated
   * @param updateUserDto data to update User
   * @returns updated User or null if not found (Promise)
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserReturnDto> {
    const resultUser: User | undefined = await this.repo.findOne(id);

    if (!resultUser)
      throw new NotFoundException(`User with id:${id} not found`);

    await this.repo.update(id, updateUserDto);

    const updatedUser = await this.repo.findOne(id);

    if (!updatedUser)
      throw new InternalServerErrorException(
        `Error while updating user id:${id}`,
      );

    const userDataToReturn = new UpdateUserReturnDto({ ...updatedUser });

    return userDataToReturn;
  }

  /**
   * Removes a User from the repository
   * @param id id of the User to be deleted
   * @returns true if the User is deleted or false if not found (Promise)
   */
  async remove(id: string): Promise<void> {
    const resultUser: User | undefined = await this.repo.findOne(id);

    if (!resultUser)
      throw new NotFoundException(`User with id:${id} not found`);

    const deleteResult = await this.repo.delete(id);

    if (!deleteResult.affected)
      throw new InternalServerErrorException(
        `Error: user id:${id} has not been deleted`,
      );
  }
}
