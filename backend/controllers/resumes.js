const Resume = require('../models/Resume');
const User = require('../models/User');
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const cloudinary = require('cloudinary').v2;
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const crypto = require('crypto');

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

// Helper function to validate resume data
const validateResumeData = (data) => {
    const errors = [];

    if (!data.personalInfo || !data.personalInfo.firstName || !data.personalInfo.lastName) {
        errors.push('نام و نام خانوادگی الزامی است');
    }

    if (!data.personalInfo.email) {
        errors.push('ایمیل الزامی است');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.personalInfo.email)) {
            errors.push('فرمت ایمیل نامعتبر است');
        }
    }

    if (!data.personalInfo.phone) {
        errors.push('شماره تلفن الزامی است');
    } else {
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(data.personalInfo.phone)) {
            errors.push('فرمت شماره تلفن نامعتبر است (۱۰ یا ۱۱ رقم)');
        }
    }

    return errors;
};

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
exports.createResume = async (req, res) => {
    try {
        // Add user ID
        req.body.userId = req.user.id;

        // Validate data
        const validationErrors = validateResumeData(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'خطا در اعتبارسنجی داده‌ها',
                errors: validationErrors
            });
        }

        // Create resume
        const resume = await Resume.create(req.body);

        res.status(201).json({
            success: true,
            data: resume,
            message: 'رزومه با موفقیت ایجاد شد'
        });
    } catch (error) {
        console.error('Error creating resume:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'خطای اعتبارسنجی',
                errors: messages
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'رزومه با این مشخصات قبلا ایجاد شده است'
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در ایجاد رزومه'
        });
    }
};

// @desc    Get all resumes (with filtering and pagination)
// @route   GET /api/resumes
// @access  Public (filtered) / Private (user's resumes)
exports.getResumes = async (req, res) => {
    try {
        const {
            userId,
            isPublic = 'true',
            isActive = 'true',
            search,
            tags,
            location,
            minExperience,
            maxExperience,
            educationLevel,
            jobType,
            industry,
            page = 1,
            limit = 10,
            sortBy = 'updatedAt',
            sortOrder = 'desc'
        } = req.query;

        // Build query
        let query = {};

        // Filter by user (for private access)
        if (userId) {
            if (userId !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'شما مجوز دسترسی به رزومه‌های این کاربر را ندارید'
                });
            }
            query.userId = userId;
        } else if (!req.user || req.user.role !== 'admin') {
            // Public access - only show public resumes
            query.isPublic = true;
            query.isActive = true;
        } else {
            // Admin access - can see all
            if (isPublic !== undefined) {
                query.isPublic = isPublic === 'true';
            }
            if (isActive !== undefined) {
                query.isActive = isActive === 'true';
            }
        }

        // Search filter
        if (search) {
            query.$or = [
                { 'personalInfo.firstName': new RegExp(search, 'i') },
                { 'personalInfo.lastName': new RegExp(search, 'i') },
                { 'personalInfo.title': new RegExp(search, 'i') },
                { 'personalInfo.summary': new RegExp(search, 'i') },
                { 'metadata.title': new RegExp(search, 'i') },
                { tags: new RegExp(search, 'i') }
            ];
        }

        // Tags filter
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagArray };
        }

        // Location filter
        if (location) {
            query.$or = [
                { 'personalInfo.address.city': new RegExp(location, 'i') },
                { 'personalInfo.address.province': new RegExp(location, 'i') },
                { 'targetJob.location': new RegExp(location, 'i') }
            ];
        }

        // Experience filter (requires aggregation for actual calculation)
        if (minExperience || maxExperience) {
            // This would require a more complex aggregation pipeline
            // For simplicity, we'll filter by number of experience entries
            if (minExperience) {
                query['experience.0'] = { $exists: true };
            }
        }

        // Education level filter
        if (educationLevel) {
            query['education.degree'] = new RegExp(educationLevel, 'i');
        }

        // Job type filter
        if (jobType) {
            query['targetJob.jobType'] = jobType;
        }

        // Industry filter
        if (industry) {
            query['targetJob.industry'] = new RegExp(industry, 'i');
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Sort
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Execute query
        const resumes = await Resume.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitNum)
            .populate('userId', 'name email profileImage');

        // Get total count
        const total = await Resume.countDocuments(query);

        // Calculate aggregation stats
        const stats = {
            total,
            totalPages: Math.ceil(total / limitNum),
            currentPage: pageNum,
            hasNextPage: pageNum < Math.ceil(total / limitNum),
            hasPrevPage: pageNum > 1
        };

        res.status(200).json({
            success: true,
            count: resumes.length,
            ...stats,
            data: resumes
        });
    } catch (error) {
        console.error('Error getting resumes:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت رزومه‌ها'
        });
    }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Public (if public) / Private (owner or admin)
