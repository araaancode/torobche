const VisitCard = require('../models/VisitCard');
const VisitTemplate = require('../models/VisitTemplate');
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

const formatCardResponse = (card, req) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const cardObj = card.toObject ? card.toObject() : card;

    return {
        ...cardObj,
        qrCodeImage: cardObj.qrCodeImage ? `${baseUrl}${cardObj.qrCodeImage}` : null,
        customLogo: cardObj.customLogo ? `${baseUrl}${cardObj.customLogo}` : null,
        customProfileImage: cardObj.customProfileImage ? `${baseUrl}${cardObj.customProfileImage}` : null
    };
};

// ================== VISIT CARD CONTROLLERS ==================

// دریافت تمام کارت‌ها
exports.getAllCards = async (req, res) => {
    try {
        const {
            status,
            specialty,
            city,
            owner,
            search,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        if (status) query.status = status;
        if (specialty) query['doctorInfo.specialty'] = specialty;
        if (city) query['doctorInfo.city'] = city;
        if (owner && mongoose.Types.ObjectId.isValid(owner)) {
            query.owner = owner;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { uniqueCode: { $regex: search, $options: 'i' } },
                { 'doctorInfo.name': { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [cards, total] = await Promise.all([
            VisitCard.find(query)
                .populate('template', 'title doctorName specialty')
                .populate('owner', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            VisitCard.countDocuments(query)
        ]);

        const cardsWithUrls = cards.map(card => formatCardResponse(card, req));

        res.status(200).json({
            success: true,
            count: cards.length,
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            data: cardsWithUrls
        });
    } catch (error) {
        console.error('خطا در دریافت کارت‌ها:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت لیست کارت‌ها',
            error: error.message
        });
    }
};

// دریافت کارت بر اساس ID
exports.getCardById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            // شاید ID نیست، شاید uniqueCode است
            const card = await VisitCard.findOne({ uniqueCode: id })
                .populate('template')
                .populate('owner', 'name email phone');

            if (!card) {
                return res.status(404).json({
                    success: false,
                    message: 'کارت ویزیت یافت نشد'
                });
            }

            // افزایش آمار بازدید
            await updateViewStats(card, req);

            return res.status(200).json({
                success: true,
                data: formatCardResponse(card, req)
            });
        }

        // اگر ObjectId معتبر است
        const card = await VisitCard.findById(id)
            .populate('template')
            .populate('owner', 'name email phone');

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // افزایش آمار بازدید
        await updateViewStats(card, req);

        res.status(200).json({
            success: true,
            data: formatCardResponse(card, req)
        });
    } catch (error) {
        console.error('خطا در دریافت کارت:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت کارت ویزیت',
            error: error.message
        });
    }
};

// Helper: به‌روزرسانی آمار بازدید
const updateViewStats = async (card, req) => {
    try {
        const userAgent = req.headers['user-agent'] || '';
        const isMobile = /mobile/i.test(userAgent);
        const source = req.headers.referer || 'direct';

        card.viewStats.totalViews += 1;
        card.viewStats.lastViewedAt = new Date();

        // اضافه کردن به analytics
        const today = new Date().toISOString().split('T')[0];
        const todayAnalytic = card.analytics.find(a =>
            a.date.toISOString().split('T')[0] === today
        );

        if (todayAnalytic) {
            todayAnalytic.views += 1;
        } else {
            card.analytics.push({
                date: new Date(),
                views: 1,
                shares: 0,
                contacts: 0,
                source: source.substring(0, 100),
                device: isMobile ? 'mobile' : 'desktop'
            });
        }

        await card.save();
    } catch (error) {
        console.error('خطا در به‌روزرسانی آمار:', error);
    }
};

