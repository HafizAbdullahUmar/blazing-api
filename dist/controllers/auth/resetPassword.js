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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const User_1 = require("orm/entities/users/User");
const CustomError_1 = require("utils/response/custom-error/CustomError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { resetPasswordToken, newPassword } = req.body;
    try {
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(resetPasswordToken, process.env.JWT_SECRET);
        }
        catch (err) {
            const customError = new CustomError_1.CustomError(400, 'General', 'Bad Request', [`Invalid or expired password reset token`]);
            return next(customError);
        }
        const user = yield User_1.User.findOne({ resetPasswordToken });
        if (!user) {
            const customError = new CustomError_1.CustomError(404, 'General', 'Not Found', [`Invalid password reset token`]);
            return next(customError);
        }
        if (user.resetPasswordExpires < new Date()) {
            const customError = new CustomError_1.CustomError(400, 'General', 'Bad Request', [`Password reset token has expired`]);
            return next(customError);
        }
        user.password = bcryptjs_1.default.hashSync(newPassword, 8);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        yield user.save();
        res.customSuccess(200, 'Password reset successfully.');
    }
    catch (err) {
        const customError = new CustomError_1.CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=resetPassword.js.map