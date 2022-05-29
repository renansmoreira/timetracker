import express from 'express';
import { Link } from '../serializers/json-api/link';
import { Links } from '../serializers/json-api/links';
import { CustomersKnex } from 'timetracker-core/src/infra/knex/customers-knex';
import { KnexProvider } from 'timetracker-core/src/infra/knex/knex-provider';
import { Customer } from 'timetracker-core/src/domain/customers/customer';
import { Id } from 'timetracker-core/src/domain/id';
import { DomainError } from 'timetracker-core/src/domain/error/domain.error';

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

router.get('/customers/:id', async (req, res) => {
  try {
    const id = new Id(req.params.id);
    const customer = await customers.get(id);

    res.json({
      meta: {
        template: {
          POST: [
            { name: 'name', type: 'string', displayName: 'Name', editable: true }
          ],
          PUT: [
            { name: 'id', type: 'string', displayName: 'Id' },
            { name: 'name', type: 'string', displayName: 'Name', editable: true }
          ],
        }
      },
      type: 'customers',
      id: id.toString(),
      attributes: {
        name: customer.name
      },
      relationships: {},
      links: Links.new()
        .add(new Link('self', `/customers/${id}`))
        .serialize()
    });
  } catch (error) {
    const baseError: DomainError = error as DomainError;
    if (baseError.type === 'NotFoundError')
      return res.status(404).send();

    return res.status(500).send();
  }
});

router.post('/customers', async (req, res) => {
  const customer = new Customer(req.body.name);
  await customers.save(customer);

  res.json({
    type: 'customers',
    id: customer.id,
    relationships: {},
    links: Links.new()
      .add(new Link('self', `/customers/${customer.id}`))
      .serialize()
  });
});

router.put('/customers/:id', async (req, res) => {
  try {
    const id = new Id(req.params.id);
    const customer = await customers.get(id);

    customer.changeName(req.body.name);
    await customers.update(customer);

    res.json({
      type: 'customers',
      id: id,
      relationships: {},
      links: Links.new()
        .add(new Link('self', `/customers/${id}`))
        .serialize()
    });
  } catch (error) {
    const baseError: DomainError = error as DomainError;
    if (baseError.type === 'NotFoundError')
      return res.status(404).send();

    return res.status(500).send();
  }
});

export default router;
