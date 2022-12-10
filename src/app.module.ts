import { MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { EventsModule } from './events/events.module';
import { CurrentUserMiddleware } from './users/middleware/current-user.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [DatabaseModule, UsersModule, TasksModule, EventsModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
