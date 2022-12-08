import { HttpException, HttpStatus } from '@nestjs/common';

export class GroupeJoiningException extends HttpException {
  constructor() {
    super(
      'group may not exist or user has been added before!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
