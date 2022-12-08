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
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
@UseGuards(AuthGard)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post('/join')
  addUserToEvent(
    @Param('groupId') eventId: string,
    @Param('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.joinNewUser(
      parseInt(eventId),
      parseInt(id),
      userId,
    );
  }

  @Get('/in/:eventId/:id')
  removeUserToEvent(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.removeUserFromGroup(eventId, id, userId);
  }

  @Get('/')
  getUserEvent(
    @Query('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    if (!id) {
      return this.eventsService.findAll(userId);
    }
    return this.eventsService.getEvent(parseInt(id), parseInt(userId));
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
    @Body() task: UpdateEventDto,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.update(userId, parseInt(taskId), task);
  }

  @Delete('/:id')
  deleteEvent(
    @Param('id') id: string,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.remove(parseInt(id), userId);
  }
}
