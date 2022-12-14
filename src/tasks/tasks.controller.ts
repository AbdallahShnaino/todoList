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
import { AuthGard } from 'src/guards/auth.guard';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGard)
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get('/')
  async getUserTask(
    @Session() { userId }: Record<string, any>,
    @Query('id') id: string,
  ) {
    if (!id) {
      return this.tasksService.findAllTasks(userId);
    }
    return this.tasksService.getTask(parseInt(id), userId);
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
    @Param('id', ParseIntPipe) taskId: number,
    @Body() task: Partial<CreateTaskDto>,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.tasksService.update(userId, taskId, task);
  }
  @Delete('/:id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.tasksService.remove(id, userId);
  }
}
