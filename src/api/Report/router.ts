import { Request, Response, Router } from 'express';
import LoggerInstance from '../../loaders/logger';
import { userAuthMiddleware } from '../Shared/middlewares/userAuthMiddleware';
import { generateFileBuffer } from './controller';

const router = Router();

export const reportRouteHandler = () => {
  router.get('/generate', userAuthMiddleware, generateReport);

  return router;
};

const generateReport = async (req: Request, res: Response) => {
  try {
    const buffer = await generateFileBuffer(
      req.query.format === 'html' ? 'html' : 'pdf',
      res.locals.user.email,
      parseInt(req.query.from as string),
      parseInt(req.query.to as string),
    );
    res.setHeader('Content-Type', req.query.format === 'html' ? 'text/html' : 'application/pdf');
    res.end(buffer);
  } catch (error) {
    LoggerInstance.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
