import { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';
import crypto from 'crypto';

import { User } from "orm/entities/users/User";
import { CustomError } from "utils/response/custom-error/CustomError";
import { sendVerificationEmail } from "utils/sendVerificationEmail";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
   
    if (user) {
      if (user.isVerified) {
        const customError = new CustomError(
          400,
          "General",
          "User already exists",
          [`Email '${user.email}' already exists`]
        );
        return next(customError);
      }
    } else {
      user = new User();
      user.email = email;
      user.password = password;
      user.hashPassword();
    }

    // Generate a 6-digit OTP
    user.otp = crypto.randomInt(100000, 999999).toString();

    // Set the OTP expiry time to 10 minutes from now
    user.otp_expiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    sendVerificationEmail(email, user.otp, "Verify your email");
    res.customSuccess(201, "OTP sent to your email");
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};