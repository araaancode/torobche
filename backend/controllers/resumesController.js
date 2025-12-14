const Resume = require('../models/Resume');
const ResumeTemplate = require('../models/ResumeTemplate');
const qr = require('qr-image');
const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Public
exports.createResume = async (req, res) => {
    try {
        // Generate unique public ID
        const publicId = shortid.generate();

        // Check if template exists
        const template = await ResumeTemplate.findById(req.body.templateId);
        if (!template) {
            return res.status(404).json({
                success: false,
                error: 'Template not found'
            });
        }

        // Generate QR code
        const qrCodeUrl = await generateQRCode(publicId);

        // Create resume
        const resumeData = {
            ...req.body,
            publicId,
            qrCodeUrl
        };

        const resume = await Resume.create(resumeData);

        res.status(201).json({
            success: true,
            data: {
                id: resume._id,
                publicId: resume.publicId,
                qrCodeUrl: resume.qrCodeUrl,
                message: 'رزومه با موفقیت ایجاد شد'
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// @desc    Get resume by public ID (summary)
// @route   GET /api/r/:publicId
// @access  Public
exports.getResumeSummary = async (req, res) => {
    try {
        const resume = await Resume.findOne({ publicId: req.params.publicId })
            .populate('templateId', 'templateName themeColors');

        if (!resume) {
            return res.status(404).json({
                success: false,
                error: 'رزومه پیدا نشد'
            });
        }

        // Increment view count
        await resume.incrementViewCount();

        // Return summary data only
        const summary = {
            personalInfo: {
                fullName: resume.personalInfo.fullName,
                jobTitle: resume.personalInfo.jobTitle,
                summary: resume.personalInfo.summary,
                avatar: resume.personalInfo.avatar
            },
            skills: resume.skills.slice(0, 5).map(skill => ({
                name: skill.name,
                level: skill.level
            })),
            template: resume.templateId,
            publicId: resume.publicId,
            viewCount: resume.settings.viewCount
        };

        res.status(200).json({
            success: true,
            data: summary
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get full resume by public ID
// @route   GET /api/r/:publicId/full
// @access  Public
exports.getFullResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ publicId: req.params.publicId })
            .populate('templateId');

        if (!resume) {
            return res.status(404).json({
                success: false,
                error: 'رزومه پیدا نشد'
            });
        }

        // Increment view count
        await resume.incrementViewCount();

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get resume by ID (for editing)
// @route   GET /api/resumes/:id
// @access  Public
exports.getResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id)
            .populate('templateId');

        if (!resume) {
            return res.status(404).json({
                success: false,
                error: 'رزومه پیدا نشد'
            });
        }

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Public
exports.updateResume = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!resume) {
            return res.status(404).json({
                success: false,
                error: 'رزومه پیدا نشد'
            });
        }

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Public
exports.deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                error: 'رزومه پیدا نشد'
            });
        }

        // Delete QR code file if exists
        if (resume.qrCodeUrl && resume.qrCodeUrl.includes('public/qr-codes')) {
            const qrPath = path.join(__dirname, '..', resume.qrCodeUrl);
            if (fs.existsSync(qrPath)) {
                fs.unlinkSync(qrPath);
            }
        }

        await resume.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'رزومه با موفقیت حذف شد'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get resume QR code
// @route   GET /api/resumes/:id/qr
// @access  Public
exports.getResumeQRCode = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume || !resume.qrCodeUrl) {
            return res.status(404).json({
                success: false,
                error: 'QR Code not found'
            });
        }

        // Return QR code URL
        res.status(200).json({
            success: true,
            data: {
                qrCodeUrl: resume.qrCodeUrl
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Helper function to generate QR code
const generateQRCode = async (publicId) => {
    return new Promise((resolve, reject) => {
        try {
            const qrCodeDir = path.join(__dirname, '../public/qr-codes');

            // Create directory if it doesn't exist
            if (!fs.existsSync(qrCodeDir)) {
                fs.mkdirSync(qrCodeDir, { recursive: true });
            }

            const qrCodePath = path.join(qrCodeDir, `${publicId}.png`);
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            const resumeUrl = `${frontendUrl}/r/${publicId}`;

            // Generate QR code
            const qr_png = qr.image(resumeUrl, { type: 'png', size: 10 });

            // Save to file
            const writeStream = fs.createWriteStream(qrCodePath);
            qr_png.pipe(writeStream);

            writeStream.on('finish', () => {
                resolve(`/public/qr-codes/${publicId}.png`);
            });

            writeStream.on('error', (error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
};