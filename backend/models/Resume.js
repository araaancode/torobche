const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    resumeId: {
        type: String,
        required: true,
        unique: true
    },
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResumeTemplate',
        required: true
    },
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        address: String,
        linkedin: String,
        github: String
    },
    summary: String,
    education: [{
        institution: String,
        degree: String,
        field: String,
        startDate: String,
        endDate: String,
        description: String
    }],
    experience: [{
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String,
        responsibilities: [String]
    }],
    skills: [{
        category: String,
        items: [String]
    }],
    projects: [{
        name: String,
        description: String,
        technologies: [String],
        link: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', resumeSchema);