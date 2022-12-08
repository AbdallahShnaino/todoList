import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  fullName: string;

  @IsOptional()
  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  password: string;
}
