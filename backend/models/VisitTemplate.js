// models/VisitTemplate.js - نسخه ساده‌تر
const mongoose = require("mongoose");

const visitTemplateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    doctorName: {
        type: String,
        required: true
    },

    specialty: {
        type: String,
        default: "عمومی"
    },

    phoneNumbers: [{
        type: String
    }],

    address: String,
    city: String,

    // تصاویر قالب
    logo: String,
    profileImage: String,

    // وضعیت
    isActive: {
        type: Boolean,
        default: true
    },

    // لیست کارت‌های ساخته شده از این قالب
    usedInCards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisitCard'
    }]

}, {
    timestamps: true
});

const VisitTemplate = mongoose.model('VisitTemplate', visitTemplateSchema);

module.exports = VisitTemplate;