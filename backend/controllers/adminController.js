/**
 * کنترلر مدیریت کاربران برای ادمین
 */

const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

// دریافت لیست همه کاربران
const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', role = '' } = req.query;

        const query = {};

        // جستجو بر اساس نام، نام خانوادگی یا شماره موبایل
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        // فیلتر بر اساس نقش
        if (role && ['user', 'admin'].includes(role)) {
            query.role = role;
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
            select: '-password -verificationCode'
        };

        const users = await User.find(query)
            .skip((options.page - 1) * options.limit)
            .limit(options.limit)
            .sort(options.sort)
            .select(options.select);

        const total = await User.countDocuments(query);

        res.json({
            success: true,
            users,
            pagination: {
                page: options.page,
                limit: options.limit,
                total,
                pages: Math.ceil(total / options.limit)
            }
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت لیست کاربران'
        });
    }
};

// دریافت اطلاعات یک کاربر خاص
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .select('-password -verificationCode');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'کاربر یافت نشد'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get user by id error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت اطلاعات کاربر'
        });
    }
};

// تغییر نقش کاربر
const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'نقش کاربر معتبر نیست'
            });
        }

        // جلوگیری از تغییر نقش خود ادمین
        if (id === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'نمی‌توانید نقش خود را تغییر دهید'
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        ).select('-password -verificationCode');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'کاربر یافت نشد'
            });
        }

        res.json({
            success: true,
            message: 'نقش کاربر با موفقیت به‌روزرسانی شد',
            user
        });
    } catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در تغییر نقش کاربر'
        });
    }
};

// غیرفعال کردن حساب کاربر
const deactivateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        // جلوگیری از غیرفعال کردن خود
        if (id === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'نمی‌توانید حساب خود را غیرفعال کنید'
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            {
                isActive: false,
                deactivationReason: reason,
                deactivatedAt: new Date()
            },
            { new: true }
        ).select('-password -verificationCode');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'کاربر یافت نشد'
            });
        }

        // باطل کردن همه توکن‌های کاربر
        await RefreshToken.revokeAllUserTokens(id);

        res.json({
            success: true,
            message: 'حساب کاربر با موفقیت غیرفعال شد',
            user
        });
    } catch (error) {
        console.error('Deactivate user error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در غیرفعال کردن کاربر'
        });
    }
};

// فعال کردن حساب کاربر
const activateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(
            id,
            {
                isActive: true,
                deactivationReason: undefined,
                deactivatedAt: undefined
            },
            { new: true }
        ).select('-password -verificationCode');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'کاربر یافت نشد'
            });
        }

        res.json({
            success: true,
            message: 'حساب کاربر با موفقیت فعال شد',
            user
        });
    } catch (error) {
        console.error('Activate user error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در فعال کردن کاربر'
        });
    }
};

// دریافت آمار سیستم
const getSystemStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const totalActiveUsers = await User.countDocuments({ isActive: true });
        const todayRegistrations = await User.countDocuments({
            createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
        });

        // آمار ثبت‌نام در ۷ روز اخیر
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const count = await User.countDocuments({
                createdAt: { $gte: date, $lt: nextDate }
            });

            last7Days.push({
                date: date.toISOString().split('T')[0],
                count
            });
        }

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalAdmins,
                totalActiveUsers,
                todayRegistrations,
                registrationChart: last7Days
            }
        });
    } catch (error) {
        console.error('Get system stats error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت آمار سیستم'
        });
    }
};

// حذف کاربر
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // جلوگیری از حذف خود
        if (id === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'نمی‌توانید حساب خود را حذف کنید'
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'کاربر یافت نشد'
            });
        }

        // باطل کردن همه توکن‌های کاربر
        await RefreshToken.revokeAllUserTokens(id);

        // حذف کاربر
        await User.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'کاربر با موفقیت حذف شد'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در حذف کاربر'
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUserRole,
    deactivateUser,
    activateUser,
    getSystemStats,
    deleteUser
};