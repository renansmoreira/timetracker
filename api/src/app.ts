import cors from 'cors';
import express from 'express';
import HomeRoutes from './routes/home.routes';
import TimerRoutes from './routes/timers.routes';
import CustomerRoutes from './routes/customers.routes';
import ProjectRoutes from './routes/projects.routes';
import CurrencyRoutes from './routes/currencies.routes';

const app = express();
const port = process.env.PORT || 3000;

app
  .use(cors({
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    exposedHeaders: 'Allow'
  }))
  .use(express.json())
  .use(HomeRoutes)
  .use(TimerRoutes)
  .use(CustomerRoutes)
  .use(ProjectRoutes)
  .use(CurrencyRoutes)
  .listen(port, () => {
    console.log(`API is up on http://localhost:${port}`)
  });
