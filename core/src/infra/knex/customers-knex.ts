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

  async get(customerId: Id): Promise<Customer | null> {
    const session = await this.provider.getSession();
    const customer = await session.from(TABLE_NAME)
      .where({
        id: customerId.toString()
      }).select('*')
      .first<CustomerPersistenceModel>();

    if (!customer)
      return null;

    return new Customer(customer.name, new Id(customer.id));
  }

  async save(customer: Customer): Promise<void> {
    const session = await this.provider.getSession();
    const existingCustomer = await this.get(customer.id);

    if (existingCustomer) {
      await session<CustomerPersistenceModel>(TABLE_NAME)
        .where({
          id: customer.id.toString()
        })
        .update({
          name: customer.name
        });
    }
    else {
      await session<CustomerPersistenceModel>(TABLE_NAME).insert({
        id: customer.id.toString(),
        name: customer.name
      });
    }
  }
}
