import { ForbiddenException, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import config from '../common/config';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Handles user login
   * @param loginDto user login DTO
   * @returns JWT token (Promise)
   * @throws ForbiddenException if username or password are incorrect
   */
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { login, password } = loginDto;

    const user = await this.usersService.findOneByLogin(login);

    if (!user) {
      throw new ForbiddenException(`Username or password incorrect.`);
    }

    const encryptedPassword = user.password;

    const isPasswordOk = await bcrypt.compare(password, encryptedPassword);

    if (!isPasswordOk) {
      throw new ForbiddenException(`Username or password incorrect.`);
    }

    const tokenData = { userId: user.id, login: user.login };

    console.warn(`FOR CROSSCHECK! Token payload: ${JSON.stringify(tokenData)}`);

    const token = await jwt.sign(tokenData, config.JWT_SECRET_KEY);

    return { token };
  }
}
