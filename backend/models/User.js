// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'نام الزامی است'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'نام خانوادگی الزامی است'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'شماره موبایل الزامی است'],
        unique: true,
        trim: true,
        match: [/^09[0-9]{9}$/, 'شماره موبایل معتبر نیست']
    },
    password: {
        type: String,
        required: [true, 'رمز عبور الزامی است'],
        minlength: [6, 'رمز عبور باید حداقل ۶ کاراکتر باشد']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        default: null
    },
    verificationCodeExpires: {
        type: Date,
        default: null
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date,
        default: null
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// ⚡ هش کردن رمز عبور قبل از ذخیره
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// متد برای مقایسه رمز عبور
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) {
        throw new Error('رمز عبور کاربر در دیتابیس یافت نشد');
    }
    return await bcrypt.compare(candidatePassword, this.password);
};

// متد برای تولید کد تایید
userSchema.methods.generateVerificationCode = function () {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.verificationCode = code;
    this.verificationCodeExpires = Date.now() + 2 * 60 * 1000; // 2 دقیقه
    return code;
};

// متد برای تایید کد
userSchema.methods.verifyCode = function (code) {
    if (!this.verificationCode || !this.verificationCodeExpires) return false;

    if (Date.now() > this.verificationCodeExpires) {
        this.verificationCode = null;
        this.verificationCodeExpires = null;
        return false;
    }

    if (this.verificationCode !== code) {
        this.loginAttempts += 1;
        if (this.loginAttempts >= 5) {
            this.lockUntil = Date.now() + 15 * 60 * 1000;
            this.isLocked = true;
        }
        return false;
    }

    this.isVerified = true;
    this.verificationCode = null;
    this.verificationCodeExpires = null;
    this.loginAttempts = 0;
    this.isLocked = false;
    this.lockUntil = null;

    return true;
};

// متد برای بررسی قفل بودن حساب
userSchema.methods.isAccountLocked = function () {
    if (this.isLocked && this.lockUntil > Date.now()) {
        const remainingTime = Math.ceil((this.lockUntil - Date.now()) / (60 * 1000));
        throw new Error(`حساب شما قفل شده است. ${remainingTime} دقیقه دیگر مجدد تلاش کنید.`);
    }

    if (this.isLocked && this.lockUntil <= Date.now()) {
        this.isLocked = false;
        this.lockUntil = null;
        this.loginAttempts = 0;
    }

    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
