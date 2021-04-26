import { Request, Response, Router } from 'express';
import LoggerInstance from '../../loaders/logger';
import { verifyJwt } from '../User/controller';
import { generateFileBuffer } from './controller';

const router = Router();

export const reportRouteHandler = () => {
  router.get('/generate', generateReport);

  return router;
};

const generateReport = async (req: Request, res: Response) => {
  try {
    const { email } = verifyJwt(req.query.token as string) as any;
    const buffer = await generateFileBuffer(
      req.query.format === 'html' ? 'html' : 'pdf',
      email,
      req.query.message as string,
      parseInt(req.query.from as string),
      parseInt(req.query.to as string),
      req.query.recepient as string,
    );
    res.setHeader('Content-Type', req.query.format === 'html' ? 'text/html' : 'application/pdf');
    res.end(buffer);
  } catch (error) {
    LoggerInstance.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
