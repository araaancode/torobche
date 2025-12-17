// server/controllers/resumeController.js
const Resume = require('../models/Resume');
const mongoose = require('mongoose');

// ==================== Helper Functions ====================
const validateResumeData = (data) => {
    const errors = [];

    if (!data.personalInfo) {
        errors.push('Personal info is required');
    } else {
        if (!data.personalInfo.fullName) {
            errors.push('Full name is required');
        }
        if (!data.personalInfo.email) {
            errors.push('Email is required');
        }
    }

    return errors;
};

const formatResumeData = (data) => {
    return {
        templateId: data.templateId || 'modern',
        personalInfo: {
            fullName: data.personalInfo?.fullName || '',
            title: data.personalInfo?.title || '',
            email: data.personalInfo?.email || 'no-email@example.com',
            phone: data.personalInfo?.phone || '',
            address: {
                street: data.personalInfo?.address?.street || '',
                city: data.personalInfo?.address?.city || '',
                state: data.personalInfo?.address?.state || '',
                country: data.personalInfo?.address?.country || 'ایران',
                postalCode: data.personalInfo?.address?.postalCode || ''
            },
            about: data.personalInfo?.about || '',
            website: data.personalInfo?.website || '',
            linkedin: data.personalInfo?.linkedin || '',
            github: data.personalInfo?.github || '',
            twitter: data.personalInfo?.twitter || '',
            portfolio: data.personalInfo?.portfolio || ''
        },
        experience: data.experience || [],
        education: data.education || [],
        skills: data.skills || [],
        projects: data.projects || [],
        languages: data.languages || [],
        certifications: data.certifications || [],
        settings: {
            visibility: data.settings?.visibility || 'public',
            allowDownload: data.settings?.allowDownload !== false,
            allowComments: data.settings?.allowComments || false
        }
    };
};

// ==================== Controller Methods ====================

// ایجاد رزومه جدید
exports.createResume = async (req, res, next) => {
    try {
        console.log(' Creating new resume...');

        const validationErrors = validateResumeData(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }

        const formattedData = formatResumeData(req.body);

        const resume = new Resume(formattedData);
        const savedResume = await resume.save();

        console.log(` Resume created: ${savedResume.resumeId}`);

        // ساخت URLها
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        res.status(201).json({
            success: true,
            message: 'Resume created successfully',
            data: {
                resumeId: savedResume.resumeId,
                _id: savedResume._id,
                resumeUrl: `${baseUrl}/api/resumes/${savedResume.resumeId}`,
                viewUrl: `${baseUrl}/resume/${savedResume.resumeId}`,
                editUrl: `${baseUrl}/edit/${savedResume.resumeId}`,
                createdAt: savedResume.meta.createdAt,
                template: savedResume.templateId
            }
        });

    } catch (error) {
        console.error(' Create resume error:', error);
        next(error);
    }
};

// دریافت همه رزومه‌ها
exports.getAllResumes = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, sort = '-meta.createdAt' } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [resumes, total] = await Promise.all([
            Resume.find()
                .sort(sort)
                .skip(skip)
                .limit(parseInt(limit))
                .select('resumeId templateId personalInfo.fullName personalInfo.title personalInfo.email meta.createdAt meta.views settings.visibility')
                .lean(),
            Resume.countDocuments()
        ]);

        res.json({
            success: true,
            data: resumes,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });

    } catch (error) {
        console.error(' Get all resumes error:', error);
        next(error);
    }
};

// دریافت یک رزومه با ID
exports.getResumeById = async (req, res, next) => {
    try {
        const { id } = req.params;

        let resume;

        // بررسی اگر ObjectId معتبر است
        if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
            resume = await Resume.findById(id);
        } else {
            // جستجو با resumeId
            resume = await Resume.findOne({ resumeId: id });
        }

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // افزایش تعداد بازدید
        await resume.incrementViews();

        res.json({
            success: true,
            data: resume
        });

    } catch (error) {
        console.error(' Get resume by ID error:', error);
        next(error);
    }
};

