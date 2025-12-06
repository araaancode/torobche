/**
 * سرویس ارسال SMS با پشتیبانی از multiple providers
 */

const axios = require('axios');

// تنظیمات سرویس‌های SMS
const SMS_PROVIDERS = {
    KAVENEGAR: {
        name: 'kavenegar',
        baseURL: 'https://api.kavenegar.com/v1',
        endpoints: {
            send: '/verify/lookup.json',
            status: '/account/info.json'
        }
    },
    GHASEDAK: {
        name: 'ghasedak',
        baseURL: 'http://api.ghasedak.io/v2',
        endpoints: {
            send: '/verification/send/simple',
            status: '/account/info'
        }
    },
    MEDIANOVA: {
        name: 'medianova',
        baseURL: 'https://rest.medianova.com/v1',
        endpoints: {
            send: '/sms/send',
            status: '/account/balance'
        }
    }
};

// کلاس مدیریت ارسال SMS
class SMSService {
    constructor(providerName = 'KAVENEGAR') {
        this.provider = SMS_PROVIDERS[providerName];
        this.apiKey = process.env.SMS_API_KEY;
        this.templateName = process.env.SMS_TEMPLATE_NAME || 'verification';
    }

    // ارسال کد تایید
    async sendVerificationCode(phone, code) {
        try {
            // اعتبارسنجی شماره موبایل
            if (!this.validatephone(phone)) {
                throw new Error('شماره موبایل معتبر نیست');
            }

            // در محیط توسعه، لاگ کرده و true برگردان
            if (process.env.NODE_ENV === 'development') {
                console.log(`📱 SMS Simulation - To: ${phone}, Code: ${code}`);
                return {
                    success: true,
                    messageId: `dev-${Date.now()}`,
                    provider: this.provider.name
                };
            }

            // ارسال واقعی SMS بر اساس provider
            let response;
            switch (this.provider.name) {
                case 'kavenegar':
                    response = await this.sendViaKavenegar(phone, code);
                    break;
                case 'ghasedak':
                    response = await this.sendViaGhasedak(phone, code);
                    break;
                case 'medianova':
                    response = await this.sendViaMedianova(phone, code);
                    break;
                default:
                    throw new Error('Provider SMS پشتیبانی نمی‌شود');
            }

            return {
                success: true,
                messageId: response.messageId,
                provider: this.provider.name,
                cost: response.cost || 0
            };

        } catch (error) {
            console.error('SMS sending error:', error);

            // بازگردانی به provider پشتیبان در صورت خطا
            if (this.provider.name !== 'KAVENEGAR') {
                console.log('تغییر به Kavenegar به عنوان provider پشتیبان');
                const fallbackService = new SMSService('KAVENEGAR');
                return await fallbackService.sendVerificationCode(phone, code);
            }

            return {
                success: false,
                error: error.message,
                provider: this.provider.name
            };
        }
    }

    // ارسال از طریق کاوه نگار
    async sendViaKavenegar(phone, code) {
        const url = `${this.provider.baseURL}/${this.apiKey}${this.provider.endpoints.send}`;

        const params = new URLSearchParams({
            receptor: phone,
            token: code,
            template: this.templateName
        });

        const response = await axios.post(url, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.data.return.status !== 200) {
            throw new Error(response.data.return.message);
        }

        return {
            messageId: response.data.entries[0].messageid,
            cost: response.data.entries[0].cost
        };
    }

    // ارسال از طریق قاصدک
    async sendViaGhasedak(phone, code) {
        const url = `${this.provider.baseURL}${this.provider.endpoints.send}`;

        const data = {
            receptor: phone,
            type: '1',
            template: this.templateName,
            param1: code
        };

        const response = await axios.post(url, data, {
            headers: {
                'apikey': this.apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.data.result.code !== 200) {
            throw new Error(response.data.result.message);
        }

        return {
            messageId: response.data.items[0].messageid,
            cost: response.data.items[0].cost
        };
    }

    // ارسال از طریق مدیا نوا
    async sendViaMedianova(phone, code) {
        const url = `${this.provider.baseURL}${this.provider.endpoints.send}`;

        const data = {
            to: phone,
            message: `کد تایید شما: ${code}`,
            from: '3000', // شماره سرویس
            apiKey: this.apiKey
        };

        const response = await axios.post(url, data);

        if (!response.data.success) {
            throw new Error(response.data.error);
        }

        return {
            messageId: response.data.messageId,
            cost: response.data.cost
        };
    }

    // بررسی وضعیت ارسال
    async getMessageStatus(messageId) {
        try {
            const url = `${this.provider.baseURL}/${this.apiKey}/sms/status.json`;
            const params = new URLSearchParams({ messageid: messageId });

            const response = await axios.post(url, params);
            return response.data.entries[0];
        } catch (error) {
            console.error('Status check error:', error);
            return null;
        }
    }

    // بررسی موجودی حساب
    async getBalance() {
        try {
            const url = `${this.provider.baseURL}/${this.apiKey}/account/info.json`;
            const response = await axios.get(url);
            return response.data.entries[0];
        } catch (error) {
            console.error('Balance check error:', error);
            return null;
        }
    }

    // اعتبارسنجی شماره موبایل ایرانی
    validatephone(phone) {
        const phoneRegex = /^09[0-9]{9}$/;
        return phoneRegex.test(phone);
    }

    // تولید متن SMS
    generateSMSText(code, templateType = 'verification') {
        const templates = {
            verification: `کد تایید شما: ${code}\n\nاین کد تا ۱۰ دقیقه معتبر است.`,
            welcome: `به سامانه ما خوش آمدید!\n\nکد تایید شما: ${code}`,
            reset: `کد بازیابی رمز عبور: ${code}\n\nاین کد تا ۱۵ دقیقه معتبر است.`
        };

        return templates[templateType] || templates.verification;
    }
}

// تابع اصلی برای استفاده در کنترلرها
const sendVerificationCode = async (phone, code, templateType = 'verification') => {
    const provider = process.env.SMS_PROVIDER || 'KAVENEGAR';
    const smsService = new SMSService(provider);

    return await smsService.sendVerificationCode(phone, code);
};

module.exports = {
    sendVerificationCode,
    SMSService
};