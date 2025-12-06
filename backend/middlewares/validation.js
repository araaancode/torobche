

const validator = require('validator');
const User = require('../models/User');

// اعتبارسنجی ثبت نام
const validateRegister = async (req, res, next) => {
    try {
        const { firstName, lastName, phone, password, confirmPassword } = req.body;

        // بررسی فیلدهای ضروری
        const requiredFields = ['firstName', 'lastName', 'phone', 'password', 'confirmPassword'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `فیلدهای زیر الزامی هستند: ${missingFields.join(', ')}`
            });
        }

        // بررسی نام و نام خانوادگی
        if (!validator.isLength(firstName, { min: 2, max: 50 })) {
            return res.status(400).json({
                success: false,
                message: 'نام باید بین ۲ تا ۵۰ کاراکتر باشد'
            });
        }

        if (!validator.isLength(lastName, { min: 2, max: 50 })) {
            return res.status(400).json({
                success: false,
                message: 'نام خانوادگی باید بین ۲ تا ۵۰ کاراکتر باشد'
            });
        }

        // بررسی شماره موبایل
        if (!/^09[0-9]{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'شماره موبایل معتبر نیست. فرمت صحیح: 09123456789'
            });
        }

        // بررسی وجود کاربر با این شماره موبایل
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'این شماره موبایل قبلا ثبت شده است'
            });
        }

        // بررسی رمز عبور
        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).json({
                success: false,
                message: 'رمز عبور باید حداقل ۶ کاراکتر باشد'
            });
        }

        // بررسی پیچیدگی رمز عبور
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'رمز عبور باید شامل حروف بزرگ، حروف کوچک، عدد و کاراکتر ویژه باشد'
            });
        }

        // بررسی تطابق رمز عبور
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'رمز عبور و تایید رمز عبور مطابقت ندارند'
            });
        }

        // بررسی حذف تگ‌های HTML برای جلوگیری از XSS
        req.body.firstName = validator.escape(firstName.trim());
        req.body.lastName = validator.escape(lastName.trim());
        req.body.phone = phone.trim();

        next();
    } catch (error) {
        console.error('Validation error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در اعتبارسنجی'
        });
    }
};

// اعتبارسنجی ورود با رمز عبور
const validateLogin = async (req, res, next) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                message: 'شماره موبایل و رمز عبور الزامی هستند'
            });
        }

        if (!/^09[0-9]{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'شماره موبایل معتبر نیست'
            });
        }

        // بررسی وجود کاربر
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'کاربری با این شماره موبایل یافت نشد'
            });
        }

        // بررسی قفل بودن حساب
        if (user.isLocked) {
            const remainingTime = Math.ceil((user.lockUntil - Date.now()) / (60 * 1000));
            return res.status(423).json({
                success: false,
                message: `حساب شما به دلیل تلاش‌های ناموفق قفل شده است. ${remainingTime} دقیقه دیگر مجدد تلاش کنید.`
            });
        }

        next();
    } catch (error) {
        console.error('Login validation error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در اعتبارسنجی'
        });
    }
};

// اعتبارسنجی شماره موبایل
const validatephone = async (req, res, next) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: 'شماره موبایل الزامی است'
            });
        }

        if (!/^09[0-9]{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'شماره موبایل معتبر نیست'
            });
        }

        next();
    } catch (error) {
        console.error('phone validation error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در اعتبارسنجی'
        });
    }
};

// اعتبارسنجی کد تایید
const validateVerificationCode = async (req, res, next) => {
    try {
        const { phone, code } = req.body;

        if (!phone || !code) {
            return res.status(400).json({
                success: false,
                message: 'شماره موبایل و کد تایید الزامی هستند'
            });
        }

        if (!/^09[0-9]{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'شماره موبایل معتبر نیست'
            });
        }

        if (!/^\d{6}$/.test(code)) {
            return res.status(400).json({
                success: false,
                message: 'کد تایید باید ۶ رقم باشد'
            });
        }

        // بررسی وجود کاربر
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'کاربری با این شماره موبایل یافت نشد'
            });
        }

        next();
    } catch (error) {
        console.error('Verification code validation error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در اعتبارسنجی'
        });
    }
};

// اعتبارسنجی به‌روزرسانی پروفایل
const validateProfileUpdate = async (req, res, next) => {
    try {
        const { firstName, lastName } = req.body;

        if (firstName && !validator.isLength(firstName, { min: 2, max: 50 })) {
            return res.status(400).json({
                success: false,
                message: 'نام باید بین ۲ تا ۵۰ کاراکتر باشد'
            });
        }

        if (lastName && !validator.isLength(lastName, { min: 2, max: 50 })) {
            return res.status(400).json({
                success: false,
                message: 'نام خانوادگی باید بین ۲ تا ۵۰ کاراکتر باشد'
            });
        }

        // Escape داده‌ها برای جلوگیری از XSS
        if (firstName) req.body.firstName = validator.escape(firstName.trim());
        if (lastName) req.body.lastName = validator.escape(lastName.trim());

        next();
    } catch (error) {
        console.error('Profile update validation error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در اعتبارسنجی'
        });
    }
};

// اعتبارسنجی تغییر رمز عبور
const validatePasswordChange = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'تمامی فیلدهای رمز عبور الزامی هستند'
            });
        }

        if (!validator.isLength(newPassword, { min: 6 })) {
            return res.status(400).json({
                success: false,
                message: 'رمز عبور جدید باید حداقل ۶ کاراکتر باشد'
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message: 'رمز عبور جدید باید شامل حروف بزرگ، حروف کوچک، عدد و کاراکتر ویژه باشد'
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'رمز عبور جدید و تایید رمز عبور مطابقت ندارند'
            });
        }

        next();
    } catch (error) {
        console.error('Password change validation error:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در اعتبارسنجی'
        });
    }
};

module.exports = {
    validateRegister,
    validateLogin,
    validatephone,
    validateVerificationCode,
    validateProfileUpdate,
    validatePasswordChange
};