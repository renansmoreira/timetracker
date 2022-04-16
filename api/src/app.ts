import express from 'express';
import { Id } from '../../core/src/domain/id.js';
const app = express();
const port = process.env.PORT || 3000;
import { Timer } from '../../core/src/domain/timers/timer.js';
import { JsonDbProvider } from '../../core/src/infra/json-provider/json-db-provider.js';
import { TimersJsonProvider } from '../../core/src/infra/json-provider/timers-json-provider.js';

const jsonDbProvider = new JsonDbProvider();
const timers = new TimersJsonProvider(jsonDbProvider);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('timer/:id', async (req, res) => {
  const timer = await timers.get(new Id(req.params.id));

  res.json(Object.assign({}, timer, {
    _links: {
      self: {
        href: `/timer/${timer.id}`
      }
    }
  }));
})

app.post('timer', async (_req, res) => {
  const timer = new Timer();
  timer.start();
  await timers.save(timer);

  res.json({
    id: timer.id,
    _links: {
      self: {
        href: `/timer/${timer.id}`
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
