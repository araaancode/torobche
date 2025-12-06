const BusinessCard = require('../models/BussinessCard');
const BusinessTemplate = require('../models/BusinessTemplate');
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (optional)
if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

// Helper function to generate QR Code
const generateQRCodeImage = async (businessCard, options = {}) => {
    const qrCodeText = businessCard.getQrCodeDataText();
    const qrOptions = {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.92,
        margin: 1,
        width: businessCard.qrCode.size || 300,
        color: {
            dark: businessCard.qrCodeSettings.foregroundColor || '#000000',
            light: businessCard.qrCodeSettings.backgroundColor || '#FFFFFF'
        },
        ...options
    };

    const qrCodeDataURL = await QRCode.toDataURL(qrCodeText, qrOptions);
    return { qrCodeDataURL, qrCodeText };
};

// @desc    Create a new business card FROM TEMPLATE
// @route   POST /api/business-cards/from-template/:templateId
// @access  Private
exports.createBusinessCardFromTemplate = async (req, res) => {
    try {
        const template = await BusinessTemplate.findById(req.params.templateId);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب مورد نظر یافت نشد'
            });
        }

        // Check if template is active
        if (!template.isActive) {
            return res.status(400).json({
                success: false,
                message: 'این قالب غیرفعال است'
            });
        }

        // Check if user has access to premium templates
        if (template.isPremium && req.user.subscription !== 'premium') {
            return res.status(403).json({
                success: false,
                message: 'برای استفاده از قالب پریمیوم باید اشتراک پریمیوم داشته باشید'
            });
        }

        // Merge template defaults with user data
        const businessCardData = {
            ...template.defaultFields,
            ...req.body,
            userId: req.user.id,
            businessType: template.businessType,
            templateId: template._id,
            templateVersion: template.version,
            styling: {
                ...template.templateConfig,
                ...(req.body.styling || {})
            }
        };

        // Create business card
        const businessCard = await BusinessCard.create(businessCardData);

        // Generate QR Code automatically
        try {
            const { qrCodeDataURL, qrCodeText } = await generateQRCodeImage(businessCard);

            businessCard.qrCode = {
                data: qrCodeDataURL,
                qrCodeText: qrCodeText,
                lastUpdated: new Date(),
                version: 1
            };

            await businessCard.save();
        } catch (qrError) {
            console.error('QR Code generation failed:', qrError);
            // Continue without QR Code
        }

        // Increment template usage count
        await template.incrementUsage();

        res.status(201).json({
            success: true,
            data: businessCard,
            message: 'کارت کسب‌وکار با موفقیت از قالب ایجاد شد',
            template: {
                id: template._id,
                name: template.name,
                version: template.version
            }
        });
    } catch (error) {
        console.error('Error creating business card from template:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'خطای اعتبارسنجی',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در ایجاد کارت کسب‌وکار از قالب'
        });
    }
};

// @desc    Create a new business card (regular)
// @route   POST /api/business-cards
// @access  Private
exports.createBusinessCard = async (req, res) => {
    try {
        // Add user ID from auth middleware
        req.body.userId = req.user.id;

        // If templateId is provided, validate it
        if (req.body.templateId) {
            const template = await BusinessTemplate.findById(req.body.templateId);
            if (!template) {
                return res.status(404).json({
                    success: false,
                    message: 'قالب مورد نظر یافت نشد'
                });
            }

            // Merge template styling if exists
            if (template.templateConfig) {
                req.body.styling = {
                    ...template.templateConfig,
                    ...(req.body.styling || {})
                };
            }
        }

        // Create business card
        const businessCard = await BusinessCard.create(req.body);

        // Generate QR Code automatically
        try {
            const { qrCodeDataURL, qrCodeText } = await generateQRCodeImage(businessCard);

            businessCard.qrCode = {
                data: qrCodeDataURL,
                qrCodeText: qrCodeText,
                lastUpdated: new Date(),
                version: 1
            };

            await businessCard.save();
        } catch (qrError) {
            console.error('QR Code generation failed:', qrError);
            // Continue without QR Code
        }

        res.status(201).json({
            success: true,
            data: businessCard,
            message: 'کارت کسب‌وکار با موفقیت ایجاد شد',
            qrCodeInfo: {
                hasQRCode: !!businessCard.qrCode.data,
                publicUrl: businessCard.getPublicUrl(),
                shortUrl: businessCard.shortUrl
            }
        });
    } catch (error) {
        console.error('Error creating business card:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'خطای اعتبارسنجی',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در ایجاد کارت کسب‌وکار'
        });
    }
};

