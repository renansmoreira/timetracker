import express from 'express';
import { Id } from 'timetracker-core/src/domain/id';
import { Timer } from 'timetracker-core/src/domain/timers/timer';
import { CustomersKnex } from 'timetracker-core/src/infra/knex/customers-knex';
import { KnexProvider } from 'timetracker-core/src/infra/knex/knex-provider';
import { ProjectsKnex } from 'timetracker-core/src/infra/knex/projects-knex';
import { TimersKnex } from 'timetracker-core/src/infra/knex/timers-knex';
import { Link } from 'timetracker-lib-json-api/src/builders/link';
import { Links } from 'timetracker-lib-json-api/src/builders/links';

const router = express.Router();
const provider = new KnexProvider();
const projects = new ProjectsKnex(provider, new CustomersKnex(provider));
const timers = new TimersKnex(provider, projects);

router.get('/timers', async (_req, res) => {
  const foundTimers = await timers.getAll();
  const data = foundTimers.map((timer) => ({
    type: 'timers',
    id: timer.id.toString(),
    attributes: {
      description: timer.description,
      projectName: timer.project?.name,
      billable: timer.billable,
      startDate: timer.startDate?.timestamp,
      endDate: timer.endDate?.timestamp
    }
  }));

  res
    .setHeader('Allow', 'GET, POST, PUT')
    .json({
      meta: {
        template: {
          GET: [
            { name: 'description', type: 'string', displayName: 'Description' },
            { name: 'projectName', type: 'string', displayName: 'Project' },
            { name: 'billable', type: 'boolean', displayName: 'Billable' },
            { name: 'startDate', type: 'datetime', displayName: 'Start date' },
            { name: 'endDate', type: 'datetime', displayName: 'End date' }
          ]
        }
      },
      data,
      relationships: {},
      links: Links.new()
        .add(new Link('self', '/timers'))
        .serialize()
    });
});

router.get('/timers/:id', async (req, res) => {
  const timer = await timers.get(new Id(req.params.id));

  res.json({
    meta: {
      template: {
        POST: [
          { name: 'startDate', type: 'datetime', displayName: 'Start date', editable: true }
        ],
        PUT: [
          { name: 'id', type: 'string', displayName: 'Id' },
          { name: 'startDate', type: 'datetime', displayName: 'Start date', editable: false },
          { name: 'endDate', type: 'datetime', displayName: 'End date', editable: false }
        ],
      }
    },
    type: 'timers',
    id: timer.id.toString(),
    attributes: {
      startDate: timer.startDate?.timestamp,
      endDate: timer.endDate?.timestamp
    },
    relationships: {},
    links: Links.new()
      .add(new Link('self', `/timer/${timer.id}`))
      .serialize()
  });
});

router.post('/timers', async (req, res) => {
  const project = await projects.get(new Id(req.body.projectId));
  const timer = new Timer(undefined, undefined, undefined,
    req.body.billable, req.body.description, project);
  timer.start();
  await timers.save(timer);

  res.json({
    type: 'timers',
    id: timer.id,
    relationships: {},
    links: Links.new()
      .add(new Link('self', `/timers/${timer.id}`))
      .serialize()
  });
});

router.put('/timers/:id', async (req, res) => {
  const timer = await timers.get(new Id(req.params.id));
  timer.end();

  await timers.update(timer);

  res.json({
    type: 'timers',
    id: timer.id,
    relationships: {},
    links: Links.new()
      .add(new Link('self', `/timers/${timer.id}`))
      .serialize()
  });
});

export default router;
