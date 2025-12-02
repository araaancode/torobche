const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendVerificationCode } = require('../utils/sendSMS');
const { setAuthCookie, clearAuthCookie } = require('../middleware/auth');

// تولید توکن JWT
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// ثبت نام
const register = async (req, res) => {
    try {
        const { firstName, lastName, phone, password } = req.body;

        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'این شماره موبایل قبلاً ثبت شده است'
            });
        }

        const user = new User({
            firstName,
            lastName,
            phone,
            password
        });

        await user.save();

        // تولید توکن و تنظیم کوکی
        const token = generateToken(user._id);
        setAuthCookie(res, token);

        res.status(201).json({
            success: true,
            message: 'ثبت نام با موفقیت انجام شد',
            token, // برای مواردی که کلاینت نیاز به توکن دارد
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در ثبت نام'
        });
    }
};

// ورود با رمز عبور
const loginWithPassword = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'شماره موبایل یا رمز عبور اشتباه است'
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'شماره موبایل یا رمز عبور اشتباه است'
            });
        }

        // تولید توکن و تنظیم کوکی
        const token = generateToken(user._id);
        setAuthCookie(res, token);

        res.json({
            success: true,
            message: 'ورود موفقیت‌آمیز',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'خطای سرور در ورود'
        });
    }
};

// درخواست کد تأیید برای ورود
const requestVerificationCode = async (req, res) => {
    try {
        const { phone } = req.body;

        let user = await User.findOne({ phone });

        if (!user) {
            user = new User({
                firstName: 'کاربر',
                lastName: 'جدید',
                phone,
                password: Math.random().toString(36).slice(-8)
            });
            await user.save();
        }

        const code = user.generateVerificationCode();
        await user.save();

        const smsSent = await sendVerificationCode(phone, code);

        if (!smsSent) {
            return res.status(500).json({
                success: false,
                message: 'خطا در ارسال کد تأیید'
            });
        }

        res.json({
            success: true,
            message: 'کد تأیید به شماره موبایل شما ارسال شد',
            debug: process.env.NODE_ENV === 'development' ? { code } : undefined
        });
    } catch (error) {
        console.error('Verification code request error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در ارسال کد تأیید'
        });
    }
};

// ورود با کد تأیید
const loginWithCode = async (req, res) => {
    try {
        const { phone, code } = req.body;

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'کد تأیید نامعتبر است'
            });
        }

        const isCodeValid = user.verifyCode(code);
        if (!isCodeValid) {
            return res.status(400).json({
                success: false,
                message: 'کد تأیید نامعتبر یا منقضی شده است'
            });
        }

        await user.save();

        // تولید توکن و تنظیم کوکی
        const token = generateToken(user._id);
        setAuthCookie(res, token);

        res.json({
            success: true,
            message: 'ورود موفقیت‌آمیز',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login with code error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در ورود'
        });
    }
};

// خروج از سیستم
const logout = (req, res) => {
    try {
        clearAuthCookie(res);

        res.json({
            success: true,
            message: 'خروج موفقیت‌آمیز'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در خروج'
        });
    }
};

// دریافت اطلاعات کاربر جاری
const getCurrentUser = async (req, res) => {
    try {
        res.json({
            success: true,
            user: {
                id: req.user._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                phone: req.user.phone,
                role: req.user.role,
                isVerified: req.user.isVerified
            }
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور'
        });
    }
};

module.exports = {
    register,
    loginWithPassword,
    requestVerificationCode,
    loginWithCode,
    logout,
    getCurrentUser
};