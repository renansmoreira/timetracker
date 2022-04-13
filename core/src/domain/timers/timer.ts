import { DateRepresentation } from '../date-representation.js';
import { Id } from '../id.js';
import { TimerNotStartedException } from './timer-not-started-exception.js';

export class Timer {
  private _id: Id;
  private _startDate?: DateRepresentation;
  private _endDate?: DateRepresentation;

  constructor(startDate?: DateRepresentation) {
    this._id = new Id();
    this._startDate = startDate || undefined;
  }

  start(): void {
    this._startDate = new DateRepresentation();
  }

  end(): DateRepresentation {
    if (!this._startDate)
      throw new TimerNotStartedException();

    this._endDate = new DateRepresentation();

    return this._endDate?.minus(this._startDate);
  }

  get id(): Id {
    return this._id;
  }

  get startDate(): DateRepresentation | undefined {
    return this._startDate;
  }

  get endDate(): DateRepresentation | undefined {
    return this._endDate;
  }
}
