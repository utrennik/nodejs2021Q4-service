import { ForbiddenException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import config from '../common/config';

@Injectable()
export class LoginService {
  async login(loginDto: LoginDto, usersService: UsersService) {
    const { login, password } = loginDto;

    const user = await usersService.findOneByLogin(login);

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
