import express, { Express, json, RequestHandler, urlencoded, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Handlers } from '@sentry/node';
import cors from 'cors';

import { HTTP_PORT, SENTRY_ENABLED } from '../config';
import { Server } from 'http'
// import { Server } from 'https'

import Routes from './routes'
import { responseMiddleware, errorMiddleware } from './utils'



export let server: Server;
export let expressServer: Express;

export async function createExpressApp (): Promise<Express> {
  const app: Express = express() as Express;

  app.set('port', HTTP_PORT);
  app.use(cors());
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));

  if (SENTRY_ENABLED) {
    app.use(Handlers.requestHandler() as RequestHandler);
  }

  expressServer = app;
  console.log('Express App created ✅');

  return app;
}

export function assignRoutes (getSocketInstance: any) {
  expressServer.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "dvelopment" ? err : {};
    res.status(500);
    res.render("error");
});

  expressServer.use(Routes(getSocketInstance));
  expressServer.use(responseMiddleware);
  expressServer.use(Handlers.errorHandler() as ErrorRequestHandler);
  expressServer.use(errorMiddleware);

  console.log('Express routes assigned ✅');

  return expressServer;
}

export function createServer (app: Express): Server {
  /*const certification: any = {
    key: readFileSync('/Users/dmian.palomo/Documents/Semnexus/YogiGoGFitness/YogiGoFitness.Api/localhost-key.pem'),
    cert: readFileSync('/Users/dmian.palomo/Documents/Semnexus/YogiGoGFitness/YogiGoFitness.Api/localhost.pem')
  }

  server = new Server(certification, app)*/

  server = new Server(app);
  console.log('HTTP Server created ✅');

  return server;
}
