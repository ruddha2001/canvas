import { Router } from 'express';
import { moodRouteHandler } from './Mood/router';
import { reportRouteHandler } from './Report/router';
import { userRouteHandler } from './User/router';

export default (): Router => {
  const app = Router();

  app.use('/user', userRouteHandler());
  app.use('/mood', moodRouteHandler());
  app.use('/report', reportRouteHandler());

  return app;
};
