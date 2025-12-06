/**
 * ابزار تولید کد تایید
 */

// تولید کد عددی تصادفی
const generateVerificationCode = (length = 6) => {
    if (length < 4 || length > 8) {
        throw new Error('طول کد باید بین ۴ تا ۸ رقم باشد');
    }

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

// تولید کد الفبایی-عددی
const generateAlphanumericCode = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};

// تولید توکن بازیابی رمز عبور
const generateResetToken = () => {
    const crypto = require('crypto');
    return crypto.randomBytes(32).toString('hex');
};

// بررسی اعتبار کد
const validateCode = (code, storedCode, expirationTime) => {
    if (!code || !storedCode) return false;
    if (Date.now() > expirationTime) return false;
    return code === storedCode;
};

module.exports = {
    generateVerificationCode,
    generateAlphanumericCode,
    generateResetToken,
    validateCode
};