import { BadRequest } from '../errors/index.js';
import { isNumber } from '../utils/index.js';

class VerifyParams {
  // 参数校验 必填参数
  required(paramsList) {
    return function (req, res, next) {
      const message = [];

      for (let i = 0; i < paramsList.length; i++) {
        if (!req.body[paramsList[i]]) {
          message.push(`${paramsList[i]} 参数不能为空`);
        }
      }

      if (message.length !== 0) {
        throw new BadRequest(JSON.stringify(message));
      } else {
        next();
      }
    };
  }

  // 参数检验 是否为数字
  mustNumber(paramsList) {
    return function (req, res, next) {
      const message = [];
      for (let i = 0; i < paramsList.length; i++) {
        if (!isNumber(req.params[paramsList[i]])) {
          message.push(`${paramsList[i]} 应该为数字`);
        }
      }

      if (message.length !== 0) {
        throw new BadRequest(JSON.stringify(message));
      } else {
        next();
      }
    };
  }
}

export default new VerifyParams();
