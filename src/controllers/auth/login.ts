import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import { Role } from 'orm/entities/users/types';
import { User } from 'orm/entities/users/User';
import { JwtPayload } from 'types/JwtPayload';
import { createJwtToken } from 'utils/createJwtToken';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
        const customError = new CustomError(404, 'General', 'Not Found', [`Email or password is incorrect`]);
        return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      return next(customError);
    }
    if(user.isVerified) {
      const customError = new CustomError(401, 'Unauthorized', 'Account Not Verified', ['Please verify your account first']);
      return next(customError);
    }
    const jwtPayload: JwtPayload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role as Role,
      created_at: user.created_at,
    };

    try {
      const token = createJwtToken(jwtPayload);
      res.customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
    } catch (err) {
      const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};