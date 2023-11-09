import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityException extends HttpException {
  constructor(entity: string) {
    super(`${entity} was not found`, HttpStatus.NOT_FOUND);
  }
}