import { CustomError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export default function (err, req, res, next) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later');
}
