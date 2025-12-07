const mongoose = require("mongoose");

const visitCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "عنوان کارت الزامی است"],
        trim: true,
        minlength: [2, "عنوان باید حداقل ۲ کاراکتر باشد"],
        maxlength: [100, "عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد"]
    },

    template: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "تمپلیت کارت الزامی است"],
        ref: "VisitTemplate"
    }],

    coverImage: {
        type: String,
        required: [true, "تصویر کاور الزامی است"]
    },

    bussinessName: {
        type: String,
        required: [true, "نام کسب‌وکار الزامی است"],
        trim: true,
        minlength: [2, "نام کسب‌وکار باید حداقل ۲ کاراکتر باشد"],
        maxlength: [200, "نام کسب‌وکار نباید بیشتر از ۲۰۰ کاراکتر باشد"]
    },

    qrcode: {
        type: String,
        default: null
    },

    specialities: [{
        type: String,
        trim: true,
        maxlength: [50, "هر تخصص نباید بیشتر از ۵۰ کاراکتر باشد"]
    }],

    uniqueCode: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },

    // فیلد مشکل‌دار اصلاح شد
    shareableLink: {
        type: String,
        unique: true,
        sparse: true,   // اجازه می‌دهد چند null داشته باشیم
        trim: true,
        default: null
    },

    isActive: {
        type: Boolean,
        default: true
    },

    viewCount: {
        type: Number,
        default: 0,
        min: 0
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "شناسه ایجادکننده الزامی است"]
    },

    metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// Indexes
visitCardSchema.index({ bussinessName: 1 });
visitCardSchema.index({ createdBy: 1 });
visitCardSchema.index({ isActive: 1 });

/*  
|--------------------------------------------------------------------------
| Middleware قبل از ذخیره
|--------------------------------------------------------------------------
*/
visitCardSchema.pre("save", async function () {

    // تولید uniqueCode اگر وجود ندارد
    if (!this.uniqueCode) {
        this.uniqueCode = `VC-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    }

    // تولید shareableLink اگر وجود ندارد
    if (!this.shareableLink) {
        this.shareableLink = `share-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    }

    // حذف موارد تکراری در specialities
    if (this.specialities && this.specialities.length > 0) {
        this.specialities = [...new Set(this.specialities.map(s => s.trim()))];
    }
});


const VisitCard = mongoose.model("VisitCard", visitCardSchema);

module.exports = VisitCard;
