/**
 * هندلر متمرکز خطاها
 */

const { ValidationError } = require('mongoose');
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');

// کلاس خطای سفارشی
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        Error.captureStackTrace(this, this.constructor);
    }
}

// هندلر نهایی خطا
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    error.statusCode = err.statusCode || 500;

    // لاگ خطا
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });

    // خطاهای MongoDB
    if (err.name === 'CastError') {
        const message = 'منبع یافت نشد';
        error = new AppError(message, 404);
    }

    // خطاهای تکراری
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `این ${field} قبلاً ثبت شده است`;
        error = new AppError(message, 400);
    }

    // خطاهای اعتبارسنجی Mongoose
    if (err instanceof ValidationError) {
        const messages = Object.values(err.errors).map(val => val.message);
        const message = `داده‌های نامعتبر: ${messages.join(', ')}`;
        error = new AppError(message, 400);
    }

    // خطاهای JWT
    if (err instanceof JsonWebTokenError) {
        const message = 'توکن احراز هویت نامعتبر است';
        error = new AppError(message, 401);
    }

    if (err instanceof TokenExpiredError) {
        const message = 'توکن احراز هویت منقضی شده است';
        error = new AppError(message, 401);
    }

    // خطاهای امنیتی
    if (err.name === 'UnauthorizedError') {
        const message = 'دسترسی غیرمجاز';
        error = new AppError(message, 401);
    }

    // خطاهای نرخ درخواست
    if (err.statusCode === 429) {
        const message = 'تعداد درخواست‌های شما بیش از حد مجاز است';
        error = new AppError(message, 429);
    }

    // پاسخ به کلاینت
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'خطای سرور',
        ...(process.env.NODE_ENV === 'development' && {
            stack: error.stack,
            error: error
        })
    });
};

// هندلر برای مسیرهای یافت نشده
const notFoundHandler = (req, res, next) => {
    const error = new AppError(
        `مسیر ${req.originalUrl} یافت نشد`,
        404
    );
    next(error);
};

// هندلر برای خطاهای async
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    errorHandler,
    notFoundHandler,
    asyncHandler,
    AppError
};