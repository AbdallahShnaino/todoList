import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { tasksProviders } from './task.providers';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, ...tasksProviders],
})
export class TasksModule {}
