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
import { CreateEventDto } from './dtos/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
@UseGuards(AuthGard)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('/join/:eventId/:userId')
  addUserToEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Session() { userId: ownerId }: Record<string, any>,
  ) {
    // return this.eventsService.joinNewUser(eventId, userId, ownerId);
  }

  @Get('/out/:eventId/:userId')
  removeUserToEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Session() { userId: ownerId }: Record<string, any>,
  ) {
    //  return this.eventsService.removeUserFromGroup(eventId, ownerId, userId);
  }

  @Get('/')
  getUserEvent(
    @Query('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    if (!id) {
      //   return this.eventsService.findAll(userId);
    }
    // return this.eventsService.getEvent(parseInt(id), userId);
  }

  @Post('/')
  createEvent(
    @Body() event: CreateEventDto,
    @Session() { userId }: Record<string, any>,
  ) {
    //  return this.eventsService.createEvent(event, userId);
  }

  @Patch('/:id')
  updateEvent(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() task: Partial<CreateEventDto>,
    @Session() { userId }: Record<string, any>,
  ) {
    // return this.eventsService.update(userId, taskId, task);
  }

  @Delete('/:id')
  deleteEvent(
    @Param('id', ParseIntPipe) id: number,
    @Session() { userId }: Record<string, any>,
  ) {
    //  return this.eventsService.remove(id, userId);
  }
}
