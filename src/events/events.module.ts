import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './entity/event.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
