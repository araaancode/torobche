const BusinessTemplate = require('../models/BusinessTemplate');
const BusinessCard = require('../models/BusinessCard');
const mongoose = require('mongoose');

// @desc    Create a new business template
// @route   POST /api/business-templates
// @access  Private (Admin or Template Designer)
exports.createBusinessTemplate = async (req, res) => {
    try {
        // Add creator ID
        req.body.createdBy = req.user.id;

        // Validate business type
        const validBusinessTypes = [
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

        if (!validBusinessTypes.includes(req.body.businessType)) {
            return res.status(400).json({
                success: false,
                message: 'نوع کسب‌وکار نامعتبر است'
            });
        }

        // Create template
        const template = await BusinessTemplate.create(req.body);

        res.status(201).json({
            success: true,
            data: template,
            message: 'قالب کسب‌وکار با موفقیت ایجاد شد'
        });
    } catch (error) {
        console.error('Error creating business template:', error);

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
            message: 'خطای سرور در ایجاد قالب کسب‌وکار'
        });
    }
};

// @desc    Get all business templates
// @route   GET /api/business-templates
// @access  Public
exports.getBusinessTemplates = async (req, res) => {
    try {
        const {
            businessType,
            category,
            isPremium,
            isActive = true,
            search,
            page = 1,
            limit = 12,
            sortBy = 'usageCount',
            sortOrder = 'desc'
        } = req.query;

        // Build query
        let query = { isActive };

        // Filter by business type
        if (businessType) {
            query.businessType = businessType;
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by premium status
        if (isPremium !== undefined) {
            query.isPremium = isPremium === 'true';
        }

        // Search in name and description
        if (search) {
            query.$or = [
                { name: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') }
            ];
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Sort
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Execute query
        const templates = await BusinessTemplate.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitNum)
            .populate('createdBy', 'name email');

        // Get total count for pagination
        const total = await BusinessTemplate.countDocuments(query);

        // Get popular templates (top 5 by usage)
        const popularTemplates = await BusinessTemplate.find({ isActive: true })
            .sort({ usageCount: -1 })
            .limit(5)
            .select('name businessType usageCount thumbnail');

        res.status(200).json({
            success: true,
            count: templates.length,
            total,
            totalPages: Math.ceil(total / limitNum),
            currentPage: pageNum,
            popularTemplates,
            data: templates
        });
    } catch (error) {
        console.error('Error getting business templates:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت قالب‌های کسب‌وکار'
        });
    }
};

// @desc    Get single business template
// @route   GET /api/business-templates/:id
// @access  Public
exports.getBusinessTemplate = async (req, res) => {
    try {
        const template = await BusinessTemplate.findById(req.params.id)
            .populate('createdBy', 'name email');

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب کسب‌وکار یافت نشد'
            });
        }

        // Get sample business cards created from this template
        const sampleCards = await BusinessCard.find({
            templateId: template._id,
            isActive: true
        })
            .limit(3)
            .select('title companyName images');

        res.status(200).json({
            success: true,
            data: {
                ...template.toObject(),
                sampleCards
            }
        });
    } catch (error) {
        console.error('Error getting business template:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'قالب کسب‌وکار یافت نشد'
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت قالب کسب‌وکار'
        });
    }
};

// @desc    Update business template
// @route   PUT /api/business-templates/:id
// @access  Private (Admin or Template Owner)
exports.updateBusinessTemplate = async (req, res) => {
    try {
        let template = await BusinessTemplate.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب کسب‌وکار یافت نشد'
            });
        }

        // Check if user owns the template or is admin
        if (template.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز ویرایش این قالب را ندارید'
            });
        }

        // Update template
        template = await BusinessTemplate.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: template,
            message: 'قالب کسب‌وکار با موفقیت به‌روزرسانی شد'
        });
    } catch (error) {
        console.error('Error updating business template:', error);

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
            message: 'خطای سرور در به‌روزرسانی قالب کسب‌وکار'
        });
    }
};