exports.getResume = async (req, res) => {
    try {
        let resume = await Resume.findById(req.params.id)
            .populate('userId', 'name email profileImage')
            .populate('parentResumeId', 'metadata.title');

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check access permissions
        if (!resume.isPublic && resume.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز دسترسی به این رزومه را ندارید'
            });
        }

        // Check password protection
        if (resume.privacy.passwordProtected) {
            const password = req.headers['x-resume-password'] || req.query.password;
            if (!password || !resume.checkPassword(password)) {
                return res.status(401).json({
                    success: false,
                    message: 'این رزومه با رمز عبور محافظت شده است'
                });
            }
        }

        // Increment views
        resume = await Resume.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 }, $set: { lastViewed: new Date() } },
            { new: true }
        ).populate('userId', 'name email profileImage');

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Error getting resume:', error);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت رزومه'
        });
    }
};

// @desc    Get resume by short URL
// @route   GET /api/resumes/short/:shortUrl
// @access  Public
exports.getResumeByShortUrl = async (req, res) => {
    try {
        const { password } = req.query;

        const resume = await Resume.findOne({ shortUrl: req.params.shortUrl, isActive: true })
            .populate('userId', 'name email profileImage');

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check if resume is public
        if (!resume.isPublic) {
            return res.status(403).json({
                success: false,
                message: 'این رزومه عمومی نیست'
            });
        }

        // Check password protection
        if (resume.privacy.passwordProtected) {
            if (!password || !resume.checkPassword(password)) {
                return res.status(401).json({
                    success: false,
                    message: 'این رزومه با رمز عبور محافظت شده است',
                    requiresPassword: true
                });
            }
        }

        // Increment views
        resume.views += 1;
        resume.lastViewed = new Date();
        await resume.save();

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Error getting resume by short URL:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت رزومه'
        });
    }
};

// @desc    Get resume by unique code
// @route   GET /api/resumes/code/:uniqueCode
// @access  Public
exports.getResumeByUniqueCode = async (req, res) => {
    try {
        const { password } = req.query;

        const resume = await Resume.findOne({ uniqueCode: req.params.uniqueCode, isActive: true })
            .populate('userId', 'name email profileImage');

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check if resume is public
        if (!resume.isPublic) {
            return res.status(403).json({
                success: false,
                message: 'این رزومه عمومی نیست'
            });
        }

        // Check password protection
        if (resume.privacy.passwordProtected) {
            if (!password || !resume.checkPassword(password)) {
                return res.status(401).json({
                    success: false,
                    message: 'این رزومه با رمز عبور محافظت شده است',
                    requiresPassword: true
                });
            }
        }

        // Increment views
        resume.views += 1;
        resume.lastViewed = new Date();
        await resume.save();

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Error getting resume by unique code:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت رزومه'
        });
    }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private (owner or admin)
exports.updateResume = async (req, res) => {
    try {
        let resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check permissions
        if (resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز ویرایش این رزومه را ندارید'
            });
        }

        // Validate data if provided
        if (req.body.personalInfo) {
            const validationErrors = validateResumeData(req.body);
            if (validationErrors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'خطا در اعتبارسنجی داده‌ها',
                    errors: validationErrors
                });
            }
        }

        // Add change log entry
        if (req.body.changeDescription) {
            if (!resume.changeLog) {
                resume.changeLog = [];
            }

            resume.changeLog.push({
                version: resume.version + 1,
                changes: req.body.changeDescription,
                changedBy: req.user.id,
                changedAt: new Date()
            });

            req.body.version = resume.version + 1;
            delete req.body.changeDescription;
        }

        // Update resume
        resume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('userId', 'name email');

        res.status(200).json({
            success: true,
            data: resume,
            message: 'رزومه با موفقیت به‌روزرسانی شد'
        });
    } catch (error) {
        console.error('Error updating resume:', error);

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
            message: 'خطای سرور در به‌روزرسانی رزومه'
        });
    }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private (owner or admin)
