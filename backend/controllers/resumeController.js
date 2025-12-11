const Resume = require('../models/Resume');
const { v4: uuidv4 } = require('uuid');
const qr = require('qr-image');

class ResumeController {
    // Create new resume
    static async createResume(req, res) {
        try {
            const { templateId, ...resumeData } = req.body;
            const resumeId = uuidv4();

            const resume = new Resume({
                resumeId,
                templateId,
                ...resumeData
            });

            await resume.save();
            res.status(201).json({
                success: true,
                resumeId,
                resume
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get all resumes
    static async getAllResumes(req, res) {
        try {
            const resumes = await Resume.find()
                .populate('templateId', 'name description thumbnail');
            res.json({ success: true, resumes });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get single resume by ID
    static async getResumeById(req, res) {
        try {
            const { id } = req.params;
            const resume = await Resume.findOne({ resumeId: id })
                .populate('templateId', 'name description thumbnail structure');

            if (!resume) {
                return res.status(404).json({
                    success: false,
                    message: 'Resume not found'
                });
            }

            res.json({ success: true, resume });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update resume
    static async updateResume(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const resume = await Resume.findOneAndUpdate(
                { resumeId: id },
                { ...updateData, updatedAt: Date.now() },
                { new: true }
            ).populate('templateId', 'name description thumbnail');

            if (!resume) {
                return res.status(404).json({
                    success: false,
                    message: 'Resume not found'
                });
            }

            res.json({ success: true, resume });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Generate QR code for resume
    static async generateQRCode(req, res) {
        try {
            const { id } = req.params;
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            const resumeUrl = `${frontendUrl}/resume/${id}`;

            const qr_png = qr.imageSync(resumeUrl, { type: 'png' });

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': qr_png.length
            });

            res.end(qr_png);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = ResumeController;