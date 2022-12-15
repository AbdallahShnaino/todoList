import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventSchema } from './schema/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Events', schema: EventSchema }]),
    UsersModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
