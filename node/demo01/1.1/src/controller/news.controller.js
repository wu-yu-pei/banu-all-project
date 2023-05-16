import BadRequest from '../errors/badRequest.error.js';
import { generationNewsData } from '../utils/index.js';
import { isNumber } from '../utils/index.js';

const news = generationNewsData();

class NewsController {
  // 1 创建新闻
  createNews(req, res) {
    res.status(200).json({ data: req.body, msg: 'OK' });
  }

  // 2 新闻列表
  getNews(req, res) {
    const { pageSize = 10, page = 1 } = req.query;

    if (!isNumber(pageSize)) {
      throw new BadRequest('pageSize 参数必须为数字');
    }

    if (!isNumber(page)) {
      throw new BadRequest('page 参数必须为数字');
    }

    const result = news.slice(pageSize * (page - 1), pageSize * page);

    res.status(200).json({ msg: 'OK', data: result });
  }

  // 3 新闻详情
  getNewsDetail(req, res) {
    const { id } = req.params;

    res.status(200).json({ msg: 'OK', data: news[id] ? news[id] : null });
  }

  // 4 删除新闻
  deleteNews(req, res) {
    const { id } = req.params;

    res.status(200).json({ msg: '删除成功', data: { id } });
  }

  // 5 更新新闻
  updateNews(req, res) {
    const { title, type, content } = req.body;
    const { id } = req.params;

    res.status(200).json({ msg: '编辑成功', data: { id, title, type, content } });
  }
}

export default new NewsController();
