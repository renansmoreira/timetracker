import express from 'express';
import { Id } from 'timetracker-core/src/domain/id';
import { Timer } from 'timetracker-core/src/domain/timers/timer';
import { JsonDbProvider } from 'timetracker-core/src/infra/json-provider/json-db-provider';
import { TimersJsonProvider } from 'timetracker-core/src/infra/json-provider/timers-json-provider';
import { Link } from '../serializers/json-api/link';
import { Links } from '../serializers/json-api/links';

const router = express.Router();
const jsonDbProvider = new JsonDbProvider();
const timers = new TimersJsonProvider(jsonDbProvider);

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
        template: [
          { name: 'startDate', type: 'datetime', displayName: 'Start date' },
          { name: 'endDate', type: 'datetime', displayName: 'End date' }
        ]
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
      template: [
        { name: 'id', type: 'string', displayName: 'Id' },
        { name: 'startDate', type: 'datetime', displayName: 'Start date' },
        { name: 'endDate', type: 'datetime', displayName: 'End date' }
      ]
    },
    type: 'timers',
    id: timer.id.toString(),
    attributes: {
      startDate: timer.startDate,
      endDate: timer.endDate
    },
    relationships: {},
    links: Links.new()
      .add(new Link('self', `/timer/${timer.id}`))
      .serialize()
  });
})

router.post('/timers', async (_req, res) => {
  const timer = new Timer();
  timer.start();
  await timers.save(timer);

  res.json({
    meta: {
      template: [
        { name: 'id', type: 'string', displayName: 'Id' },
        { name: 'startDate', type: 'datetime', displayName: 'Start date' },
        { name: 'endDate', type: 'datetime', displayName: 'End date' }
      ]
    },
    type: 'timers',
    id: timer.id,
    attributes: {
      startDate: timer.startDate,
      endDate: timer.endDate
    },
    relationships: {},
    links: Links.new()
      .add(new Link('self', `/timers/${timer.id}`))
      .serialize()
  });
});

export default router;
