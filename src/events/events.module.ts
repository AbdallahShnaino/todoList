import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { eventsGroupsProviders } from './event-group.providers';
import { eventsProviders } from './event.providers';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventsController],
  providers: [EventsService, ...eventsProviders, ...eventsGroupsProviders],
})
export class EventsModule {}
