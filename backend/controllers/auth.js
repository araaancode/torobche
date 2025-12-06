// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { setAuthCookie, clearAuthCookie } = require('../middlewares/auth');

// Import the sendOTP function
const { sendOTP } = require('../config/sendOTP');

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

const register = async (req, res) => {
    try {
        const { firstName, lastName, phone, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'این شماره موبایل قبلا ثبت شده است'
            });
        }

        // Create new user
        const user = new User({
            firstName,
            lastName,
            phone,
            password // Will be hashed by pre-save middleware
        });

        // Save user first (without OTP)
        await user.save();

        // // Generate OTP
        // const code = user.generateVerificationCode();
        // await user.save();

        // // Send OTP via SMS
        // const smsSent = await sendOTP(phone, code);

        // if (!smsSent) {
        //     return res.status(500).json({
        //         success: false,
        //         message: 'خطا در ارسال کد تایید'
        //     });
        // }

        // Generate token for later verification
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'ثبت نام با موفقیت انجام شد. لطفا کد تایید را وارد کنید.',
            token,
            requiresVerification: true,
            user: {
                id: user._id,
                phone: user.phone,
                firstName: user.firstName
            }
        });
    } catch (error) {
        console.error('Registration error:', error);

        // Handle specific errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'این شماره موبایل قبلا ثبت شده است'
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

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

        // Check if account is locked
        if (user.isLocked) {
            const remainingTime = Math.ceil((user.lockUntil - Date.now()) / (60 * 1000));
            return res.status(423).json({
                success: false,
                message: `حساب شما قفل شده است. ${remainingTime} دقیقه دیگر مجدد تلاش کنید.`
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
                role: user.role,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        console.error('Login error:', error);

        if (error.message.includes('قفل شده')) {
            return res.status(423).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || 'خطای سرور در ورود'
        });
    }
};

// درخواست کد تایید برای ورود/ثبت‌نام
const requestVerificationCode = async (req, res) => {
    try {
        const { phone } = req.body;

        let user = await User.findOne({ phone });

        if (!user) {
            // Create temporary user for new registration
            user = new User({
                firstName: 'کاربر',
                lastName: 'جدید',
                phone,
                password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) // Stronger password
            });
            await user.save();
        }

        // Generate verification code using model method
        const code = user.generateVerificationCode();
        await user.save();

        // Send OTP via SMS using ippanel
        const smsSent = await sendOTP(phone, code);

        if (!smsSent) {
            return res.status(500).json({
                success: false,
                message: 'خطا در ارسال کد تایید'
            });
        }

        res.json({
            success: true,
            message: 'کد تایید به شماره موبایل شما ارسال شد',
            debug: process.env.NODE_ENV === 'development' ? { code } : undefined
        });
    } catch (error) {
        console.error('Verification code request error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در ارسال کد تایید'
        });
    }
};

// تایید کد OTP
const verifyOTP = async (req, res) => {
    try {
        const { phone, code } = req.body;

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'کاربری با این شماره یافت نشد'
            });
        }

        // Verify code using model method
        const isCodeValid = user.verifyCode(code);

        if (!isCodeValid) {
            return res.status(400).json({
                success: false,
                message: 'کد تایید نامعتبر یا منقضی شده است'
            });
        }

        await user.save();

        // Check if user needs to complete profile
        const needsProfileCompletion = user.firstName === 'کاربر' && user.lastName === 'جدید';

        // Generate token and set cookie
        const token = generateToken(user._id);
        setAuthCookie(res, token);

        res.json({
            success: true,
            message: 'تایید موفقیت‌آمیز',
            token,
            needsProfileCompletion,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در تایید کد'
        });
    }
};

// درخواست مجدد ارسال کد OTP
const resendVerificationCode = async (req, res) => {
    try {
        const { phone } = req.body;

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'کاربری با این شماره یافت نشد'
            });
        }

        // Generate new verification code
        const code = user.generateVerificationCode();
        await user.save();

        // Send OTP via SMS
        const smsSent = await sendOTP(phone, code);

        if (!smsSent) {
            return res.status(500).json({
                success: false,
                message: 'خطا در ارسال کد تایید'
            });
        }

        res.json({
            success: true,
            message: 'کد تایید مجدداً ارسال شد'
        });
    } catch (error) {
        console.error('Resend verification code error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در ارسال مجدد کد'
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

// تکمیل پروفایل کاربر
const completeProfile = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'کاربر یافت نشد'
            });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();

        res.json({
            success: true,
            message: 'پروفایل با موفقیت تکمیل شد',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        console.error('Complete profile error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در تکمیل پروفایل'
        });
    }
};

module.exports = {
    register,
    loginWithPassword,
    requestVerificationCode,
    verifyOTP,
    resendVerificationCode,
    logout,
    getCurrentUser,
    completeProfile
};