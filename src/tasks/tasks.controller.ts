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
import { AuthGard } from 'src/guards/auth.guard';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGard)
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get('/')
  async getUserTask(
    @Query('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    if (!id) {
      return this.tasksService.findAll(userId);
    }
    return this.tasksService.getTask(parseInt(id), parseInt(userId));
  }
  @Post('/')
  async createTask(
    @Body() { title, description, determinedAt }: CreateTaskDto,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.tasksService.createTask(
      title,
      description,
      determinedAt,
      userId,
    );
  }
  @Patch('/:id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() task: UpdateTaskDto,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.tasksService.update(userId, parseInt(taskId), task);
  }
  @Delete('/:id')
  async deleteTask(
    @Param('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.tasksService.remove(parseInt(id), userId);
  }
}
