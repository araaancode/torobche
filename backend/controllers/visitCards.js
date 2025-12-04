// controllers/visitCardController.js
const VisitCard = require('../models/VisitCard');
const VisitTemplate = require('../models/VisitTemplate');
const mongoose = require('mongoose');

// ================== متدهای کنترلر ==================

// دریافت همه کارت‌ها
exports.getAllCards = async (req, res) => {
    try {
        const cards = await VisitCard.find()
            .populate('template', 'title doctorName specialty') // فقط فیلدهای مورد نیاز
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: cards.length,
            data: cards
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت کارت‌ها',
            error: error.message
        });
    }
};

// دریافت یک کارت
exports.getCard = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت نامعتبر است'
            });
        }

        const card = await VisitCard.findById(id)
            .populate('template', 'title doctorName specialty phoneNumbers address city');

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت یافت نشد'
            });
        }

        // افزایش تعداد بازدید
        card.viewCount += 1;
        await card.save();

        res.status(200).json({
            success: true,
            data: card
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت کارت',
            error: error.message
        });
    }
};

// ایجاد کارت از قالب
exports.createCardFromTemplate = async (req, res) => {
    try {
        const { templateId, title, ownerId, doctorInfo } = req.body;

        // اعتبارسنجی
        if (!templateId || !title || !ownerId) {
            return res.status(400).json({
                success: false,
                message: 'فیلدهای اجباری پر نشده‌اند',
                requiredFields: ['templateId', 'title', 'ownerId']
            });
        }

        // بررسی وجود قالب
        const template = await VisitTemplate.findById(templateId);
        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب یافت نشد'
            });
        }

        // ایجاد کارت
        const cardData = {
            template: templateId,
            title,
            ownerId,
            doctorInfo: doctorInfo || {
                name: template.doctorName,
                specialty: template.specialty,
                phoneNumbers: template.phoneNumbers,
                address: template.address,
                city: template.city
            }
        };

        const card = await VisitCard.create(cardData);

        // آپدیت قالب (اضافه کردن کارت به لیست قالب)
        await VisitTemplate.findByIdAndUpdate(
            templateId,
            { $push: { usedInCards: card._id } }
        );

        res.status(201).json({
            success: true,
            message: 'کارت با موفقیت ایجاد شد',
            data: card
        });

    } catch (error) {
        console.error('خطا در ایجاد کارت:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد کارت',
            error: error.message
        });
    }
};

// به‌روزرسانی کارت
exports.updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت نامعتبر است'
            });
        }

        const card = await VisitCard.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('template', 'title');

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت یافت نشد'
            });
        }

        res.status(200).json({
            success: true,
            message: 'کارت با موفقیت به‌روزرسانی شد',
            data: card
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در به‌روزرسانی کارت',
            error: error.message
        });
    }
};

// حذف کارت
exports.deleteCard = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت نامعتبر است'
            });
        }

        const card = await VisitCard.findByIdAndDelete(id);

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت یافت نشد'
            });
        }

        // حذف کارت از قالب
        if (card.template) {
            await VisitTemplate.findByIdAndUpdate(
                card.template,
                { $pull: { usedInCards: card._id } }
            );
        }

        res.status(200).json({
            success: true,
            message: 'کارت با موفقیت حذف شد',
            data: { id: card._id, title: card.title }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در حذف کارت',
            error: error.message
        });
    }
};

// دریافت کارت‌های یک قالب
exports.getCardsByTemplate = async (req, res) => {
    try {
        const { templateId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(templateId)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه قالب نامعتبر است'
            });
        }

        const cards = await VisitCard.find({ template: templateId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: cards.length,
            data: cards
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت کارت‌های قالب',
            error: error.message
        });
    }
};

// فعال/غیرفعال کردن کارت
exports.toggleCardStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت نامعتبر است'
            });
        }

        const card = await VisitCard.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت یافت نشد'
            });
        }

        res.status(200).json({
            success: true,
            message: `کارت ${isActive ? 'فعال' : 'غیرفعال'} شد`,
            data: card
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'خطا در تغییر وضعیت کارت',
            error: error.message
        });
    }
};