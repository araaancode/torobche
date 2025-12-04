const VisitTemplate = require('../models/VisitTemplate');
const VisitCard = require('../models/VisitCard');
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const fs = require('fs').promises;
const path = require('path');
const { upload } = require('../config/multerConfig');

// Helper functions
const deleteOldFile = async (filePath) => {
    if (filePath && filePath.startsWith('/')) {
        try {
            const fullPath = path.join(process.cwd(), filePath.substring(1));
            await fs.unlink(fullPath);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error(`خطا در حذف فایل: ${filePath}`, error);
            }
        }
    }
};

const formatTemplateResponse = (template, req) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const templateObj = template.toObject ? template.toObject() : template;

    return {
        ...templateObj,
        logo: templateObj.logo ? `${baseUrl}${templateObj.logo}` : null,
        profileImage: templateObj.profileImage ? `${baseUrl}${templateObj.profileImage}` : null,
        backgroundImage: templateObj.backgroundImage ? `${baseUrl}${templateObj.backgroundImage}` : null,
        qrCode: templateObj.qrCode ? `${baseUrl}${templateObj.qrCode}` : null
    };
};

// ================== VISIT TEMPLATE CONTROLLERS ==================

// دریافت تمام قالب‌ها
exports.getAllTemplates = async (req, res) => {
    try {
        const {
            specialty,
            city,
            isActive,
            isPremium,
            search,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        if (specialty) query.specialty = specialty;
        if (city) query.city = city;
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (isPremium !== undefined) query.isPremium = isPremium === 'true';

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { doctorName: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [templates, total] = await Promise.all([
            VisitTemplate.find(query)
                .populate('createdBy', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            VisitTemplate.countDocuments(query)
        ]);

        const templatesWithUrls = templates.map(template =>
            formatTemplateResponse(template, req)
        );

        res.status(200).json({
            success: true,
            count: templates.length,
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            data: templatesWithUrls
        });
    } catch (error) {
        console.error('خطا در دریافت قالب‌ها:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت لیست قالب‌ها',
            error: error.message
        });
    }
};

// دریافت قالب بر اساس ID
exports.getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه قالب نامعتبر است'
            });
        }

        const template = await VisitTemplate.findById(id)
            .populate('createdBy', 'name email phone')
            .populate('usedInCards', 'title uniqueCode');

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب یافت نشد'
            });
        }

        // افزایش تعداد بازدید
        template.viewCount += 1;
        await template.save();

        res.status(200).json({
            success: true,
            data: formatTemplateResponse(template, req)
        });
    } catch (error) {
        console.error('خطا در دریافت قالب:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت قالب',
            error: error.message
        });
    }
};

