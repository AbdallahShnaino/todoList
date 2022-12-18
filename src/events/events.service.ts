import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { Event } from './entity/event.entity';
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private readonly usersService: UsersService,
  ) {}

  async createEvent(e: CreateEventDto, ownerId: string): Promise<Event> {
    const owner = await this.usersService.findWithId(ownerId);
    const event = new Event();
    const ownerContainer = new User();
    event.description = e.description;
    event.title = e.title;
    event.id = 'id' + Math.random().toString(16).slice(2);
    event.finishedAt = e.finishedAt;
    event.startingAt = e.startingAt;
    event.locLatitude = e.locLatitude;
    event.locLongitude = e.locLatitude;
    event.type = e.type;
    ownerContainer.id = owner.id;
    ownerContainer.email = owner.email;
    ownerContainer.fullName = owner.fullName;
    event.owner = ownerContainer;
    await this.eventRepository.save(event);
    console.log(event);
    return event;
  }

  async getEvent(id: string, ownerId: string): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    const owner = event.owner;
    if (!event || owner.id !== ownerId) {
      throwCustomException(
        Message.EventNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    return event;
  }

  async findAll(ownerId: string) /* : Promise<Event[]> */ {}

  /* 


  async remove(eventId: string, ownerId: string) {
    const event = await this.getEvent(eventId, ownerId);
    if (!event) {
      throwCustomException(
        Message.EventNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    const status = await this.eventModel.deleteOne({ _id: eventId });
    if (status.deletedCount > 0) {
      return event;
    } else {
      throwCustomException(Message.RemoveFailed, HttpStatus.CONFLICT);
    }
  }


  async update(
    id: string,
    eventId: string,
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
      const updateStatus = await this.eventModel.updateOne(
        { _id: eventId },
        updatedEventEntity,
      );
      if (updateStatus.modifiedCount > 0) {
        return updatedEventEntity;
      } else {
        throwCustomException(Message.UpdateFailed, HttpStatus.CONFLICT);
      }
    } catch (error) {
      throwCustomException(Message.DuplicatedEmail, HttpStatus.BAD_REQUEST);
    }
  }



  async joinNewUser(eventId: string, userId: string, ownerId: string) {
    console.log(eventId, userId, ownerId);
    const event = await this.eventModel.findOne({
      ownerId,
    });

    if (!event) {
      throwCustomException(
        Message.EventNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const user = await this.usersService.findWithId(userId);
      const res = await event.updateOne({
        $push: { users: user },
      });

      if (res.modifiedCount == 1) {
        const result = await this.eventModel.findOne({
          ownerId,
        });
        return result;
      }
    } catch (error) {
      console.log(error);
      throwCustomException(Message.GroupeJoining, HttpStatus.BAD_REQUEST);
    }
  }



  async removeUserFromEvent(eventId: string, ownerId: string, userId: string) {
    const event = await this.eventModel.findOne({
      ownerId,
      eventId,
    });

    if (!event) {
      throwCustomException(
        Message.EventNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const res = await event.updateOne({
        $pull: { users: userId },
      });

      const result = await this.eventModel.findOne({
        ownerId,
      });
      return result;
    } catch (error) {
      console.log(error);
      throwCustomException(Message.GroupeExit, HttpStatus.BAD_REQUEST);
    }
  }


*/
}
