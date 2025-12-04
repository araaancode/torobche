// models/VisitCard.js
const mongoose = require("mongoose");

const visitCardSchema = new mongoose.Schema({
    // ارتباط با قالب
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisitTemplate',
        required: true
    },

    // اطلاعات اصلی
    title: {
        type: String,
        required: true,
        trim: true
    },

    // مالک کارت
    ownerId: {
        type: String,
        required: true
    },

    // اطلاعات پزشک (ممکن است با قالب متفاوت باشد)
    doctorInfo: {
        name: String,
        specialty: String,
        phoneNumbers: [String],
        address: String,
        city: String
    },

    // تصاویر
    logo: String,
    profileImage: String,

    // وضعیت
    isActive: {
        type: Boolean,
        default: true
    },

    // آمار
    viewCount: {
        type: Number,
        default: 0
    },

    // تاریخ‌ها
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

});

const VisitCard = mongoose.model('VisitCard', visitCardSchema);

module.exports = VisitCard;