// به‌روزرسانی رزومه
exports.updateResume = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        let resume;

        if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
            resume = await Resume.findById(id);
        } else {
            resume = await Resume.findOne({ resumeId: id });
        }

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // به‌روزرسانی فیلدها
        Object.keys(updateData).forEach(key => {
            if (key !== '_id' && key !== 'resumeId' && key !== 'meta') {
                resume[key] = updateData[key];
            }
        });

        await resume.save();

        res.json({
            success: true,
            message: 'Resume updated successfully',
            data: resume
        });

    } catch (error) {
        console.error(' Update resume error:', error);
        next(error);
    }
};

// حذف رزومه
exports.deleteResume = async (req, res, next) => {
    try {
        const { id } = req.params;

        let result;

        if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
            result = await Resume.findByIdAndDelete(id);
        } else {
            result = await Resume.findOneAndDelete({ resumeId: id });
        }

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        res.json({
            success: true,
            message: 'Resume deleted successfully',
            deletedId: result.resumeId
        });

    } catch (error) {
        console.error(' Delete resume error:', error);
        next(error);
    }
};

// دریافت آمار رزومه
exports.getResumeStats = async (req, res, next) => {
    try {
        const { id } = req.params;

        let resume;

        if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
            resume = await Resume.findById(id);
        } else {
            resume = await Resume.findOne({ resumeId: id });
        }

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        const stats = {
            general: {
                resumeId: resume.resumeId,
                template: resume.templateId,
                createdAt: resume.meta.createdAt,
                updatedAt: resume.meta.updatedAt
            },
            views: {
                total: resume.meta.views,
                lastViewed: resume.meta.lastViewed
            },
            downloads: {
                total: resume.meta.downloads,
                lastDownloaded: resume.meta.lastDownloaded
            },
            content: {
                experienceCount: resume.experience.length,
                educationCount: resume.education.length,
                skillCount: resume.skills.length,
                projectCount: resume.projects.length,
                languageCount: resume.languages.length,
                certificationCount: resume.certifications.length
            }
        };

        res.json({
            success: true,
            data: stats
        });

    } catch (error) {
        console.error(' Get resume stats error:', error);
        next(error);
    }
};

// تولید PDF (نسخه نمایشی)
exports.generatePDF = async (req, res, next) => {
    try {
        const { id } = req.params;

        let resume;

        if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
            resume = await Resume.findById(id);
        } else {
            resume = await Resume.findOne({ resumeId: id });
        }

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        await resume.incrementDownloads();

        res.json({
            success: true,
            message: 'PDF generation endpoint',
            data: {
                resumeId: resume.resumeId,
                fullName: resume.personalInfo.fullName,
                pdfUrl: `/download/${resume.resumeId}.pdf`,
                downloadCount: resume.meta.downloads
            }
        });

    } catch (error) {
        console.error(' Generate PDF error:', error);
        next(error);
    }
};

// جستجوی رزومه‌ها
exports.searchResumes = async (req, res, next) => {
    try {
        const { query } = req.query;

        if (!query || query.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Search query must be at least 2 characters'
            });
        }

        const searchRegex = new RegExp(query.trim(), 'i');

        const resumes = await Resume.find({
            $or: [
                { 'personalInfo.fullName': searchRegex },
                { 'personalInfo.title': searchRegex },
                { 'personalInfo.about': searchRegex },
                { 'experience.jobTitle': searchRegex },
                { 'experience.company': searchRegex },
                { 'education.institution': searchRegex },
                { 'skills.name': searchRegex }
            ],
            'settings.visibility': 'public'
        })
            .sort({ 'meta.views': -1 })
            .limit(50)
            .select('resumeId templateId personalInfo.fullName personalInfo.title personalInfo.about meta.createdAt meta.views')
            .lean();

        res.json({
            success: true,
            data: resumes,
            count: resumes.length,
            query: query
        });

    } catch (error) {
        console.error(' Search resumes error:', error);
        next(error);
    }
};