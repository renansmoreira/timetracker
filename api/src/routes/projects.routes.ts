import express from 'express';
import { Link } from '../serializers/json-api/link';
import { Links } from '../serializers/json-api/links';
import { ProjectsKnex } from 'timetracker-core/src/infra/knex/projects-knex';
import { KnexProvider } from 'timetracker-core/src/infra/knex/knex-provider';

const router = express.Router();
const provider = new KnexProvider();
const projects = new ProjectsKnex(provider);

router.get('/projects', async (_req, res) => {
  const foundProjects = await projects.getAll();
  const data = foundProjects.map((project) => ({
    type: 'projects',
    id: project.id.toString(),
    attributes: {
      name: project.name,
      billable: project.billable,
      customer: project.customer.name
    }
  }));

  res
    .setHeader('Allow', 'GET, POST, PUT')
    .json({
      meta: {
        template: {
          GET: [
            { name: 'name', type: 'string', displayName: 'Name' },
            { name: 'billable', type: 'boolean', displayName: 'Billable' },
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

export default router;
