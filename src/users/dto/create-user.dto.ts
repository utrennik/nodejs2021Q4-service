import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public login?: string;

  @IsOptional()
  @IsString()
  public password?: string;
}
