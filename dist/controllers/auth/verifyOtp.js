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
exports.verifyOTP = void 0;
const User_1 = require("orm/entities/users/User");
const CustomError_1 = require("utils/response/custom-error/CustomError");
const createJwtToken_1 = require("utils/createJwtToken");
const verifyOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            const customError = new CustomError_1.CustomError(404, "General", "User not found", [`Email '${email}' not found`]);
            return next(customError);
        }
        if (user.otp !== otp || new Date() > user.otp_expiry) {
            const customError = new CustomError_1.CustomError(400, "General", "Invalid or expired OTP", [`The OTP provided is invalid or has expired`]);
            return next(customError);
        }
        user.isVerified = true;
        yield user.save();
        const jwtPayload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
        };
        try {
            const token = (0, createJwtToken_1.createJwtToken)(jwtPayload);
            res.customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
        }
        catch (err) {
            const customError = new CustomError_1.CustomError(400, 'Raw', "Token can't be created", null, err);
            return next(customError);
        }
    }
    catch (err) {
        const customError = new CustomError_1.CustomError(400, "Raw", "Error", null, err);
        return next(customError);
    }
});
exports.verifyOTP = verifyOTP;
//# sourceMappingURL=verifyOtp.js.map