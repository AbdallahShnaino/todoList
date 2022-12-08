import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { scrypt as _scrypt } from 'crypto';
import { PasswordService } from './password.service';
import { UsersService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
  ) {}

  async signup(fullName: string, email: string, password: string) {
    console.log('HELLO 1 ', fullName, email, password);

    const user = await this.usersService.findWithEmail(email);
    console.log('HELLO 2 ', user);
    if (user) {
      throw new BadRequestException('user found before !');
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
      throw new NotFoundException('user not found !');
    }
    const res = await this.passwordService.compare(user.password, password);

    if (!res) {
      throw new BadRequestException('bad password!');
    }
    return user;
  }
}
