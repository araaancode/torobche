const Template = require('../models/Template');
const fs = require('fs').promises;
const path = require('path');

// ایمپورت کانفیگ مالتر
const { upload } = require('../config/multerConfig');

// تابع کمکی برای حذف فایل عکس قدیمی
const deleteOldImage = async (imagePath) => {
    try {
        if (imagePath && !imagePath.includes('default-')) {
            const fullPath = path.join(__dirname, '..', imagePath);
            await fs.unlink(fullPath);
        }
    } catch (error) {
        console.log('خطا در حذف عکس قدیمی:', error.message);
        // خطا رو پرتاب نکنیم، فقط لاگ کنیم
    }
};

// @description =>> دریافت تمام قالب‌ها
// @http verb =>> GET
// @access =>> عمومی
// @route =>> /api/templates
exports.getTemplates = async (req, res) => {
    try {
        const templates = await Template.find()
            .populate('user', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'قالب‌ها با موفقیت دریافت شدند',
            count: templates.length,
            data: templates
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت قالب‌ها'
        });
    }
};

// @description =>> دریافت یک قالب
// @http verb =>> GET
// @access =>> عمومی
// @route =>> /api/templates/:id
exports.getTemplate = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id)
            .populate('user', 'username email');

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب مورد نظر یافت نشد'
            });
        }

        res.status(200).json({
            success: true,
            message: 'قالب با موفقیت دریافت شد',
            data: template
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت قالب'
        });
    }
};

// @description =>> ایجاد قالب جدید (با آپلود عکس)
// @http verb =>> POST
// @access =>> خصوصی
// @route =>> /api/templates
exports.createTemplate = async (req, res) => {
    try {
        const { title, description, price, colorPallete, user } = req.body;

        // بررسی آیا عکس آپلود شده است
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'لطفا یک تصویر آپلود کنید'
            });
        }

        // بررسی فیلدهای الزامی
        if (!title || !description || !price) {
            // حذف عکس آپلود شده چون داده‌ها ناقص هستند
            if (req.file) {
                await deleteOldImage(`uploads/templates/${req.file.filename}`);
            }
            return res.status(400).json({
                success: false,
                message: 'لطفا تمام فیلدهای الزامی را پر کنید (عنوان، توضیحات، قیمت)'
            });
        }

        // پارس کردن رنگ‌ها
        let colors = colorPallete;
        if (typeof colorPallete === 'string') {
            try {
                colors = JSON.parse(colorPallete);
            } catch (e) {
                colors = colorPallete.split(',').map(color => color.trim());
            }
        }

        // ایجاد قالب جدید
        const template = await Template.create({
            title,
            description,
            price,
            image: `uploads/templates/${req.file.filename}`,
            colorPallete: colors || [],
            user: req.userId || user
        });

        res.status(201).json({
            success: true,
            message: 'قالب جدید با موفقیت ایجاد شد',
            data: template
        });
    } catch (error) {
        console.error(error);

        // حذف عکس آپلود شده در صورت خطا
        if (req.file) {
            await deleteOldImage(`uploads/templates/${req.file.filename}`);
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'خطای اعتبارسنجی: ' + messages.join(', ')
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'قالبی با این عنوان از قبل وجود دارد'
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در ایجاد قالب جدید'
        });
    }
};

// @description =>> بروزرسانی قالب
// @http verb =>> PUT
// @access =>> خصوصی (ادمین)
// @route =>> /api/templates/:id/update
exports.updateTemplate = async (req, res) => {
    try {
        const { title, description, price, colorPallete } = req.body;
        const templateId = req.params.id;

        // یافتن قالب
        let template = await Template.findById(templateId);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب مورد نظر یافت نشد'
            });
        }

        // آماده‌سازی داده‌های بروزرسانی
        let updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (price) updateData.price = price;

        // پارس کردن رنگ‌ها اگر ارسال شده باشند
        if (colorPallete) {
            let colors = colorPallete;
            if (typeof colorPallete === 'string') {
                try {
                    colors = JSON.parse(colorPallete);
                } catch (e) {
                    colors = colorPallete.split(',').map(color => color.trim());
                }
            }
            updateData.colorPallete = colors;
        }

        // بروزرسانی قالب
        template = await Template.findByIdAndUpdate(
            templateId,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'قالب با موفقیت بروزرسانی شد',
            data: template
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'خطای اعتبارسنجی: ' + messages.join(', ')
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'قالبی با این عنوان از قبل وجود دارد'
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در بروزرسانی قالب'
        });
    }
};

