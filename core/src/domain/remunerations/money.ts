import { Currency } from './currency.js';

export class Money {
  private _amount: number;
  private _currency: Currency;

  constructor(amount: number, currency: Currency) {
    this._amount = Math.round(amount * 100) / 100;
    this._currency = currency;
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): number {
    return this._currency;
  }
}
