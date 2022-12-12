import { HttpException, HttpStatus } from '@nestjs/common';

export enum Message {
  DuplicatedEmail = 'Email has been used before!',
  GroupeJoining = 'group may not exist or user has been added before!',
  RemoveFailed = 'failed to update this recourse try again',
  UpdateFailed = 'failed to update this recourse try again',
  UserNotFound = 'user not found',
  BadPassword = 'bad password',
  TaskNotFoundOrUnAuth = 'Task not found or you are unauthorized to take this action on this task',
  EventNotFoundOrUnAuth = 'Event not found or you are unauthorized to take this action on this event',
  userOrGroupNotExist = "User is not in the group or group doesn't exist",
  UnAbleToCreateEvent = 'Un able to create event',
}
export function throwCustomException(message: Message, resCode: HttpStatus) {
  throw new HttpException(message, resCode);
}
