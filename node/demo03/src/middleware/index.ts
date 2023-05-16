import express, { Application } from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import path from 'path';

import errorHandlerMiddleware from './errorHandler.middleware';
import notFoundMiddleware from './notFond.middleware';

export { errorHandlerMiddleware, notFoundMiddleware };

export default function (app: Application) {
  app.use(express.static(path.resolve(__dirname, '../../static')));

  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: path.resolve(__dirname, '../../static/tmp'),
    })
  );

  app.use(bodyParser.json());
}
