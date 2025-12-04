const mongoose = require('mongoose');
const crypto = require('crypto');

const businessCardSchema = new mongoose.Schema({
    // User reference
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Template reference
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessTemplate',
        default: null
    },
    templateVersion: {
        type: String,
        default: null
    },

    // Basic information
    title: {
        type: String,
        required: [true, 'عنوان کارت الزامی است'],
        trim: true,
        maxlength: [100, 'عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد']
    },
    businessType: {
        type: String,
        required: [true, 'نوع کسب‌وکار الزامی است'],
        enum: [
            'لبنیات فروشی',
            'لاستیک فروشی',
            'فروشگاه مواد غذایی',
            'رستوران',
            'کافی شاپ',
            'نوتی فروشی',
            'آرایشگاه',
            'تعمیرگاه',
            'فروشگاه پوشاک',
            'سوپرمارکت',
            'داروخانه',
            'مطب پزشکی',
            'آتلیه',
            'آژانس مسافرتی',
            'آموزشگاه',
            'دیگر'
        ]
    },
    companyName: {
        type: String,
        trim: true,
        maxlength: [200, 'نام شرکت نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد']
    },
    ownerName: {
        type: String,
        required: [true, 'نام صاحب کسب‌وکار الزامی است'],
        trim: true
    },
    ownerTitle: {
        type: String,
        trim: true,
        maxlength: [100, 'عنوان شغلی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد']
    },

    // Contact information
    phoneNumbers: [{
        type: String,
        required: [true, 'حداقل یک شماره تلفن الزامی است'],
        validate: {
            validator: function (v) {
                return /^[0-9]{10,11}$/.test(v);
            },
            message: props => `${props.value} شماره تلفن معتبر نیست!`
        }
    }],
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} ایمیل معتبر نیست!`
        }
    },

    // Address information
    address: {
        province: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        district: {
            type: String,
            trim: true
        },
        street: {
            type: String,
            trim: true
        },
        alley: {
            type: String,
            trim: true
        },
        plaque: {
            type: String,
            trim: true
        },
        floor: {
            type: String,
            trim: true
        },
        unit: {
            type: String,
            trim: true
        },
        postalCode: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    return !v || /^[0-9]{10}$/.test(v);
                },
                message: props => `${props.value} کد پستی معتبر نیست!`
            }
        },
        fullAddress: {
            type: String,
            trim: true
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                index: '2dsphere',
                validate: {
                    validator: function (v) {
                        return v.length === 2 &&
                            v[0] >= -180 && v[0] <= 180 &&
                            v[1] >= -90 && v[1] <= 90;
                    },
                    message: 'مختصات جغرافیایی نامعتبر است'
                }
            }
        }
    },

    // Business description
    description: {
        type: String,
        trim: true,
        maxlength: [2000, 'توضیحات نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد']
    },
    shortDescription: {
        type: String,
        trim: true,
        maxlength: [200, 'توضیحات کوتاه نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد']
    },

    // Services and products
    services: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            min: 0
        },
        currency: {
            type: String,
            default: 'تومان'
        },
        isHighlighted: {
            type: Boolean,
            default: false
        }
    }],
    products: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        category: String,
        description: String,
        price: Number,
        unit: String,
        isAvailable: {
            type: Boolean,
            default: true
        }
    }],

    // Working hours
    workingHours: {
        saturday: {
            from: String,
            to: String,
            isOpen: {
                type: Boolean,
                default: true
            }
        },
        sunday: {
            from: String,
            to: String,
            isOpen: {
                type: Boolean,
                default: true
            }
        },
        monday: {
            from: String,
            to: String,
            isOpen: {
                type: Boolean,
                default: true
            }
        },
        tuesday: {
            from: String,
            to: String,
            isOpen: {
                type: Boolean,
                default: true
            }
        },
        wednesday: {
            from: String,
            to: String,
            isOpen: {
                type: Boolean,
                default: true
            }
        },
        thursday: {
            from: String,
            to: String,
            isOpen: {
                type: Boolean,
                default: true
            }
        },
        friday: {
            from: String,
            to: String,
            isOpen: {
                type: Boolean,
                default: false
            }
        },
        notes: {
            type: String,
            trim: true
        }
    },

    // Social media and online presence
    socialMedia: {
        instagram: {
            type: String,
            trim: true
        },
        telegram: {
            type: String,
            trim: true
        },
        whatsapp: {
            type: String,
            trim: true
        },
        website: {
            type: String,
            trim: true
        },
        linkedin: {
            type: String,
            trim: true
        },
        aparat: {
            type: String,
            trim: true
        },
        youtube: {
            type: String,
            trim: true
        },
        eitaa: {
            type: String,
            trim: true
        },
        bale: {
            type: String,
            trim: true
        },
        sibapp: {
            type: String,
            trim: true
        }
    },

    // Images and media
    images: [{
        url: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: ''
        },
        caption: {
            type: String,
            trim: true
        },
        isMain: {
            type: Boolean,
            default: false
        },
        order: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            enum: ['logo', 'banner', 'gallery', 'product', 'certificate'],
            default: 'gallery'
        },
        publicId: String // For cloud storage
    }],

    // Documents and certificates
    documents: [{
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['certificate', 'license', 'permit', 'insurance', 'other']
        },
        fileUrl: {
            type: String,
            required: true
        },
        issueDate: Date,
        expiryDate: Date,
        issuer: String
    }],

    // QR Code related fields
    qrCode: {
        data: {
            type: String, // QR Code data URL (base64 encoded image)
            default: null
        },
        publicId: {
            type: String, // For cloud storage (if using Cloudinary or similar)
            default: null
        },
        qrCodeText: {
            type: String, // The text/URL encoded in QR code
            default: null
        },
        lastUpdated: {
            type: Date,
            default: null
        },
        version: {
            type: Number,
            default: 1
        },
        size: {
            type: Number,
            default: 300, // Size in pixels
            min: 100,
            max: 1000
        },
        margin: {
            type: Number,
            default: 1
        },
        errorCorrectionLevel: {
            type: String,
            enum: ['L', 'M', 'Q', 'H'],
            default: 'H'
        }
    },
    qrCodeSettings: {
        foregroundColor: {
            type: String,
            default: '#000000' // Black
        },
        backgroundColor: {
            type: String,
            default: '#FFFFFF' // White
        },
        includeLogo: {
            type: Boolean,
            default: false
        },
        logoUrl: {
            type: String,
            default: null
        },
        logoSize: {
            type: Number,
            default: 40
        },
        logoMargin: {
            type: Number,
            default: 10
        },
        roundedCorners: {
            type: Boolean,
            default: true
        },
        cornerRadius: {
            type: Number,
            default: 0.2
        }
    },

    // Unique identifiers
    uniqueCode: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },
    shortUrl: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },

    // Styling and customization
    styling: {
        colorScheme: {
            primary: {
                type: String,
                default: '#1a237e'
            },
            secondary: {
                type: String,
                default: '#ff9800'
            },
            accent: {
                type: String,
                default: '#4caf50'
            },
            backgroundColor: {
                type: String,
                default: '#ffffff'
            },
            textColor: {
                type: String,
                default: '#333333'
            },
            headerColor: {
                type: String,
                default: '#1a237e'
            }
        },
        layout: {
            type: String,
            enum: ['modern', 'classic', 'minimal', 'professional', 'elegant', 'creative'],
            default: 'modern'
        },
        fontFamily: {
            type: String,
            default: 'Vazir, sans-serif'
        },
        fontSize: {
            base: { type: String, default: '16px' },
            heading: { type: String, default: '24px' },
            subheading: { type: String, default: '18px' }
        },
        borderRadius: {
            type: String,
            default: '8px'
        },
        shadow: {
            type: String,
            default: '0 2px 10px rgba(0,0,0,0.1)'
        },
        customCss: {
            type: String,
            default: ''
        }
    },

    // Custom fields for flexibility
    customFields: [{
        key: {
            type: String,
            required: true,
            trim: true
        },
        label: {
            type: String,
            required: true,
            trim: true
        },
        value: mongoose.Schema.Types.Mixed,
        type: {
            type: String,
            enum: ['text', 'number', 'boolean', 'date', 'array', 'object'],
            default: 'text'
        },
        isVisible: {
            type: Boolean,
            default: true
        },
        order: {
            type: Number,
            default: 0
        }
    }],

    // SEO and metadata
    meta: {
        title: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        keywords: [String],
        canonicalUrl: {
            type: String,
            trim: true
        }
    },

    // Status and visibility
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    isVerified: {
        type: Boolean,
        default: false,
        index: true
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },

    // Statistics and analytics
    views: {
        type: Number,
        default: 0
    },
    qrScans: {
        type: Number,
        default: 0
    },
    phoneCalls: {
        type: Number,
        default: 0
    },
    whatsappClicks: {
        type: Number,
        default: 0
    },
    websiteClicks: {
        type: Number,
        default: 0
    },
    directionRequests: {
        type: Number,
        default: 0
    },

    // Tags and categorization
    tags: [{
        type: String,
        trim: true,
        index: true
    }],
    categories: [{
        type: String,
        trim: true
    }],

    // Payment information (optional)
    paymentMethods: [{
        type: String,
        enum: ['cash', 'card', 'online', 'bank_transfer', 'cheque']
    }],
    bankAccounts: [{
        bankName: String,
        accountNumber: String,
        accountHolder: String,
        shaba: String,
        isDefault: Boolean
    }],

    // Reviews and ratings
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        },
        breakdown: {
            '1': { type: Number, default: 0 },
            '2': { type: Number, default: 0 },
            '3': { type: Number, default: 0 },
            '4': { type: Number, default: 0 },
            '5': { type: Number, default: 0 }
        }
    },

    // Additional information
    establishedYear: {
        type: Number,
        min: 1300,
        max: 1500
    },
    employeeCount: {
        type: Number,
        min: 0
    },
    languages: [{
        type: String,
        enum: ['فارسی', 'انگلیسی', 'عربی', 'ترکی', 'کردی', 'دیگر']
    }],

    // Settings and preferences
    settings: {
        showEmail: {
            type: Boolean,
            default: true
        },
        showPhone: {
            type: Boolean,
            default: true
        },
        showAddress: {
            type: Boolean,
            default: true
        },
        showWorkingHours: {
            type: Boolean,
            default: true
        },
        showServices: {
            type: Boolean,
            default: true
        },
        showMap: {
            type: Boolean,
            default: true
        },
        showQRCode: {
            type: Boolean,
            default: true
        },
        showSocialMedia: {
            type: Boolean,
            default: true
        },
        showRating: {
            type: Boolean,
            default: true
        },
        allowReviews: {
            type: Boolean,
            default: true
        },
        allowSharing: {
            type: Boolean,
            default: true
        },
        notificationOnView: {
            type: Boolean,
            default: false
        },
        notificationOnContact: {
            type: Boolean,
            default: true
        }
    },

    // Audit and tracking
    lastViewed: {
        type: Date,
        default: null
    },
    lastContacted: {
        type: Date,
        default: null
    },
    createdByIp: String,
    updatedByIp: String
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.createdByIp;
            delete ret.updatedByIp;
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

// ==================== INDEXES ====================
businessCardSchema.index({ businessType: 1 });
businessCardSchema.index({ 'address.location': '2dsphere' });
businessCardSchema.index({ tags: 1 });
businessCardSchema.index({ isActive: 1, isVerified: 1, isFeatured: 1 });
businessCardSchema.index({ userId: 1 });
businessCardSchema.index({ templateId: 1 });
businessCardSchema.index({ 'address.city': 1, 'address.province': 1 });
businessCardSchema.index({ rating: -1 });
businessCardSchema.index({ views: -1 });
businessCardSchema.index({ createdAt: -1 });
businessCardSchema.index({ updatedAt: -1 });
businessCardSchema.index({ title: 'text', description: 'text', companyName: 'text', tags: 'text' });

// ==================== VIRTUALS ====================

// Full name virtual
businessCardSchema.virtual('fullName').get(function () {
    return `${this.ownerName}${this.companyName ? ` - ${this.companyName}` : ''}`;
});

// Display name virtual
businessCardSchema.virtual('displayName').get(function () {
    if (this.companyName) {
        return this.companyName;
    }
    return `${this.ownerName}'s ${this.businessType}`;
});

