import cors from 'cors';
import express from 'express';
import HomeRoutes from './routes/home.routes';
import TimerRoutes from './routes/timers.routes';

const app = express();
const port = process.env.PORT || 3000;

app
  .use(cors({
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    exposedHeaders: 'Allow'
  }))
  .use(HomeRoutes)
  .use(TimerRoutes)
  .listen(port, () => {
    console.log(`API listening on port ${port}`)
  });
