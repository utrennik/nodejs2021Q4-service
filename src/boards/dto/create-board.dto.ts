import { IsArray, IsOptional, IsString } from 'class-validator';
import ColumnEntity from '../entities/column.entity';

export class CreateBoardDto {
  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public id: string;

  @IsArray()
  @IsOptional()
  public columns: ColumnEntity[] = [];
}
