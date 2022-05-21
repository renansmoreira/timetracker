import { Customer } from '../customers/customer';

export class Project {
  private _name: string;
  private _customer: Customer;

  constructor(name: string, customer: Customer) {
    this._name = name;
    this._customer = customer;
  }

  get name(): string {
    return this._name;
  }

  get customer(): Customer {
    return this._customer;
  }
}
