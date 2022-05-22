import express from 'express';
import { Id } from 'timetracker-core/src/domain/id';
import { Timer } from 'timetracker-core/src/domain/timers/timer';
import { KnexProvider } from 'timetracker-core/src/infra/knex/knex-provider';
import { TimersKnex } from 'timetracker-core/src/infra/knex/timers-knex';
import { Link } from '../serializers/json-api/link';
import { Links } from '../serializers/json-api/links';

const router = express.Router();
const provider = new KnexProvider();
const timers = new TimersKnex(provider);

router.get('/timers', async (_req, res) => {
  const foundTimers = await timers.getAll();
  const data = foundTimers.map((timer) => ({
    type: 'timers',
    id: timer.id.toString(),
    attributes: {
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

router.post('/timers', async (_req, res) => {
  const timer = new Timer();
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

export default router;
