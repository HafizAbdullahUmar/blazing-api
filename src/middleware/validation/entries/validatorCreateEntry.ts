// import { Request, Response, NextFunction } from 'express';
// import validator from 'validator';

// import { CustomError } from 'utils/response/custom-error/CustomError';
// import { ErrorValidation } from 'utils/response/custom-error/types';

// export const validatorCreateEntry = (req: Request, res: Response, next: NextFunction) => {
//   let { metadata } = req.body;
//   const errorsValidation: ErrorValidation[] = [];

//   metadata = !metadata ? '' : metadata;

//   if (validator.isEmpty(metadata)) {
//     errorsValidation.push({ metadata: 'Metadata is required' });
//   }

//   if (errorsValidation.length !== 0) {
//     const customError = new CustomError(400, 'Validation', 'Register validation error', null, null, errorsValidation);
//     return next(customError);
//   }
//   return next();
// };
