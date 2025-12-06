const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'نام الزامی است'],
        trim: true,
        minlength: [2, 'نام باید حداقل 2 کاراکتر باشد'],
        maxlength: [50, 'نام نمی‌تواند بیشتر از 50 کاراکتر باشد']
    },
    lastName: {
        type: String,
        required: [true, 'نام خانوادگی الزامی است'],
        trim: true,
        minlength: [2, 'نام خانوادگی باید حداقل 2 کاراکتر باشد'],
        maxlength: [50, 'نام خانوادگی نمی‌تواند بیشتر از 50 کاراکتر باشد']
    },
    phone: {
        type: String,
        required: [true, 'شماره موبایل الزامی است'],
        unique: true,
        validate: {
            validator: function (v) {
                return /^09[0-9]{9}$/.test(v);
            },
            message: 'شماره موبایل معتبر نیست'
        }
    },
    password: {
        type: String,
        required: function () {
            return !this.isOAuthUser;
        },
        minlength: [6, 'رمز عبور باید حداقل 6 کاراکتر باشد'],
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verificationCode: {
        code: String,
        expiresAt: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

/* ============ INDEXES ============ */
userSchema.index({ phone: 1 }, { unique: true });
userSchema.index({ 'verificationCode.expiresAt': 1 }, { expireAfterSeconds: 0 });

/* ============ VIRTUALS ============ */
userSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

/* ============ MIDDLEWARES ============ */
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

/* ============ METHODS ============ */
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (this.isLocked) {
        throw new Error('حساب کاربری موقتاً قفل شده است. لطفا بعداً دوباره تلاش کنید.');
    }

    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    if (isMatch) {
        this.loginAttempts = 0;
        this.lockUntil = undefined;
        await this.save();
        return true;
    } else {
        this.loginAttempts += 1;

        if (this.loginAttempts >= 5) {
            this.lockUntil = new Date(Date.now() + 30 * 60 * 1000);
        }

        await this.save();
        return false;
    }
};

userSchema.methods.generateVerificationCode = function () {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    this.verificationCode = {
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    };

    return code;
};

userSchema.methods.verifyCode = function (code) {
    if (
        !this.verificationCode ||
        this.verificationCode.expiresAt < new Date() ||
        this.verificationCode.code !== code
    ) {
        return false;
    }

    this.verificationCode = undefined;
    this.isVerified = true;
    return true;
};

/* ============ EXPORT MODEL ============ */
module.exports = mongoose.model('User', userSchema);