// @desc    Get all business cards with filtering and pagination
// @route   GET /api/business-cards
// @access  Public
exports.getBusinessCards = async (req, res) => {
    try {
        const {
            businessType,
            city,
            province,
            search,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            isVerified,
            isActive,
            templateId
        } = req.query;

        // Build query
        let query = {};

        // Filter by business type
        if (businessType) {
            query.businessType = businessType;
        }

        // Filter by city
        if (city) {
            query['address.city'] = new RegExp(city, 'i');
        }

        // Filter by province
        if (province) {
            query['address.province'] = new RegExp(province, 'i');
        }

        // Filter by template
        if (templateId) {
            query.templateId = templateId;
        }

        // Search in multiple fields
        if (search) {
            query.$or = [
                { title: new RegExp(search, 'i') },
                { companyName: new RegExp(search, 'i') },
                { ownerName: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { tags: new RegExp(search, 'i') }
            ];
        }

        // Filter by verification status
        if (isVerified !== undefined) {
            query.isVerified = isVerified === 'true';
        }

        // Filter by active status
        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Sort
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Execute query
        const businessCards = await BusinessCard.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitNum)
            .populate('userId', 'name email')
            .populate('templateId', 'name version');

        // Get total count for pagination
        const total = await BusinessCard.countDocuments(query);

        res.status(200).json({
            success: true,
            count: businessCards.length,
            total,
            totalPages: Math.ceil(total / limitNum),
            currentPage: pageNum,
            data: businessCards
        });
    } catch (error) {
        console.error('Error getting business cards:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت کارت‌های کسب‌وکار'
        });
    }
};

// @desc    Get business cards by type
// @route   GET /api/business-cards/type/:businessType
// @access  Public
exports.getBusinessCardsByType = async (req, res) => {
    try {
        const { businessType } = req.params;
        const { limit = 20 } = req.query;

        const businessCards = await BusinessCard.find({
            businessType,
            isActive: true,
            isVerified: true
        })
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
            .populate('templateId', 'name layout');

        res.status(200).json({
            success: true,
            count: businessCards.length,
            data: businessCards
        });
    } catch (error) {
        console.error('Error getting business cards by type:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت کارت‌های کسب‌وکار'
        });
    }
};

// @desc    Get single business card
// @route   GET /api/business-cards/:id
// @access  Public
exports.getBusinessCard = async (req, res) => {
    try {
        const businessCard = await BusinessCard.findById(req.params.id)
            .populate('userId', 'name email phone')
            .populate('templateId', 'name version templateConfig');

        if (!businessCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        // Increment views
        await businessCard.incrementViews();

        res.status(200).json({
            success: true,
            data: businessCard
        });
    } catch (error) {
        console.error('Error getting business card:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت کارت کسب‌وکار'
        });
    }
};

// @desc    Update business card
// @route   PUT /api/business-cards/:id
// @access  Private
exports.updateBusinessCard = async (req, res) => {
    try {
        let businessCard = await BusinessCard.findById(req.params.id);

        if (!businessCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        // Check if user owns the business card
        if (businessCard.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز ویرایش این کارت کسب‌وکار را ندارید'
            });
        }

        // If template is being changed, validate it
        if (req.body.templateId && req.body.templateId !== businessCard.templateId?.toString()) {
            const template = await BusinessTemplate.findById(req.body.templateId);
            if (!template) {
                return res.status(404).json({
                    success: false,
                    message: 'قالب مورد نظر یافت نشد'
                });
            }

            // Apply template styling
            if (template.templateConfig) {
                req.body.styling = {
                    ...template.templateConfig,
                    ...(req.body.styling || {})
                };
            }
        }

        // Update business card
        businessCard = await BusinessCard.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: businessCard,
            message: 'کارت کسب‌وکار با موفقیت به‌روزرسانی شد'
        });
    } catch (error) {
        console.error('Error updating business card:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'خطای اعتبارسنجی',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در به‌روزرسانی کارت کسب‌وکار'
        });
    }
};

