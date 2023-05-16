import { NextFunction, Request, Response } from 'express';
import { BadRequest } from '../errors/index';
import { isNumber } from '../utils/index';

class VerifyParams {
  // 参数校验 必填参数
  required(paramsList: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
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
  mustNumber(paramsList: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
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
