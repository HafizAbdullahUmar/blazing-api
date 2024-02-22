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
exports.register = void 0;
const crypto_1 = __importDefault(require("crypto"));
const User_1 = require("orm/entities/users/User");
const CustomError_1 = require("utils/response/custom-error/CustomError");
const sendVerificationEmail_1 = require("utils/sendVerificationEmail");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.User.findOne({ email });
        if (user) {
            if (user.isVerified) {
                const customError = new CustomError_1.CustomError(400, "General", "User already exists", [`Email '${user.email}' already exists`]);
                return next(customError);
            }
        }
        else {
            user = new User_1.User();
            user.email = email;
            user.password = password;
            user.hashPassword();
        }
        user.otp = crypto_1.default.randomInt(100000, 999999).toString();
        user.otp_expiry = new Date(Date.now() + 10 * 60 * 1000);
        yield user.save();
        (0, sendVerificationEmail_1.sendVerificationEmail)(email, user.otp, "Verify your email");
        res.customSuccess(201, "OTP sent to your email");
    }
    catch (err) {
        const customError = new CustomError_1.CustomError(400, "Raw", "Error", null, err);
        return next(customError);
    }
});
exports.register = register;
//# sourceMappingURL=register.js.map