// @desc    Delete business card
// @route   DELETE /api/business-cards/:id
// @access  Private
exports.deleteBusinessCard = async (req, res) => {
    try {
        const businessCard = await BusinessCard.findById(req.params.id);

        if (!businessCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        // Check if user owns the business card or is admin
        if (businessCard.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز حذف این کارت کسب‌وکار را ندارید'
            });
        }

        await businessCard.remove();

        res.status(200).json({
            success: true,
            message: 'کارت کسب‌وکار با موفقیت حذف شد'
        });
    } catch (error) {
        console.error('Error deleting business card:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در حذف کارت کسب‌وکار'
        });
    }
};

// @desc    Search business cards by location (radius search)
// @route   GET /api/business-cards/search/nearby
// @access  Public
exports.getNearbyBusinessCards = async (req, res) => {
    try {
        const { longitude, latitude, radius = 5000, businessType } = req.query;

        if (!longitude || !latitude) {
            return res.status(400).json({
                success: false,
                message: 'طول و عرض جغرافیایی الزامی است'
            });
        }

        const query = {
            'address.location': {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseInt(radius)
                }
            },
            isActive: true,
            isVerified: true
        };

        if (businessType) {
            query.businessType = businessType;
        }

        const businessCards = await BusinessCard.find(query)
            .limit(50)
            .sort({ createdAt: -1 })
            .populate('templateId', 'name layout');

        res.status(200).json({
            success: true,
            count: businessCards.length,
            data: businessCards
        });
    } catch (error) {
        console.error('Error getting nearby business cards:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت کارت‌های کسب‌وکار نزدیک'
        });
    }
};

// @desc    Get user's business cards
// @route   GET /api/business-cards/user/my-cards
// @access  Private
exports.getMyBusinessCards = async (req, res) => {
    try {
        const businessCards = await BusinessCard.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .populate('templateId', 'name thumbnail');

        res.status(200).json({
            success: true,
            count: businessCards.length,
            data: businessCards
        });
    } catch (error) {
        console.error('Error getting user business cards:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت کارت‌های کسب‌وکار شما'
        });
    }
};

// @desc    Get business types (enum values)
// @route   GET /api/business-cards/types/list
// @access  Public
exports.getBusinessTypes = async (req, res) => {
    try {
        const businessTypes = [
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
        ];

        res.status(200).json({
            success: true,
            data: businessTypes
        });
    } catch (error) {
        console.error('Error getting business types:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت انواع کسب‌وکار'
        });
    }
};

// @desc    Generate QR Code for business card
// @route   POST /api/business-cards/:id/generate-qr
// @access  Private
exports.generateQRCode = async (req, res) => {
    try {
        const businessCard = await BusinessCard.findById(req.params.id);

        if (!businessCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        // Check if user owns the business card
        if (businessCard.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز ایجاد QR Code برای این کارت را ندارید'
            });
        }

        const { qrCodeDataURL, qrCodeText } = await generateQRCodeImage(businessCard, req.body.options || {});

        // Update business card with QR Code
        businessCard.qrCode = {
            data: qrCodeDataURL,
            qrCodeText: qrCodeText,
            lastUpdated: new Date(),
            version: (businessCard.qrCode?.version || 0) + 1,
            size: req.body.size || businessCard.qrCode?.size || 300
        };

        // Update colors if provided
        if (req.body.foregroundColor || req.body.backgroundColor) {
            businessCard.qrCodeSettings = {
                foregroundColor: req.body.foregroundColor || businessCard.qrCodeSettings?.foregroundColor || '#000000',
                backgroundColor: req.body.backgroundColor || businessCard.qrCodeSettings?.backgroundColor || '#FFFFFF',
                ...(businessCard.qrCodeSettings || {})
            };
        }

        await businessCard.save();

        // If Cloudinary is configured, upload QR code
        if (process.env.CLOUDINARY_CLOUD_NAME) {
            try {
                const uploadResult = await cloudinary.uploader.upload(qrCodeDataURL, {
                    folder: 'business-cards/qr-codes',
                    public_id: `qr_${businessCard._id}_${businessCard.qrCode.version}`,
                    overwrite: true
                });

                businessCard.qrCode.publicId = uploadResult.public_id;
                await businessCard.save();
            } catch (cloudinaryError) {
                console.error('Cloudinary upload error:', cloudinaryError);
            }
        }

        res.status(200).json({
            success: true,
            message: 'QR Code با موفقیت ایجاد شد',
            data: {
                qrCodeUrl: businessCard.qrCode.data,
                qrCodeText: qrCodeText,
                publicUrl: businessCard.getPublicUrl(),
                shortUrl: businessCard.shortUrl,
                version: businessCard.qrCode.version
            }
        });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در ایجاد QR Code'
        });
    }
};

