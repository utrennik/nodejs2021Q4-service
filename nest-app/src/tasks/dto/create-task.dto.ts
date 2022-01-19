import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  public title: string;

  @IsNumber()
  public order: number | null = null;

  @IsString()
  @IsOptional()
  public description?: string | null = null;

  @IsString()
  @IsOptional()
  public userId?: string | null = null;

  @IsString()
  @IsOptional()
  public boardId?: string | null = null;

  @IsString()
  @IsOptional()
  public columnId?: string | null = null;
}
