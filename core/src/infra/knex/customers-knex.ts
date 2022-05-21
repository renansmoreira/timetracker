import { Customer } from '../../domain/customers/customer';
import { Customers } from '../../domain/customers/customers';
import { Id } from '../../domain/id';
import { KnexProvider } from './knex-provider';
import { CustomerPersistenceModel } from './persistence-definitions/customer.pd';

export class CustomersKnex implements Customers {

  constructor(
    private provider: KnexProvider
  ) { }

  async getAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }

  get(customerId: Id): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  async save(customer: Customer): Promise<void> {
    const session = await this.provider.getSession();

    await session<CustomerPersistenceModel>('customers').insert({
      name: customer.name
    })
  }
}
