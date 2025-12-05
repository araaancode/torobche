const mongoose = require('mongoose');
const crypto = require('crypto');

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: [true, 'مدرک تحصیلی الزامی است'],
        trim: true
    },
    field: {
        type: String,
        required: [true, 'رشته تحصیلی الزامی است'],
        trim: true
    },
    university: {
        type: String,
        required: [true, 'نام دانشگاه الزامی است'],
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    isCurrent: {
        type: Boolean,
        default: false
    },
    gpa: {
        type: Number,
        min: 0,
        max: 20
    },
    totalGpa: {
        type: Number,
        default: 20
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد']
    },
    courses: [{
        type: String,
        trim: true
    }],
    honors: [{
        type: String,
        trim: true
    }]
});

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'عنوان شغلی الزامی است'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'نام شرکت الزامی است'],
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    employmentType: {
        type: String,
        enum: ['تمام وقت', 'پاره وقت', 'پروژه‌ای', 'کارآموزی', 'دورکاری', 'فریلنس'],
        default: 'تمام وقت'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    isCurrent: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'توضیحات نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد']
    },
    achievements: [{
        type: String,
        trim: true
    }],
    technologies: [{
        type: String,
        trim: true
    }],
    responsibilities: [{
        type: String,
        trim: true
    }],
    industry: {
        type: String,
        trim: true
    }
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'عنوان پروژه الزامی است'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'نقش شما در پروژه الزامی است'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'توضیحات نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد']
    },
    technologies: [{
        type: String,
        trim: true
    }],
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    isCurrent: {
        type: Boolean,
        default: false
    },
    url: {
        type: String,
        trim: true
    },
    github: {
        type: String,
        trim: true
    },
    demoUrl: {
        type: String,
        trim: true
    },
    images: [{
        url: String,
        alt: String
    }]
});

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'نام مهارت الزامی است'],
        trim: true
    },
    level: {
        type: String,
        enum: ['مبتدی', 'متوسط', 'پیشرفته', 'حرفه‌ای'],
        default: 'متوسط'
    },
    category: {
        type: String,
        enum: ['فنی', 'زبان', 'نرم', 'مدیریتی', 'خلاقانه', 'دیگر'],
        default: 'فنی'
    },
    yearsOfExperience: {
        type: Number,
        min: 0
    },
    isHighlighted: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        trim: true
    }
});

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'نام زبان الزامی است'],
        trim: true
    },
    proficiency: {
        type: String,
        enum: ['مقدماتی', 'متوسط', 'پیشرفته', 'مسلط', 'بومی'],
        default: 'متوسط'
    },
    certificate: {
        type: String,
        trim: true
    },
    score: {
        type: String,
        trim: true
    }
});

const certificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'نام گواهینامه الزامی است'],
        trim: true
    },
    issuer: {
        type: String,
        required: [true, 'صادرکننده الزامی است'],
        trim: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date
    },
    credentialId: {
        type: String,
        trim: true
    },
    credentialUrl: {
        type: String,
        trim: true
    },
    isExpired: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        trim: true
    }
});

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'عنوان انتشار الزامی است'],
        trim: true
    },
    type: {
        type: String,
        enum: ['مقاله', 'کتاب', 'پتنت', 'پایان‌نامه', 'گزارش فنی', 'ارائه'],
        default: 'مقاله'
    },
    publisher: {
        type: String,
        trim: true
    },
    publicationDate: {
        type: Date
    },
    url: {
        type: String,
        trim: true
    },
    doi: {
        type: String,
        trim: true
    },
    authors: [{
        type: String,
        trim: true
    }],
    description: {
        type: String,
        trim: true
    }
});

