import { Currency } from './currency';
import { Money } from './money';

const ONE_HOUR_IN_MS = 3600000;

export class AmountReceivable {
  private _amount: Money;

  constructor(timeInMs: number, valuePerHour: number) {
    const timeInHours = timeInMs / ONE_HOUR_IN_MS;
    this._amount = new Money(timeInHours * valuePerHour, Currency.REAL);
  }

  get amount(): Money {
    return this._amount;
  }
}
