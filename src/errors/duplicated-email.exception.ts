import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatedEmailException extends HttpException {
  constructor() {
    super('Email has been used before!', HttpStatus.BAD_REQUEST);
  }
}
