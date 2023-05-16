import scheduler from 'node-schedule';
import NewsModel from '../model/news.model';
import { redis } from '../database';
import { Model } from 'sequelize';
import { News as NewsType } from '../types';
import config from '../config';

scheduler.scheduleJob(config.scheduler.name, config.scheduler.time, async () => {
  const news: Model<NewsType>[] = await NewsModel.findAll();

  for (let i = 0; i < news.length; i++) {
    const newsId = news[i].dataValues.id;
    const newsView = await redis.get(`news:${newsId}View`);

    if (!newsView) return;

    await NewsModel.update(
      {
        view: newsView,
      },
      {
        where: {
          id: newsId,
        },
      }
    );
  }
});