// ایجاد قالب جدید
exports.createTemplate = async (req, res) => {
    try {
        const {
            title,
            description,
            doctorName,
            specialty,
            degree,
            phoneNumbers,
            address,
            city,
            clinicName,
            services,
            certificates,
            socialMedia,
            templateStyle
        } = req.body;

        // اعتبارسنجی فیلدهای اجباری
        const requiredFields = {
            title,
            description,
            doctorName,
            specialty,
            phoneNumbers,
            address,
            city
        };

        const missingFields = Object.keys(requiredFields)
            .filter(key => !requiredFields[key])
            .map(key => {
                const persianNames = {
                    title: 'عنوان',
                    description: 'توضیحات',
                    doctorName: 'نام پزشک',
                    specialty: 'تخصص',
                    phoneNumbers: 'شماره تلفن',
                    address: 'آدرس',
                    city: 'شهر'
                };
                return persianNames[key];
            });

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'فیلدهای اجباری پر نشده‌اند',
                missingFields
            });
        }

        // پردازش داده‌ها
        const templateData = {
            title,
            description,
            doctorName,
            specialty,
            degree: degree || 'دکترای عمومی',
            phoneNumbers: Array.isArray(phoneNumbers) ? phoneNumbers : [phoneNumbers],
            address,
            city,
            clinicName: clinicName || '',
            createdBy: req.user._id,
            isActive: true
        };

        // پردازش ساعت کاری
        if (req.body.officeHours) {
            try {
                templateData.officeHours = JSON.parse(req.body.officeHours);
            } catch (error) {
                templateData.officeHours = req.body.officeHours;
            }
        }

        // پردازش خدمات
        if (services) {
            templateData.services = Array.isArray(services)
                ? services
                : services.split(',').map(s => s.trim());
        }

        // پردازش مدارک
        if (certificates) {
            try {
                templateData.certificates = JSON.parse(certificates);
            } catch (error) {
                templateData.certificates = certificates;
            }
        }

        // پردازش شبکه‌های اجتماعی
        if (socialMedia) {
            try {
                templateData.socialMedia = JSON.parse(socialMedia);
            } catch (error) {
                templateData.socialMedia = socialMedia;
            }
        }

        // پردازش استایل
        if (templateStyle) {
            try {
                templateData.templateStyle = JSON.parse(templateStyle);
            } catch (error) {
                templateData.templateStyle = templateStyle;
            }
        }

        // پردازش فایل‌های آپلود شده
        if (req.files) {
            if (req.files.logo) {
                templateData.logo = `/uploads/templates/${req.files.logo[0].filename}`;
            }
            if (req.files.profileImage) {
                templateData.profileImage = `/uploads/templates/${req.files.profileImage[0].filename}`;
            }
            if (req.files.backgroundImage) {
                templateData.backgroundImage = `/uploads/templates/${req.files.backgroundImage[0].filename}`;
            }
        }

        // ایجاد قالب
        const template = await VisitTemplate.create(templateData);

        // ایجاد QR Code
        const qrData = JSON.stringify({
            templateId: template._id,
            doctorName: template.doctorName,
            specialty: template.specialty,
            url: `${req.protocol}://${req.get('host')}/visit-template/${template._id}`
        });

        const qrDir = 'uploads/qrcodes/templates';
        await fs.mkdir(qrDir, { recursive: true });

        const qrFilename = `template-${template._id}-${Date.now()}.png`;
        const qrPath = path.join(qrDir, qrFilename);
        const fullQrPath = path.join(process.cwd(), qrPath);

        await QRCode.toFile(fullQrPath, qrData, {
            color: {
                dark: templateData.templateStyle?.primaryColor || '#1a56db',
                light: '#ffffff'
            },
            width: 300,
            margin: 1
        });

        template.qrCode = `/qrcodes/templates/${qrFilename}`;
        await template.save();

        res.status(201).json({
            success: true,
            message: 'قالب با موفقیت ایجاد شد',
            data: formatTemplateResponse(template, req)
        });

    } catch (error) {
        console.error('خطا در ایجاد قالب:', error);

        // پاک‌سازی فایل‌های آپلود شده
        if (req.files) {
            for (const field in req.files) {
                for (const file of req.files[field]) {
                    await deleteOldFile(`/uploads/templates/${file.filename}`);
                }
            }
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'خطا در اعتبارسنجی داده‌ها',
                error: error.message
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'قالب با این عنوان از قبل وجود دارد'
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد قالب',
            error: error.message
        });
    }
};

// به‌روزرسانی قالب
exports.updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه قالب نامعتبر است'
            });
        }

        const template = await VisitTemplate.findById(id);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب یافت نشد'
            });
        }

        // بررسی مالکیت (اگر سیستم احراز هویت دارید)
        // if (template.createdBy.toString() !== req.user._id.toString()) {
        //   return res.status(403).json({
        //     success: false,
        //     message: 'شما دسترسی ویرایش این قالب را ندارید'
        //   });
        // }

        // به‌روزرسانی فیلدها
        const updateData = { ...req.body };

        // پردازش فایل‌های آپلود شده
        if (req.files) {
            if (req.files.logo) {
                // حذف لوگوی قدیمی
                if (template.logo) {
                    await deleteOldFile(template.logo);
                }
                updateData.logo = `/uploads/templates/${req.files.logo[0].filename}`;
            }

            if (req.files.profileImage) {
                if (template.profileImage) {
                    await deleteOldFile(template.profileImage);
                }
                updateData.profileImage = `/uploads/templates/${req.files.profileImage[0].filename}`;
            }

            if (req.files.backgroundImage) {
                if (template.backgroundImage) {
                    await deleteOldFile(template.backgroundImage);
                }
                updateData.backgroundImage = `/uploads/templates/${req.files.backgroundImage[0].filename}`;
            }
        }

        // پردازش آرایه‌ها
        if (updateData.phoneNumbers && typeof updateData.phoneNumbers === 'string') {
            updateData.phoneNumbers = updateData.phoneNumbers.split(',').map(p => p.trim());
        }

        if (updateData.services && typeof updateData.services === 'string') {
            updateData.services = updateData.services.split(',').map(s => s.trim());
        }

        // پردازش JSON fields
        const jsonFields = ['officeHours', 'certificates', 'socialMedia', 'templateStyle', 'location'];
        jsonFields.forEach(field => {
            if (updateData[field] && typeof updateData[field] === 'string') {
                try {
                    updateData[field] = JSON.parse(updateData[field]);
                } catch (error) {
                    // اگر JSON نباشد، به همان صورت ذخیره می‌شود
                }
            }
        });

        const updatedTemplate = await VisitTemplate.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');

        res.status(200).json({
            success: true,
            message: 'قالب با موفقیت به‌روزرسانی شد',
            data: formatTemplateResponse(updatedTemplate, req)
        });

    } catch (error) {
        console.error('خطا در به‌روزرسانی قالب:', error);

        // پاک‌سازی فایل‌های آپلود شده در صورت خطا
        if (req.files) {
            for (const field in req.files) {
                for (const file of req.files[field]) {
                    await deleteOldFile(`/uploads/templates/${file.filename}`);
                }
            }
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'خطا در اعتبارسنجی داده‌ها',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطا در به‌روزرسانی قالب',
            error: error.message
        });
    }
};

