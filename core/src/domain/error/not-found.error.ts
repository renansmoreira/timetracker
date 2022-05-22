import { DomainError } from './domain.error';

export class NotFoundError extends DomainError {
  constructor(objectName: string) {
    super('NotFoundError', `Object not found: ${objectName}`);
  }
}