exports.deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check permissions
        if (resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز حذف این رزومه را ندارید'
            });
        }

        // Check if this is the default resume
        if (resume.isDefault) {
            // Find another resume to set as default
            const otherResume = await Resume.findOne({
                userId: resume.userId,
                _id: { $ne: resume._id },
                isActive: true
            });

            if (otherResume) {
                otherResume.isDefault = true;
                await otherResume.save();
            }
        }

        // Soft delete (set isActive to false)
        resume.isActive = false;
        await resume.save();

        // Or hard delete:
        // await resume.remove();

        res.status(200).json({
            success: true,
            message: 'رزومه با موفقیت حذف شد'
        });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در حذف رزومه'
        });
    }
};

// @desc    Get user's resumes
// @route   GET /api/resumes/user/my-resumes
// @access  Private
exports.getMyResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.id, isActive: true })
            .sort({ isDefault: -1, updatedAt: -1 });

        res.status(200).json({
            success: true,
            count: resumes.length,
            data: resumes
        });
    } catch (error) {
        console.error('Error getting user resumes:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت رزومه‌های شما'
        });
    }
};

// @desc    Get default resume
// @route   GET /api/resumes/user/default
// @access  Private
exports.getDefaultResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            userId: req.user.id,
            isDefault: true,
            isActive: true
        });

        if (!resume) {
            // Get the most recent resume
            const recentResume = await Resume.findOne({
                userId: req.user.id,
                isActive: true
            }).sort({ updatedAt: -1 });

            if (!recentResume) {
                return res.status(404).json({
                    success: false,
                    message: 'هیچ رزومه‌ای یافت نشد'
                });
            }

            return res.status(200).json({
                success: true,
                data: recentResume,
                message: 'رزومه پیش‌فرض یافت نشد، آخرین رزومه برگردانده شد'
            });
        }

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Error getting default resume:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت رزومه پیش‌فرض'
        });
    }
};

// @desc    Set resume as default
// @route   PUT /api/resumes/:id/set-default
// @access  Private (owner)
exports.setAsDefault = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check ownership
        if (resume.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز تنظیم این رزومه به عنوان پیش‌فرض را ندارید'
            });
        }

        // Reset all other resumes' default status
        await Resume.updateMany(
            { userId: req.user.id, _id: { $ne: resume._id } },
            { $set: { isDefault: false } }
        );

        // Set this resume as default
        resume.isDefault = true;
        await resume.save();

        res.status(200).json({
            success: true,
            data: resume,
            message: 'رزومه با موفقیت به عنوان پیش‌فرض تنظیم شد'
        });
    } catch (error) {
        console.error('Error setting resume as default:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در تنظیم رزومه پیش‌فرض'
        });
    }
};

// @desc    Duplicate resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private (owner or admin)
exports.duplicateResume = async (req, res) => {
    try {
        const originalResume = await Resume.findById(req.params.id);

        if (!originalResume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check permissions
        if (originalResume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز کپی این رزومه را ندارید'
            });
        }

        // Clone the resume
        const newResume = await originalResume.clone(req.user.id, {
            title: req.body.title || `${originalResume.metadata.title} (کپی)`
        });

        res.status(201).json({
            success: true,
            data: newResume,
            message: 'رزومه با موفقیت کپی شد'
        });
    } catch (error) {
        console.error('Error duplicating resume:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در کپی کردن رزومه'
        });
    }
};

