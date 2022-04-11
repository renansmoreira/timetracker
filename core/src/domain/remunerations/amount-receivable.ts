const ONE_HOUR_IN_MS = 3600000;

export class AmountReceivable {
  private _value: number;

  constructor(timeInMs: number, valuePerHour: number) {
    const timeInHours = timeInMs / ONE_HOUR_IN_MS;
    this._value = timeInHours * valuePerHour;
  }

  get value(): number {
    return this._value;
  }
}
