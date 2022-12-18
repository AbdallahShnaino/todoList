import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { serialize } from '../interceptors/serialize-interceptors';
import { AuthGard } from 'src/guards/auth.guard';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ShowTaskDto } from './dtos/show-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@serialize(ShowTaskDto)
@UseGuards(AuthGard)
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get('/')
  async getUserTask(
    @Session() { userId }: Record<string, any>,
    @Query('id') taskId: string,
  ) {
    if (!taskId) {
      return await this.tasksService.findAllTasks(userId);
    }
    return await this.tasksService.getTask(taskId);
  }
  @Post('/')
  async createTask(
    @Body() { title, description, determinedAt }: CreateTaskDto,
    @Session() { userId }: Record<string, any>,
  ) {
    const task = await this.tasksService.createTask(
      title,
      description,
      determinedAt,
      userId,
    );
    console.log(task, ' task -- ret');
    return task;
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() task: Partial<CreateTaskDto>,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.tasksService.update(userId, taskId, task);
  }
  @Delete('/:id')
  async deleteTask(
    @Param('id') taskId: string,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.tasksService.remove(taskId);
  }
}
