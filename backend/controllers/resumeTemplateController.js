const ResumeTemplate = require('../models/ResumeTemplate');

class ResumeTemplateController {
    // Create template
    static async createTemplate(req, res) {
        try {
            const template = new ResumeTemplate(req.body);
            await template.save();
            res.status(201).json({ success: true, template });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get all templates
    static async getAllTemplates(req, res) {
        try {
            const templates = await ResumeTemplate.find({ isActive: true });
            res.json({ success: true, templates });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get single template
    static async getTemplateById(req, res) {
        try {
            const { id } = req.params;
            const template = await ResumeTemplate.findById(id);

            if (!template) {
                return res.status(404).json({
                    success: false,
                    message: 'Template not found'
                });
            }

            res.json({ success: true, template });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update template
    static async updateTemplate(req, res) {
        try {
            const { id } = req.params;
            const template = await ResumeTemplate.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

            if (!template) {
                return res.status(404).json({
                    success: false,
                    message: 'Template not found'
                });
            }

            res.json({ success: true, template });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = ResumeTemplateController;