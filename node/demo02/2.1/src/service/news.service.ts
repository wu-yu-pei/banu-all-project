import { Model } from 'sequelize';
import NewsModel from '../model/news.model';
import { News } from '../types';
import { BadRequest } from '../errors';
import { redis } from '../database/index';

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
    const res = await this.getNewsFromDb(id);

    res.dataValues.view = (await this.getArticelViewFromRedis(id)) as number;

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

  async getArticelViewFromRedis(id: number) {
    const newsViewInRedis = await redis.get(`news:${id}View`);
    if (newsViewInRedis) {
      redis.incrby(`news:${id}View`, 1);
      return parseInt(newsViewInRedis) + 1;
    } else {
      const news: Model<News> = await this.getNewsFromDb(id);

      await redis.set(`news:${id}View`, news.dataValues.view * 1 + 1, 'EX', 60 * 5);

      return news.dataValues.view;
    }
  }

  async getNewsFromDb(id: number): Promise<Model<News>> {
    const news: Model<News> = await NewsModel.findOne({
      where: {
        id,
      },
    });

    if (!news) throw new BadRequest('文章不存在');

    return news;
  }
}

export default new NewsService();
