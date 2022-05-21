import express from 'express';
import { Link } from '../serializers/json-api/link';
import { Links } from '../serializers/json-api/links';
import { CustomersKnex } from 'timetracker-core/src/infra/knex/customers-knex';
import { KnexProvider } from 'timetracker-core/src/infra/knex/knex-provider';

const router = express.Router();
const provider = new KnexProvider();
const customers = new CustomersKnex(provider);

router.get('/customers', async (_req, res) => {
  const foundCustomers = await customers.getAll();
  const data = foundCustomers.map((customer) => ({
    type: 'customers',
    id: customer.id.toString(),
    attributes: {
      name: customer.name
    }
  }));

  res
    .setHeader('Allow', 'GET, POST, PUT')
    .json({
      meta: {
        template: {
          GET: [
            { name: 'name', type: 'string', displayName: 'Name' }
          ]
        }
      },
      data,
      relationships: {},
      links: Links.new()
        .add(new Link('self', '/customers'))
        .serialize()
    });
});

export default router;