// @desc    Delete business template
// @route   DELETE /api/business-templates/:id
// @access  Private (Admin or Template Owner)
exports.deleteBusinessTemplate = async (req, res) => {
    try {
        const template = await BusinessTemplate.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب کسب‌وکار یافت نشد'
            });
        }

        // Check if user owns the template or is admin
        if (template.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز حذف این قالب را ندارید'
            });
        }

        // Check if template is being used
        const usageCount = await BusinessCard.countDocuments({ templateId: template._id });
        if (usageCount > 0) {
            return res.status(400).json({
                success: false,
                message: 'این قالب در حال استفاده است و نمی‌توان آن را حذف کرد',
                usageCount
            });
        }

        await template.remove();

        res.status(200).json({
            success: true,
            message: 'قالب کسب‌وکار با موفقیت حذف شد'
        });
    } catch (error) {
        console.error('Error deleting business template:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در حذف قالب کسب‌وکار'
        });
    }
};

// @desc    Get templates by business type
// @route   GET /api/business-templates/type/:businessType
// @access  Public
exports.getTemplatesByBusinessType = async (req, res) => {
    try {
        const { businessType } = req.params;
        const { limit = 10, category } = req.query;

        let query = {
            businessType,
            isActive: true
        };

        if (category) {
            query.category = category;
        }

        const templates = await BusinessTemplate.find(query)
            .limit(parseInt(limit))
            .sort({ usageCount: -1 })
            .populate('createdBy', 'name');

        res.status(200).json({
            success: true,
            count: templates.length,
            businessType,
            data: templates
        });
    } catch (error) {
        console.error('Error getting templates by business type:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت قالب‌ها'
        });
    }
};

// @desc    Get popular templates
// @route   GET /api/business-templates/popular
// @access  Public
exports.getPopularTemplates = async (req, res) => {
    try {
        const { limit = 6 } = req.query;

        const templates = await BusinessTemplate.find({ isActive: true })
            .sort({ usageCount: -1, rating: -1 })
            .limit(parseInt(limit))
            .populate('createdBy', 'name');

        res.status(200).json({
            success: true,
            count: templates.length,
            data: templates
        });
    } catch (error) {
        console.error('Error getting popular templates:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت قالب‌های محبوب'
        });
    }
};

// @desc    Rate a template
// @route   POST /api/business-templates/:id/rate
// @access  Private
exports.rateTemplate = async (req, res) => {
    try {
        const { rating } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'امتیاز باید بین ۱ تا ۵ باشد'
            });
        }

        const template = await BusinessTemplate.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب کسب‌وکار یافت نشد'
            });
        }

        // Check if user has created a business card using this template
        const userCard = await BusinessCard.findOne({
            templateId: template._id,
            userId: req.user.id
        });

        if (!userCard && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'برای امتیازدهی باید از این قالب استفاده کرده باشید'
            });
        }

        // Update template rating
        await template.updateRating(parseFloat(rating));

        res.status(200).json({
            success: true,
            message: 'امتیاز شما ثبت شد',
            data: {
                newAverage: template.rating.average,
                ratingCount: template.rating.count
            }
        });
    } catch (error) {
        console.error('Error rating template:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در ثبت امتیاز'
        });
    }
};

