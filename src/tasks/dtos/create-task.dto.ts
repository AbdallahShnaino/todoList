import {
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsDateString()
  determinedAt: Date;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
