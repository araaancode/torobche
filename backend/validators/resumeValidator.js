const Joi = require('joi');

const resumeValidator = Joi.object({
    templateId: Joi.string().required().messages({
        'string.empty': 'Template ID is required',
        'any.required': 'Template ID is required'
    }),

    personalInfo: Joi.object({
        fullName: Joi.string().required().min(2).max(100).messages({
            'string.empty': 'Full name is required',
            'string.min': 'Full name must be at least 2 characters',
            'string.max': 'Full name must be less than 100 characters'
        }),
        jobTitle: Joi.string().required().min(2).max(100).messages({
            'string.empty': 'Job title is required',
            'string.min': 'Job title must be at least 2 characters',
            'string.max': 'Job title must be less than 100 characters'
        }),
        summary: Joi.string().max(500).optional(),
        avatar: Joi.string().uri().optional(),
        profession: Joi.string().optional(),
        dateOfBirth: Joi.date().optional(),
        nationality: Joi.string().optional()
    }).required(),

    contactInfo: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email',
            'string.empty': 'Email is required'
        }),
        phone: Joi.string().optional(),
        address: Joi.string().optional(),
        city: Joi.string().optional(),
        country: Joi.string().optional(),
        website: Joi.string().uri().optional(),
        postalCode: Joi.string().optional()
    }).required(),

    education: Joi.array().items(
        Joi.object({
            institution: Joi.string().required(),
            degree: Joi.string().required(),
            field: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().optional(),
            description: Joi.string().optional(),
            isCurrent: Joi.boolean().optional(),
            location: Joi.string().optional(),
            gpa: Joi.number().min(0).max(4).optional()
        })
    ).optional(),

    workExperience: Joi.array().items(
        Joi.object({
            company: Joi.string().required(),
            position: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().optional(),
            description: Joi.string().optional(),
            isCurrent: Joi.boolean().optional(),
            location: Joi.string().optional(),
            achievements: Joi.array().items(Joi.string()).optional()
        })
    ).optional(),

    skills: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            level: Joi.number().min(1).max(5).optional(),
            category: Joi.string().valid('technical', 'soft', 'language', 'tool', 'other').optional(),
            yearsOfExperience: Joi.number().min(0).optional()
        })
    ).optional(),

    socialLinks: Joi.object({
        linkedin: Joi.string().uri().optional(),
        github: Joi.string().uri().optional(),
        twitter: Joi.string().uri().optional(),
        stackoverflow: Joi.string().uri().optional(),
        behance: Joi.string().uri().optional(),
        dribbble: Joi.string().uri().optional()
    }).optional()
});

module.exports = resumeValidator;