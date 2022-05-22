import { Customer } from '../customers/customer';
import { Id } from '../id';

export class Project {
  private _id: Id;
  private _name: string;
  private _billable: boolean;
  private _customer: Customer;

  constructor(name: string, billable: boolean, customer: Customer, id?: Id) {
    this._id = id || new Id();
    this._name = name;
    this._billable = billable;
    this._customer = customer;
  }

  get id(): Id {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get billable(): boolean {
    return this._billable;
  }

  get customer(): Customer {
    return this._customer;
  }
}
