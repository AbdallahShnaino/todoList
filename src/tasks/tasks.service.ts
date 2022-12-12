import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Task,
  ) {}

  async findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.findAll<Task>({ where: { userId } });
  }

  async getTask(id: number, userId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne<Task>({
      where: { userId: userId, id: id },
    });
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
    return this.tasksRepository.create<Task>({
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
}
