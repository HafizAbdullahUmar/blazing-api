import { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';
import crypto from 'crypto';

import { User } from "orm/entities/users/User";
import { CustomError } from "utils/response/custom-error/CustomError";
import { sendVerificationEmail } from "utils/sendVerificationEmail";

export const resendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const customError = new CustomError(
        404,
        "General",
        "User not found",
        [`Email '${email}' not found`]
      );
      return next(customError);
    }

    if (user.isVerified) {
      const customError = new CustomError(
        400,
        "General",
        "User already verified",
        [`Email '${email}' is already verified`]
      );
      return next(customError);
    }

    // Generate a new 6-digit OTP
    user.otp = crypto.randomInt(100000, 999999).toString();

    // Set the OTP expiry time to 10 minutes from now
    user.otp_expiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    sendVerificationEmail(email, user.otp, "Verify your email");
    res.customSuccess(200, "OTP resent to your email");
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};