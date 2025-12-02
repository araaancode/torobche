/**
 * کنترلر مدیریت پروفایل کاربر
 */

const User = require('../models/User');
const bcrypt = require('bcryptjs');

// دریافت پروفایل کاربر جاری
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password -verificationCode -loginAttempts -lockUntil');

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت پروفایل'
        });
    }
};

// به‌روزرسانی پروفایل
const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;

        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select('-password -verificationCode -loginAttempts -lockUntil');

        res.json({
            success: true,
            message: 'پروفایل با موفقیت به‌روزرسانی شد',
            user
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در به‌روزرسانی پروفایل'
        });
    }
};

// تغییر رمز عبور
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);

        // بررسی رمز عبور فعلی
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'رمز عبور فعلی اشتباه است'
            });
        }

        // بررسی اینکه رمز عبور جدید با قبلی متفاوت باشد
        const isSameAsOld = await bcrypt.compare(newPassword, user.password);
        if (isSameAsOld) {
            return res.status(400).json({
                success: false,
                message: 'رمز عبور جدید باید با رمز عبور قبلی متفاوت باشد'
            });
        }

        // به‌روزرسانی رمز عبور
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'رمز عبور با موفقیت تغییر کرد'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در تغییر رمز عبور'
        });
    }
};

// درخواست حذف حساب
const requestAccountDeletion = async (req, res) => {
    try {
        const { reason } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                deletionRequested: true,
                deletionReason: reason,
                deletionRequestedAt: new Date()
            },
            { new: true }
        ).select('-password -verificationCode');

        // در اینجا می‌توانید اعلانی به ادمین ارسال کنید

        res.json({
            success: true,
            message: 'درخواست حذف حساب ثبت شد. این درخواست توسط ادمین بررسی خواهد شد.'
        });
    } catch (error) {
        console.error('Request account deletion error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در ثبت درخواست حذف حساب'
        });
    }
};

// دریافت تاریخچه فعالیت‌ها
const getActivityHistory = async (req, res) => {
    try {
        // اینجا می‌توانید لاگ فعالیت‌های کاربر را از دیتابیس بخوانید
        // برای نمونه یک ساختار ساده ارائه می‌دهم

        const activities = [
            {
                id: 1,
                action: 'login',
                description: 'ورود به سیستم',
                timestamp: new Date(),
                ip: req.ip,
                userAgent: req.get('User-Agent')
            },
            {
                id: 2,
                action: 'profile_update',
                description: 'به‌روزرسانی پروفایل',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                ip: req.ip
            }
        ];

        res.json({
            success: true,
            activities
        });
    } catch (error) {
        console.error('Get activity history error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت تاریخچه فعالیت‌ها'
        });
    }
};

// بررسی وضعیت حساب
const getAccountStatus = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('isActive isVerified deletionRequested role createdAt');

        const status = {
            isActive: user.isActive,
            isVerified: user.isVerified,
            deletionRequested: user.deletionRequested,
            role: user.role,
            memberSince: user.createdAt,
            lastLogin: new Date() // اینجا باید از لاگین‌ها خوانده شود
        };

        res.json({
            success: true,
            status
        });
    } catch (error) {
        console.error('Get account status error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت وضعیت حساب'
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
    requestAccountDeletion,
    getActivityHistory,
    getAccountStatus
};