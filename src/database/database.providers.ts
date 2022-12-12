import { Sequelize } from 'sequelize-typescript';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';
import { Event } from 'src/events/event.entity';
import { EventGroup } from 'src/events/event-group.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root1234',
        database: 'todoDB',
      });

      sequelize.addModels([User, Task, Event, EventGroup]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
