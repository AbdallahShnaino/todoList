import { Task } from './task.entity';

export const tasksProviders = [
  {
    provide: 'TASKS_REPOSITORY',
    useValue: Task,
  },
];
