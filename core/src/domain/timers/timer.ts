import { DateRepresentation } from '../date-representation';
import { Id } from '../id';
import { TimerNotStartedException } from './timer-not-started-exception';

export class Timer {
  private _id: Id;
  private _startDate?: DateRepresentation;
  private _endDate?: DateRepresentation;

  constructor(id?: Id, startDate?: DateRepresentation, endDate?: DateRepresentation) {
    this._id = id || new Id();
    this._startDate = startDate || undefined;
    this._endDate = endDate || undefined;
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
