import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { ConstsUser } from 'consts/ConstsUser';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorResetPassword = (req: Request, res: Response, next: NextFunction) => {
    let { resetPasswordToken, newPassword } = req.body;
    const errorsValidation: ErrorValidation[] = [];

    resetPasswordToken = !resetPasswordToken ? '' : resetPasswordToken;
    newPassword = !newPassword ? '' : newPassword;

    if (validator.isEmpty(resetPasswordToken)) {
        errorsValidation.push({ resetPasswordToken: 'Reset token is required' });
    }

    if (validator.isEmpty(newPassword)) {
        errorsValidation.push({ newPassword: 'New password is required' });
    }

    if (!validator.isLength(newPassword, { min: ConstsUser.PASSWORD_MIN_CHAR })) {
        errorsValidation.push({
            newPassword: `Password must be at least ${ConstsUser.PASSWORD_MIN_CHAR} characters`,
        });
    }

    if (errorsValidation.length !== 0) {
        const customError = new CustomError(
            400,
            'Validation',
            'Reset password validation error',
            null,
            null,
            errorsValidation,
        );
        return next(customError);
    }
    return next();
};