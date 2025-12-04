// models/VisitTemplate.js
const mongoose = require("mongoose");

const visitTemplateSchema = new mongoose.Schema({
    // اطلاعات پایه قالب
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    // اطلاعات پزشک
    doctorName: {
        type: String,
        required: true,
        trim: true
    },

    specialty: {
        type: String,
        required: true,
        enum: [
            'عمومی',
            'داخلی',
            'جراح',
            'ارتوپد',
            'قلب و عروق',
            'گوارش',
            'اعصاب و روان',
            'پوست و مو',
            'زنان و زایمان',
            'اورولوژی',
            'اطفال',
            'چشم پزشکی',
            'ENT',
            'دندانپزشکی',
            'سایر'
        ]
    },

    degree: {
        type: String,
        enum: ['دکترای عمومی', 'متخصص', 'فوق تخصص', 'استاد دانشگاه', 'فلوشیپ']
    },

    // اطلاعات تماس
    phoneNumbers: [{
        type: String,
        required: true
    }],

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    // اطلاعات مطب
    clinicName: {
        type: String
    },

    officeHours: [{
        day: {
            type: String,
            enum: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']
        },
        from: String,
        to: String,
        isHoliday: {
            type: Boolean,
            default: false
        }
    }],

    // ویژگی‌های ظاهری قالب
    templateStyle: {
        primaryColor: {
            type: String,
            default: '#1a56db'
        },
        secondaryColor: {
            type: String,
            default: '#3b82f6'
        },
        backgroundColor: {
            type: String,
            default: '#ffffff'
        },
        textColor: {
            type: String,
            default: '#1f2937'
        },
        fontFamily: {
            type: String,
            default: 'Vazir'
        },
        borderRadius: {
            type: Number,
            default: 12
        },
        shadow: {
            type: String,
            default: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }
    },

    // تصاویر و رسانه
    logo: {
        type: String
    },

    profileImage: {
        type: String
    },

    backgroundImage: {
        type: String
    },

    // خدمات و تخصص‌ها
    services: [{
        type: String
    }],

    // مدارک و گواهینامه‌ها
    certificates: [{
        title: String,
        issuer: String,
        year: Number
    }],

    // اطلاعات شبکه‌های اجتماعی
    socialMedia: {
        instagram: String,
        telegram: String,
        whatsapp: String,
        website: String,
        email: String
    },

    // اطلاعات موقعیت جغرافیایی
    location: {
        lat: Number,
        lng: Number
    },

    // QR Code
    qrCode: {
        type: String
    },

    // وضعیت و متادیتا
    isActive: {
        type: Boolean,
        default: true
    },

    isPremium: {
        type: Boolean,
        default: false
    },

    viewCount: {
        type: Number,
        default: 0
    },

    shareCount: {
        type: Number,
        default: 0
    },

    // ارتباط با کاربر
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // ارتباط با VisitCard
    usedInCards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisitCard'
    }]

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ایندکس‌ها برای جستجوی بهتر
visitTemplateSchema.index({ title: 'text', description: 'text', doctorName: 'text', specialty: 'text' });
visitTemplateSchema.index({ specialty: 1 });
visitTemplateSchema.index({ city: 1 });
visitTemplateSchema.index({ createdBy: 1 });
visitTemplateSchema.index({ isActive: 1 });
visitTemplateSchema.index({ isPremium: 1 });

// Virtual برای تعداد کارت‌های ساخته شده از این قالب
visitTemplateSchema.virtual('cardsCount').get(function () {
    return this.usedInCards ? this.usedInCards.length : 0;
});

const VisitTemplate = mongoose.model('VisitTemplate', visitTemplateSchema);

module.exports = VisitTemplate;