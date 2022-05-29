import express from 'express';
import { Link } from 'timetracker-lib-json-api/src/builders/link';
import { Links } from 'timetracker-lib-json-api/src/builders/links';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    data: null,
    links: Links.new()
      .add(new Link('self', '/'))
      .add(new Link('timers', '/timers'))
      .add(new Link('customers', '/customers'))
      .add(new Link('projects', '/projects'))
      .serialize()
  });
});

export default router;
