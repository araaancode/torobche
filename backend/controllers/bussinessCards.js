const BusinessCard = require('../models/BussinessCard');
const mongoose = require('mongoose');

// @desc    Create a new business card
// @route   POST /api/business-cards
// @access  Private
exports.createBusinessCard = async (req, res) => {
    try {
        // Add user ID from auth middleware
        req.body.userId = "6924c610eaadce3699fc149f";

        // Create business card
        const businessCard = await BusinessCard.create(req.body);

        res.status(201).json({
            success: true,
            data: businessCard,
            message: 'کارت کسب‌وکار با موفقیت ایجاد شد'
        });
    } catch (error) {
        console.error('Error creating business card:', error);

        // Handle validation errors
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
            isActive
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
            .sort({ createdAt: -1 });

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

        // // Check if user owns the business card
        // if (businessCard.userId.toString() !== req.user.id && req.user.role !== 'admin') {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'شما مجوز ویرایش این کارت کسب‌وکار را ندارید'
        //     });
        // }

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
            .sort({ createdAt: -1 });

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
            .sort({ createdAt: -1 });

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