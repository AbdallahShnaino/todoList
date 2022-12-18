import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { PasswordService } from './password.service';
import { Message, throwCustomException } from '../errors/list.exception';
import { User } from './entity/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private passwordService: PasswordService,
  ) {}

  async createUser(
    fullName: string,
    email: string,
    password: string,
  ): Promise<User> {
    const createdUser = this.userRepository.create({
      fullName,
      email,
      password,
    });
    const user = this.userRepository.save(createdUser);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findWithEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findWithId(id: string): Promise<User> {
    if (!id) {
      throw new NotFoundException('user id could not be null');
    }
    try {
      return await this.userRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException('id not correct!');
    }
  }

  async remove(id: string): Promise<User> {
    const user = await this.findWithId(id);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    const deleteResult = await this.userRepository.delete(user);
    if (deleteResult.affected > 0) {
      return user;
    } else {
      throwCustomException(Message.RemoveFailed, HttpStatus.CONFLICT);
    }
  }

  async update(id: string, attrs: Partial<User>): Promise<Partial<User>> {
    const user = await this.findWithId(id);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    const updatedUserEntity: Partial<User> = Object.assign(user, attrs);
    if (attrs.password) {
      updatedUserEntity.password = await this.passwordService.toHash(
        attrs.password,
      );
    }
    try {
      const updateStatus = await this.userRepository.save(updatedUserEntity);

      if (updateStatus) {
        return updatedUserEntity;
      } else {
        throwCustomException(Message.UpdateFailed, HttpStatus.CONFLICT);
      }
    } catch (error) {
      throwCustomException(Message.DuplicatedEmail, HttpStatus.BAD_REQUEST);
    }
  }
}
