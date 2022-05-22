import { Id } from '../id';

export class Customer {
  private _id: Id;
  private _name: string;

  constructor(name: string, id?: Id) {
    this._id = id || new Id();
    this._name = name;
  }

  changeName(newName: string): void {
    this._name = newName;
  }

  get id(): Id {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
