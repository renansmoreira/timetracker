import { BaseError } from './base.error';

export class NotFoundError extends BaseError {
  constructor(objectName: string) {
    super('NotFoundError', `Object not found: ${objectName}`);
  }
}
