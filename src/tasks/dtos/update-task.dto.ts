import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  description: string;

  @IsOptional()
  @IsDateString()
  determinedAt: Date;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
