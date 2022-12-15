import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { Task } from './interface/Task.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Tasks') private readonly taskModel: Model<Task>) {}

  async getUserTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findAllTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId });
  }

  async getTask(userId: string, taskId: string): Promise<Task> {
    const task = await this.taskModel.findOne<Task>({ userId, _id: taskId });

    if (!task) {
      throwCustomException(
        Message.TaskNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    return task;
  }

  async createTask(
    title: string,
    description: string,
    determinedAt: Date,
    userId: string,
  ): Promise<Task> {
    const createdTask = new this.taskModel({
      title,
      description,
      userId,
      determinedAt,
    });
    const task = await createdTask.save();
    return task;
  }

  async update(
    userId: string,
    taskId: string,
    attrs: Partial<Task>,
  ): Promise<Partial<Task>> {
    const task = await this.getTask(userId, taskId);
    if (!task) {
      throwCustomException(Message.UserNotFound, HttpStatus.NOT_FOUND);
    }
    const updatedTaskEntity = Object.assign(task, attrs);

    try {
      const updateStatus = await this.taskModel.update(
        { _id: taskId },
        updatedTaskEntity,
      );

      if (updateStatus.modifiedCount > 0) {
        return updatedTaskEntity;
      } else {
        throwCustomException(Message.UpdateFailed, HttpStatus.CONFLICT);
      }
    } catch (error) {
      throwCustomException(Message.DuplicatedEmail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(userId: string, taskId: string) {
    const task = await this.getTask(userId, taskId);
    if (!task) {
      throwCustomException(
        Message.TaskNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    const status = await this.taskModel.deleteOne({
      _id: taskId,
      userId,
    });
    if (status.deletedCount > 0) {
      return task;
    } else {
      throwCustomException(Message.RemoveFailed, HttpStatus.BAD_REQUEST);
    }
  }
}
