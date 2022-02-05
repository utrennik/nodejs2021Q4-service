import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { UpdateUserReturnDto } from './dto/update-user-return.dto';
import encryptPass from '../auth/encrypt-pass';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  /**
   * Adds a User to repository
   * @param createUserDto CreateUserDto
   * @returns UpdateUserReturnDto (promise)
   * @throws BadRequestException if user with same login exists
   */
  async create(createUserDto: CreateUserDto): Promise<UpdateUserReturnDto> {
    const { login } = createUserDto;

    const userWithSameLogin: User | undefined = await this.findOneByLogin(
      login,
    );

    if (userWithSameLogin)
      throw new BadRequestException(`Error! User with login ${login} exists!`);

    const encryptedPass = await encryptPass(createUserDto.password);

    const newUser = await this.repo.create({
      ...createUserDto,
      password: encryptedPass,
    });

    await this.repo.save(newUser);

    const userDataToReturn = new UpdateUserReturnDto({ ...newUser });

    console.warn(`FOR CROSSCHECK! Saved user data: ${JSON.stringify(newUser)}`);

    return userDataToReturn;
  }

  /**
   * Returns all Users in the repo (Promise)
   * @returns All Users (Promise)
   */
  async findAll(): Promise<UpdateUserReturnDto[]> {
    const users = await this.repo.find({ where: {} });

    const usersToReturn = users.map(
      (user) => new UpdateUserReturnDto({ ...user }),
    );

    return usersToReturn;
  }

  /**
   * Returns the User by User id
   * @param id User id
   * @returns User with given id (Promise)
   * @throws NotFoundException if User is not found
   */
  async findOne(id: string): Promise<UpdateUserReturnDto> {
    const resultUser: User | undefined = await this.repo.findOne(id);

    if (!resultUser)
      throw new NotFoundException(`User with id:${id} not found`);

    const userToReturn = new UpdateUserReturnDto({ ...resultUser });

    return userToReturn;
  }

  /**
   * Updates a User by id
   * @param id id of the User to get updated
   * @param updateUserDto data to update User
   * @returns UpdateUserReturnDto
   * @throws NotFoundException if User not found or InternalServerErrorException if error while updating
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserReturnDto> {
    const resultUser: User | undefined = await this.repo.findOne(id);

    if (!resultUser)
      throw new NotFoundException(`User with id:${id} not found`);

    if (updateUserDto.password) {
      const encryptedPass = await encryptPass(updateUserDto.password);
      await this.repo.update(id, { ...updateUserDto, password: encryptedPass });
    } else {
      await this.repo.update(id, updateUserDto);
    }

    const updatedUser = await this.repo.findOne(id);

    if (!updatedUser)
      throw new InternalServerErrorException(
        `Error while updating user id:${id}`,
      );

    const userDataToReturn = new UpdateUserReturnDto({ ...updatedUser });

    console.warn(
      `FOR CROSSCHECK! Updated user data: ${JSON.stringify(updatedUser)}`,
    );

    return userDataToReturn;
  }

  /**
   * Removes a User from the repository
   * @param id id of the User to be deleted
   * @returns void (Promise)
   * @throws NotFoundException is the User is not found or InternalServerErrorException if error while deleting
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

  async findOneByLogin(login: string): Promise<User | undefined> {
    const userWithSameLogin = this.repo.findOne({ login });

    return userWithSameLogin;
  }
}