// @desc    Generate QR Code for resume
// @route   POST /api/resumes/:id/generate-qr
// @access  Private (owner or admin)
exports.generateQRCode = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check permissions
        if (resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز ایجاد QR Code برای این رزومه را ندارید'
            });
        }

        // Generate QR code with options
        const qrOptions = {
            size: req.body.size,
            foregroundColor: req.body.foregroundColor,
            backgroundColor: req.body.backgroundColor,
            text: req.body.text
        };

        const qrData = await resume.generateQRCode(qrOptions);

        res.status(200).json({
            success: true,
            message: 'QR Code با موفقیت ایجاد شد',
            data: qrData
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
// @route   GET /api/resumes/:id/qr-code
// @access  Public
exports.getQRCode = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check if resume is public
        if (!resume.isPublic) {
            return res.status(403).json({
                success: false,
                message: 'این رزومه عمومی نیست'
            });
        }

        // Generate QR code if not exists
        if (!resume.qrCode.data) {
            try {
                await resume.generateQRCode();
            } catch (generateError) {
                console.error('Error generating QR code:', generateError);
                return res.status(500).json({
                    success: false,
                    message: 'خطا در ایجاد QR Code'
                });
            }
        }

        // Increment QR scans
        await resume.incrementQrScans();

        // Return QR code image
        const base64Data = resume.qrCode.data.replace(/^data:image\/png;base64,/, '');
        const imgBuffer = Buffer.from(base64Data, 'base64');

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imgBuffer.length,
            'Cache-Control': 'public, max-age=86400',
            'X-QR-Version': resume.qrCode.version,
            'X-Resume-Id': resume._id,
            'X-Resume-Name': `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`
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

// @desc    Get QR Code with text
// @route   GET /api/resumes/:id/qr-code-with-text
// @access  Public
exports.getQRCodeWithText = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // This endpoint would generate a more complex QR code with text
        // For now, we'll return the regular QR code
        res.redirect(`/api/resumes/${req.params.id}/qr-code`);
    } catch (error) {
        console.error('Error getting QR code with text:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت QR Code'
        });
    }
};

// @desc    Update QR Code settings
// @route   PUT /api/resumes/:id/qr-settings
// @access  Private (owner or admin)
exports.updateQRSettings = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check permissions
        if (resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز ویرایش تنظیمات QR Code را ندارید'
            });
        }

        // Update QR settings
        const updatedConfig = await resume.updateQrConfig(req.body);

        res.status(200).json({
            success: true,
            message: 'تنظیمات QR Code با موفقیت به‌روزرسانی شد',
            data: updatedConfig
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
// @route   GET /api/resumes/:id/qr-analytics
// @access  Private (owner or admin)
exports.getQRAnalytics = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check permissions
        if (resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز مشاهده آمار QR Code را ندارید'
            });
        }

        const analytics = resume.getQrAnalytics();
        const stats = resume.getStats();

        res.status(200).json({
            success: true,
            data: {
                ...analytics,
                resumeStats: stats
            }
        });
    } catch (error) {
        console.error('Error getting QR analytics:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت آمار QR Code'
        });
    }
};

