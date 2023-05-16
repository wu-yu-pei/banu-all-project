import { Model } from 'sequelize';
import { News } from '../types';
import uploadService from './upload.service';
import { BadRequest } from '../errors';
import NewsModel from '../model/news.model';
import ImageModel from '../model/image.model';

class NewsService {
  async createNews(title: string, content: string, type: number, file: any): Promise<Model<News>> {
    const res: Model<News> = await NewsModel.create({ title, content, type });

    if (!file.length) file = [file];

    for (let i = 0; i < file.length; i++) {
      await uploadService.saveToLocal(file[i]);
      await uploadService.savaToDb(file[i], res.dataValues.id);
    }

    return res;
  }

  async getNews(pageSize: number, page: number): Promise<Model<News>[]> {
    const res: Model<News>[] = await NewsModel.findAll({
      limit: pageSize * 1,
      offset: pageSize * (page - 1),
      where: {
        state: 1,
      },
      include: [ImageModel],
    });

    return res;
  }

  async getNewsDetail(id: number): Promise<Model<News>> {
    const res: Model<News> = await NewsModel.findOne({
      where: {
        id,
      },
      include: [ImageModel],
    });

    if (!res) throw new BadRequest('文章不存在');

    // 阅读数量 加1
    await NewsModel.update(
      {
        view: res.dataValues.view + 1,
      },
      {
        where: {
          id,
        },
      }
    );

    res.dataValues.view++;

    return res;
  }

  async deleteNews(id: number): Promise<number[]> {
    const res = await NewsModel.update(
      {
        state: 0,
      },
      {
        where: {
          id,
        },
      }
    );

    return res;
  }

  async updateNews(id: number, title: string, content: string, type: string): Promise<number[]> {
    const res = await NewsModel.update(
      {
        title,
        content,
        type,
      },
      {
        where: {
          id,
        },
      }
    );

    return res;
  }
}

export default new NewsService();
