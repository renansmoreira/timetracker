import { Id } from '../id';
import { Customer } from './customer';

export interface Customers {
  getAll(): Promise<Customer[]>;
  get(customerId: Id): Promise<Customer>;
  save(customer: Customer): Promise<void>;
  update(customer: Customer): Promise<void>;
}
