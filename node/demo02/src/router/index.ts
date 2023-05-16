import newRoute from './news.router';
import { Application } from 'express';

export default function (app: Application) {
  app.use(newRoute);
}
