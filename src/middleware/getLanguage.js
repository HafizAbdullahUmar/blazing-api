import { Request, Response, NextFunction } from 'express';

import { Language } from '../orm/entities/users/types';

export const getLanguage = (req, res, next) => {
  const acceptLanguageHeader = req.get('Accept-Language') ;
  if (!acceptLanguageHeader) {
    req.language = 'en-US';
    return next();
  }
  req.language = acceptLanguageHeader;
  return next();
};