// @description =>> بروزرسانی عکس قالب (با مالتر)
// @http verb =>> PUT
// @access =>> خصوصی (ادمین)
// @route =>> /api/templates/:id/update-image
exports.updateTemplateImage = async (req, res) => {
    try {
        const templateId = req.params.id;

        // بررسی آیا عکس جدید آپلود شده است
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'لطفا یک تصویر جدید آپلود کنید'
            });
        }

        // یافتن قالب
        const template = await Template.findById(templateId);

        if (!template) {
            // حذف عکس آپلود شده چون قالب وجود ندارد
            await deleteOldImage(`uploads/templates/${req.file.filename}`);
            return res.status(404).json({
                success: false,
                message: 'قالب مورد نظر یافت نشد'
            });
        }

        // ذخیره مسیر عکس قدیمی برای حذف
        const oldImagePath = template.image;

        // بروزرسانی عکس قالب
        template.image = `uploads/templates/${req.file.filename}`;
        await template.save();

        // حذف فایل عکس قدیمی
        await deleteOldImage(oldImagePath);

        res.status(200).json({
            success: true,
            message: 'عکس قالب با موفقیت بروزرسانی شد',
            data: {
                _id: template._id,
                title: template.title,
                image: template.image
            }
        });
    } catch (error) {
        console.error(error);

        // حذف عکس آپلود شده در صورت خطا
        if (req.file) {
            await deleteOldImage(`uploads/templates/${req.file.filename}`);
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در بروزرسانی عکس قالب'
        });
    }
};

// @description =>> بروزرسانی رنگ‌های قالب
// @http verb =>> PUT
// @access =>> خصوصی (ادمین)
// @route =>> /api/templates/:id/update-colors
exports.updateTemplateColors = async (req, res) => {
    try {
        const { colorPallete } = req.body;
        const templateId = req.params.id;

        if (!colorPallete) {
            return res.status(400).json({
                success: false,
                message: 'لطفا پالت رنگ‌ها را ارسال کنید'
            });
        }

        // پارس کردن رنگ‌ها
        let colors;
        if (typeof colorPallete === 'string') {
            try {
                colors = JSON.parse(colorPallete);
            } catch (e) {
                colors = colorPallete.split(',').map(color => color.trim());
            }
        } else {
            colors = colorPallete;
        }

        // یافتن قالب
        const template = await Template.findById(templateId);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب مورد نظر یافت نشد'
            });
        }

        // بروزرسانی رنگ‌ها
        template.colorPallete = colors;
        await template.save();

        res.status(200).json({
            success: true,
            message: 'رنگ‌های قالب با موفقیت بروزرسانی شد',
            data: {
                _id: template._id,
                title: template.title,
                colorPallete: template.colorPallete
            }
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'خطای اعتبارسنجی: ' + messages.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در بروزرسانی رنگ‌های قالب'
        });
    }
};

// @description =>> حذف قالب
// @http verb =>> DELETE
// @access =>> خصوصی (ادمین)
// @route =>> /api/templates/:id
exports.deleteTemplate = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب مورد نظر یافت نشد'
            });
        }

        // حذف فایل عکس مرتبط
        await deleteOldImage(template.image);

        // حذف قالب از دیتابیس
        await Template.deleteOne({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: 'قالب با موفقیت حذف شد'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در حذف قالب'
        });
    }
};