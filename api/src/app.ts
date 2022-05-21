import cors from 'cors';
import express from 'express';
import HomeRoutes from './routes/home.routes';
import TimerRoutes from './routes/timers.routes';
import CustomerRoutes from './routes/customers.routes';

const app = express();
const port = process.env.PORT || 3000;

app
  .use(cors({
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    exposedHeaders: 'Allow'
  }))
  .use(HomeRoutes)
  .use(TimerRoutes)
  .use(CustomerRoutes)
  .listen(port, () => {
    console.log(`API is up on http://localhost:${port}`)
  });
