import { Router } from 'express';
import { userRouteHandler } from './User/router';

export default (): Router => {
  const app = Router();

  app.use('/user', userRouteHandler);

  return app;
};
