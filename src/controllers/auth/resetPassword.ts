import { Request, Response, NextFunction } from 'express';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { resetPasswordToken, newPassword } = req.body;

    try {
        let decoded;
        try {
            // Try to verify the JWT
            decoded = jwt.verify(resetPasswordToken, process.env.JWT_SECRET);
        } catch (err) {
            // If verification fails, return an error
            const customError = new CustomError(400, 'General', 'Bad Request', [`Invalid or expired password reset token`]);
            return next(customError);
        }

        // Find the user with the JWT
        const user = await User.findOne({ resetPasswordToken });
        if (!user) {
            const customError = new CustomError(404, 'General', 'Not Found', [`Invalid password reset token`]);
            return next(customError);
        }

        // Check if the token has expired
        if (user.resetPasswordExpires < new Date()) {
            const customError = new CustomError(400, 'General', 'Bad Request', [`Password reset token has expired`]);
            return next(customError);
        }

        // Reset the user's password
        user.password = bcrypt.hashSync(newPassword, 8);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.customSuccess(200, 'Password reset successfully.');
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};