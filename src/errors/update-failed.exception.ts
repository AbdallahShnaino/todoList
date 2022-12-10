import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateFailedException extends HttpException {
  constructor() {
    super('failed to update this recourse try again', HttpStatus.CONFLICT);
  }
}
