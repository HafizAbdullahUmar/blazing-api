import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/response/custom-error/CustomError';

export const errorHandler = (err, req, res, next) => {
  return res.status(err.HttpStatusCode).json(err.JSON);
};
