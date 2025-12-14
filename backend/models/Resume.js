const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    institution: {
        type: String,
        required: [true, 'Institution name is required']
    },
    degree: {
        type: String,
        required: [true, 'Degree is required']
    },
    field: {
        type: String,
        required: [true, 'Field of study is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: Date,
    description: String,
    isCurrent: {
        type: Boolean,
        default: false
    },
    location: String,
    gpa: Number
});

const experienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required']
    },
    position: {
        type: String,
        required: [true, 'Position is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: Date,
    description: String,
    isCurrent: {
        type: Boolean,
        default: false
    },
    location: String,
    achievements: [String]
});

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required']
    },
    level: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    category: {
        type: String,
        enum: ['technical', 'soft', 'language', 'tool', 'other'],
        default: 'technical'
    },
    yearsOfExperience: Number
});

const resumeSchema = new mongoose.Schema({
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResumeTemplate',
        required: [true, 'Template ID is required']
    },
    publicId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    personalInfo: {
        fullName: {
            type: String,
            required: [true, 'Full name is required']
        },
        jobTitle: {
            type: String,
            required: [true, 'Job title is required']
        },
        summary: {
            type: String,
            maxlength: 500
        },
        avatar: String,
        profession: String,
        dateOfBirth: Date,
        nationality: String
    },
    contactInfo: {
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        phone: String,
        address: String,
        city: String,
        country: String,
        website: String,
        postalCode: String
    },
    education: [educationSchema],
    workExperience: [experienceSchema],
    skills: [skillSchema],
    projects: [{
        title: String,
        description: String,
        technologies: [String],
        link: String,
        startDate: Date,
        endDate: Date
    }],
    certifications: [{
        name: String,
        issuer: String,
        date: Date,
        credentialId: String,
        link: String
    }],
    languages: [{
        name: String,
        proficiency: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced', 'native']
        }
    }],
    socialLinks: {
        linkedin: String,
        github: String,
        twitter: String,
        stackoverflow: String,
        behance: String,
        dribbble: String
    },
    qrCodeUrl: String,
    settings: {
        isPublic: {
            type: Boolean,
            default: true
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        },
        viewCount: {
            type: Number,
            default: 0
        },
        downloadCount: {
            type: Number,
            default: 0
        }
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
resumeSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Increment view count when accessed
resumeSchema.methods.incrementViewCount = async function () {
    this.settings.viewCount += 1;
    await this.save();
};

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;