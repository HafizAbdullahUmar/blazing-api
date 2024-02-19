import { response, Response } from 'express';

response.customSuccess = function (httpStatusCode, message, data = null) {
  return this.status(httpStatusCode).json({ message, data });
};
