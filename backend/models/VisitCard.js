// models/VisitCard.js
const mongoose = require("mongoose");

const visitCardSchema = new mongoose.Schema({
    // اطلاعات کارت
    title: {
        type: String,
        required: true,
        trim: true
    },

    uniqueCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    // ارتباط با قالب
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisitTemplate',
        required: true
    },

    // مالک کارت
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // اطلاعات پزشک در این کارت (ممکن است متفاوت از قالب باشد)
    doctorInfo: {
        name: String,
        specialty: String,
        degree: String,
        phoneNumbers: [String],
        email: String,
        address: String,
        city: String,
        clinicName: String
    },

    // اطلاعات تماس اضافه/متفاوت
    customContacts: {
        emergencyPhone: String,
        secretaryPhone: String,
        fax: String
    },

    // زمان‌بندی اختصاصی برای این کارت
    customSchedule: [{
        day: {
            type: String,
            enum: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']
        },
        from: String,
        to: String,
        description: String
    }],

    // خدمات اختصاصی
    customServices: [{
        type: String
    }],

    // تصاویر اختصاصی
    customLogo: String,
    customProfileImage: String,

    // شبکه‌های اجتماعی اختصاصی
    customSocialMedia: {
        instagram: String,
        telegram: String,
        whatsapp: String,
        website: String
    },

    // آمار و اطلاعات استفاده
    viewStats: {
        totalViews: {
            type: Number,
            default: 0
        },
        uniqueViews: {
            type: Number,
            default: 0
        },
        lastViewedAt: Date
    },

    shareStats: {
        totalShares: {
            type: Number,
            default: 0
        },
        whatsappShares: {
            type: Number,
            default: 0
        },
        telegramShares: {
            type: Number,
            default: 0
        },
        instagramShares: {
            type: Number,
            default: 0
        }
    },

    contactStats: {
        totalCalls: {
            type: Number,
            default: 0
        },
        whatsappMessages: {
            type: Number,
            default: 0
        },
        websiteClicks: {
            type: Number,
            default: 0
        }
    },

    // QR Code مخصوص این کارت
    qrCode: {
        type: String,
        required: true
    },

    qrCodeImage: {
        type: String
    },

    // لینک اختصاصی
    shareableLink: {
        type: String,
        unique: true
    },

    // تنظیمات نمایش
    displaySettings: {
        isPublic: {
            type: Boolean,
            default: true
        },
        showContactInfo: {
            type: Boolean,
            default: true
        },
        showSchedule: {
            type: Boolean,
            default: true
        },
        showServices: {
            type: Boolean,
            default: true
        },
        showSocialMedia: {
            type: Boolean,
            default: true
        },
        showMap: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            enum: ['light', 'dark', 'professional', 'minimal'],
            default: 'professional'
        }
    },

    // اطلاعات اشتراک‌گذاری
    sharing: {
        allowSharing: {
            type: Boolean,
            default: true
        },
        password: String,
        expiresAt: Date,
        maxViews: Number
    },

    // تحلیل‌گر
    analytics: [{
        date: {
            type: Date,
            default: Date.now
        },
        views: Number,
        shares: Number,
        contacts: Number,
        source: String, // منبع ترافیک
        device: String // نوع دستگاه
    }],

    // کامنت‌ها و بازخورد
    feedbacks: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],

    // برچسب‌ها برای سازماندهی
    tags: [{
        type: String
    }],

    // وضعیت
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended', 'expired'],
        default: 'active'
    },

    // متادیتا
    metadata: {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        lastUpdatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        version: {
            type: Number,
            default: 1
        }
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ایندکس‌ها
visitCardSchema.index({ uniqueCode: 1 });
visitCardSchema.index({ template: 1 });
visitCardSchema.index({ owner: 1 });
visitCardSchema.index({ status: 1 });
visitCardSchema.index({ 'doctorInfo.specialty': 1 });
visitCardSchema.index({ 'doctorInfo.city': 1 });
visitCardSchema.index({ tags: 1 });
visitCardSchema.index({ shareableLink: 1 });

// Virtual برای رتبه‌بندی متوسط
visitCardSchema.virtual('averageRating').get(function () {
    if (!this.feedbacks || this.feedbacks.length === 0) return 0;

    const total = this.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return total / this.feedbacks.length;
});

// Virtual برای تعداد بازخورد
visitCardSchema.virtual('feedbackCount').get(function () {
    return this.feedbacks ? this.feedbacks.length : 0;
});

// Virtual برای بررسی انقضا
visitCardSchema.virtual('isExpired').get(function () {
    if (!this.sharing.expiresAt) return false;
    return new Date() > this.sharing.expiresAt;
});

// Virtual برای بررسی محدودیت بازدید
visitCardSchema.virtual('hasReachedViewLimit').get(function () {
    if (!this.sharing.maxViews) return false;
    return this.viewStats.totalViews >= this.sharing.maxViews;
});

// Middleware برای تولید کد یکتا قبل از ذخیره
visitCardSchema.pre('save', async function (next) {
    if (!this.uniqueCode) {
        const generateUniqueCode = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 8; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return `VC-${code}`;
        };

        let code = generateUniqueCode();
        let exists = true;

        // اطمینان از یکتایی کد
        while (exists) {
            const existingCard = await mongoose.model('VisitCard').findOne({ uniqueCode: code });
            if (!existingCard) {
                exists = false;
            } else {
                code = generateUniqueCode();
            }
        }

        this.uniqueCode = code;
    }

    // تولید لینک اشتراک‌گذاری
    if (!this.shareableLink) {
        this.shareableLink = `/visit-card/${this.uniqueCode}`;
    }

    next();
});

const VisitCard = mongoose.model('VisitCard', visitCardSchema);

module.exports = VisitCard;