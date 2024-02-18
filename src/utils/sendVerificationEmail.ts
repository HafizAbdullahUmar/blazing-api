import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

transport
  .verify()
  .then(() => console.info("Connected to email server"))
  .catch(() =>
    console.warn(
      "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
    )
  );

const sendEmail = async (to, subject, otp) => {
    const text  =  `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #444;">Welcome to NFTStudio24! Verify Your Email Now 🌟</h2>
        <p>Hi ${to},</p>
        <p>We're thrilled to have you on board at NFTStudio24! To get started, we just need to confirm your email address.</p>
        <div style="margin: 20px 0; padding: 20px; background-color: #eee;">
            <p>Here's your One-Time Password (OTP): <strong>${otp}</strong></p>
        </div>
        <p>Use this code to complete the verification process. If you didn't sign up for NFTStudio24, please disregard this email.</p>
        <p>Your OTP is valid for the next 10 minutes. Let's make your online experience amazing!</p>
        <p>Cheers,</p>
        <p>NFTStudio24</p>
        <p><a href="https://7uioq-vyaaa-aaaal-ac6ea-cai.icp0.io/" style="color: #3498db;">https://7uioq-vyaaa-aaaal-ac6ea-cai.icp0.io/</a></p>
    </div>
</div>`
  const msg = { from: process.env.EMAIL_HOST_USER, to, subject, html: text };
  await transport.sendMail(msg);
};
/**

Send verification email
@param {string} to
@param {string} token
@returns {Promise}
*/
export const sendVerificationEmail = async (to, otp, title) => {
  const subject = title;
  await sendEmail(to, subject, otp);
};
export const sendPasswordResetEmail = async (to, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword?token=${resetToken}&email=${to}`;

  const text  =  `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #444;">Password Reset Requested</h2>
      <p>Hi ${to},</p>
      <p>We received a request to reset your password. Click the link below to choose a new password:</p>
      <p><a href="${resetUrl}" target="_blank" style="background-color: #3498db; color: #fff; text-decoration: none; padding: 10px 20px; margin: 10px 0; display: inline-block;">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email. Your password won't change until you access the link above and create a new one.</p>
      <p>Cheers,</p>
      <p>NFTStudio24</p>
      <p><a href="https://7uioq-vyaaa-aaaal-ac6ea-cai.icp0.io/" style="color: #3498db;">https://7uioq-vyaaa-aaaal-ac6ea-cai.icp0.io/</a></p>
  </div>
</div>`

  const msg = { from: process.env.EMAIL_HOST_USER, to, subject: 'Password Reset', html: text };
  await transport.sendMail(msg);
};
