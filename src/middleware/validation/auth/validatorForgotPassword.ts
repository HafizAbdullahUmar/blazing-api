import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorForgotPassword = (req: Request, res: Response, next: NextFunction) => {
    let { email } = req.body;
    const errorsValidation: ErrorValidation[] = [];

    email = !email ? '' : email;

    if (validator.isEmpty(email)) {
        errorsValidation.push({ email: 'Email is required' });
    }

    if (!validator.isEmail(email)) {
        errorsValidation.push({ email: 'Invalid email' });
    }

    if (errorsValidation.length !== 0) {
        const customError = new CustomError(
            400,
            'Validation',
            'Forgot password validation error',
            null,
            null,
            errorsValidation,
        );
        return next(customError);
    }
    return next();
};