// ایجاد کارت جدید از یک قالب
exports.createCardFromTemplate = async (req, res) => {
    try {
        const { templateId, title, customData } = req.body;

        // اعتبارسنجی
        if (!templateId || !title) {
            return res.status(400).json({
                success: false,
                message: 'شناسه قالب و عنوان اجباری هستند'
            });
        }

        if (!mongoose.Types.ObjectId.isValid(templateId)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه قالب نامعتبر است'
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

        // بررسی فعال بودن قالب
        if (!template.isActive) {
            return res.status(400).json({
                success: false,
                message: 'این قالب غیرفعال است'
            });
        }

        // ایجاد داده کارت
        const cardData = {
            title,
            template: templateId,
            owner: req.user._id,
            doctorInfo: {
                name: template.doctorName,
                specialty: template.specialty,
                degree: template.degree,
                phoneNumbers: template.phoneNumbers,
                address: template.address,
                city: template.city,
                clinicName: template.clinicName
            },
            status: 'active',
            metadata: {
                createdBy: req.user._id,
                version: 1
            }
        };

        // اضافه کردن داده‌های سفارشی
        if (customData) {
            try {
                const custom = JSON.parse(customData);

                if (custom.doctorInfo) {
                    cardData.doctorInfo = { ...cardData.doctorInfo, ...custom.doctorInfo };
                }

                if (custom.customContacts) {
                    cardData.customContacts = custom.customContacts;
                }

                if (custom.customSchedule) {
                    cardData.customSchedule = custom.customSchedule;
                }

                if (custom.customServices) {
                    cardData.customServices = custom.customServices;
                }

                if (custom.displaySettings) {
                    cardData.displaySettings = custom.displaySettings;
                }

                if (custom.tags) {
                    cardData.tags = custom.tags;
                }
            } catch (error) {
                console.error('خطا در پردازش داده‌های سفارشی:', error);
            }
        }

        // پردازش فایل‌های آپلود شده
        if (req.files) {
            if (req.files.customLogo) {
                cardData.customLogo = `/uploads/cards/${req.files.customLogo[0].filename}`;
            }
            if (req.files.customProfileImage) {
                cardData.customProfileImage = `/uploads/cards/${req.files.customProfileImage[0].filename}`;
            }
        }

        // ایجاد کارت
        const card = await VisitCard.create(cardData);

        // ایجاد QR Code
        await generateCardQRCode(card, req);

        // آپدیت قالب برای اضافه کردن این کارت به لیست usedInCards
        template.usedInCards.push(card._id);
        await template.save();

        res.status(201).json({
            success: true,
            message: 'کارت ویزیت با موفقیت ایجاد شد',
            data: formatCardResponse(card, req),
            shareableUrl: `${req.protocol}://${req.get('host')}/v/${card.uniqueCode}`
        });

    } catch (error) {
        console.error('خطا در ایجاد کارت:', error);

        // پاک‌سازی فایل‌های آپلود شده
        if (req.files) {
            for (const field in req.files) {
                for (const file of req.files[field]) {
                    await deleteOldFile(`/uploads/cards/${file.filename}`);
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
                message: 'کارت با این کد از قبل وجود دارد'
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطا در ایجاد کارت ویزیت',
            error: error.message
        });
    }
};

// Helper: ایجاد QR Code برای کارت
const generateCardQRCode = async (card, req) => {
    try {
        const qrData = JSON.stringify({
            cardId: card._id,
            uniqueCode: card.uniqueCode,
            doctorName: card.doctorInfo.name,
            specialty: card.doctorInfo.specialty,
            url: `${req.protocol}://${req.get('host')}/v/${card.uniqueCode}`
        });

        const qrDir = 'uploads/qrcodes/cards';
        await fs.mkdir(qrDir, { recursive: true });

        const qrFilename = `card-${card.uniqueCode}-${Date.now()}.png`;
        const qrPath = path.join(qrDir, qrFilename);
        const fullQrPath = path.join(process.cwd(), qrPath);

        await QRCode.toFile(fullQrPath, qrData, {
            color: {
                dark: '#1a56db',
                light: '#ffffff'
            },
            width: 300,
            margin: 1
        });

        card.qrCode = qrData;
        card.qrCodeImage = `/qrcodes/cards/${qrFilename}`;
        card.shareableLink = `/v/${card.uniqueCode}`;

        await card.save();
    } catch (error) {
        console.error('خطا در ایجاد QR Code:', error);
        throw error;
    }
};

// به‌روزرسانی کارت
exports.updateCard = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت نامعتبر است'
            });
        }

        const card = await VisitCard.findById(id);

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // بررسی مالکیت
        if (card.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'شما دسترسی ویرایش این کارت را ندارید'
            });
        }

        // به‌روزرسانی فیلدها
        const updateData = { ...req.body };

        // پردازش فایل‌های آپلود شده
        if (req.files) {
            if (req.files.customLogo) {
                if (card.customLogo) {
                    await deleteOldFile(card.customLogo);
                }
                updateData.customLogo = `/uploads/cards/${req.files.customLogo[0].filename}`;
            }

            if (req.files.customProfileImage) {
                if (card.customProfileImage) {
                    await deleteOldFile(card.customProfileImage);
                }
                updateData.customProfileImage = `/uploads/cards/${req.files.customProfileImage[0].filename}`;
            }
        }

        // پردازش JSON fields
        const jsonFields = [
            'doctorInfo', 'customContacts', 'customSchedule',
            'customServices', 'customSocialMedia', 'displaySettings',
            'sharing', 'metadata'
        ];

        jsonFields.forEach(field => {
            if (updateData[field] && typeof updateData[field] === 'string') {
                try {
                    updateData[field] = JSON.parse(updateData[field]);
                } catch (error) {
                    // اگر JSON نباشد، به همان صورت ذخیره می‌شود
                }
            }
        });

        // افزایش version
        if (updateData.metadata) {
            updateData.metadata.lastUpdatedBy = req.user._id;
            updateData.metadata.version = (card.metadata?.version || 1) + 1;
        } else {
            updateData.metadata = {
                lastUpdatedBy: req.user._id,
                version: (card.metadata?.version || 1) + 1
            };
        }

        const updatedCard = await VisitCard.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )
            .populate('template', 'title doctorName')
            .populate('owner', 'name email');

        res.status(200).json({
            success: true,
            message: 'کارت ویزیت با موفقیت به‌روزرسانی شد',
            data: formatCardResponse(updatedCard, req)
        });

    } catch (error) {
        console.error('خطا در به‌روزرسانی کارت:', error);

        // پاک‌سازی فایل‌های آپلود شده
        if (req.files) {
            for (const field in req.files) {
                for (const file of req.files[field]) {
                    await deleteOldFile(`/uploads/cards/${file.filename}`);
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

        const card = await VisitCard.findById(id);

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // بررسی مالکیت
        if (card.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'شما دسترسی حذف این کارت را ندارید'
            });
        }

        // حذف از قالب مرتبط
        if (card.template) {
            await VisitTemplate.findByIdAndUpdate(
                card.template,
                { $pull: { usedInCards: card._id } }
            );
        }

        // حذف فایل‌ها
        const filesToDelete = [
            card.customLogo,
            card.customProfileImage,
            card.qrCodeImage
        ].filter(file => file);

        for (const file of filesToDelete) {
            await deleteOldFile(file);
        }

        await VisitCard.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'کارت ویزیت با موفقیت حذف شد',
            data: {
                id: card._id,
                title: card.title,
                uniqueCode: card.uniqueCode
            }
        });

    } catch (error) {
        console.error('خطا در حذف کارت:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در حذف کارت ویزیت',
            error: error.message
        });
    }
};

