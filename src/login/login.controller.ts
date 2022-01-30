import { Controller, Post, Body } from '@nestjs/common';
import { ValidationPipe } from '../common/validation.pipe';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
}
