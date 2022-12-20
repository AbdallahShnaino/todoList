import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/user.service';
import { Repository, FindManyOptions, FindOptionsWhere } from 'typeorm';
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
    event.description = e.description;
    event.title = e.title;
    event.id = 'id' + Math.random().toString(16).slice(2);
    event.finishedAt = e.finishedAt;
    event.startingAt = e.startingAt;
    event.locLatitude = e.locLatitude;
    event.locLongitude = e.locLatitude;
    event.type = e.type;
    event.owner = new User();
    event.owner.id = owner.id;
    event.owner.email = owner.email;
    event.owner.fullName = owner.fullName;
    event.users = [];
    return await this.eventRepository.save(event);
  }

  async getEvent(id: string, ownerId: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      relations: {
        owner: true,
        users: true,
      },
      where: {
        'owner.id': { $eq: ownerId },
        id,
      } as FindOptionsWhere<User>,
    });
    const owner = event.owner;
    if (!event || owner.id !== ownerId) {
      throwCustomException(
        Message.EventNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    return event;
  }

  async findAll(ownerId: string): Promise<Event[]> {
    return this.eventRepository.find({
      relations: {
        owner: true,
        users: true,
      },
      where: {
        'owner.id': { $eq: ownerId },
      } as FindOptionsWhere<User>,
    });
  }

  async update(
    ownerId: string,
    eventId: string,
    attrs: Partial<Event>,
  ): Promise<Partial<Event>> {
    const event = await this.getEvent(eventId, ownerId);
    if (!event || event.owner.id !== ownerId) {
      throw new UnauthorizedException(
        "You don't have permission to update this Event not found!",
      );
    }
    const updatedEvent = Object.assign(event, attrs);
    try {
      const updateStatus = await this.eventRepository.update(
        { owner: { id: ownerId } },
        attrs,
      );
      console.log(updateStatus, '0000');
      if (updateStatus) {
        return updatedEvent;
      } else {
        throwCustomException(Message.UpdateFailed, HttpStatus.CONFLICT);
      }
    } catch (error) {
      console.log(error);
      throwCustomException(Message.UpdateFailed, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(eventId: string, ownerId: string) {
    const event = await this.getEvent(eventId, ownerId);
    if (!event) {
      throwCustomException(
        Message.EventNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    const status = await this.eventRepository.delete({ id: eventId });
    if (status.affected > 0) {
      return event;
    } else {
      throwCustomException(Message.RemoveFailed, HttpStatus.CONFLICT);
    }
  }

  async getUsersEvent(eventId: string, userId: any): Promise<User[]> {
    const event = await this.eventRepository.findOne({
      relations: {
        owner: true,
        users: true,
      },
      where: { id: eventId, owner: { id: userId } },
    });
    return event.users || [];
  }

  /* 

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
