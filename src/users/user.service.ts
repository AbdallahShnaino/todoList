import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { PasswordService } from './password.service';
import { Message, throwCustomException } from '../errors/list.exception';
import { UserDocument } from './schema/user.schema';
import { User } from './interface/User.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>,
    private passwordService: PasswordService,
  ) {}

  async createUser(
    fullName: string,
    email: string,
    password: string,
  ): Promise<User> {
    const createdUser = new this.userModel({ fullName, email, password });
    const user = await createdUser.save();
    console.log(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findWithEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findWithId(id: string): Promise<User> {
    if (!id) {
      throw new NotFoundException('user id could not be null');
    }
    try {
      return await this.userModel.findOne({ _id: id });
    } catch (error) {
      throw new NotFoundException('id not correct!');
    }
  }

  async remove(id: string): Promise<User> {
    const user = await this.findWithId(id);
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    const deleteResult = await this.userModel.deleteOne({ _id: id });
    if (deleteResult.deletedCount > 0) {
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
      const updateStatus = await this.userModel.updateOne(
        { _id: id },
        updatedUserEntity,
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
