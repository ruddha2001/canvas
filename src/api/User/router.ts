import { Request, Response, Router } from 'express';
import LoggerInstance from '../../loaders/logger';
import { userAuthMiddleware } from '../Shared/middlewares/userAuthMiddleware';
import { addFeedback, generateJwt, generateLoginUrl, setToken, verifyJwt } from './controller';

const router = Router();

export const userRouteHandler = () => {
  router.get('/login', loginHandler);
  router.get('/authcode', authCodeHandler);
  router.post('/feedback', userAuthMiddleware, feedbackHandler);
  router.post('/verify', jwtVerifyHandler);

  return router;
};

const loginHandler = (req: Request, res: Response) => {
  res.redirect(generateLoginUrl());
};

const authCodeHandler = async (req: Request, res: Response) => {
  try {
    let data = await setToken(req.query);
    res.json({ success: true, token: generateJwt(data.email), name: data.name.split(' ')[0] });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const jwtVerifyHandler = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    res.json({ success: true, payload: verifyJwt(token) });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const feedbackHandler = async (req: Request, res: Response) => {
  try {
    const { text, choice } = req.body;
    await addFeedback(res.locals.user.email, text, choice);
    res.json({ success: true, message: 'Feedback has been added successfully' });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
