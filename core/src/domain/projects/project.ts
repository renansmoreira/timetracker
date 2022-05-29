import { Customer } from '../customers/customer';
import { Id } from '../id';
import { Money } from '../remunerations/money';

export class Project {
  private _id: Id;
  private _name: string;
  private _valuePerHour?: Money;
  private _customer: Customer;

  constructor(name: string, customer: Customer, valuePerHour?: Money, id?: Id) {
    this._id = id || new Id();
    this._name = name;
    this._valuePerHour = valuePerHour;
    this._customer = customer;
  }

  get id(): Id {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get valuePerHour(): Money | undefined {
    return this._valuePerHour;
  }

  get customer(): Customer {
    return this._customer;
  }
}
