import express from 'express';
import { Link } from 'timetracker-lib-json-api/src/builders/link';
import { Links } from 'timetracker-lib-json-api/src/builders/links';
import { Currency } from 'timetracker-core/src/domain/remunerations/currency';

const router = express.Router();

router.get('/currencies', async (_req, res) => {
  const data = [Currency.REAL].map((currency) => ({
    type: 'currencies',
    id: currency,
    attributes: {
      name: currency.toString()
    }
  }));

  res
    .setHeader('Allow', 'GET, POST, PUT')
    .json({
      meta: {
        template: {
          GET: [
            { name: 'name', type: 'string', displayName: 'Currency' }
          ]
        }
      },
      data,
      relationships: {},
      links: Links.new()
        .add(new Link('self', '/currency'))
        .serialize()
    });
});

export default router;
