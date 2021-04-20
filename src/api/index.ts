import { Router } from 'express';
import { moodRouteHandler } from './Mood/router';
import { userRouteHandler } from './User/router';

export default (): Router => {
  const app = Router();

  app.use('/user', userRouteHandler());
  app.use('/mood', moodRouteHandler());

  return app;
};