// @desc    Download resume as PDF
// @route   GET /api/resumes/:id/pdf
// @access  Public (if public) / Private (owner or admin)
exports.downloadPDF = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check access permissions
        if (!resume.isPublic && resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز دانلود این رزومه را ندارید'
            });
        }

        // Check password protection
        if (resume.privacy.passwordProtected) {
            const password = req.headers['x-resume-password'] || req.query.password;
            if (!password || !resume.checkPassword(password)) {
                return res.status(401).json({
                    success: false,
                    message: 'این رزومه با رمز عبور محافظت شده است'
                });
            }
        }

        // Check if download is allowed
        if (!resume.privacy.allowDownload) {
            return res.status(403).json({
                success: false,
                message: 'دانلود این رزومه مجاز نیست'
            });
        }

        // Increment downloads
        await resume.incrementDownloads();

        // Create PDF document
        const doc = new PDFDocument({
            size: resume.settings.pageSize || 'A4',
            margins: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            },
            info: {
                Title: resume.metadata.title,
                Author: `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`,
                Subject: 'رزومه',
                Keywords: resume.metadata.keywords?.join(', ') || '',
                Creator: 'Resume Builder',
                CreationDate: new Date()
            }
        });

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_Resume.pdf"`);
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('X-Resume-Id', resume._id);
        res.setHeader('X-Resume-Version', resume.version);

        // Pipe PDF to response
        doc.pipe(res);

        // Add content to PDF (simplified version)
        // Header
        doc.fontSize(24)
            .text(`${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`, { align: 'center' });

        if (resume.personalInfo.title) {
            doc.fontSize(16)
                .text(resume.personalInfo.title, { align: 'center' });
        }

        doc.moveDown();

        // Contact Information
        doc.fontSize(12)
            .text('اطلاعات تماس:', { underline: true });

        let contactInfo = `ایمیل: ${resume.personalInfo.email} | تلفن: ${resume.personalInfo.phone}`;
        if (resume.personalInfo.address?.city) {
            contactInfo += ` | شهر: ${resume.personalInfo.address.city}`;
        }

        doc.text(contactInfo);
        doc.moveDown();

        // Summary
        if (resume.personalInfo.summary) {
            doc.fontSize(12)
                .text('خلاصه:', { underline: true });
            doc.text(resume.personalInfo.summary, {
                width: 500,
                align: 'right'
            });
            doc.moveDown();
        }

        // Experience
        if (resume.experience && resume.experience.length > 0) {
            doc.fontSize(12)
                .text('سوابق کاری:', { underline: true });

            resume.experience.forEach((exp, index) => {
                const startDate = new Date(exp.startDate).toLocaleDateString('fa-IR');
                const endDate = exp.isCurrent ? 'تاکنون' : new Date(exp.endDate).toLocaleDateString('fa-IR');

                doc.text(`${exp.title} - ${exp.company}`, { continued: true });
                doc.text(` (${startDate} - ${endDate})`, { align: 'left' });

                if (exp.description) {
                    doc.text(exp.description, {
                        width: 500,
                        align: 'right',
                        indent: 20
                    });
                }

                if (index < resume.experience.length - 1) {
                    doc.moveDown(0.5);
                }
            });

            doc.moveDown();
        }

        // Education
        if (resume.education && resume.education.length > 0) {
            doc.fontSize(12)
                .text('تحصیلات:', { underline: true });

            resume.education.forEach((edu, index) => {
                const startDate = new Date(edu.startDate).toLocaleDateString('fa-IR');
                const endDate = edu.isCurrent ? 'تاکنون' : new Date(edu.endDate).toLocaleDateString('fa-IR');

                doc.text(`${edu.degree} در ${edu.field} - ${edu.university}`, { continued: true });
                doc.text(` (${startDate} - ${endDate})`, { align: 'left' });

                if (index < resume.education.length - 1) {
                    doc.moveDown(0.5);
                }
            });

            doc.moveDown();
        }

        // Skills
        if (resume.skills && resume.skills.length > 0) {
            doc.fontSize(12)
                .text('مهارت‌ها:', { underline: true });

            const skillsText = resume.skills.map(skill => skill.name).join('، ');
            doc.text(skillsText, {
                width: 500,
                align: 'right'
            });

            doc.moveDown();
        }

        // Footer with QR Code note
        doc.fontSize(10)
            .text('برای مشاهده نسخه آنلاین و اطلاعات بیشتر، QR Code رزومه را اسکن کنید.', {
                align: 'center',
                color: 'gray'
            });

        // Finalize PDF
        doc.end();

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در ایجاد PDF'
        });
    }
};

// @desc    Export resume as JSON
// @route   GET /api/resumes/:id/json
// @access  Public (if public) / Private (owner or admin)
exports.exportJSON = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check access permissions
        if (!resume.isPublic && resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز اکسپورت این رزومه را ندارید'
            });
        }

        // Check password protection
        if (resume.privacy.passwordProtected) {
            const password = req.headers['x-resume-password'] || req.query.password;
            if (!password || !resume.checkPassword(password)) {
                return res.status(401).json({
                    success: false,
                    message: 'این رزومه با رمز عبور محافظت شده است'
                });
            }
        }

        // Increment downloads
        await resume.incrementDownloads();

        const jsonData = resume.exportAsJson();

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_Resume.json"`);
        res.send(jsonData);

    } catch (error) {
        console.error('Error exporting JSON:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در اکسپورت رزومه'
        });
    }
};

