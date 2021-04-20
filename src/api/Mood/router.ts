import { Request, Response, Router } from 'express';
import LoggerInstance from '../../loaders/logger';
import { addNewMood } from './controller';

const router = Router();

export const moodRouteHandler = () => {
  router.post('/add', addMood);

  return router;
};

const addMood = async (req: Request, res: Response) => {
  try {
    let data = await addNewMood(req.body.mood, res.locals.email);
    res.json({ success: true, message: 'New mood has been added.' });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
