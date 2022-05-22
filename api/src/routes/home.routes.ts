import express from 'express';
import { Link } from '../serializers/json-api/link';
import { Links } from '../serializers/json-api/links';

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