// @desc    Get QR Code image
// @route   GET /api/business-cards/:id/qr-code
// @access  Public
exports.getQRCode = async (req, res) => {
    try {
        const businessCard = await BusinessCard.findById(req.params.id);

        if (!businessCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        // If QR code doesn't exist, generate it on the fly
        if (!businessCard.qrCode || !businessCard.qrCode.data) {
            try {
                const { qrCodeDataURL } = await generateQRCodeImage(businessCard);

                businessCard.qrCode = {
                    data: qrCodeDataURL,
                    lastUpdated: new Date(),
                    version: 1
                };
                await businessCard.save();
            } catch (generateError) {
                return res.status(500).json({
                    success: false,
                    message: 'خطا در ایجاد QR Code'
                });
            }
        }

        // Increment QR scans
        await businessCard.incrementQrScans();

        // Return QR code image
        const base64Data = businessCard.qrCode.data.replace(/^data:image\/png;base64,/, '');
        const imgBuffer = Buffer.from(base64Data, 'base64');

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imgBuffer.length,
            'Cache-Control': 'public, max-age=86400',
            'X-QR-Version': businessCard.qrCode.version
        });
        res.end(imgBuffer);
    } catch (error) {
        console.error('Error getting QR code:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت QR Code'
        });
    }
};

// @desc    Get business card by short URL
// @route   GET /api/business-cards/short/:shortUrl
// @access  Public
exports.getBusinessCardByShortUrl = async (req, res) => {
    try {
        const businessCard = await BusinessCard.findOne({
            shortUrl: req.params.shortUrl
        })
            .populate('userId', 'name email')
            .populate('templateId', 'name templateConfig');

        if (!businessCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        // Increment views
        await businessCard.incrementViews();

        res.status(200).json({
            success: true,
            data: businessCard
        });
    } catch (error) {
        console.error('Error getting business card by short URL:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت کارت کسب‌وکار'
        });
    }
};

// @desc    Get business card by unique code
// @route   GET /api/business-cards/code/:uniqueCode
// @access  Public
exports.getBusinessCardByUniqueCode = async (req, res) => {
    try {
        const businessCard = await BusinessCard.findOne({
            uniqueCode: req.params.uniqueCode
        })
            .populate('userId', 'name email')
            .populate('templateId', 'name templateConfig');

        if (!businessCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        // Increment views
        await businessCard.incrementViews();

        res.status(200).json({
            success: true,
            data: businessCard
        });
    } catch (error) {
        console.error('Error getting business card by unique code:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت کارت کسب‌وکار'
        });
    }
};

