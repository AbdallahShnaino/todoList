import { HttpException, HttpStatus } from '@nestjs/common';

export class RemoveFailedException extends HttpException {
  constructor() {
    super('failed to remove from database', HttpStatus.CONFLICT);
  }
}
