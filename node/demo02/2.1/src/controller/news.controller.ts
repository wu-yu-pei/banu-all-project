import { Request, Response } from 'express';
import { Model } from 'sequelize';

import newsService from '../service/news.service';
import { BadRequest } from '../errors/index';
import { isNumber } from '../utils/index';
import { News, NewsType } from '../types';

class NewsController {
  // 1 创建新闻
  async createNews(req: Request, res: Response) {
    const { title, type, content } = req.body;

    if (!NewsType[type]) throw new BadRequest('文章类型错误');

    const result: Model<News> = await newsService.createNews(title, content, NewsType[type]);

    res.status(200).json({ data: result, msg: 'OK' });
  }

  // 2 新闻列表
  async getNews(req: Request, res: Response) {
    const { pageSize = 10, page = 1 } = req.query as any;

    if (!isNumber(pageSize)) {
      throw new BadRequest('pageSize 参数必须为数字');
    }

    if (!isNumber(page)) {
      throw new BadRequest('page 参数必须为数字');
    }

    const result: Model<News>[] = await newsService.getNews(pageSize, page);

    res.status(200).json({ msg: 'OK', data: result });
  }

  // 3 新闻详情
  async getNewsDetail(req: Request, res: Response) {
    const { id } = req.params;

    const result: Model<News> = await newsService.getNewsDetail(Number(id));

    res.status(200).json({ msg: 'OK', data: result ? result : null });
  }

  // 4 删除新闻
  async deleteNews(req: Request, res: Response) {
    const { id } = req.params;

    const result = await newsService.deleteNews(Number(id));

    if (result[0] == 1) {
      res.status(200).json({ msg: '删除成功', data: { id } });
    } else {
      res.status(200).json({ msg: '删除失败, 文章不存在', data: null });
    }
  }

  // 5 更新新闻
  async updateNews(req: Request, res: Response) {
    const { title, type, content } = req.body;
    const { id } = req.params;

    const result = await newsService.updateNews(Number(id), title, content, type);

    if (result[0] == 1) {
      res.status(200).json({ msg: '编辑成功', data: { id } });
    } else {
      res.status(200).json({ msg: '编辑失败', data: null });
    }
  }
}

export default new NewsController();
