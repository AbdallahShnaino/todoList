import { Injectable, HttpStatus } from '@nestjs/common';
import { scrypt as _scrypt } from 'crypto';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { PasswordService } from './password.service';
import { UsersService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
  ) {}

  async signup(fullName: string, email: string, password: string) {
    const user = await this.usersService.findWithEmail(email);

    if (user) {
      throwCustomException(Message.UserNotFound, HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.passwordService.toHash(password);
    const newUser = await this.usersService.createUser(
      fullName,
      email,
      hashedPassword,
    );
    return newUser;
  }
  async signin(email: string, password: string) {
    const user = await this.usersService.findWithEmail(email);
    if (!user) {
      throwCustomException(Message.UserNotFound, HttpStatus.BAD_REQUEST);
    }
    const res = await this.passwordService.compare(user.password, password);

    if (!res) {
      throwCustomException(Message.BadPassword, HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
