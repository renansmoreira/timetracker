export class DomainError extends Error {
  constructor(
    public type: string,
    message: string) {
    super(message);
  }
}
