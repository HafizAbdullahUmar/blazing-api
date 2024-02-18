import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import { Role, Language } from './types';

interface IUser {
  email: string;
  password: string;
  username?: string;
  name?: string;
  role: string;
  language: string;
  otp?: string;
  otp_expiry?: Date;
  isVerified: boolean;
  created_at: Date;
  updated_at: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  setLanguage(language: Language): void;
  hashPassword(): void;
  checkIfPasswordMatch(unencryptedPassword: string): boolean;
  generatePasswordResetToken(): Promise<string>;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true, sparse: true },
  name: { type: String, sparse: true },
  role: { type: String, default: 'STANDARD' as Role },
  language: { type: String, default: 'en-US' as Language },
  otp: { type: String, sparse: true },
  otp_expiry: Date,
  isVerified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  resetPasswordToken: { type: String, sparse: true },
  resetPasswordExpires: Date,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

userSchema.methods.setLanguage = function(language: Language) {
  this.language = language;
}

userSchema.methods.hashPassword = function() {
  this.password = bcrypt.hashSync(this.password, 8);
}

userSchema.methods.checkIfPasswordMatch = function(unencryptedPassword: string) {
  return bcrypt.compareSync(unencryptedPassword, this.password);
}

userSchema.methods.generatePasswordResetToken = async function() {
  const resetToken = randomBytes(20).toString('hex');
  const jwtToken = jwt.sign({ resetToken }, process.env.JWT_SECRET, { expiresIn: '1h' });
  this.resetPasswordToken = jwtToken;
  this.resetPasswordExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);
  await this.save();
  return jwtToken;
}
interface IUserModel extends Model<IUser> {}

export const User:IUserModel = mongoose.model('User', userSchema);