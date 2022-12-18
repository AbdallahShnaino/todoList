import {
  IsString,
  IsOptional,
  IsIn,
  IsLatitude,
  IsLongitude,
  MinLength,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  description: string;

  @IsOptional()
  @IsLongitude()
  locLongitude: number;

  @IsOptional()
  @IsLatitude()
  locLatitude: number;

  @IsOptional()
  @IsString()
  @IsIn(['public', 'private'])
  type: string;

  @IsDateString()
  startingAt: Date;

  @IsDateString()
  finishedAt: Date;
}
