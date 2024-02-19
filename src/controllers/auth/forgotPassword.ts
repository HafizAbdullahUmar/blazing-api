import { Request, Response, NextFunction } from 'express';
import { User } from '../../orm/entities/users/User';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import { sendPasswordResetEmail } from '../../utils/sendVerificationEmail';

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            const customError = new CustomError(404, 'General', 'Not Found', [`User with email ${email} not found`]);
            return next(customError);
        }

        // Generate a password reset token
        const resetToken = await user.generatePasswordResetToken();

        // Send a password reset email
        try {
            await sendPasswordResetEmail(email,resetToken);
            res.customSuccess(200, 'Password reset email sent successfully.');
        } catch (err) {
            const customError = new CustomError(400, 'Raw', "Password reset email can't be sent", null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};