// QR Code URL virtual
businessCardSchema.virtual('qrCodeUrl').get(function () {
    if (this.qrCode && this.qrCode.data) {
        return this.qrCode.data;
    }
    return null;
});

// Public QR Code URL (if using cloud storage)
businessCardSchema.virtual('publicQrCodeUrl').get(function () {
    if (this.qrCode && this.qrCode.publicId) {
        return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${this.qrCode.publicId}`;
    }
    return null;
});

// Main image virtual
businessCardSchema.virtual('mainImage').get(function () {
    const mainImg = this.images.find(img => img.isMain);
    if (mainImg) return mainImg.url;

    if (this.images.length > 0) return this.images[0].url;

    // Default image based on business type
    const defaultImages = {
        'رستوران': '/defaults/restaurant.jpg',
        'کافی شاپ': '/defaults/cafe.jpg',
        'آرایشگاه': '/defaults/salon.jpg',
        'تعمیرگاه': '/defaults/repair.jpg',
        'لبنیات فروشی': '/defaults/dairy.jpg',
        'لاستیک فروشی': '/defaults/tire.jpg',
        'فروشگاه مواد غذایی': '/defaults/grocery.jpg'
    };

    return defaultImages[this.businessType] || '/defaults/business.jpg';
});

// Working hours status virtual
businessCardSchema.virtual('isOpenNow').get(function () {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const time = now.getHours() * 100 + now.getMinutes();

    const dayMap = {
        'saturday': 'شنبه',
        'sunday': 'یکشنبه',
        'monday': 'دوشنبه',
        'tuesday': 'سه‌شنبه',
        'wednesday': 'چهارشنبه',
        'thursday': 'پنجشنبه',
        'friday': 'جمعه'
    };

    const persianDay = Object.keys(dayMap).find(key => dayMap[key] === day);
    if (!persianDay || !this.workingHours[persianDay]) return false;

    const daySchedule = this.workingHours[persianDay];
    if (!daySchedule.isOpen || !daySchedule.from || !daySchedule.to) return false;

    const fromTime = parseInt(daySchedule.from.replace(':', ''));
    const toTime = parseInt(daySchedule.to.replace(':', ''));

    return time >= fromTime && time <= toTime;
});

// Rating percentage virtual
businessCardSchema.virtual('ratingPercentage').get(function () {
    return (this.rating.average / 5) * 100;
});

// ==================== MIDDLEWARE ====================

// Generate unique code and short URL before saving
businessCardSchema.pre('save', async function (next) {
    // Generate unique code if not exists
    if (!this.uniqueCode) {
        this.uniqueCode = await this.generateUniqueCode();
    }

    // Generate short URL if not exists
    if (!this.shortUrl) {
        this.shortUrl = await this.generateShortUrl();
    }

    // Ensure at least one image is marked as main
    if (this.images && this.images.length > 0) {
        const mainImages = this.images.filter(img => img.isMain);
        if (mainImages.length === 0) {
            this.images[0].isMain = true;
        } else if (mainImages.length > 1) {
            // Reset all and set first one as main
            this.images.forEach((img, index) => {
                img.isMain = index === 0;
            });
        }
    }

    // Generate meta title and description if not provided
    if (!this.meta.title) {
        this.meta.title = `${this.companyName || this.ownerName} - ${this.businessType}`;
    }

    if (!this.meta.description) {
        this.meta.description = this.shortDescription ||
            `کارت کسب‌وکار ${this.companyName || this.ownerName} در زمینه ${this.businessType}`;
    }

    // Set categories from business type if not provided
    if (!this.categories || this.categories.length === 0) {
        const businessCategories = {
            'رستوران': ['غذایی', 'رستوران'],
            'کافی شاپ': ['غذایی', 'کافی شاپ'],
            'آرایشگاه': ['خدمات زیبایی', 'آرایشگاه'],
            'تعمیرگاه': ['خودرو', 'تعمیرگاه'],
            'لبنیات فروشی': ['غذایی', 'لبنیات'],
            'لاستیک فروشی': ['خودرو', 'لاستیک'],
            'فروشگاه مواد غذایی': ['غذایی', 'سوپرمارکت']
        };

        this.categories = businessCategories[this.businessType] || [this.businessType];
    }

    // Add business type to tags if not already there
    if (this.tags && !this.tags.includes(this.businessType)) {
        this.tags.push(this.businessType);
    }

    next();
});

// Update rating average on save if breakdown changed
businessCardSchema.pre('save', function (next) {
    if (this.isModified('rating.breakdown')) {
        const breakdown = this.rating.breakdown;
        const total = breakdown['1'] + breakdown['2'] + breakdown['3'] + breakdown['4'] + breakdown['5'];

        if (total > 0) {
            const sum = breakdown['1'] * 1 +
                breakdown['2'] * 2 +
                breakdown['3'] * 3 +
                breakdown['4'] * 4 +
                breakdown['5'] * 5;
            this.rating.average = sum / total;
            this.rating.count = total;
        }
    }
    next();
});

// ==================== METHODS ====================

// Generate unique code
businessCardSchema.methods.generateUniqueCode = async function () {
    const generateCode = () => {
        // Format: BC-XXXX-XXXX (BC = Business Card)
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'BC-';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
            if (i === 3) code += '-';
        }
        return code;
    };

    let code = generateCode();
    let exists = true;
    let attempts = 0;

    while (exists && attempts < 10) {
        const doc = await mongoose.model('BusinessCard').findOne({ uniqueCode: code });
        exists = !!doc;
        if (exists) {
            code = generateCode();
            attempts++;
        }
    }

    return code;
};

// Generate short URL
businessCardSchema.methods.generateShortUrl = async function () {
    const generateSlug = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let slug = '';
        for (let i = 0; i < 6; i++) {
            slug += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return slug;
    };

    let slug = generateSlug();
    let exists = true;
    let attempts = 0;

    while (exists && attempts < 10) {
        const doc = await mongoose.model('BusinessCard').findOne({ shortUrl: slug });
        exists = !!doc;
        if (exists) {
            slug = generateSlug();
            attempts++;
        }
    }

    return slug;
};

// Get QR Code URL
businessCardSchema.methods.getQrCodeUrl = function () {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    return `${baseUrl}/api/business-cards/${this._id}/qr-code`;
};

// Get public profile URL
businessCardSchema.methods.getPublicUrl = function () {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return `${baseUrl}/business/${this.shortUrl}`;
};

// Get VCF (vCard) data for contact saving
businessCardSchema.methods.getVcfData = function () {
    const vcf = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${this.ownerName}`,
        `ORG:${this.companyName || ''}`,
        `TITLE:${this.ownerTitle || ''}`
    ];

    // Add phone numbers
    this.phoneNumbers.forEach((phone, index) => {
        vcf.push(`TEL;TYPE=${index === 0 ? 'WORK,VOICE' : 'CELL'}:${phone}`);
    });

    // Add email
    if (this.email) {
        vcf.push(`EMAIL:${this.email}`);
    }

    // Add address
    if (this.address.fullAddress) {
        vcf.push(`ADR:;;${this.address.fullAddress};${this.address.city || ''};${this.address.province || ''};;`);
    }

    // Add website
    if (this.socialMedia.website) {
        vcf.push(`URL:${this.socialMedia.website}`);
    }

    // Add note
    if (this.description) {
        vcf.push(`NOTE:${this.description.substring(0, 200)}`);
    }

    vcf.push('END:VCARD');

    return vcf.join('\n');
};

// Get QR Code data text
businessCardSchema.methods.getQrCodeDataText = function () {
    const profileUrl = this.getPublicUrl();
    const templateInfo = this.templateId ? `\n📋 قالب: ${this.templateId.name}` : '';

    const contactInfo = `
👤 ${this.companyName || this.title}
👨‍💼 ${this.ownerName}${this.ownerTitle ? ` - ${this.ownerTitle}` : ''}

📞 تلفن‌ها:
${this.phoneNumbers.map(phone => `• ${phone}`).join('\n')}

${this.email ? `📧 ایمیل:\n${this.email}\n\n` : ''}
📍 آدرس:
${this.address.fullAddress || `${this.address.city}${this.address.street ? ` - ${this.address.street}` : ''}`}

⏰ ساعت کاری:
${this.getWorkingHoursText()}

${this.description ? `📝 درباره ما:\n${this.description.substring(0, 300)}${this.description.length > 300 ? '...' : ''}\n\n` : ''}
${templateInfo}

🌐 برای اطلاعات بیشتر:
${profileUrl}

📱 یا اسکن QR Code
    `.trim();

    return contactInfo;
};

// Get formatted working hours text
businessCardSchema.methods.getWorkingHoursText = function () {
    const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
    const persianDays = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    let text = '';
    persianDays.forEach((day, index) => {
        const schedule = this.workingHours[day];
        if (schedule && schedule.isOpen && schedule.from && schedule.to) {
            text += `${days[index]}: ${schedule.from} تا ${schedule.to}\n`;
        } else if (schedule && !schedule.isOpen) {
            text += `${days[index]}: تعطیل\n`;
        }
    });

    if (this.workingHours.notes) {
        text += `\n📌 نکته: ${this.workingHours.notes}`;
    }

    return text.trim();
};

// Increment views
businessCardSchema.methods.incrementViews = async function () {
    this.views += 1;
    this.lastViewed = new Date();
    await this.save();
};

// Increment QR scans
businessCardSchema.methods.incrementQrScans = async function () {
    this.qrScans += 1;
    await this.save();
};

// Increment phone calls
businessCardSchema.methods.incrementPhoneCalls = async function (phoneNumber) {
    this.phoneCalls += 1;
    this.lastContacted = new Date();

    // Track which phone number was called
    if (!this.customFields) {
        this.customFields = [];
    }

    const phoneCallField = this.customFields.find(f => f.key === 'phone_call_stats');
    if (phoneCallField) {
        const stats = phoneCallField.value || {};
        stats[phoneNumber] = (stats[phoneNumber] || 0) + 1;
        stats.total = (stats.total || 0) + 1;
        stats.lastCall = new Date();
        phoneCallField.value = stats;
    } else {
        this.customFields.push({
            key: 'phone_call_stats',
            label: 'آمار تماس‌های تلفنی',
            value: {
                [phoneNumber]: 1,
                total: 1,
                lastCall: new Date()
            },
            type: 'object',
            isVisible: false
        });
    }

    await this.save();
};

// Add review and update rating
businessCardSchema.methods.addReview = async function (rating, comment) {
    const review = {
        userId: this._id, // In real app, this would be the reviewer's ID
        rating: Math.min(5, Math.max(1, rating)),
        comment: comment,
        createdAt: new Date()
    };

    // Update rating breakdown
    const ratingKey = review.rating.toString();
    if (!this.rating.breakdown[ratingKey]) {
        this.rating.breakdown[ratingKey] = 0;
    }
    this.rating.breakdown[ratingKey] += 1;

    // Recalculate average
    const breakdown = this.rating.breakdown;
    const total = breakdown['1'] + breakdown['2'] + breakdown['3'] + breakdown['4'] + breakdown['5'];
    const sum = breakdown['1'] * 1 +
        breakdown['2'] * 2 +
        breakdown['3'] * 3 +
        breakdown['4'] * 4 +
        breakdown['5'] * 5;

    this.rating.average = sum / total;
    this.rating.count = total;

    // Add review to custom fields
    if (!this.customFields) {
        this.customFields = [];
    }

    const reviewsField = this.customFields.find(f => f.key === 'reviews');
    if (reviewsField) {
        reviewsField.value.push(review);
    } else {
        this.customFields.push({
            key: 'reviews',
            label: 'نظرات کاربران',
            value: [review],
            type: 'array',
            isVisible: true
        });
    }

    await this.save();
    return review;
};

// Check if business is open at specific time
businessCardSchema.methods.isOpenAt = function (date) {
    const day = date.toLocaleDateString('fa-IR', { weekday: 'long' });
    const time = date.getHours() * 100 + date.getMinutes();

    const dayMap = {
        'شنبه': 'saturday',
        'یکشنبه': 'sunday',
        'دوشنبه': 'monday',
        'سه‌شنبه': 'tuesday',
        'چهارشنبه': 'wednesday',
        'پنجشنبه': 'thursday',
        'جمعه': 'friday'
    };

    const englishDay = dayMap[day];
    if (!englishDay || !this.workingHours[englishDay]) return false;

    const schedule = this.workingHours[englishDay];
    if (!schedule.isOpen || !schedule.from || !schedule.to) return false;

    const fromTime = parseInt(schedule.from.replace(':', ''));
    const toTime = parseInt(schedule.to.replace(':', ''));

    return time >= fromTime && time <= toTime;
};

// Get distance from coordinates (in meters)
businessCardSchema.methods.getDistanceFrom = function (latitude, longitude) {
    if (!this.address.location ||
        !this.address.location.coordinates ||
        this.address.location.coordinates.length !== 2) {
        return null;
    }

    const [lon1, lat1] = this.address.location.coordinates;
    const lat2 = latitude;
    const lon2 = longitude;

    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c); // Distance in meters
};

