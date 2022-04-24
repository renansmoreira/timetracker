export class DateRepresentation {
  private _timestamp: number;

  constructor(timestamp?: number) {
    this._timestamp = timestamp || Date.now();
  }

  minus(date: DateRepresentation): DateRepresentation {
    return new DateRepresentation(this._timestamp - date.timestamp);
  }

  get timestamp(): number {
    return this._timestamp;
  }

  get date(): Date {
    return new Date(this._timestamp);
  }
}
