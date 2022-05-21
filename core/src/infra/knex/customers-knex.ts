import { Customer } from '../../domain/customers/customer';
import { Customers } from '../../domain/customers/customers';
import { Id } from '../../domain/id';
import { KnexProvider } from './knex-provider';
import { CustomerPersistenceModel } from './persistence-definitions/customer.pd';

const TABLE_NAME = 'customers';

export class CustomersKnex implements Customers {

  constructor(
    private provider: KnexProvider
  ) { }

  async getAll(): Promise<Customer[]> {
    const session = await this.provider.getSession();
    const customers = await session.select('*').from<CustomerPersistenceModel>(TABLE_NAME);

    return customers.map((customer) => new Customer(customer.name, new Id(customer.id)));
  }

  get(customerId: Id): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  async save(customer: Customer): Promise<void> {
    const session = await this.provider.getSession();

    await session<CustomerPersistenceModel>(TABLE_NAME).insert({
      name: customer.name
    })
  }
}