// حذف قالب
exports.deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه قالب نامعتبر است'
            });
        }

        const template = await VisitTemplate.findById(id);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب یافت نشد'
            });
        }

        // بررسی آیا قالب در کارت‌ها استفاده شده است
        if (template.usedInCards && template.usedInCards.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'این قالب در کارت‌های ویزیت استفاده شده و قابل حذف نیست',
                usedInCardsCount: template.usedInCards.length
            });
        }

        // حذف فایل‌های مرتبط
        const filesToDelete = [
            template.logo,
            template.profileImage,
            template.backgroundImage,
            template.qrCode
        ].filter(file => file);

        for (const file of filesToDelete) {
            await deleteOldFile(file);
        }

        await VisitTemplate.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'قالب با موفقیت حذف شد',
            data: {
                id: template._id,
                title: template.title,
                doctorName: template.doctorName
            }
        });

    } catch (error) {
        console.error('خطا در حذف قالب:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در حذف قالب',
            error: error.message
        });
    }
};

// دریافت قالب‌های یک کاربر خاص
exports.getUserTemplates = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کاربر نامعتبر است'
            });
        }

        const templates = await VisitTemplate.find({ createdBy: userId })
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        const templatesWithUrls = templates.map(template =>
            formatTemplateResponse(template, req)
        );

        res.status(200).json({
            success: true,
            count: templates.length,
            data: templatesWithUrls
        });
    } catch (error) {
        console.error('خطا در دریافت قالب‌های کاربر:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت قالب‌های کاربر',
            error: error.message
        });
    }
};

// جستجوی قالب‌ها
exports.searchTemplates = async (req, res) => {
    try {
        const { q, specialty, city } = req.query;

        const query = {};

        if (q) {
            query.$text = { $search: q };
        }

        if (specialty) query.specialty = specialty;
        if (city) query.city = city;
        query.isActive = true;

        const templates = await VisitTemplate.find(query)
            .populate('createdBy', 'name email')
            .limit(20)
            .sort({ score: { $meta: "textScore" } });

        const templatesWithUrls = templates.map(template =>
            formatTemplateResponse(template, req)
        );

        res.status(200).json({
            success: true,
            count: templates.length,
            data: templatesWithUrls
        });
    } catch (error) {
        console.error('خطا در جستجوی قالب‌ها:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در جستجوی قالب‌ها',
            error: error.message
        });
    }
};

// فعال/غیرفعال کردن قالب
exports.toggleTemplateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه قالب نامعتبر است'
            });
        }

        const template = await VisitTemplate.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب یافت نشد'
            });
        }

        res.status(200).json({
            success: true,
            message: `قالب ${isActive ? 'فعال' : 'غیرفعال'} شد`,
            data: {
                id: template._id,
                title: template.title,
                isActive: template.isActive
            }
        });

    } catch (error) {
        console.error('خطا در تغییر وضعیت قالب:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در تغییر وضعیت قالب',
            error: error.message
        });
    }
};