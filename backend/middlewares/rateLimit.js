/**
 * میدلورهای محدودیت نرخ درخواست پیشرفته
 */

const rateLimit = require('express-rate-limit');
const Redis = require('ioredis');

// ذخیره‌سازی در حافظه (برای توسعه)
const memoryStore = new Map();

// کلاس ذخیره‌سازی سفارشی برای Redis
class RedisStore {
    constructor(redisUrl) {
        this.client = new Redis(redisUrl);
    }

    async increment(key) {
        const results = await this.client
            .multi()
            .incr(key)
            .pttl(key)
            .exec();

        const totalHits = results[0][1];
        const resetTime = results[1][1];

        return {
            totalHits,
            resetTime
        };
    }

    async decrement(key) {
        await this.client.decr(key);
    }

    async resetKey(key) {
        await this.client.del(key);
    }
}

// محدودیت برای درخواست‌های عمومی
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقیقه
    max: 100, // حداکثر 100 درخواست
    message: {
        success: false,
        message: 'تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً ۱۵ دقیقه دیگر مجدد تلاش کنید.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// محدودیت برای احراز هویت
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 ساعت
    max: 5, // حداکثر 5 تلاش ناموفق
    message: {
        success: false,
        message: 'تعداد تلاش‌های ناموفق شما بیش از حد مجاز است. لطفاً ۱ ساعت دیگر مجدد تلاش کنید.'
    },
    skipSuccessfulRequests: true // فقط درخواست‌های ناموفق شمرده شوند
});

// محدودیت برای ارسال کد تأیید
const verificationCodeLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 دقیقه
    max: 3, // حداکثر 3 درخواست در 10 دقیقه
    message: {
        success: false,
        message: 'تعداد درخواست‌های کد تأیید شما بیش از حد مجاز است. لطفاً ۱۰ دقیقه دیگر مجدد تلاش کنید.'
    }
});

// محدودیت برای API‌های حساس
const sensitiveLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 ساعت
    max: 50, // حداکثر 50 درخواست در روز
    message: {
        success: false,
        message: 'محدودیت روزانه شما به پایان رسیده است. لطفاً فردا مجدد تلاش کنید.'
    }
});

// محدودیت مبتنی بر IP
const createIPLimiter = (windowMs, max, message) => {
    return rateLimit({
        windowMs,
        max,
        message: {
            success: false,
            message
        },
        keyGenerator: (req) => {
            return req.ip; // استفاده از IP به عنوان کلید
        }
    });
};

// هندلر خطاهای محدودیت
const rateLimitHandler = (req, res) => {
    res.status(429).json({
        success: false,
        message: 'محدودیت نرخ درخواست. لطفاً بعداً مجدد تلاش کنید.',
        retryAfter: Math.ceil(res.getHeader('Retry-After') / 60) || 1
    });
};

module.exports = {
    generalLimiter,
    authLimiter,
    verificationCodeLimiter,
    sensitiveLimiter,
    createIPLimiter,
    rateLimitHandler
};