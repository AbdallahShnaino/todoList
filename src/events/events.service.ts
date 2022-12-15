import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { User } from 'src/users/interface/User.interface';
import { UsersService } from 'src/users/user.service';
import { ObjectID } from 'typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { Event } from './interface/Event.interface';
@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Events') private readonly eventModel: Model<Event>,
    private readonly usersService: UsersService,
  ) {}

  async createEvent(e: CreateEventDto, ownerId: string): Promise<Event> {
    try {
      const createdEvent = new this.eventModel({ ...e, ownerId });

      const event = await createdEvent.save();
      return event;
    } catch (error) {
      throwCustomException(Message.UnAbleToCreateEvent, HttpStatus.CONFLICT);
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
    const status = await this.eventModel.deleteOne({ _id: eventId });
    if (status.deletedCount > 0) {
      return event;
    } else {
      throwCustomException(Message.RemoveFailed, HttpStatus.CONFLICT);
    }
  }

  async getEvent(id: string, ownerId: string): Promise<Event> {
    const event = this.eventModel.findOne<Event>({ ownerId, _id: id });

    if (!event) {
      throwCustomException(
        Message.EventNotFoundOrUnAuth,
        HttpStatus.BAD_REQUEST,
      );
    }
    return event;
  }

  async findAll(userId: number): Promise<Event[]> {
    return this.eventModel.find({ userId });
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
}
