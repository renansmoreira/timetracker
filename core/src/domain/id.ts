import { v4 as uuidv4 } from 'uuid';

export class Id {
  private _value = '';

  constructor() {
    this._value = uuidv4();
  }

  get value(): string {
    return this._value;
  }

  toString(): string {
    return this._value;
  }
}