// @desc    Update QR Code settings
// @route   PUT /api/business-cards/:id/qr-settings
// @access  Private
exports.updateQRSettings = async (req, res) => {
    try {
        const businessCard = await BusinessCard.findById(req.params.id);

        if (!businessCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        // Check if user owns the business card
        if (businessCard.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز ویرایش تنظیمات QR Code را ندارید'
            });
        }

        // Update QR settings
        if (req.body.qrCodeSettings) {
            businessCard.qrCodeSettings = {
                ...(businessCard.qrCodeSettings || {}),
                ...req.body.qrCodeSettings
            };
        }

        if (req.body.size) {
            if (!businessCard.qrCode) {
                businessCard.qrCode = {};
            }
            businessCard.qrCode.size = req.body.size;
        }

        await businessCard.save();

        res.status(200).json({
            success: true,
            message: 'تنظیمات QR Code با موفقیت به‌روزرسانی شد',
            data: {
                qrCodeSettings: businessCard.qrCodeSettings,
                qrCode: {
                    size: businessCard.qrCode?.size
                }
            }
        });
    } catch (error) {
        console.error('Error updating QR settings:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در به‌روزرسانی تنظیمات QR Code'
        });
    }
};

// @desc    Get QR Code analytics
// @route   GET /api/business-cards/:id/qr-analytics
// @access  Private
exports.getQRAnalytics = async (req, res) => {
    try {
        const businessCard = await BusinessCard.findById(req.params.id);

        if (!businessCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        // Check if user owns the business card
        if (businessCard.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز مشاهده آمار QR Code را ندارید'
            });
        }

        const analytics = {
            totalViews: businessCard.views,
            qrScans: businessCard.qrScans,
            qrCode: businessCard.qrCode ? {
                version: businessCard.qrCode.version,
                lastUpdated: businessCard.qrCode.lastUpdated,
                hasQRCode: !!businessCard.qrCode.data
            } : null,
            scanRate: businessCard.views > 0 ?
                ((businessCard.qrScans / businessCard.views) * 100).toFixed(2) + '%' : '0%',
            publicUrl: businessCard.getPublicUrl(),
            shortUrl: businessCard.shortUrl,
            uniqueCode: businessCard.uniqueCode,
            template: businessCard.templateId ? {
                id: businessCard.templateId,
                name: businessCard.templateId.name
            } : null
        };

        res.status(200).json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error('Error getting QR analytics:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت آمار QR Code'
        });
    }
};

// @desc    Duplicate business card
// @route   POST /api/business-cards/:id/duplicate
// @access  Private
exports.duplicateBusinessCard = async (req, res) => {
    try {
        const originalCard = await BusinessCard.findById(req.params.id);

        if (!originalCard) {
            return res.status(404).json({
                success: false,
                message: 'کارت کسب‌وکار یافت نشد'
            });
        }

        // Check if user owns the business card
        if (originalCard.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز کپی این کارت را ندارید'
            });
        }

        // Create a copy of the business card
        const cardData = originalCard.toObject();
        delete cardData._id;
        delete cardData.__v;
        delete cardData.createdAt;
        delete cardData.updatedAt;
        delete cardData.views;
        delete cardData.qrScans;
        delete cardData.qrCode;
        delete cardData.uniqueCode;
        delete cardData.shortUrl;

        // Update user ID to current user
        cardData.userId = req.user.id;
        cardData.title = `${cardData.title} (کپی)`;

        // Create new business card
        const newBusinessCard = await BusinessCard.create(cardData);

        res.status(201).json({
            success: true,
            data: newBusinessCard,
            message: 'کارت کسب‌وکار با موفقیت کپی شد'
        });
    } catch (error) {
        console.error('Error duplicating business card:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در کپی کردن کارت کسب‌وکار'
        });
    }
};

// @desc    Get business cards created from specific template
// @route   GET /api/business-cards/template/:templateId
// @access  Public
exports.getBusinessCardsByTemplate = async (req, res) => {
    try {
        const { templateId } = req.params;
        const { limit = 20 } = req.query;

        // Check if template exists
        const template = await BusinessTemplate.findById(templateId);
        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب مورد نظر یافت نشد'
            });
        }

        const businessCards = await BusinessCard.find({
            templateId: templateId,
            isActive: true,
            isVerified: true
        })
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })
            .populate('userId', 'name');

        res.status(200).json({
            success: true,
            count: businessCards.length,
            template: {
                id: template._id,
                name: template.name,
                businessType: template.businessType
            },
            data: businessCards
        });
    } catch (error) {
        console.error('Error getting business cards by template:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت کارت‌های کسب‌وکار'
        });
    }
};