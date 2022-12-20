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
@Controller('events')
@UseGuards(AuthGard)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post('/')
  createEvent(
    @Body() event: CreateEventDto,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.createEvent(event, userId);
  }

  @Get('/')
  async getUserEvent(
    @Query('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    if (!id) {
      return await this.eventsService.findAll(userId);
    }
    return await this.eventsService.getEvent(id, userId);
  }

  @Patch('/:id')
  updateEvent(
    @Param('id') eventId: string,
    @Body() event: Partial<CreateEventDto>,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.update(userId, eventId, event);
  }

  @Delete('/:id')
  deleteEvent(
    @Param('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.remove(id, userId);
  }

  @Get('/all')
  getUsersEvent(
    @Param('id') eventId: string,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.getUsersEvent(eventId, userId);
  }

  /*
  


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










*/
}
