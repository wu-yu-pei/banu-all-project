import express from 'express';
import setupRouter from './router/index.js';
import setupMiddleware, { errorHandlerMiddleware, notFoundMiddleware } from './middleware/index.js';

const app = express();

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
