import bodyParser from 'body-parser';
import errorHandlerMiddleware from './errorHandler.middleware.js';
import notFoundMiddleware from './notFond.middleware.js';

export { errorHandlerMiddleware, notFoundMiddleware };

export default function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}
