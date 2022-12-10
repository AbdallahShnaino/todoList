import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DuplicatedEmailException } from 'src/errors/duplicated-email.exception';
import { RemoveFailedException } from 'src/errors/remove-failed.exception';
import { UpdateFailedException } from 'src/errors/update-failed.exception';
import { PasswordService } from './password.service';
import { User } from './user.entity';

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
      throw new RemoveFailedException();
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
        throw new UpdateFailedException();
      }
    } catch (error) {
      throw new DuplicatedEmailException();
    }
  }
}
