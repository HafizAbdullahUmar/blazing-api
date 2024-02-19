import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import { User } from "../../orm/entities/users/User";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { JwtPayload } from "../../types/JwtPayload";
import { Role } from "../../orm/entities/users/types";
import { createJwtToken } from "../../utils/createJwtToken";

export const verifyOTP = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, otp } = req.body;

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

        if (user.otp !== otp || new Date() > user.otp_expiry) {
            const customError = new CustomError(
                400,
                "General",
                "Invalid or expired OTP",
                [`The OTP provided is invalid or has expired`]
            );
            return next(customError);
        }

        // Set the user as verified and save the user
        user.isVerified = true;
        await user.save();
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
        const customError = new CustomError(400, "Raw", "Error", null, err);
        return next(customError);
    }
};