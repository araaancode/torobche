// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
    register,
    loginWithPassword,
    requestVerificationCode,
    verifyOTP,
    resendVerificationCode,
    logout,
    getCurrentUser,
    completeProfile
} = require('../controllers/auth');
const {
    validateRegister,
    validateLogin,
    validatephone,
    validateVerificationCode
} = require('../middlewares/validation');
const { auth, refreshToken } = require('../middlewares/auth');

// Routes
router.post('/register', validateRegister, register); // ثبت نام + ارسال OTP
router.post('/register/verify', validateVerificationCode, verifyOTP); // تایید OTP ثبت نام
router.post('/register/resend-code', validatephone, resendVerificationCode); // ارسال مجدد OTP

router.post('/login/password', validateLogin, loginWithPassword); // ورود با رمز عبور

// OTP-based authentication
router.post('/login/request-otp', validatephone, requestVerificationCode); // درخواست OTP برای ورود
router.post('/login/verify-otp', validateVerificationCode, verifyOTP); // تایید OTP برای ورود
router.post('/login/resend-otp', validatephone, resendVerificationCode); // ارسال مجدد OTP برای ورود

// خروج و مدیریت پروفایل
router.post('/logout', logout);
router.get('/me', refreshToken, auth, getCurrentUser);
router.put('/profile/complete', auth, completeProfile);

module.exports = router;