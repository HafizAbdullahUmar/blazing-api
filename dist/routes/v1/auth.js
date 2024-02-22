"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("controllers/auth");
const checkJwt_1 = require("middleware/checkJwt");
const auth_2 = require("middleware/validation/auth");
const validatorForgotPassword_1 = require("middleware/validation/auth/validatorForgotPassword");
const validatorResetPassword_1 = require("middleware/validation/auth/validatorResetPassword");
const router = (0, express_1.Router)();
router.post("/login", [auth_2.validatorLogin], auth_1.login);
router.post("/register", [auth_2.validatorRegister], auth_1.register);
router.post("/change-password", [checkJwt_1.checkJwt, auth_2.validatorChangePassword], auth_1.changePassword);
router.post("/verify-otp", auth_1.verifyOTP);
router.post("/resend-otp", auth_1.resendOTP);
router.post("/forgot-password", validatorForgotPassword_1.validatorForgotPassword, auth_1.forgotPassword);
router.post("/reset-password", validatorResetPassword_1.validatorResetPassword, auth_1.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.js.map