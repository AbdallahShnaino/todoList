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
import { CreateEventDto } from './dtos/create-event.dto';
import { EventsService } from './events.service';
import { serialize } from '../interceptors/serialize-interceptors';
import { ShowEventDto } from './dtos/show-event.dto';
@Controller('events')
@serialize(ShowEventDto)
@UseGuards(AuthGard)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('/join/:eventId/:userId')
  addUserToEvent(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string,
    @Session() { userId: ownerId }: Record<string, any>,
  ) {
    return this.eventsService.joinNewUser(eventId, userId, ownerId);
  }

  @Get('/out/:eventId/:userId')
  removeUserToEvent(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string,
    @Session() { userId: ownerId }: Record<string, any>,
  ) {
    return this.eventsService.removeUserFromEvent(eventId, ownerId, userId);
  }

  @Get('/')
  async getUserEvent(
    @Query('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    if (!id) {
      console.log('jo 1');
      return await this.eventsService.findAll(userId);
    }
    console.log('jo 2');
    console.log('id, userId', id, userId);
    return await this.eventsService.getEvent(id, userId);
  }

  @Post('/')
  createEvent(
    @Body() event: CreateEventDto,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.createEvent(event, userId);
  }

  @Patch('/:id')
  updateEvent(
    @Param('id') taskId: string,
    @Body() task: Partial<CreateEventDto>,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.update(userId, taskId, task);
  }

  @Delete('/:id')
  deleteEvent(
    @Param('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.remove(id, userId);
  }
}
