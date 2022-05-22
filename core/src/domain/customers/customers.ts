import { Id } from '../id';
import { Customer } from './customer';

export interface Customers {
  getAll(): Promise<Customer[]>;
  get(customerId: Id): Promise<Customer | null>;
  save(customer: Customer): Promise<void>;
}
