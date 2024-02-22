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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    password: String,
    username: { type: String, unique: true, sparse: true },
    name: { type: String, sparse: true },
    role: { type: String, default: 'STANDARD' },
    language: { type: String, default: 'en-US' },
    otp: { type: String, sparse: true },
    otp_expiry: Date,
    isVerified: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    resetPasswordToken: { type: String, sparse: true },
    resetPasswordExpires: Date,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
userSchema.methods.setLanguage = function (language) {
    this.language = language;
};
userSchema.methods.hashPassword = function () {
    this.password = bcryptjs_1.default.hashSync(this.password, 8);
};
userSchema.methods.checkIfPasswordMatch = function (unencryptedPassword) {
    return bcryptjs_1.default.compareSync(unencryptedPassword, this.password);
};
userSchema.methods.generatePasswordResetToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const resetToken = (0, crypto_1.randomBytes)(20).toString('hex');
        const jwtToken = jsonwebtoken_1.default.sign({ resetToken }, process.env.JWT_SECRET, { expiresIn: '1h' });
        this.resetPasswordToken = jwtToken;
        this.resetPasswordExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);
        yield this.save();
        return jwtToken;
    });
};
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map