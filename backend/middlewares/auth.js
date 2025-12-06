const jwt = require('jsonwebtoken');
const User = require('../models/User');

// تنظیمات کوکی امن
const cookieOptions = {
    httpOnly: true, // جلوگیری از دسترسی JavaScript به کوکی
    secure: process.env.NODE_ENV === 'production', // فقط HTTPS در تولید
    sameSite: 'strict', // جلوگیری از CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 روز
    path: '/', // دسترسی در کل دامنه
    domain: process.env.COOKIE_DOMAIN || 'localhost' // تنظیم دامنه
};

// تنظیم کوکی احراز هویت
const setAuthCookie = (res, token) => {
    res.cookie('auth_token', token, cookieOptions);
};

// پاک کردن کوکی احراز هویت
const clearAuthCookie = (res) => {
    res.clearCookie('auth_token', {
        ...cookieOptions,
        maxAge: 0
    });
};

// میدلور اصلی احراز هویت
const auth = async (req, res, next) => {
    try {
        // اولویت با کوکی، سپس هدر Authorization
        let token = req.cookies?.auth_token;

        if (!token && req.header('Authorization')) {
            token = req.header('Authorization').replace('Bearer ', '');
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'دسترسی غیرمجاز. لطفا مجدداً وارد شوید.'
            });
        }

        // بررسی اعتبار توکن
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // پیدا کردن کاربر و بررسی وجود
        const user = await User.findById(decoded.userId)
            .select('-password -verificationCode')
            .lean();

        if (!user) {
            clearAuthCookie(res);
            return res.status(401).json({
                success: false,
                message: 'حساب کاربری یافت نشد.'
            });
        }

        // بررسی قفل بودن حساب
        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(423).json({
                success: false,
                message: 'حساب کاربری به دلیل تلاش‌های ناموفق قفل شده است.'
            });
        }

        // اضافه کردن اطلاعات کاربر به request
        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);

        // پاک کردن کوکی در صورت خطا
        clearAuthCookie(res);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'توکن منقضی شده است. لطفا مجدداً وارد شوید.'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'توکن نامعتبر است.'
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در احراز هویت'
        });
    }
};

// میدلور احراز هویت ادمین
const adminAuth = async (req, res, next) => {
    try {
        await auth(req, res, () => { });

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'دسترسی غیرمجاز. نیاز به نقش ادمین.'
            });
        }

        next();
    } catch (error) {
        // خطا در auth مدیریت شده است
    }
};

// میدلور برای بررسی دسترسی بر اساس نقش‌ها
const requireRoles = (roles = []) => {
    return async (req, res, next) => {
        try {
            await auth(req, res, () => { });

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'دسترسی غیرمجاز. نقش کاربری مجاز نیست.'
                });
            }

            next();
        } catch (error) {
            // خطا در auth مدیریت شده است
        }
    };
};

// میدلور برای تمدید خودکار توکن
const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies?.auth_token;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const now = Math.floor(Date.now() / 1000);
            const expiresIn = decoded.exp - now;

            // اگر توکن کمتر از 1 روز اعتبار دارد، تمدید شود
            if (expiresIn < 24 * 60 * 60) {
                const newToken = jwt.sign(
                    { userId: decoded.userId },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );

                setAuthCookie(res, newToken);
                req.token = newToken;
            }
        }

        next();
    } catch (error) {
        // در صورت خطا ادامه بده، تمدید ضروری نیست
        next();
    }
};

module.exports = {
    auth,
    adminAuth,
    requireRoles,
    setAuthCookie,
    clearAuthCookie,
    refreshToken,
    cookieOptions
};