import { Request, Response, Router } from 'express';
import LoggerInstance from '../../loaders/logger';
import { generateLoginUrl, setToken } from './controller';

const router = Router();

export const userRouteHandler = () => {
  router.get('/login', loginHandler);
  router.get('/authcode', authCodeHandler);

  return router;
};

const loginHandler = (req: Request, res: Response) => {
  res.redirect(generateLoginUrl());
};

const authCodeHandler = async (req: Request, res: Response) => {
  try {
    let data = await setToken(req.query);
    res.send(`Hi ${data.name}! Welcome to Canvas`);
  } catch (error) {
    LoggerInstance.error(error);
    res.json({ status: 500, message: error.message });
  }
};