const resumeSchema = new mongoose.Schema({
    // User reference
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Personal information
    personalInfo: {
        firstName: {
            type: String,
            required: [true, 'نام الزامی است'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'نام خانوادگی الزامی است'],
            trim: true
        },
        title: {
            type: String,
            trim: true,
            maxlength: [100, 'عنوان شغلی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد']
        },
        summary: {
            type: String,
            trim: true,
            maxlength: [2000, 'خلاصه نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد']
        },
        email: {
            type: String,
            required: [true, 'ایمیل الزامی است'],
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} ایمیل معتبر نیست!`
            }
        },
        phone: {
            type: String,
            required: [true, 'شماره تلفن الزامی است'],
            validate: {
                validator: function (v) {
                    return /^[0-9]{10,11}$/.test(v);
                },
                message: props => `${props.value} شماره تلفن معتبر نیست!`
            }
        },
        alternatePhone: {
            type: String,
            validate: {
                validator: function (v) {
                    return !v || /^[0-9]{10,11}$/.test(v);
                },
                message: props => `${props.value} شماره تلفن معتبر نیست!`
            }
        },
        birthDate: {
            type: Date
        },
        nationality: {
            type: String,
            default: 'ایرانی'
        },
        maritalStatus: {
            type: String,
            enum: ['مجرد', 'متأهل', 'دیگر']
        },
        gender: {
            type: String,
            enum: ['مرد', 'زن', 'دیگر']
        },
        address: {
            country: {
                type: String,
                default: 'ایران'
            },
            province: {
                type: String,
                trim: true
            },
            city: {
                type: String,
                trim: true
            },
            fullAddress: {
                type: String,
                trim: true
            },
            postalCode: {
                type: String,
                trim: true
            }
        },
        website: {
            type: String,
            trim: true
        },
        linkedin: {
            type: String,
            trim: true
        },
        github: {
            type: String,
            trim: true
        },
        stackoverflow: {
            type: String,
            trim: true
        },
        twitter: {
            type: String,
            trim: true
        },
        telegram: {
            type: String,
            trim: true
        },
        instagram: {
            type: String,
            trim: true
        }
    },

    // Profile image
    profileImage: {
        url: {
            type: String,
            default: null
        },
        publicId: {
            type: String,
            default: null
        },
        alt: {
            type: String,
            default: 'عکس پروفایل'
        }
    },

    // Resume sections
    education: [educationSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    skills: [skillSchema],
    languages: [languageSchema],
    certifications: [certificationSchema],
    publications: [publicationSchema],

    // Custom sections
    customSections: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            enum: ['list', 'paragraph', 'timeline', 'gallery'],
            default: 'list'
        },
        content: mongoose.Schema.Types.Mixed,
        isVisible: {
            type: Boolean,
            default: true
        },
        order: {
            type: Number,
            default: 0
        }
    }],

    // Awards and honors
    awards: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        issuer: {
            type: String,
            trim: true
        },
        date: {
            type: Date
        },
        description: {
            type: String,
            trim: true
        }
    }],

    // Volunteer work
    volunteerWork: [{
        organization: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        description: {
            type: String,
            trim: true
        }
    }],

    // Hobbies and interests
    hobbies: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    }],

    // References
    references: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            trim: true
        },
        company: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        relationship: {
            type: String,
            trim: true
        }
    }],

    // Resume settings
    settings: {
        template: {
            type: String,
            enum: ['modern', 'classic', 'creative', 'minimal', 'professional', 'academic'],
            default: 'professional'
        },
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
            }
        },
        fontFamily: {
            type: String,
            default: 'Vazir, sans-serif'
        },
        fontSize: {
            base: { type: String, default: '14px' },
            heading: { type: String, default: '24px' },
            subheading: { type: String, default: '18px' }
        },
        layout: {
            type: String,
            enum: ['single-column', 'two-column', 'compact'],
            default: 'single-column'
        },
        showProfileImage: {
            type: Boolean,
            default: true
        },
        showContactInfo: {
            type: Boolean,
            default: true
        },
        showSummary: {
            type: Boolean,
            default: true
        },
        showSkillsChart: {
            type: Boolean,
            default: false
        },
        showQRCode: {
            type: Boolean,
            default: true
        },
        qrCodePosition: {
            type: String,
            enum: ['header', 'footer', 'sidebar', 'none'],
            default: 'footer'
        },
        language: {
            type: String,
            enum: ['fa', 'en'],
            default: 'fa'
        },
        pageSize: {
            type: String,
            enum: ['A4', 'letter', 'legal'],
            default: 'A4'
        },
        margins: {
            top: { type: String, default: '20mm' },
            right: { type: String, default: '20mm' },
            bottom: { type: String, default: '20mm' },
            left: { type: String, default: '20mm' }
        }
    },

    // QR Code Configuration
    qrCodeConfig: {
        size: {
            type: Number,
            default: 200,
            min: 100,
            max: 500
        },
        margin: {
            type: Number,
            default: 1
        },
        errorCorrectionLevel: {
            type: String,
            enum: ['L', 'M', 'Q', 'H'],
            default: 'H'
        },
        foregroundColor: {
            type: String,
            default: '#000000'
        },
        backgroundColor: {
            type: String,
            default: '#FFFFFF'
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
            default: 50
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
        },
        includeText: {
            type: Boolean,
            default: true
        },
        textBelowQR: {
            type: String,
            default: 'اسکن برای مشاهده رزومه'
        },
        textColor: {
            type: String,
            default: '#000000'
        },
        textFontSize: {
            type: Number,
            default: 12
        }
    },

    // QR Code Data
    qrCode: {
        data: {
            type: String, // Base64 encoded QR Code image
            default: null
        },
        publicId: {
            type: String, // Cloudinary public ID
            default: null
        },
        qrCodeText: {
            type: String, // Text encoded in QR code
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
        scans: {
            type: Number,
            default: 0
        },
        lastScanned: {
            type: Date,
            default: null
        }
    },

    // Metadata
    metadata: {
        title: {
            type: String,
            default: function () {
                return `${this.personalInfo.firstName} ${this.personalInfo.lastName} - رزومه`;
            }
        },
        description: {
            type: String,
            trim: true
        },
        keywords: [String]
    },

    // Status and visibility
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    isPublic: {
        type: Boolean,
        default: false,
        index: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    // Statistics
    views: {
        type: Number,
        default: 0
    },
    downloads: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    },

    // Short URL for sharing
    shortUrl: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },

    // Unique Code
    uniqueCode: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },

    // Tags for categorization
    tags: [{
        type: String,
        trim: true,
        index: true
    }],

    // Target job information
    targetJob: {
        title: {
            type: String,
            trim: true
        },
        industry: {
            type: String,
            trim: true
        },
        salaryExpectation: {
            min: Number,
            max: Number,
            currency: {
                type: String,
                default: 'تومان'
            },
            period: {
                type: String,
                enum: ['ماهیانه', 'سالانه', 'ساعتی', 'پروژه‌ای'],
                default: 'ماهیانه'
            }
        },
        jobType: {
            type: String,
            enum: ['تمام وقت', 'پاره وقت', 'پروژه‌ای', 'دورکاری', 'کارآموزی'],
            default: 'تمام وقت'
        },
        location: {
            type: String,
            trim: true
        },
        relocation: {
            type: Boolean,
            default: false
        },
        remote: {
            type: Boolean,
            default: false
        }
    },

    // Privacy settings
    privacy: {
        showBirthDate: {
            type: Boolean,
            default: false
        },
        showMaritalStatus: {
            type: Boolean,
            default: false
        },
        showAddress: {
            type: Boolean,
            default: true
        },
        showEmail: {
            type: Boolean,
            default: true
        },
        showPhone: {
            type: Boolean,
            default: true
        },
        showSocialMedia: {
            type: Boolean,
            default: true
        },
        allowDownload: {
            type: Boolean,
            default: true
        },
        allowPrint: {
            type: Boolean,
            default: true
        },
        passwordProtected: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            select: false
        },
        showQRCode: {
            type: Boolean,
            default: true
        }
    },

    // Version control
    version: {
        type: Number,
        default: 1
    },
    parentResumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        default: null
    },
    changeLog: [{
        version: Number,
        changes: String,
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        changedAt: {
            type: Date,
            default: Date.now
        }
    }],

    // Audit trail
    createdByIp: String,
    updatedByIp: String,
    lastViewed: Date
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.privacy.password;
            delete ret.createdByIp;
            delete ret.updatedByIp;
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.privacy.password;
            return ret;
        }
    }
});

// ==================== INDEXES ====================
resumeSchema.index({ userId: 1 });
resumeSchema.index({ 'personalInfo.firstName': 1, 'personalInfo.lastName': 1 });
resumeSchema.index({ tags: 1 });
resumeSchema.index({ isActive: 1, isPublic: 1 });
resumeSchema.index({ 'targetJob.title': 'text', 'personalInfo.summary': 'text', tags: 'text' });
resumeSchema.index({ createdAt: -1 });
resumeSchema.index({ views: -1 });
resumeSchema.index({ uniqueCode: 1 });
resumeSchema.index({ shortUrl: 1 });
resumeSchema.index({ 'qrCode.scans': -1 });

// ==================== VIRTUALS ====================

// Full name virtual
resumeSchema.virtual('fullName').get(function () {
    return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`;
});

// Age virtual
resumeSchema.virtual('age').get(function () {
    if (!this.personalInfo.birthDate) return null;

    const today = new Date();
    const birthDate = new Date(this.personalInfo.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
});

// Experience years virtual
resumeSchema.virtual('totalExperienceYears').get(function () {
    if (!this.experience || this.experience.length === 0) return 0;

    let totalMonths = 0;

    this.experience.forEach(exp => {
        const startDate = new Date(exp.startDate);
        const endDate = exp.isCurrent ? new Date() : new Date(exp.endDate);

        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth());

        totalMonths += Math.max(0, months);
    });

    return Math.round(totalMonths / 12 * 10) / 10; // Return with one decimal
});

// Skills by category virtual
resumeSchema.virtual('skillsByCategory').get(function () {
    if (!this.skills) return {};

    return this.skills.reduce((categories, skill) => {
        const category = skill.category || 'دیگر';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(skill);
        return categories;
    }, {});
});

// Languages by proficiency virtual
resumeSchema.virtual('languagesByProficiency').get(function () {
    if (!this.languages) return {};

    return this.languages.reduce((proficiencies, language) => {
        const proficiency = language.proficiency || 'متوسط';
        if (!proficiencies[proficiency]) {
            proficiencies[proficiency] = [];
        }
        proficiencies[proficiency].push(language);
        return proficiencies;
    }, {});
});

// Public URL virtual
resumeSchema.virtual('publicUrl').get(function () {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return `${baseUrl}/resume/${this.shortUrl}`;
});

// QR Code Image URL virtual
resumeSchema.virtual('qrCodeImageUrl').get(function () {
    if (this.qrCode && this.qrCode.data) {
        return this.qrCode.data;
    }
    return null;
});

// QR Code Public URL (Cloudinary)
resumeSchema.virtual('qrCodePublicUrl').get(function () {
    if (this.qrCode && this.qrCode.publicId) {
        return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME || 'your-cloud'}/image/upload/${this.qrCode.publicId}`;
    }
    return null;
});

// QR Code API URL
resumeSchema.virtual('qrCodeApiUrl').get(function () {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    return `${baseUrl}/api/resumes/${this._id}/qr-code`;
});

// QR Code with text URL
resumeSchema.virtual('qrCodeWithTextUrl').get(function () {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    return `${baseUrl}/api/resumes/${this._id}/qr-code-with-text`;
});

// PDF download URL virtual
resumeSchema.virtual('pdfUrl').get(function () {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    return `${baseUrl}/api/resumes/${this._id}/pdf`;
});

// Word download URL virtual
resumeSchema.virtual('wordUrl').get(function () {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    return `${baseUrl}/api/resumes/${this._id}/word`;
});

// JSON export URL virtual
resumeSchema.virtual('jsonUrl').get(function () {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    return `${baseUrl}/api/resumes/${this._id}/json`;
});

// VCard download URL virtual
resumeSchema.virtual('vcardUrl').get(function () {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    return `${baseUrl}/api/resumes/${this._id}/vcard`;
});

// ==================== MIDDLEWARE ====================

// Generate unique code and short URL before saving
resumeSchema.pre('save', async function (next) {
    // Generate unique code if not exists
    if (!this.uniqueCode) {
        this.uniqueCode = await this.generateUniqueCode();
    }

    // Generate short URL if not exists
    if (!this.shortUrl) {
        this.shortUrl = await this.generateShortUrl();
    }

    // Update metadata title if not set
    if (!this.metadata.title) {
        this.metadata.title = `${this.personalInfo.firstName} ${this.personalInfo.lastName} - رزومه`;
    }

    // Set default description if not set
    if (!this.metadata.description && this.personalInfo.summary) {
        this.metadata.description = this.personalInfo.summary.substring(0, 160);
    }

    // Set default keywords if not set
    if (!this.metadata.keywords || this.metadata.keywords.length === 0) {
        const keywords = [
            this.personalInfo.title,
            ...(this.skills ? this.skills.map(skill => skill.name).slice(0, 10) : []),
            ...(this.tags || [])
        ].filter(Boolean);

        this.metadata.keywords = [...new Set(keywords)];
    }

    // Ensure only one default resume per user
    if (this.isDefault) {
        try {
            await mongoose.model('Resume').updateMany(
                { userId: this.userId, _id: { $ne: this._id } },
                { $set: { isDefault: false } }
            );
        } catch (error) {
            console.error('Error updating default resumes:', error);
        }
    }

    // Auto-generate QR code if enabled and not exists
    if (this.settings.showQRCode && !this.qrCode.data && this.isPublic) {
        try {
            await this.generateQRCode();
        } catch (error) {
            console.error('Error auto-generating QR code:', error);
        }
    }

    next();
});

// ==================== METHODS ====================

// Generate unique code
resumeSchema.methods.generateUniqueCode = async function () {
    const generateCode = () => {
        // Format: CV-XXXX-XXXX (CV = Curriculum Vitae)
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'CV-';
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
        const doc = await mongoose.model('Resume').findOne({ uniqueCode: code });
        exists = !!doc;
        if (exists) {
            code = generateCode();
            attempts++;
        }
    }

    return code;
};

// Generate short URL
resumeSchema.methods.generateShortUrl = async function () {
    const generateSlug = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let slug = 'cv-';
        for (let i = 0; i < 8; i++) {
            slug += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return slug;
    };

    let slug = generateSlug();
    let exists = true;
    let attempts = 0;

    while (exists && attempts < 10) {
        const doc = await mongoose.model('Resume').findOne({ shortUrl: slug });
        exists = !!doc;
        if (exists) {
            slug = generateSlug();
            attempts++;
        }
    }

    return slug;
};

// Generate QR Code data text
resumeSchema.methods.getQrCodeDataText = function () {
    const resumeUrl = this.publicUrl;
    const contactInfo = `
👤 ${this.personalInfo.firstName} ${this.personalInfo.lastName}
📋 ${this.personalInfo.title || 'متخصص'}

📞 ${this.personalInfo.phone}
📧 ${this.personalInfo.email}

${this.personalInfo.address.city ? `📍 ${this.personalInfo.address.city}` : ''}

📝 ${this.personalInfo.summary ? this.personalInfo.summary.substring(0, 100) + '...' : ''}

برای مشاهده رزومه کامل اسکن کنید یا به لینک زیر مراجعه کنید:
${resumeUrl}

🔗 کد رزومه: ${this.uniqueCode}
📅 به‌روزرسانی: ${this.updatedAt.toLocaleDateString('fa-IR')}
    `.trim();

    return contactInfo;
};

// Generate QR Code
resumeSchema.methods.generateQRCode = async function (options = {}) {
    const QRCode = require('qrcode');

    // Merge options with default config
    const qrOptions = {
        errorCorrectionLevel: this.qrCodeConfig.errorCorrectionLevel,
        type: 'image/png',
        quality: 0.92,
        margin: this.qrCodeConfig.margin,
        width: options.size || this.qrCodeConfig.size,
        color: {
            dark: options.foregroundColor || this.qrCodeConfig.foregroundColor,
            light: options.backgroundColor || this.qrCodeConfig.backgroundColor
        },
        ...options
    };

    // Generate QR code text
    const qrCodeText = options.text || this.getQrCodeDataText();

    // Generate QR code image
    const qrCodeDataURL = await QRCode.toDataURL(qrCodeText, qrOptions);

    // Update resume with QR code data
    this.qrCode = {
        data: qrCodeDataURL,
        qrCodeText: qrCodeText,
        lastUpdated: new Date(),
        version: (this.qrCode?.version || 0) + 1,
        scans: this.qrCode?.scans || 0
    };

    // Save to database
    await this.save();

    // Upload to Cloudinary if configured
    if (process.env.CLOUDINARY_CLOUD_NAME) {
        try {
            const cloudinary = require('cloudinary').v2;
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });

            const uploadResult = await cloudinary.uploader.upload(qrCodeDataURL, {
                folder: 'resumes/qr-codes',
                public_id: `qr_${this._id}_v${this.qrCode.version}`,
                overwrite: true,
                resource_type: 'image'
            });

            this.qrCode.publicId = uploadResult.public_id;
            await this.save();
        } catch (cloudinaryError) {
            console.error('Cloudinary upload error:', cloudinaryError);
        }
    }

    return {
        qrCodeUrl: qrCodeDataURL,
        qrCodeText: qrCodeText,
        publicUrl: this.publicUrl,
        shortUrl: this.shortUrl,
        uniqueCode: this.uniqueCode,
        version: this.qrCode.version
    };
};

// Increment QR code scans
resumeSchema.methods.incrementQrScans = async function () {
    this.qrCode.scans += 1;
    this.qrCode.lastScanned = new Date();
    await this.save();
};

// Increment views
resumeSchema.methods.incrementViews = async function () {
    this.views += 1;
    this.lastViewed = new Date();
    await this.save();
};

// Increment downloads
resumeSchema.methods.incrementDownloads = async function () {
    this.downloads += 1;
    await this.save();
};

// Increment shares
resumeSchema.methods.incrementShares = async function () {
    this.shares += 1;
    await this.save();
};

// Export as JSON
resumeSchema.methods.exportAsJson = function () {
    const exportData = {
        id: this._id,
        uniqueCode: this.uniqueCode,
        shortUrl: this.shortUrl,
        personalInfo: this.personalInfo,
        profileImage: this.profileImage,
        education: this.education,
        experience: this.experience,
        projects: this.projects,
        skills: this.skills,
        languages: this.languages,
        certifications: this.certifications,
        publications: this.publications,
        awards: this.awards,
        volunteerWork: this.volunteerWork,
        hobbies: this.hobbies,
        references: this.references,
        targetJob: this.targetJob,
        metadata: this.metadata,
        settings: this.settings,
        qrCodeConfig: this.qrCodeConfig,
        qrCode: {
            hasQRCode: !!this.qrCode.data,
            version: this.qrCode.version,
            scans: this.qrCode.scans,
            lastUpdated: this.qrCode.lastUpdated
        },
        stats: {
            views: this.views,
            downloads: this.downloads,
            shares: this.shares,
            totalExperienceYears: this.totalExperienceYears
        },
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        publicUrl: this.publicUrl,
        qrCodeUrl: this.qrCodeApiUrl,
        pdfUrl: this.pdfUrl,
        wordUrl: this.wordUrl,
        jsonUrl: this.jsonUrl,
        vcardUrl: this.vcardUrl
    };

    return JSON.stringify(exportData, null, 2);
};

// Generate vCard
resumeSchema.methods.generateVCard = function () {
    const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${this.personalInfo.firstName} ${this.personalInfo.lastName}`,
        `N:${this.personalInfo.lastName};${this.personalInfo.firstName};;;`,
        `TITLE:${this.personalInfo.title || ''}`,
        `TEL;TYPE=WORK,VOICE:${this.personalInfo.phone}`,
        `EMAIL:${this.personalInfo.email}`
    ];

    if (this.personalInfo.alternatePhone) {
        vcard.push(`TEL;TYPE=HOME,VOICE:${this.personalInfo.alternatePhone}`);
    }

    if (this.personalInfo.website) {
        vcard.push(`URL:${this.personalInfo.website}`);
    }

    if (this.personalInfo.linkedin) {
        vcard.push(`URL;TYPE=LINKEDIN:${this.personalInfo.linkedin}`);
    }

    if (this.personalInfo.github) {
        vcard.push(`URL;TYPE=GITHUB:${this.personalInfo.github}`);
    }

    if (this.personalInfo.address && this.personalInfo.address.fullAddress) {
        vcard.push(`ADR:;;${this.personalInfo.address.fullAddress};${this.personalInfo.address.city || ''};${this.personalInfo.address.province || ''};;`);
    }

    if (this.personalInfo.summary) {
        vcard.push(`NOTE:${this.personalInfo.summary.substring(0, 200)}`);
    }

    vcard.push(`PHOTO;VALUE=URL:${this.profileImage.url || ''}`);
    vcard.push(`X-RESUME-URL:${this.publicUrl}`);
    vcard.push(`X-RESUME-CODE:${this.uniqueCode}`);

    vcard.push('END:VCARD');

    return vcard.join('\n');
};

// Check password
resumeSchema.methods.checkPassword = function (password) {
    if (!this.privacy.passwordProtected || !this.privacy.password) {
        return true;
    }
    return this.privacy.password === password;
};

// Clone resume
resumeSchema.methods.clone = async function (userId, options = {}) {
    const resumeData = this.toObject();

    // Remove unwanted fields
    delete resumeData._id;
    delete resumeData.__v;
    delete resumeData.shortUrl;
    delete resumeData.uniqueCode;
    delete resumeData.qrCode;
    delete resumeData.views;
    delete resumeData.downloads;
    delete resumeData.shares;
    delete resumeData.isDefault;
    delete resumeData.createdAt;
    delete resumeData.updatedAt;
    delete resumeData.createdByIp;
    delete resumeData.updatedByIp;
    delete resumeData.lastViewed;
    delete resumeData.version;
    delete resumeData.changeLog;

    // Update user ID
    resumeData.userId = userId;

    // Update title if provided
    if (options.title) {
        resumeData.metadata.title = options.title;
    } else {
        resumeData.metadata.title = `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - رزومه (کپی)`;
    }

    // Set parent resume ID
    resumeData.parentResumeId = this._id;

    // Create new resume
    const Resume = mongoose.model('Resume');
    const newResume = await Resume.create(resumeData);

    return newResume;
};

// Get resume statistics
resumeSchema.methods.getStats = function () {
    return {
        totalExperienceYears: this.totalExperienceYears,
        totalEducation: this.education ? this.education.length : 0,
        totalExperience: this.experience ? this.experience.length : 0,
        totalProjects: this.projects ? this.projects.length : 0,
        totalSkills: this.skills ? this.skills.length : 0,
        totalCertifications: this.certifications ? this.certifications.length : 0,
        totalLanguages: this.languages ? this.languages.length : 0,
        views: this.views,
        downloads: this.downloads,
        shares: this.shares,
        qrScans: this.qrCode?.scans || 0
    };
};

// Get QR code analytics
resumeSchema.methods.getQrAnalytics = function () {
    return {
        qrCode: {
            hasQRCode: !!this.qrCode.data,
            version: this.qrCode.version,
            lastUpdated: this.qrCode.lastUpdated,
            scans: this.qrCode.scans,
            lastScanned: this.qrCode.lastScanned
        },
        scanRate: this.views > 0 ? ((this.qrCode.scans / this.views) * 100).toFixed(2) + '%' : '0%',
        qrCodeUrl: this.qrCodeApiUrl,
        qrCodeWithTextUrl: this.qrCodeWithTextUrl,
        config: this.qrCodeConfig
    };
};

// Update QR code configuration
resumeSchema.methods.updateQrConfig = async function (config) {
    this.qrCodeConfig = {
        ...this.qrCodeConfig,
        ...config
    };

    await this.save();

    // Regenerate QR code if config changed significantly
    if (config.size || config.foregroundColor || config.backgroundColor) {
        await this.generateQRCode(config);
    }

    return this.qrCodeConfig;
};

// ==================== STATIC METHODS ====================

// Find by short URL
resumeSchema.statics.findByShortUrl = async function (shortUrl, options = {}) {
    const query = this.findOne({ shortUrl, isActive: true });

    if (options.checkPrivacy && options.password) {
        // Check password if required
        const resume = await query.select('+privacy.password');
        if (resume && resume.privacy.passwordProtected) {
            if (!resume.checkPassword(options.password)) {
                throw new Error('رمز عبور اشتباه است');
            }
        }
        return resume;
    }

    return query;
};

// Find by unique code
resumeSchema.statics.findByUniqueCode = async function (uniqueCode) {
    return this.findOne({ uniqueCode, isActive: true });
};

// Search resumes
resumeSchema.statics.search = async function (searchParams) {
    const {
        query,
        location,
        skills,
        minExperience,
        educationLevel,
        jobType,
        page = 1,
        limit = 10,
        sortBy = 'updatedAt',
        sortOrder = 'desc'
    } = searchParams;

    const filter = {
        isActive: true,
        isPublic: true
    };

    // Text search
    if (query) {
        filter.$text = { $search: query };
    }

    // Location filter
    if (location) {
        filter.$or = [
            { 'personalInfo.address.city': new RegExp(location, 'i') },
            { 'personalInfo.address.province': new RegExp(location, 'i') },
            { 'targetJob.location': new RegExp(location, 'i') }
        ];
    }

    // Skills filter
    if (skills) {
        const skillArray = skills.split(',').map(skill => skill.trim());
        filter['skills.name'] = { $in: skillArray };
    }

    // Experience filter
    if (minExperience) {
        // Filter by total experience years
        // This requires a more complex aggregation
    }

    // Education level filter
    if (educationLevel) {
        filter['education.degree'] = new RegExp(educationLevel, 'i');
    }

    // Job type filter
    if (jobType) {
        filter['targetJob.jobType'] = jobType;
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
            .populate('userId', 'name'),
        this.countDocuments(filter)
    ]);

    return {
        results,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
};

// Get QR code statistics
resumeSchema.statics.getQrStats = async function (userId = null) {
    const match = userId ? { userId } : {};

    const stats = await this.aggregate([
        { $match: match },
        {
            $group: {
                _id: null,
                totalWithQR: { $sum: { $cond: [{ $ne: ['$qrCode.data', null] }, 1, 0] } },
                totalScans: { $sum: '$qrCode.scans' },
                avgScansPerQR: { $avg: '$qrCode.scans' },
                mostScanned: { $max: '$qrCode.scans' }
            }
        },
        {
            $project: {
                _id: 0,
                totalWithQR: 1,
                totalScans: 1,
                avgScansPerQR: { $round: ['$avgScansPerQR', 2] },
                mostScanned: 1
            }
        }
    ]);

    // Get top resumes by QR scans
    const topByScans = await this.find(match)
        .sort({ 'qrCode.scans': -1 })
        .limit(5)
        .select('personalInfo firstName lastName qrCode.scans metadata.title');

    return {
        ...(stats[0] || {
            totalWithQR: 0,
            totalScans: 0,
            avgScansPerQR: 0,
            mostScanned: 0
        }),
        topByScans
    };
};

// Get statistics
resumeSchema.statics.getStats = async function (userId = null) {
    const match = userId ? { userId } : {};

    const stats = await this.aggregate([
        { $match: match },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                active: { $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] } },
                public: { $sum: { $cond: [{ $eq: ['$isPublic', true] }, 1, 0] } },
                default: { $sum: { $cond: [{ $eq: ['$isDefault', true] }, 1, 0] } },
                totalViews: { $sum: '$views' },
                totalDownloads: { $sum: '$downloads' },
                totalShares: { $sum: '$shares' },
                totalQrScans: { $sum: '$qrCode.scans' }
            }
        },
        {
            $project: {
                _id: 0,
                total: 1,
                active: 1,
                public: 1,
                default: 1,
                totalViews: 1,
                totalDownloads: 1,
                totalShares: 1,
                totalQrScans: 1
            }
        }
    ]);

    // Get template distribution
    const templateDistribution = await this.aggregate([
        { $match: match },
        { $group: { _id: '$settings.template', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);

    // Get recent activity
    const recentActivity = await this.aggregate([
        { $match: match },
        { $sort: { updatedAt: -1 } },
        { $limit: 5 },
        {
            $project: {
                'personalInfo.firstName': 1,
                'personalInfo.lastName': 1,
                metadata: 1,
                views: 1,
                'qrCode.scans': 1,
                updatedAt: 1
            }
        }
    ]);

    return {
        ...(stats[0] || {
            total: 0,
            active: 0,
            public: 0,
            default: 0,
            totalViews: 0,
            totalDownloads: 0,
            totalShares: 0,
            totalQrScans: 0
        }),
        templateDistribution,
        recentActivity
    };
};

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;