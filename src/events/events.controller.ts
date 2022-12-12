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

  @Post('/join')
  addUserToEvent(
    @Param('groupId', ParseIntPipe) eventId: number,
    @Param('id', ParseIntPipe) id: number,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.joinNewUser(eventId, id, userId);
  }

  @Get('/in/:eventId/:id')
  removeUserToEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Param('id', ParseIntPipe) id: number,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.removeUserFromGroup(eventId, id, userId);
  }

  @Get('/')
  getUserEvent(
    @Query('id', ParseIntPipe) id: number,
    @Session() { userId }: Record<string, any>,
  ) {
    if (!id) {
      return this.eventsService.findAll(userId);
    }
    return this.eventsService.getEvent(id, userId);
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
    @Param('id', ParseIntPipe) taskId: number,
    @Body() task: Partial<CreateEventDto>,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.update(userId, taskId, task);
  }

  @Delete('/:id')
  deleteEvent(
    @Param('id', ParseIntPipe) id: number,
    @Session() { userId }: Record<string, any>,
  ) {
    return this.eventsService.remove(id, userId);
  }
}