// Export business card as JSON for sharing
businessCardSchema.methods.exportAsJson = function () {
    const exportData = {
        id: this._id,
        uniqueCode: this.uniqueCode,
        title: this.title,
        businessType: this.businessType,
        companyName: this.companyName,
        ownerName: this.ownerName,
        ownerTitle: this.ownerTitle,
        contact: {
            phoneNumbers: this.phoneNumbers,
            email: this.email
        },
        address: this.address,
        description: this.description,
        workingHours: this.workingHours,
        socialMedia: this.socialMedia,
        services: this.services,
        rating: this.rating,
        tags: this.tags,
        categories: this.categories,
        publicUrl: this.getPublicUrl(),
        qrCodeUrl: this.getQrCodeUrl(),
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };

    return JSON.stringify(exportData, null, 2);
};

// Static methods

// Find nearby businesses
businessCardSchema.statics.findNearby = async function (latitude, longitude, maxDistance = 5000, limit = 20) {
    return this.find({
        'address.location': {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                $maxDistance: maxDistance
            }
        },
        isActive: true,
        isPublished: true
    })
        .limit(limit)
        .sort({ isVerified: -1, rating: -1 });
};

// Search businesses with advanced filters
businessCardSchema.statics.search = async function (searchParams) {
    const {
        query,
        businessType,
        city,
        province,
        minRating,
        isOpenNow,
        hasDelivery,
        page = 1,
        limit = 10,
        sortBy = 'rating',
        sortOrder = 'desc'
    } = searchParams;

    const filter = {
        isActive: true,
        isPublished: true
    };

    // Text search
    if (query) {
        filter.$text = { $search: query };
    }

    // Business type filter
    if (businessType) {
        filter.businessType = businessType;
    }

    // Location filters
    if (city) {
        filter['address.city'] = new RegExp(city, 'i');
    }

    if (province) {
        filter['address.province'] = new RegExp(province, 'i');
    }

    // Rating filter
    if (minRating) {
        filter['rating.average'] = { $gte: parseFloat(minRating) };
    }

    // Open now filter (complex - requires application logic)
    if (isOpenNow === 'true') {
        // This would require application-level filtering
        // since MongoDB can't easily handle time-based queries with Persian days
    }

    // Has delivery filter (check services)
    if (hasDelivery === 'true') {
        filter['services.name'] = {
            $regex: /(تحویل|ارسال|پیک|delivery)/i
        };
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const [results, total] = await Promise.all([
        this.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate('templateId', 'name layout'),
        this.countDocuments(filter)
    ]);

    return {
        results,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
};

// Get statistics
businessCardSchema.statics.getStats = async function (userId = null) {
    const match = userId ? { userId } : {};

    const stats = await this.aggregate([
        { $match: match },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                active: { $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] } },
                verified: { $sum: { $cond: [{ $eq: ['$isVerified', true] }, 1, 0] } },
                featured: { $sum: { $cond: [{ $eq: ['$isFeatured', true] }, 1, 0] } },
                totalViews: { $sum: '$views' },
                totalQrScans: { $sum: '$qrScans' },
                avgRating: { $avg: '$rating.average' }
            }
        },
        {
            $project: {
                _id: 0,
                total: 1,
                active: 1,
                verified: 1,
                featured: 1,
                totalViews: 1,
                totalQrScans: 1,
                avgRating: { $round: ['$avgRating', 2] }
            }
        }
    ]);

    // Get business type distribution
    const typeDistribution = await this.aggregate([
        { $match: match },
        { $group: { _id: '$businessType', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);

    // Get recent activity
    const recentActivity = await this.aggregate([
        { $match: match },
        { $sort: { updatedAt: -1 } },
        { $limit: 5 },
        {
            $project: {
                title: 1,
                businessType: 1,
                views: 1,
                updatedAt: 1
            }
        }
    ]);

    return {
        ...(stats[0] || {
            total: 0,
            active: 0,
            verified: 0,
            featured: 0,
            totalViews: 0,
            totalQrScans: 0,
            avgRating: 0
        }),
        typeDistribution,
        recentActivity
    };
};

const BusinessCard = mongoose.model('BusinessCard', businessCardSchema);

module.exports = BusinessCard;