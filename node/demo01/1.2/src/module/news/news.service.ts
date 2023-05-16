import { Injectable } from '@nestjs/common';
import { generationNewsData } from 'src/utils';
import { News, ResposeType } from './types';
import { CreateUserDto } from './dto/createNews.dto';

const news: News[] = generationNewsData();

@Injectable()
export class NewsService {
  createNews(news: CreateUserDto): ResposeType<any> {
    return {
      code: 200,
      msg: '创建成功',
      data: news,
    };
  }

  getNews(pageSize: number, page: number): ResposeType<News[]> {
    const result = news.slice(pageSize * (page - 1), pageSize * page);

    return {
      code: 200,
      msg: '创建成功',
      data: result,
    };
  }

  getNewsDetial(id: number): ResposeType<News> {
    if (news[id]) {
      return {
        code: 200,
        data: news[id],
      };
    } else {
      return {
        code: 200,
        msg: '新闻不存在',
        data: null,
      };
    }
  }

  deleteNewsDetial(id: number): ResposeType<any> {
    if (news[id]) {
      return {
        code: 200,
        data: {
          id,
        },
      };
    } else {
      return {
        code: 200,
        msg: '新闻不存在',
        data: null,
      };
    }
  }

  updateNews(id: number): ResposeType<any> {
    if (news[id]) {
      return {
        code: 200,
        msg: '编辑成功',
        data: {
          id,
        },
      };
    } else {
      return {
        code: 200,
        msg: '新闻不存在',
        data: null,
      };
    }
  }
}
