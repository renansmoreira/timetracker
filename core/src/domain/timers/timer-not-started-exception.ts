export class TimerNotStartedException extends Error {
  constructor() {
    super('This timer was not started');
  }
}
