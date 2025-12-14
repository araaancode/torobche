const ResumeTemplate = require('../models/ResumeTemplate');

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
exports.getAllTemplates = async (req, res) => {
    try {
        const templates = await ResumeTemplate.find({ isActive: true })
            .select('-htmlStructure -cssStyles')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: templates.length,
            data: templates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get single template
// @route   GET /api/templates/:id
// @access  Public
exports.getTemplate = async (req, res) => {
    try {
        const template = await ResumeTemplate.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                success: false,
                error: 'Template not found'
            });
        }

        res.status(200).json({
            success: true,
            data: template
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Create new template
// @route   POST /api/templates
// @access  Private/Admin
exports.createTemplate = async (req, res) => {
    try {
        const template = await ResumeTemplate.create(req.body);

        res.status(201).json({
            success: true,
            data: template
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

// @desc    Update template
// @route   PUT /api/templates/:id
// @access  Private/Admin
exports.updateTemplate = async (req, res) => {
    try {
        const template = await ResumeTemplate.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!template) {
            return res.status(404).json({
                success: false,
                error: 'Template not found'
            });
        }

        res.status(200).json({
            success: true,
            data: template
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

// @desc    Delete template
// @route   DELETE /api/templates/:id
// @access  Private/Admin
exports.deleteTemplate = async (req, res) => {
    try {
        const template = await ResumeTemplate.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                success: false,
                error: 'Template not found'
            });
        }

        await template.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};