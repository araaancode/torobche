// const mongoose = require("mongoose");

// const visitCardSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: [true, "عنوان کارت الزامی است"],
//         trim: true,
//         minlength: [2, "عنوان باید حداقل ۲ کاراکتر باشد"],
//         maxlength: [100, "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد"]
//     },

//     template: [{
//         type: mongoose.Schema.Types.ObjectId,
//         required: [true, "تمپلیت کارت الزامی است"],
//         ref: "VisitTemplate"
//     }],

//     coverImage: {
//         type: String,
//         required: [true, "تصویر کاور الزامی است"]
//     },

//     bussinessName: {
//         type: String,
//         required: [true, "نام کسب‌وکار الزامی است"],
//         trim: true,
//         minlength: [2, "نام کسب‌وکار باید حداقل ۲ کاراکتر باشد"],
//         maxlength: [200, "نام کسب‌وکار نباید بیشتر از ۲۰۰ کاراکتر باشد"]
//     },

//     qrcode: {
//         type: String,
//         default: null
//     },

//     specialities: [{
//         type: String,
//         trim: true,
//         maxlength: [50, "هر تخصص نباید بیشتر از ۵۰ کاراکتر باشد"]
//     }],

//     uniqueCode: {
//         type: String,
//         unique: true,
//         sparse: true,
//         trim: true
//     },


// }, {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
// });


// // Indexes
// visitCardSchema.index({ bussinessName: 1 });
// visitCardSchema.index({ createdBy: 1 });
// visitCardSchema.index({ isActive: 1 });

// /*  
// |--------------------------------------------------------------------------
// | Middleware قبل از ذخیره
// |--------------------------------------------------------------------------
// */
// visitCardSchema.pre("save", async function () {

//     // تولید uniqueCode اگر وجود ندارد
//     if (!this.uniqueCode) {
//         this.uniqueCode = `VC-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
//     }

//     // تولید shareableLink اگر وجود ندارد
//     if (!this.shareableLink) {
//         this.shareableLink = `share-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
//     }

//     // حذف موارد تکراری در specialities
//     if (this.specialities && this.specialities.length > 0) {
//         this.specialities = [...new Set(this.specialities.map(s => s.trim()))];
//     }
// });


// const VisitCard = mongoose.model("VisitCard", visitCardSchema);

// module.exports = VisitCard;


// models/VisitCard.js
const mongoose = require('mongoose');

const visitCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'عنوان کارت ویزیت الزامی است'],
        trim: true
    },

    bussinessName: {
        type: String,
        required: [true, 'نام کسب‌وکار الزامی است'],
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    // اطلاعات پزشک
    doctorName: {
        type: String,
        required: [true, 'نام پزشک الزامی است'],
        trim: true
    },

    medicalDegree: {
        type: String,
        required: [true, 'مدرک پزشکی الزامی است'],
        trim: true
    },

    specialty: {
        type: String,
        required: [true, 'تخصص الزامی است'],
        trim: true
    },

    subSpecialty: {
        type: String,
        trim: true
    },

    medicalCouncilNumber: {
        type: String,
        trim: true
    },

    phone: {
        type: String,
        required: [true, 'تلفن تماس الزامی است'],
        trim: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true
    },

    website: {
        type: String,
        trim: true
    },

    address: {
        type: String,
        trim: true
    },

    clinicName: {
        type: String,
        trim: true
    },

    clinicPhone: {
        type: String,
        trim: true
    },

    // آرایه تخصص‌ها
    specialities: [{
        type: String,
        trim: true
    }],

    // آرایه خدمات (برای توسعه آینده)
    services: [{
        type: String,
        trim: true
    }],

    // تحصیلات (برای توسعه آینده)
    education: [{
        degree: String,
        university: String,
        year: String
    }],

    // سوابق کاری (برای توسعه آینده)
    experience: [{
        position: String,
        hospital: String,
        years: String
    }],

    // ساعت کاری (برای توسعه آینده)
    workingHours: {
        saturday: String,
        sunday: String,
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String
    },

    // فایل‌ها
    icon: {
        type: String,
        default: '/uploads/default/visitCard-icon.png'
    },

    coverImage: {
        type: String,
        default: '/uploads/default/visitCard-cover.jpg'
    },

    qrcode: {
        type: String
    },

    // تمپلیت‌ها
    template: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template'
    }],

    // وضعیت
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },

    // کاربر ایجاد کننده
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // آمار بازدید
    views: {
        type: Number,
        default: 0
    },

    // تاریخ‌ها
    publishedAt: {
        type: Date
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ایندکس‌گذاری برای جستجوی بهتر
visitCardSchema.index({ doctorName: 'text', specialty: 'text', medicalDegree: 'text' });
visitCardSchema.index({ status: 1 });
visitCardSchema.index({ createdBy: 1 });
visitCardSchema.index({ specialty: 1 });

// متدهای instance
visitCardSchema.methods.incrementView = async function () {
    this.views += 1;
    await this.save();
};

visitCardSchema.methods.publish = async function () {
    this.status = 'published';
    this.publishedAt = new Date();
    await this.save();
};

// استاتیک متدها
visitCardSchema.statics.findBySpecialty = function (specialty) {
    return this.find({ specialty: new RegExp(specialty, 'i'), status: 'published' });
};

visitCardSchema.statics.findByDoctor = function (doctorName) {
    return this.find({
        doctorName: new RegExp(doctorName, 'i'),
        status: 'published'
    });
};

visitCardSchema.statics.getStats = async function (userId) {
    const stats = await this.aggregate([
        {
            $match: { createdBy: mongoose.Types.ObjectId(userId) }
        },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
                totalViews: { $sum: '$views' }
            }
        }
    ]);

    return stats;
};

module.exports = mongoose.model('VisitCard', visitCardSchema);