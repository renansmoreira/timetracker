import express from 'express';
import { Id } from 'timetracker-core/src/domain/id';
import { CustomersKnex } from 'timetracker-core/src/infra/knex/customers-knex';
import { KnexProvider } from 'timetracker-core/src/infra/knex/knex-provider';
import { ProjectsKnex } from 'timetracker-core/src/infra/knex/projects-knex';
import { TimersKnex } from 'timetracker-core/src/infra/knex/timers-knex';
import { AddNewTimer, FinishTimer } from 'timetracker-core/src/use-cases';
import { Link } from 'timetracker-lib-json-api/src/builders/link';
import { Links } from 'timetracker-lib-json-api/src/builders/links';

const router = express.Router();
const provider = new KnexProvider();
const projects = new ProjectsKnex(provider, new CustomersKnex(provider));
const timers = new TimersKnex(provider, projects);
const addNewTimer = new AddNewTimer(projects, timers);
const finishTimer = new FinishTimer(timers);

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
      endDate: timer.endDate?.timestamp,
      elapsedTime: timer['_elapsedTime']
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
            { name: 'endDate', type: 'datetime', displayName: 'End date' },
            { name: 'elapsedTime', type: 'time', displayName: 'Elapsed time' }
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
  const newTimerId = await addNewTimer.execute({
    projectId: req.body.projectId,
    billable: req.body.billable,
    description: req.body.description
  });

  res.json({
    type: 'timers',
    id: newTimerId,
    relationships: {},
    links: Links.new()
      .add(new Link('self', `/timers/${newTimerId}`))
      .serialize()
  });
});

router.put('/timers/:id', async (req, res) => {
  const timerId = await finishTimer.execute({ id: req.params.id });

  res.json({
    type: 'timers',
    id: timerId,
    relationships: {},
    links: Links.new()
      .add(new Link('self', `/timers/${timerId}`))
      .serialize()
  });
});

export default router;
