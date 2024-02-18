import { Request as ExpressRequest, Response, NextFunction } from "express";
import { CustomError } from "utils/response/custom-error/CustomError";
import { ErrorValidation } from "utils/response/custom-error/types";

interface MulterRequest extends ExpressRequest {
  file?: File;
}

export const validatorImageStore = (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  const errorsValidation: ErrorValidation[] = [];

  if (!req.file) {
    errorsValidation.push({ file: "Image file field is required" });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      "Validation",
      "Image validation error",
      null,
      null,
      errorsValidation
    );
    return next(customError);
  }
  return next();
};
