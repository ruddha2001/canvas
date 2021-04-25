import { Request, Response, Router } from 'express';
import LoggerInstance from '../../loaders/logger';
import { userAuthMiddleware } from '../Shared/middlewares/userAuthMiddleware';
import { addNewMood, getUserMoods } from './controller';

const router = Router();

export const moodRouteHandler = () => {
  router.post('/add', userAuthMiddleware, addMood);
  router.get('/fetch', userAuthMiddleware, fetchMood);

  return router;
};

const addMood = async (req: Request, res: Response) => {
  try {
    await addNewMood(req.body.mood, req.body.text, res.locals.user.email);
    res.json({ success: true, message: 'New mood has been added.' });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const fetchMood = async (req: Request, res: Response) => {
  try {
    res.json(await getUserMoods(res.locals.user.email, req.query.full as string));
  } catch (error) {
    LoggerInstance.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
