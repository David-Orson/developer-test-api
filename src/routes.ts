import { Application } from 'express';
import testRoutes from './routes/test.routes';
import creditSearch from './handlers';

export default (app: Application): void => {
  testRoutes(app);
  app.post("/credit-search", creditSearch);
};


