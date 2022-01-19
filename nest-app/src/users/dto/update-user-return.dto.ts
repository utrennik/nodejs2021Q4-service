import { IsOptional, IsString } from 'class-validator';

export class UpdateUserReturnDto {
  constructor({ id, name, login }: UpdateUserReturnDto) {
    this.id = id;
    this.name = name;
    this.login = login;
  }

  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public id?: string;

  @IsOptional()
  @IsString()
  public login?: string;
}
