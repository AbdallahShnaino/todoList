import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getUserTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findAllTasks(userId: string): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId } });
  }

  async getTask(taskId: string): Promise<Task> {
    const task = this.taskRepository.findOneBy({ id: taskId });

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
    var id = 'id' + Math.random().toString(16).slice(2);
    const task = this.taskRepository.save({
      title,
      id,
      description,
      userId,
      determinedAt,
    });
    return task;
  }

  async update(
    userId: string,
    taskId: string,
    attrs: Partial<Task>,
  ): Promise<Partial<Task>> {
    const task = await this.getTask(taskId);
    if (!task) {
      throwCustomException(Message.UserNotFound, HttpStatus.NOT_FOUND);
    }

    if (task.userId !== userId) {
      throwCustomException(Message.UpdateFailed, HttpStatus.UNAUTHORIZED);
    }

    const updatedTaskEntity = Object.assign(task, attrs);

    Object.assign(task, attrs);

    try {
      const updateStatus = await this.taskRepository.save(task);
      if (updateStatus) {
        return updatedTaskEntity;
      } else {
        throwCustomException(Message.UpdateFailed, HttpStatus.CONFLICT);
      }
    } catch (error) {
      throwCustomException(Message.DuplicatedEmail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(taskId: string) {
    const task = await this.getTask(taskId);
    if (!task) {
      throwCustomException(
        Message.TaskNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    const status = await this.taskRepository.delete(task);
    if (status.affected > 0) {
      return task;
    } else {
      throwCustomException(Message.RemoveFailed, HttpStatus.BAD_REQUEST);
    }
  }
}
