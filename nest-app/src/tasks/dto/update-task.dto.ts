import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  public id?: string;

  @IsString()
  @IsOptional()
  public title?: string;

  @IsNumber()
  public order: number;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsOptional()
  public userId?: string | null;

  @IsOptional()
  public boardId: string | null;

  @IsOptional()
  public columnId: string | null;
}