// دریافت کارت‌های یک کاربر
exports.getUserCards = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کاربر نامعتبر است'
            });
        }

        const cards = await VisitCard.find({ owner: userId })
            .populate('template', 'title doctorName specialty')
            .sort({ createdAt: -1 });

        const cardsWithUrls = cards.map(card => formatCardResponse(card, req));

        res.status(200).json({
            success: true,
            count: cards.length,
            data: cardsWithUrls
        });
    } catch (error) {
        console.error('خطا در دریافت کارت‌های کاربر:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت کارت‌های کاربر',
            error: error.message
        });
    }
};

// افزایش آمار اشتراک‌گذاری
exports.trackShare = async (req, res) => {
    try {
        const { id } = req.params;
        const { platform } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت نامعتبر است'
            });
        }

        const card = await VisitCard.findById(id);

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // افزایش آمار کلی
        card.shareStats.totalShares += 1;

        // افزایش آمار پلتفرم خاص
        if (platform) {
            const platformKey = `${platform}Shares`;
            if (card.shareStats[platformKey] !== undefined) {
                card.shareStats[platformKey] += 1;
            }
        }

        // اضافه کردن به analytics
        const today = new Date().toISOString().split('T')[0];
        const todayAnalytic = card.analytics.find(a =>
            a.date.toISOString().split('T')[0] === today
        );

        if (todayAnalytic) {
            todayAnalytic.shares += 1;
        } else {
            card.analytics.push({
                date: new Date(),
                views: 0,
                shares: 1,
                contacts: 0,
                source: platform || 'unknown',
                device: 'unknown'
            });
        }

        await card.save();

        res.status(200).json({
            success: true,
            message: 'اشتراک‌گذاری ثبت شد',
            data: {
                totalShares: card.shareStats.totalShares,
                platformShares: platform ? card.shareStats[`${platform}Shares`] : null
            }
        });

    } catch (error) {
        console.error('خطا در ثبت اشتراک‌گذاری:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در ثبت اشتراک‌گذاری',
            error: error.message
        });
    }
};

