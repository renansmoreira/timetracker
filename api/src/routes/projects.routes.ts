import express from 'express';
import { Link } from '../serializers/json-api/link';
import { Links } from '../serializers/json-api/links';
import { ProjectsKnex } from 'timetracker-core/src/infra/knex/projects-knex';
import { KnexProvider } from 'timetracker-core/src/infra/knex/knex-provider';
import { Project } from 'timetracker-core/src/domain/projects/project';
import { Id } from 'timetracker-core/src/domain/id';
import { CustomersKnex } from 'timetracker-core/src/infra/knex/customers-knex';
import { Money } from 'timetracker-core/src/domain/remunerations/money';
import { Currency } from 'timetracker-core/src/domain/remunerations/currency';

const router = express.Router();
const provider = new KnexProvider();
const customers = new CustomersKnex(provider);
const projects = new ProjectsKnex(provider, customers);

router.get('/projects', async (_req, res) => {
  const foundProjects = await projects.getAll();
  const data = foundProjects.map((project) => ({
    type: 'projects',
    id: project.id.toString(),
    attributes: {
      name: project.name,
      valuePerHour: project.valuePerHour?.amount,
      currency: project.valuePerHour?.currency.toString(),
      customerName: project.customer.name
    }
  }));

  res
    .setHeader('Allow', 'GET, POST, PUT')
    .json({
      meta: {
        template: {
          GET: [
            { name: 'name', type: 'string', displayName: 'Name' },
            { name: 'currency', type: 'currencies', displayName: 'Currency' },
            { name: 'valuePerHour', type: 'decimal', displayName: 'Value per hour' },
            { name: 'customer', type: 'string', displayName: 'Customer name' }
          ]
        }
      },
      data,
      relationships: {},
      links: Links.new()
        .add(new Link('self', '/projects'))
        .serialize()
    });
});

router.post('/projects', async (req, res) => {
  const customer = await customers.get(new Id(req.body.customerId));
  const valuePerHour = req.body.valuePerHour ? new Money(req.body.valuePerHour, Currency.REAL) : undefined;
  const project = new Project(req.body.name, customer, valuePerHour);
  await projects.save(project);

  res.json({
    type: 'projects',
    id: project.id,
    relationships: {},
    links: Links.new()
      .add(new Link('self', `/projects/${project.id}`))
      .serialize()
  });
});

export default router;
