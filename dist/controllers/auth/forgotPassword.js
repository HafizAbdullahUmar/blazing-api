"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const User_1 = require("orm/entities/users/User");
const CustomError_1 = require("utils/response/custom-error/CustomError");
const sendVerificationEmail_1 = require("utils/sendVerificationEmail");
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            const customError = new CustomError_1.CustomError(404, 'General', 'Not Found', [`User with email ${email} not found`]);
            return next(customError);
        }
        const resetToken = yield user.generatePasswordResetToken();
        try {
            yield (0, sendVerificationEmail_1.sendPasswordResetEmail)(email, resetToken);
            res.customSuccess(200, 'Password reset email sent successfully.');
        }
        catch (err) {
            const customError = new CustomError_1.CustomError(400, 'Raw', "Password reset email can't be sent", null, err);
            return next(customError);
        }
    }
    catch (err) {
        const customError = new CustomError_1.CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
});
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=forgotPassword.js.map