import { Id } from './id';
import { Date } from './date';

export class Timer {
  private _id: Id = null;
  private _startDate: Date = null;
  private _endDate: Date = null;

  constructor() {
    this._id = new Id();
  }

  start() {
    this._startDate = new Date();
  }

  end() {
    this._endDate = new Date();
  }

  get id(): Id {
    return this._id;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }
}
