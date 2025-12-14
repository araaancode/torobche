const mongoose = require('mongoose');

const resumeTemplateSchema = new mongoose.Schema({
    templateName: {
        type: String,
        required: [true, 'Template name is required'],
        unique: true,
        trim: true
    },
    previewImage: {
        type: String,
        required: [true, 'Preview image is required']
    },
    htmlStructure: {
        type: String,
        required: [true, 'HTML structure is required']
    },
    cssStyles: {
        type: String,
        required: [true, 'CSS styles are required']
    },
    themeColors: {
        primary: {
            type: String,
            default: '#2563eb'
        },
        secondary: {
            type: String,
            default: '#64748b'
        },
        background: {
            type: String,
            default: '#ffffff'
        },
        text: {
            type: String,
            default: '#1e293b'
        },
        accent: {
            type: String,
            default: '#3b82f6'
        }
    },
    sections: [{
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['personal', 'education', 'experience', 'skills', 'projects', 'certifications', 'languages', 'summary'],
            required: true
        },
        required: {
            type: Boolean,
            default: false
        },
        maxItems: {
            type: Number,
            default: 10
        },
        order: {
            type: Number,
            default: 0
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    version: {
        type: String,
        default: '1.0'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field on save
resumeTemplateSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const ResumeTemplate = mongoose.model('ResumeTemplate', resumeTemplateSchema);

module.exports = ResumeTemplate;