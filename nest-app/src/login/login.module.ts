import { Module } from '@nestjs/common';
import { UsersModule } from "../users/users.module";
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersService } from '../users/users.service';

@Module({
  imports: [UsersModule],
  controllers: [LoginController],
  providers: [LoginService, UsersService],
})
export class LoginModule {}
