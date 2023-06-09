import { Router } from 'express';

import newsController from '../controller/news.controller';
import verifyPipe from '../pipe/verify.pipe';

const newRoute = Router();

newRoute.post('/news', verifyPipe.required(['title', 'type', 'content']), newsController.createNews);

newRoute.get('/news', newsController.getNews);

newRoute.get('/news/:id', verifyPipe.mustNumber(['id']), newsController.getNewsDetail);

newRoute.put('/news/:id', verifyPipe.mustNumber(['id']), verifyPipe.required(['title', 'type', 'coneten']), newsController.updateNews);

newRoute.delete('/news/:id', verifyPipe.mustNumber(['id']), newsController.deleteNews);

export default newRoute;
