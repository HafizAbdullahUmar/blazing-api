"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorForgotPassword = void 0;
const validator_1 = __importDefault(require("validator"));
const CustomError_1 = require("utils/response/custom-error/CustomError");
const validatorForgotPassword = (req, res, next) => {
    let { email } = req.body;
    const errorsValidation = [];
    email = !email ? '' : email;
    if (validator_1.default.isEmpty(email)) {
        errorsValidation.push({ email: 'Email is required' });
    }
    if (!validator_1.default.isEmail(email)) {
        errorsValidation.push({ email: 'Invalid email' });
    }
    if (errorsValidation.length !== 0) {
        const customError = new CustomError_1.CustomError(400, 'Validation', 'Forgot password validation error', null, null, errorsValidation);
        return next(customError);
    }
    return next();
};
exports.validatorForgotPassword = validatorForgotPassword;
//# sourceMappingURL=validatorForgotPassword.js.map