// @desc    Export resume as vCard
// @route   GET /api/resumes/:id/vcard
// @access  Public (if public) / Private (owner or admin)
exports.exportVCard = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check access permissions
        if (!resume.isPublic && resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز اکسپورت این رزومه را ندارید'
            });
        }

        // Check password protection
        if (resume.privacy.passwordProtected) {
            const password = req.headers['x-resume-password'] || req.query.password;
            if (!password || !resume.checkPassword(password)) {
                return res.status(401).json({
                    success: false,
                    message: 'این رزومه با رمز عبور محافظت شده است'
                });
            }
        }

        const vcard = resume.generateVCard();

        res.setHeader('Content-Type', 'text/vcard');
        res.setHeader('Content-Disposition', `attachment; filename="${resume.personalInfo.firstName}_${resume.personalInfo.lastName}.vcf"`);
        res.send(vcard);

    } catch (error) {
        console.error('Error exporting vCard:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در ایجاد vCard'
        });
    }
};

// @desc    Search resumes (public search)
// @route   GET /api/resumes/search/public
// @access  Public
exports.searchResumes = async (req, res) => {
    try {
        const {
            query,
            location,
            skills,
            educationLevel,
            jobType,
            industry,
            page = 1,
            limit = 10,
            sortBy = 'updatedAt',
            sortOrder = 'desc'
        } = req.query;

        // Only search public resumes
        const searchParams = {
            query,
            location,
            skills,
            educationLevel,
            jobType,
            page,
            limit,
            sortBy,
            sortOrder
        };

        const results = await Resume.search(searchParams);

        res.status(200).json({
            success: true,
            ...results
        });
    } catch (error) {
        console.error('Error searching resumes:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در جستجوی رزومه‌ها'
        });
    }
};

// @desc    Get resume statistics
// @route   GET /api/resumes/stats/overall
// @access  Private (admin) or Public (user's own stats)
exports.getResumeStats = async (req, res) => {
    try {
        let userId = null;

        // If user is not admin, they can only see their own stats
        if (req.user.role !== 'admin') {
            userId = req.user.id;
        } else if (req.query.userId) {
            // Admin can specify user ID
            userId = req.query.userId;
        }

        const stats = await Resume.getStats(userId);
        const qrStats = await Resume.getQrStats(userId);

        res.status(200).json({
            success: true,
            data: {
                ...stats,
                qrCodeStats: qrStats
            }
        });
    } catch (error) {
        console.error('Error getting resume stats:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت آمار رزومه‌ها'
        });
    }
};

// @desc    Get popular resumes
// @route   GET /api/resumes/popular
// @access  Public
exports.getPopularResumes = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const resumes = await Resume.find({
            isPublic: true,
            isActive: true
        })
            .sort({ views: -1, 'qrCode.scans': -1 })
            .limit(parseInt(limit))
            .select('personalInfo firstName lastName title metadata views qrCode.scans shortUrl')
            .populate('userId', 'name');

        res.status(200).json({
            success: true,
            count: resumes.length,
            data: resumes
        });
    } catch (error) {
        console.error('Error getting popular resumes:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت رزومه‌های محبوب'
        });
    }
};

// @desc    Update resume privacy settings
// @route   PUT /api/resumes/:id/privacy
// @access  Private (owner or admin)
exports.updatePrivacySettings = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check permissions
        if (resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز ویرایش تنظیمات حریم خصوصی را ندارید'
            });
        }

        // Update privacy settings
        resume.privacy = {
            ...resume.privacy,
            ...req.body
        };

        // Handle password protection
        if (req.body.passwordProtected !== undefined) {
            if (req.body.passwordProtected && req.body.password) {
                resume.privacy.password = req.body.password;
            } else if (!req.body.passwordProtected) {
                resume.privacy.password = null;
            }
        }

        await resume.save();

        res.status(200).json({
            success: true,
            data: {
                privacy: resume.privacy
            },
            message: 'تنظیمات حریم خصوصی با موفقیت به‌روزرسانی شد'
        });
    } catch (error) {
        console.error('Error updating privacy settings:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در به‌روزرسانی تنظیمات حریم خصوصی'
        });
    }
};