// @desc    Preview template with sample data
// @route   GET /api/business-templates/:id/preview
// @access  Public
exports.previewTemplate = async (req, res) => {
    try {
        const template = await BusinessTemplate.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب کسب‌وکار یافت نشد'
            });
        }

        // Create preview data by merging template defaults with sample content
        const previewData = {
            title: template.defaultFields.title || template.name,
            businessType: template.businessType,
            companyName: template.defaultFields.companyName || 'شرکت نمونه',
            ownerName: template.sampleContent.ownerName,
            phoneNumbers: template.sampleContent.phoneNumbers,
            address: template.sampleContent.address,
            description: template.defaultFields.description || 'توضیحات نمونه',
            services: template.defaultFields.services || [],
            workingHours: template.defaultFields.workingHours,
            socialMedia: template.defaultFields.socialMedia,
            images: template.defaultFields.images || [],
            tags: template.defaultFields.tags || [],
            styling: template.templateConfig,
            sections: template.sections
        };

        res.status(200).json({
            success: true,
            data: {
                template: {
                    id: template._id,
                    name: template.name,
                    version: template.version
                },
                preview: previewData,
                thumbnail: template.thumbnail
            }
        });
    } catch (error) {
        console.error('Error previewing template:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در نمایش پیش‌نمایش قالب'
        });
    }
};

// @desc    Duplicate template
// @route   POST /api/business-templates/:id/duplicate
// @access  Private (Admin or Template Designer)
exports.duplicateTemplate = async (req, res) => {
    try {
        const originalTemplate = await BusinessTemplate.findById(req.params.id);

        if (!originalTemplate) {
            return res.status(404).json({
                success: false,
                message: 'قالب کسب‌وکار یافت نشد'
            });
        }

        // Check if user can duplicate (admin or template owner)
        if (originalTemplate.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز کپی این قالب را ندارید'
            });
        }

        // Create a copy of the template
        const templateData = originalTemplate.toObject();
        delete templateData._id;
        delete templateData.__v;
        delete templateData.createdAt;
        delete templateData.updatedAt;
        delete templateData.usageCount;
        delete templateData.rating;

        // Update creator and name
        templateData.createdBy = req.user.id;
        templateData.name = `${templateData.name} (کپی)`;
        templateData.isActive = false; // Set as inactive initially
        templateData.version = '1.0.0-copy';

        // Create new template
        const newTemplate = await BusinessTemplate.create(templateData);

        res.status(201).json({
            success: true,
            data: newTemplate,
            message: 'قالب با موفقیت کپی شد'
        });
    } catch (error) {
        console.error('Error duplicating template:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در کپی کردن قالب'
        });
    }
};

// @desc    Get template statistics
// @route   GET /api/business-templates/:id/stats
// @access  Private (Admin or Template Owner)
exports.getTemplateStats = async (req, res) => {
    try {
        const template = await BusinessTemplate.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'قالب کسب‌وکار یافت نشد'
            });
        }

        // Check if user owns the template or is admin
        if (template.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز مشاهده آمار این قالب را ندارید'
            });
        }

        // Get usage statistics
        const totalUsage = template.usageCount;
        const activeCards = await BusinessCard.countDocuments({
            templateId: template._id,
            isActive: true
        });

        const verifiedCards = await BusinessCard.countDocuments({
            templateId: template._id,
            isVerified: true
        });

        // Get usage by business type (for this template's business type)
        const usageByCity = await BusinessCard.aggregate([
            {
                $match: {
                    templateId: new mongoose.Types.ObjectId(template._id),
                    'address.city': { $exists: true, $ne: '' }
                }
            },
            {
                $group: {
                    _id: '$address.city',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Get recent usage
        const recentUsage = await BusinessCard.find({
            templateId: template._id
        })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title createdAt');

        const stats = {
            basic: {
                name: template.name,
                businessType: template.businessType,
                version: template.version,
                createdAt: template.createdAt,
                isActive: template.isActive,
                isPremium: template.isPremium,
                price: template.price
            },
            usage: {
                totalUsage,
                activeCards,
                verifiedCards,
                inactiveCards: totalUsage - activeCards
            },
            rating: template.rating,
            popularity: {
                rank: await BusinessTemplate.countDocuments({
                    usageCount: { $gt: template.usageCount }
                }) + 1,
                totalTemplates: await BusinessTemplate.countDocuments()
            },
            geographic: {
                usageByCity
            },
            recentUsage
        };

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error getting template stats:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت آمار قالب'
        });
    }
};