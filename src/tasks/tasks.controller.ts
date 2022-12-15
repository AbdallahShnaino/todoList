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
  ParseIntPipe,
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
      console.log('hello 1');
      return await this.tasksService.findAllTasks(userId);
    }
    console.log('hello 2');
    return await this.tasksService.getTask(userId, taskId);
  }
  @Post('/')
  async createTask(
    @Body() { title, description, determinedAt }: CreateTaskDto,
    @Session() { userId }: Record<string, any>,
  ) {
    return await this.tasksService.createTask(
      title,
      description,
      determinedAt,
      userId,
    );
  }

  @Patch('/:id')
  async updateTask(
    @Param('id', ParseIntPipe) taskId: string,
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
    return this.tasksService.remove(userId, taskId);
  }
}
