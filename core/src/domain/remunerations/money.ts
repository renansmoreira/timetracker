import { Currency } from './currency';

export class Money {
  private _amount: number;
  private _currency: Currency;

  constructor(amount?: number, currency?: Currency) {
    this._amount = amount ? Math.round(amount * 100) / 100 : 0;
    this._currency = currency || Currency.REAL;
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): Currency {
    return this._currency;
  }
}
