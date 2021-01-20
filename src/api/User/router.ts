import { Request, Response, Router } from 'express';

const router = Router();

export const userRouteHandler = () => {
  router.get('/login', loginHandler);

  return router;
};

const loginHandler = (req: Request, res: Response) => {
  res.send('Login URL');
};
