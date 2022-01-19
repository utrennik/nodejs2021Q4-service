import { IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  public login: string;

  @IsOptional()
  @IsString()
  public password: string;
}