// @desc    Update resume settings
// @route   PUT /api/resumes/:id/settings
// @access  Private (owner or admin)
exports.updateSettings = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check permissions
        if (resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز ویرایش تنظیمات را ندارید'
            });
        }

        // Update settings
        resume.settings = {
            ...resume.settings,
            ...req.body
        };

        await resume.save();

        res.status(200).json({
            success: true,
            data: {
                settings: resume.settings
            },
            message: 'تنظیمات با موفقیت به‌روزرسانی شد'
        });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در به‌روزرسانی تنظیمات'
        });
    }
};

// @desc    Upload profile image
// @route   POST /api/resumes/:id/upload-image
// @access  Private (owner or admin)
exports.uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'لطفا یک تصویر انتخاب کنید'
            });
        }

        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check permissions
        if (resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز آپلود تصویر برای این رزومه را ندارید'
            });
        }

        // Upload to Cloudinary
        if (process.env.CLOUDINARY_CLOUD_NAME) {
            try {
                // Delete old image if exists
                if (resume.profileImage.publicId) {
                    await cloudinary.uploader.destroy(resume.profileImage.publicId);
                }

                // Upload new image
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'resumes/profile-images',
                    public_id: `profile_${resume._id}`,
                    overwrite: true,
                    resource_type: 'image'
                });

                // Update resume with new image
                resume.profileImage = {
                    url: uploadResult.secure_url,
                    publicId: uploadResult.public_id,
                    alt: `عکس پروفایل ${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`
                };

                await resume.save();

                res.status(200).json({
                    success: true,
                    data: {
                        profileImage: resume.profileImage
                    },
                    message: 'تصویر پروفایل با موفقیت آپلود شد'
                });

            } catch (cloudinaryError) {
                console.error('Cloudinary upload error:', cloudinaryError);
                return res.status(500).json({
                    success: false,
                    message: 'خطا در آپلود تصویر به Cloudinary'
                });
            }
        } else {
            // Local file upload
            const imageUrl = `/uploads/resumes/${req.file.filename}`;

            resume.profileImage = {
                url: imageUrl,
                alt: `عکس پروفایل ${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`
            };

            await resume.save();

            res.status(200).json({
                success: true,
                data: {
                    profileImage: resume.profileImage
                },
                message: 'تصویر پروفایل با موفقیت آپلود شد'
            });
        }

    } catch (error) {
        console.error('Error uploading profile image:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در آپلود تصویر پروفایل'
        });
    }
};

// @desc    Verify resume (admin only)
// @route   PUT /api/resumes/:id/verify
// @access  Private (admin)
exports.verifyResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Only admin can verify
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'فقط ادمین می‌تواند رزومه را تایید کند'
            });
        }

        resume.isVerified = true;
        await resume.save();

        res.status(200).json({
            success: true,
            data: resume,
            message: 'رزومه با موفقیت تایید شد'
        });
    } catch (error) {
        console.error('Error verifying resume:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در تایید رزومه'
        });
    }
};

// @desc    Get change log
// @route   GET /api/resumes/:id/changelog
// @access  Private (owner or admin)
exports.getChangeLog = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id)
            .select('changeLog version')
            .populate('changeLog.changedBy', 'name email');

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'رزومه یافت نشد'
            });
        }

        // Check permissions
        if (resume.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'شما مجوز مشاهده تغییرات این رزومه را ندارید'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                changeLog: resume.changeLog,
                currentVersion: resume.version
            }
        });
    } catch (error) {
        console.error('Error getting change log:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در دریافت تاریخچه تغییرات'
        });
    }
};

// @desc    Restore to previous version
// @route   POST /api/resumes/:id/restore/:version
// @access  Private (owner or admin)
exports.restoreVersion = async (req, res) => {
    try {
        // This would require versioning system implementation
        // For now, we'll return a placeholder
        res.status(501).json({
            success: false,
            message: 'این قابلیت در حال توسعه است'
        });
    } catch (error) {
        console.error('Error restoring version:', error);
        res.status(500).json({
            success: false,
            message: 'خطای سرور در بازگردانی نسخه'
        });
    }
}