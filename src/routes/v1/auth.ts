// import { forgotPassword } from "controllers/auth/forgotPassword";
// import { login } from "controllers/auth/login";
// import { register } from "controllers/auth/register";
// import { resendOTP } from "controllers/auth/resendOtp";
// import { resetPassword } from "controllers/auth/resetPassword";
// import { verifyOTP } from "controllers/auth/verifyOtp";
import { Router } from "express";

import {
  login,
  register,
  changePassword,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
} from "../../controllers/auth";
import { checkJwt } from "../../middleware/checkJwt";
import {
  validatorLogin,
  validatorRegister,
  validatorChangePassword,
} from "../../middleware/validation/auth";
import { validatorForgotPassword } from "../../middleware/validation/auth/validatorForgotPassword";
import { validatorResetPassword } from "../../middleware/validation/auth/validatorResetPassword";

const router = Router();

router.post("/login", [validatorLogin], login);
router.post("/register", [validatorRegister], register);
router.post(
  "/change-password",
  [checkJwt, validatorChangePassword],
  changePassword
);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/forgot-password", validatorForgotPassword, forgotPassword);
router.post("/reset-password", validatorResetPassword, resetPassword);

export default router;
