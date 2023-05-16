import newRoute from './news.router';
import { Application } from 'express';
import uploadRouter from './upload.router';

export default function (app: Application) {
  app.use(uploadRouter);
  app.use(newRoute);
}
