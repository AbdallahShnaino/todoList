import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Message, throwCustomException } from 'src/errors/list.exception';

import { CreateEventDto } from './dtos/create-event.dto';
import { EventGroup } from './event-group.entity';
import { Event } from './event.entity';
@Injectable()
export class EventsService {
  constructor(
    @Inject('EVENTS_REPOSITORY')
    private eventsRepository: typeof Event,
    @Inject('EVENTGROUP_REPOSITORY')
    private eventGroupRepository: typeof EventGroup,
  ) {}

  async removeUserFromGroup(eventId: number, id: number, userId: any) {
    const status = await this.eventGroupRepository.destroy({
      where: {
        eventId,
        ownerId: userId,
        userId: id,
      },
    });
    if (status > 0) {
      return { eventId, ownerId: userId, userId: id };
    } else {
      throwCustomException(Message.userOrGroupNotExist, HttpStatus.BAD_REQUEST);
    }
  }

  async joinNewUser(
    eventId: number,
    id: number,
    userId: number,
  ): Promise<EventGroup> {
    const group = await this.eventGroupRepository.findOne({
      where: { ownerId: userId },
    });

    if (!group) {
      throwCustomException(
        Message.EventNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      return await this.eventGroupRepository.create({
        ownerId: userId,
        role: 'member',
        eventId,
        userId: id,
      });
    } catch (error) {
      throwCustomException(Message.GroupeJoining, HttpStatus.BAD_REQUEST);
    }
  }

  async getEvent(id: number, userId: number): Promise<Event> {
    const event = await this.eventsRepository.findOne<Event>({
      where: { userId: userId, id: id },
    });
    if (!event) {
      throwCustomException(
        Message.EventNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    return event;
  }

  async findAll(userId: number): Promise<Event[]> {
    return this.eventsRepository.findAll<Event>({ where: { userId } });
  }

  async update(
    id: number,
    eventId: number,
    attrs: Partial<Event>,
  ): Promise<Partial<Event>> {
    const task = await this.getEvent(eventId, id);
    if (!task) {
      throw new UnauthorizedException(
        "You don't have permission to update this Event not found!",
      );
    }
    const updatedEventEntity = Object.assign(task, attrs);

    try {
      const updateStatus = await this.eventsRepository.update(
        updatedEventEntity.dataValues,
        {
          where: {
            id: eventId,
          },
        },
      );
      if (updateStatus[0] > 0) {
        return updatedEventEntity;
      } else {
        throwCustomException(Message.UpdateFailed, HttpStatus.CONFLICT);
      }
    } catch (error) {
      throwCustomException(Message.DuplicatedEmail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(taskId: number, id: number) {
    const event = await this.getEvent(taskId, id);
    if (!event) {
      throwCustomException(
        Message.EventNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    const status = await this.eventsRepository.destroy<Event>({
      where: { id: event.id },
    });
    if (status > 0) {
      return event;
    } else {
      throwCustomException(Message.RemoveFailed, HttpStatus.CONFLICT);
    }
  }

  async createEvent(event: CreateEventDto, userId: number): Promise<Event> {
    const createdEvent = await this.eventsRepository.create<Event>({
      ...event,
      userId,
    });

    this.eventGroupRepository.create({
      ownerId: userId,
      role: 'admin',
      eventId: createdEvent.id,
      userId,
    });

    return createdEvent;
  }
}
