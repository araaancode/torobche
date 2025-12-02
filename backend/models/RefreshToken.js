/**
 * مدل برای مدیریت توکن‌های تازه‌سازی
 */

const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // TTL index
    },
    userAgent: {
        type: String,
        default: ''
    },
    ipAddress: {
        type: String,
        default: ''
    },
    isRevoked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// ایندکس برای جستجوی سریع
refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// متدهای استاتیک
refreshTokenSchema.statics.createToken = async function (userId, userAgent = '', ipAddress = '') {
    const crypto = require('crypto');
    const token = crypto.randomBytes(40).toString('hex');

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 روز

    const refreshToken = new this({
        token,
        userId,
        expiresAt,
        userAgent,
        ipAddress
    });

    await refreshToken.save();
    return refreshToken;
};

// متد برای باطل کردن همه توکن‌های یک کاربر
refreshTokenSchema.statics.revokeAllUserTokens = async function (userId) {
    await this.updateMany(
        { userId, isRevoked: false },
        { isRevoked: true }
    );
};

// متد برای باطل کردن یک توکن خاص
refreshTokenSchema.methods.revoke = async function () {
    this.isRevoked = true;
    await this.save();
};

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);