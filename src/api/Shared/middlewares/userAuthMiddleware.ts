import { NextFunction, Request, Response } from 'express';
import LoggerInstance from '../../../loaders/logger';
import { verifyJwt } from '../../User/controller';

export const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.get('Authorization')) throw new Error('Authorization token was not found.');
    const token = req.get('Authorization').split(' ')[1];
    res.locals.user = verifyJwt(token);
    next();
  } catch (error) {
    LoggerInstance.error(error.message);
    res.status(403).json({ success: false, message: error.message });
  }
};
