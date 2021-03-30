import bodyParser from 'body-parser';
import cors from 'cors';
import { join } from 'path';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import config from '../config';
import routes from '../api';
import morgan from 'morgan';

export default ({ app }: { app: express.Application }): void => {
  /**
   * Health Check endpoints
   */

  app.get('/healthcheck', (req, res) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };
    try {
      return res.json(healthcheck);
    } catch (e) {
      return res.status(503).send();
    }
  });

  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Middleware to track user requests
  app.use(morgan('short'));

  // Middleware that helps secure app by setting headers
  app.use(helmet());

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Serve the client
  // app.use(express.static(join(__dirname, '..', '..', 'build', 'client')));
  // app.get('/', (req: Request, res: Response) => {
  //   res.sendFile(join(__dirname, '..', '..', 'build', 'client', 'index.html'));
  // });

  // Load API routes
  app.use(config.api.prefix, routes());

  // Redirect to index.html for routing
  // app.get('*', (req: Request, res: Response) => {
  //   res.sendFile(join(__dirname, '..', '..', 'build', 'client', 'index.html'));
  // });
};
