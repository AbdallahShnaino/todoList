import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  fullName: string;

  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  password: string;
}