// افزایش آمار تماس
exports.trackContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body; // call, whatsapp, website

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت نامعتبر است'
            });
        }

        const card = await VisitCard.findById(id);

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // افزایش آمار کلی
        card.contactStats.totalCalls += 1;

        // افزایش آمار نوع خاص
        if (type === 'whatsapp' && card.contactStats.whatsappMessages !== undefined) {
            card.contactStats.whatsappMessages += 1;
        } else if (type === 'website' && card.contactStats.websiteClicks !== undefined) {
            card.contactStats.websiteClicks += 1;
        }

        // اضافه کردن به analytics
        const today = new Date().toISOString().split('T')[0];
        const todayAnalytic = card.analytics.find(a =>
            a.date.toISOString().split('T')[0] === today
        );

        if (todayAnalytic) {
            todayAnalytic.contacts += 1;
        } else {
            card.analytics.push({
                date: new Date(),
                views: 0,
                shares: 0,
                contacts: 1,
                source: type || 'unknown',
                device: 'unknown'
            });
        }

        await card.save();

        res.status(200).json({
            success: true,
            message: 'تماس ثبت شد',
            data: {
                totalContacts: card.contactStats.totalCalls,
                contactType: type
            }
        });

    } catch (error) {
        console.error('خطا در ثبت تماس:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در ثبت تماس',
            error: error.message
        });
    }
};

// دریافت آمار کارت
exports.getCardStats = async (req, res) => {
    try {
        const { id } = req.params;
        const { period = '30d' } = req.query; // 7d, 30d, 90d, 1y

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت نامعتبر است'
            });
        }

        const card = await VisitCard.findById(id)
            .select('viewStats shareStats contactStats analytics createdAt');

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // محاسبه دوره زمانی
        const now = new Date();
        let startDate = new Date();

        switch (period) {
            case '7d':
                startDate.setDate(now.getDate() - 7);
                break;
            case '30d':
                startDate.setDate(now.getDate() - 30);
                break;
            case '90d':
                startDate.setDate(now.getDate() - 90);
                break;
            case '1y':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                startDate.setDate(now.getDate() - 30);
        }

        // فیلتر analytics بر اساس دوره
        const filteredAnalytics = card.analytics.filter(a =>
            new Date(a.date) >= startDate
        );

        // محاسبه آمار دوره
        const periodStats = filteredAnalytics.reduce((acc, analytic) => ({
            views: acc.views + (analytic.views || 0),
            shares: acc.shares + (analytic.shares || 0),
            contacts: acc.contacts + (analytic.contacts || 0)
        }), { views: 0, shares: 0, contacts: 0 });

        res.status(200).json({
            success: true,
            data: {
                overallStats: {
                    views: card.viewStats,
                    shares: card.shareStats,
                    contacts: card.contactStats
                },
                periodStats: {
                    period,
                    startDate,
                    endDate: now,
                    ...periodStats
                },
                analytics: filteredAnalytics.slice(-30) // آخرین 30 رکورد
            }
        });

    } catch (error) {
        console.error('خطا در دریافت آمار کارت:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت آمار کارت',
            error: error.message
        });
    }
};

// تغییر وضعیت کارت
exports.updateCardStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'شناسه کارت نامعتبر است'
            });
        }

        const validStatuses = ['active', 'inactive', 'suspended', 'expired'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'وضعیت نامعتبر است'
            });
        }

        const card = await VisitCard.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        res.status(200).json({
            success: true,
            message: `وضعیت کارت به "${status}" تغییر یافت`,
            data: {
                id: card._id,
                title: card.title,
                status: card.status
            }
        });

    } catch (error) {
        console.error('خطا در تغییر وضعیت کارت:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در تغییر وضعیت کارت',
            error: error.message
        });
    }
};

// دریافت کارت با کد یکتا
exports.getCardByCode = async (req, res) => {
    try {
        const { code } = req.params;

        const card = await VisitCard.findOne({ uniqueCode: code })
            .populate('template')
            .populate('owner', 'name email phone');

        if (!card) {
            return res.status(404).json({
                success: false,
                message: 'کارت ویزیت یافت نشد'
            });
        }

        // بررسی وضعیت کارت
        if (card.status !== 'active') {
            return res.status(403).json({
                success: false,
                message: 'این کارت ویزیت غیرفعال است',
                status: card.status
            });
        }

        // بررسی انقضا
        if (card.sharing?.expiresAt && new Date() > card.sharing.expiresAt) {
            card.status = 'expired';
            await card.save();

            return res.status(403).json({
                success: false,
                message: 'این کارت ویزیت منقضی شده است'
            });
        }

        // بررسی محدودیت بازدید
        if (card.sharing?.maxViews && card.viewStats.totalViews >= card.sharing.maxViews) {
            return res.status(403).json({
                success: false,
                message: 'تعداد بازدیدهای مجاز این کارت به پایان رسیده است'
            });
        }

        // افزایش آمار بازدید
        await updateViewStats(card, req);

        res.status(200).json({
            success: true,
            data: formatCardResponse(card, req)
        });

    } catch (error) {
        console.error('خطا در دریافت کارت:', error);
        res.status(500).json({
            success: false,
            message: 'خطا در دریافت کارت ویزیت',
            error: error.message
        });
    }
};