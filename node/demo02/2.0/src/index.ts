import express, { Application } from 'express';
import 'express-async-errors'
import setupRouter from './router/index';
import setupSequelize from './database/index';
import setupMiddleware, { errorHandlerMiddleware, notFoundMiddleware } from './middleware/index';

const app: Application = express();

// mysql
setupSequelize();

// middleware
setupMiddleware(app);

// route
setupRouter(app);

// api not found
app.use(notFoundMiddleware);

// error handle
app.use(errorHandlerMiddleware);

app.listen(8888, () => {
  console.log('server is runing at 8888');
});
