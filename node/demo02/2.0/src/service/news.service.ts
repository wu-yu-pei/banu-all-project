import { Model } from 'sequelize';
import NewsModel from '../model/news.model';
import { News } from '../types';
import { BadRequest } from '../errors';

class NewsService {
  async createNews(title: string, content: string, type: number): Promise<Model<News>> {
    const res: Model<News> = await NewsModel.create({ title, content, type });

    return res;
  }

  async getNews(pageSize: number, page: number): Promise<Model<News>[]> {
    const res: Model<News>[] = await NewsModel.findAll({
      limit: pageSize * 1,
      offset: pageSize * (page - 1),
      where: {
        state: 1,
      },
    });

    return res;
  }

  async getNewsDetail(id: number): Promise<Model<News>> {
    const res: Model<News> = await NewsModel.findOne({
      where: {
        id,
      },
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
