import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  public title?: string;

  @IsNumber()
  public order: number;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  public userId?: string;

  @IsString()
  public boardId: string;

  @IsString()
  public columnId: string;
}
