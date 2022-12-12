import {
  Injectable,
  Inject,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { PasswordService } from './password.service';
import { User } from './user.entity';
import { Message, throwCustomException } from '../errors/list.exception';
@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private passwordService: PasswordService,
  ) {}

  createUser(fullName: string, email: string, password: string): Promise<User> {
    return this.usersRepository.create<User>({ fullName, email, password });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  findWithEmail(email: string): Promise<User> {
    return this.usersRepository.findOne<User>({ where: { email } });
  }

  findWithId(id: number): Promise<User> {
    if (!id) {
      throw new NotFoundException('user id could not be null');
    }
    return this.usersRepository.findByPk<User>(id);
  }

  async remove(id: number) {
    const user = await this.findWithId(id);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    const status = await this.usersRepository.destroy<User>({
      where: { id: user.id },
    });
    if (status > 0) {
      return user;
    } else {
      throwCustomException(Message.RemoveFailed, HttpStatus.CONFLICT);
    }
  }

  async update(id: number, attrs: Partial<User>): Promise<Partial<User>> {
    const user = await this.findWithId(id);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    const updatedUserEntity = Object.assign(user, attrs);
    if (attrs.password) {
      updatedUserEntity.password = await this.passwordService.toHash(
        attrs.password,
      );
    }
    try {
      console.log(updatedUserEntity.dataValues);
      const updateStatus = await this.usersRepository.update(
        updatedUserEntity.dataValues,
        {
          where: {
            id,
          },
        },
      );
      if (updateStatus[0] > 0) {
        return updatedUserEntity;
      } else {
        throwCustomException(Message.UpdateFailed, HttpStatus.CONFLICT);
      }
    } catch (error) {
      throwCustomException(Message.DuplicatedEmail, HttpStatus.BAD_REQUEST);
    }
  }
}
