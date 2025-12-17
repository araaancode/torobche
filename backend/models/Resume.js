// server/models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    resumeId: {
        type: String,
        unique: true,
        default: () => `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    },

    templateId: {
        type: String,
        required: true,
        default: 'modern'
    },

    personalInfo: {
        fullName: {
            type: String,
            required: [true, 'Full name is required']
        },
        title: String,
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        phone: String,
        address: {
            street: String,
            city: String,
            state: String,
            country: {
                type: String,
                default: 'ایران'
            },
            postalCode: String
        },
        about: String,
        website: String,
        linkedin: String,
        github: String,
        twitter: String,
        portfolio: String
    },

    experience: [{
        jobTitle: String,
        company: String,
        location: String,
        startDate: String,
        endDate: String,
        current: {
            type: Boolean,
            default: false
        },
        description: String,
        achievements: [String]
    }],

    education: [{
        degree: String,
        field: String,
        institution: String,
        location: String,
        startDate: String,
        endDate: String,
        current: {
            type: Boolean,
            default: false
        },
        description: String,
        gpa: String,
        honors: [String]
    }],

    skills: [{
        name: String,
        level: {
            type: Number,
            min: 0,
            max: 100,
            default: 50
        },
        category: String,
        yearsOfExperience: Number
    }],

    projects: [{
        name: String,
        description: String,
        technologies: [String],
        link: String,
        startDate: String,
        endDate: String,
        role: String,
        teamSize: Number
    }],

    languages: [{
        name: String,
        proficiency: String,
        reading: String,
        writing: String,
        speaking: String
    }],

    certifications: [{
        name: String,
        issuer: String,
        issueDate: String,
        expiryDate: String,
        credentialId: String,
        link: String
    }],

    settings: {
        visibility: {
            type: String,
            enum: ['public', 'private', 'unlisted'],
            default: 'public'
        },
        allowDownload: {
            type: Boolean,
            default: true
        },
        allowComments: {
            type: Boolean,
            default: false
        }
    },

    meta: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        views: {
            type: Number,
            default: 0
        },
        downloads: {
            type: Number,
            default: 0
        },
        lastViewed: Date,
        lastDownloaded: Date
    }
}, {
    timestamps: true
});

resumeSchema.pre('save', function (next) {
    this.meta.updatedAt = new Date();
    next();
});

resumeSchema.methods.incrementViews = async function () {
    this.meta.views += 1;
    this.meta.lastViewed = new Date();
    return this.save();
};

resumeSchema.methods.incrementDownloads = async function () {
    this.meta.downloads += 1;
    this.meta.lastDownloaded = new Date();
    return this.save();
};

resumeSchema.index({ resumeId: 1 });
resumeSchema.index({ 'personalInfo.email': 1 });
resumeSchema.index({ 'meta.createdAt': -1 });

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;