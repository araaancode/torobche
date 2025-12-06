const mongoose = require('mongoose');

const businessTemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'نام قالب الزامی است'],
        trim: true,
        maxlength: [100, 'نام قالب نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد']
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
    defaultFields: {
        title: {
            type: String,
            default: ''
        },
        companyName: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        services: [{
            type: String,
            trim: true
        }],
        workingHours: {
            saturday: { from: String, to: String },
            sunday: { from: String, to: String },
            monday: { from: String, to: String },
            tuesday: { from: String, to: String },
            wednesday: { from: String, to: String },
            thursday: { from: String, to: String },
            friday: { from: String, to: String }
        },
        socialMedia: {
            instagram: String,
            telegram: String,
            whatsapp: String,
            website: String
        },
        images: [{
            url: String,
            alt: String,
            isMain: Boolean
        }],
        tags: [{
            type: String,
            trim: true
        }]
    },
    // Template styling and configuration
    templateConfig: {
        colorScheme: {
            primary: {
                type: String,
                default: '#1a237e'
            },
            secondary: {
                type: String,
                default: '#ff9800'
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
        layout: {
            type: String,
            enum: ['modern', 'classic', 'minimal', 'professional'],
            default: 'modern'
        },
        fontFamily: {
            type: String,
            default: 'Vazir, sans-serif'
        },
        logoPlacement: {
            type: String,
            enum: ['top-left', 'top-center', 'top-right', 'none'],
            default: 'top-center'
        },
        showQRCode: {
            type: Boolean,
            default: true
        },
        showMap: {
            type: Boolean,
            default: true
        },
        showSocialMedia: {
            type: Boolean,
            default: true
        }
    },
    // Template sections configuration
    sections: [{
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['header', 'services', 'contact', 'gallery', 'map', 'social', 'testimonials'],
            required: true
        },
        isVisible: {
            type: Boolean,
            default: true
        },
        order: {
            type: Number,
            default: 0
        },
        content: mongoose.Schema.Types.Mixed // Flexible content based on section type
    }],
    // Sample content for preview
    sampleContent: {
        ownerName: {
            type: String,
            default: 'نام صاحب کسب‌وکار'
        },
        phoneNumbers: [{
            type: String,
            default: '09123456789'
        }],
        address: {
            city: {
                type: String,
                default: 'شهر شما'
            },
            fullAddress: {
                type: String,
                default: 'آدرس کامل کسب‌وکار'
            }
        }
    },
    // Template metadata
    isActive: {
        type: Boolean,
        default: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ['free', 'standard', 'premium', 'custom'],
        default: 'free'
    },
    version: {
        type: String,
        default: '1.0.0'
    },
    thumbnail: {
        url: String,
        alt: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    usageCount: {
        type: Number,
        default: 0
    },
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
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
businessTemplateSchema.index({ businessType: 1, isActive: 1 });
businessTemplateSchema.index({ category: 1, isActive: 1 });
businessTemplateSchema.index({ isPremium: 1 });
businessTemplateSchema.index({ createdBy: 1 });

// Method to increment usage count
businessTemplateSchema.methods.incrementUsage = async function () {
    this.usageCount += 1;
    await this.save();
};

// Method to update rating
businessTemplateSchema.methods.updateRating = async function (newRating) {
    const totalRating = this.rating.average * this.rating.count + newRating;
    this.rating.count += 1;
    this.rating.average = totalRating / this.rating.count;
    await this.save();
};

// Virtual for preview URL
businessTemplateSchema.virtual('previewUrl').get(function () {
    return `${process.env.BASE_URL}/templates/${this._id}/preview`;
});

const BusinessTemplate = mongoose.model('BusinessTemplate', businessTemplateSchema);

module.exports = BusinessTemplate;