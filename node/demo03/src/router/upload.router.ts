import { Router } from 'express';
import uploadController from '../controller/upload.controller';

const uploadRouter = Router();

uploadRouter.post('/upload', uploadController.upload);

export default uploadRouter;
