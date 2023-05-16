import { Request, Response } from 'express';
import { BadRequest } from '../errors';
import uploadService from '../service/upload.service';

class UploadController {
  async upload(req: Request, res: Response) {
    if (!req.files) throw new BadRequest('请选择文件');

    const file: any = req.files.file;

    const result = await uploadService.save(file);

    return res.status(200).json({ msg: '上传成功', result });
  }
}

export default new UploadController();
