"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorResetPassword = void 0;
const validator_1 = __importDefault(require("validator"));
const ConstsUser_1 = require("consts/ConstsUser");
const CustomError_1 = require("utils/response/custom-error/CustomError");
const validatorResetPassword = (req, res, next) => {
    let { resetPasswordToken, newPassword } = req.body;
    const errorsValidation = [];
    resetPasswordToken = !resetPasswordToken ? '' : resetPasswordToken;
    newPassword = !newPassword ? '' : newPassword;
    if (validator_1.default.isEmpty(resetPasswordToken)) {
        errorsValidation.push({ resetPasswordToken: 'Reset token is required' });
    }
    if (validator_1.default.isEmpty(newPassword)) {
        errorsValidation.push({ newPassword: 'New password is required' });
    }
    if (!validator_1.default.isLength(newPassword, { min: ConstsUser_1.ConstsUser.PASSWORD_MIN_CHAR })) {
        errorsValidation.push({
            newPassword: `Password must be at least ${ConstsUser_1.ConstsUser.PASSWORD_MIN_CHAR} characters`,
        });
    }
    if (errorsValidation.length !== 0) {
        const customError = new CustomError_1.CustomError(400, 'Validation', 'Reset password validation error', null, null, errorsValidation);
        return next(customError);
    }
    return next();
};
exports.validatorResetPassword = validatorResetPassword;
//# sourceMappingURL=validatorResetPassword.js.map