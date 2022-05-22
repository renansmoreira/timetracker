export class BaseError extends Error {
  constructor(
    public type: string,
    message: string) {
    super(message);
  }
}
