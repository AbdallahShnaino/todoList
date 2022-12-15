import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAllTasks(userId: number): Promise<Task> {
    return this.taskModel.findOne<Task>({userId})
  }

  async getTask(id: number): Promise<Task> {
    const task = await this.taskModel.findOne<Task>({ _id: id });
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
    userId: number,
  ): Promise<Task> {
    return this.taskModel.create<Task>({
      userId,
      title,
      description,
      determinedAt,
    });
  }

  async update(
    id: number,
    taskId: number,
    attrs: Partial<Task>,
  ): Promise<Partial<Task>> {
    const task = await this.getTask(taskId, id);
    console.log(task);
    if (!task) {
      throwCustomException(Message.UserNotFound, HttpStatus.NOT_FOUND);
    }
    const updatedTaskEntity = Object.assign(task, attrs);

    try {
      const updateStatus = await this.tasksRepository.update(
        updatedTaskEntity.dataValues,
        {
          where: {
            id: taskId,
          },
        },
      );
      if (updateStatus[0] > 0) {
        return updatedTaskEntity;
      } else {
        throwCustomException(Message.UpdateFailed, HttpStatus.CONFLICT);
      }
    } catch (error) {
      throwCustomException(Message.DuplicatedEmail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(taskId: number, id: number) {
    const task = await this.getTask(taskId, id);
    if (!task) {
      throwCustomException(
        Message.TaskNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    const status = await this.tasksRepository.destroy<Task>({
      where: { id: task.id },
    });
    if (status > 0) {
      return task;
    } else {
      throwCustomException(Message.RemoveFailed, HttpStatus.BAD_REQUEST);
    }
  }

*/
}
