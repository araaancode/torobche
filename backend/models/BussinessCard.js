const mongoose = require('mongoose');

const businessCardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    address: {
        province: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        street: {
            type: String,
            trim: true
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
                index: '2dsphere'
            }
        }
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'توضیحات نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد']
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
        isMain: {
            type: Boolean,
            default: false
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
businessCardSchema.index({ businessType: 1 });
businessCardSchema.index({ 'address.location': '2dsphere' });
businessCardSchema.index({ tags: 1 });
businessCardSchema.index({ isActive: 1, isVerified: 1 });

// Virtual for full name
businessCardSchema.virtual('fullName').get(function () {
    return `${this.ownerName} - ${this.companyName || this.title}`;
});

// Method to increment views
businessCardSchema.methods.incrementViews = async function () {
    this.views += 1;
    await this.save();
};

const BusinessCard = mongoose.model('BusinessCard', businessCardSchema);

module.exports = BusinessCard;