import { Application } from 'express';
import bodyParser from 'body-parser';
import errorHandlerMiddleware from './errorHandler.middleware';
import notFoundMiddleware from './notFond.middleware';


export { errorHandlerMiddleware, notFoundMiddleware };

export default function (app: Application) {
  app.use(bodyParser.json());
}
