const Joi = require('joi');
const mongoose = require('mongoose');

// Resume validation schemas
const createResumeSchema = Joi.object({
    personalInfo: Joi.object({
        basic: Joi.object({
            firstName: Joi.string().required().messages({
                'any.required': 'نام الزامی است',
                'string.empty': 'نام نمی‌تواند خالی باشد'
            }),
            lastName: Joi.string().required().messages({
                'any.required': 'نام خانوادگی الزامی است',
                'string.empty': 'نام خانوادگی نمی‌تواند خالی باشد'
            }),
            title: Joi.string().max(100).messages({
                'string.max': 'عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد'
            }),
            summary: Joi.string().max(2000).messages({
                'string.max': 'خلاصه نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد'
            }),
            birthDate: Joi.date(),
            gender: Joi.string().valid('مرد', 'زن', 'ترجیح نمی‌دهم')
        }).required(),
        contact: Joi.array().items(
            Joi.object({
                type: Joi.string().valid('email', 'phone', 'linkedin', 'github', 'website', 'twitter', 'telegram').required(),
                value: Joi.string().required(),
                isPrimary: Joi.boolean(),
                isVisible: Joi.boolean()
            })
        ),
        location: Joi.object({
            country: Joi.string(),
            province: Joi.string(),
            city: Joi.string(),
            fullAddress: Joi.string()
        })
    }).required(),

    careerTarget: Joi.object({
        position: Joi.object({
            title: Joi.string(),
            level: Joi.string().valid('کارآموز', 'کارشناس', 'کارشناس ارشد', 'مدیر', 'مدیر ارشد'),
            industry: Joi.array().items(Joi.string())
        }),
        location: Joi.object({
            preferred: Joi.array().items(
                Joi.object({
                    city: Joi.string(),
                    country: Joi.string()
                })
            ),
            remote: Joi.boolean(),
            relocation: Joi.boolean()
        })
    }),

    displaySettings: Joi.object({
        layout: Joi.object({
            type: Joi.string().valid('تک‌ستونی', 'دوستونی', 'مدرن', 'کلاسیک')
        }),
        theme: Joi.object({
            colors: Joi.object({
                primary: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
                secondary: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
            })
        })
    })
});

const updateResumeSchema = Joi.object({
    personalInfo: Joi.object({
        basic: Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            title: Joi.string().max(100),
            summary: Joi.string().max(2000),
            birthDate: Joi.date(),
            gender: Joi.string().valid('مرد', 'زن', 'ترجیح نمی‌دهم')
        }),
        contact: Joi.array().items(
            Joi.object({
                type: Joi.string().valid('email', 'phone', 'linkedin', 'github', 'website', 'twitter', 'telegram'),
                value: Joi.string(),
                isPrimary: Joi.boolean(),
                isVisible: Joi.boolean()
            })
        )
    }),

    sections: Joi.object({
        education: Joi.array().items(
            Joi.object({
                degree: Joi.string().required(),
                fieldOfStudy: Joi.string().required(),
                institution: Joi.object({
                    name: Joi.string().required(),
                    type: Joi.string().valid('دانشگاه', 'موسسه', 'آموزشگاه'),
                    location: Joi.object({
                        city: Joi.string(),
                        country: Joi.string()
                    })
                }).required(),
                period: Joi.object({
                    startDate: Joi.date().required(),
                    endDate: Joi.date(),
                    isCurrent: Joi.boolean()
                }).required()
            })
        ),

        experience: Joi.array().items(
            Joi.object({
                title: Joi.string().required(),
                company: Joi.object({
                    name: Joi.string().required(),
                    industry: Joi.string()
                }).required(),
                employmentType: Joi.string().valid('تمام‌وقت', 'پاره‌وقت', 'پروژه‌ای', 'دورکاری'),
                period: Joi.object({
                    startDate: Joi.date().required(),
                    endDate: Joi.date(),
                    isCurrent: Joi.boolean()
                }).required(),
                description: Joi.string().max(2000)
            })
        ),

        skills: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                category: Joi.string().valid('تکنیکال', 'نرم', 'مدیریتی', 'زبان'),
                level: Joi.object({
                    value: Joi.number().min(1).max(5),
                    label: Joi.string().valid('آشنایی', 'متوسط', 'مسلط', 'تخصصی')
                }),
                experience: Joi.object({
                    years: Joi.number().min(0)
                })
            })
        )
    }),

    status: Joi.object({
        isPublic: Joi.boolean(),
        isDefault: Joi.boolean()
    })
}).min(1);

// Template validation schemas
const createTemplateSchema = Joi.object({
    name: Joi.string().required().max(100).messages({
        'any.required': 'نام قالب الزامی است',
        'string.max': 'نام قالب نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد'
    }),
    description: Joi.string().max(500),
    type: Joi.string().valid('free', 'premium', 'custom'),

    style: Joi.object({
        colors: Joi.object({
            primary: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
            secondary: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        })
    }),

    layout: Joi.object({
        type: Joi.string().valid('single-column', 'two-column', 'hybrid'),
        sections: Joi.object({
            order: Joi.array().items(
                Joi.object({
                    id: Joi.string().required(),
                    title: Joi.string().required(),
                    position: Joi.number().required()
                })
            )
        })
    }),

    files: Joi.object({
        html: Joi.object({
            content: Joi.string().required()
        }).required(),
        css: Joi.object({
            content: Joi.string().required()
        }).required()
    }).required(),

    metadata: Joi.object({
        categories: Joi.array().items(Joi.string()),
        tags: Joi.array().items(Joi.string())
    })
});

const updateTemplateSchema = Joi.object({
    name: Joi.string().max(100),
    description: Joi.string().max(500),

    style: Joi.object({
        colors: Joi.object({
            primary: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
            secondary: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        })
    }),

    files: Joi.object({
        html: Joi.object({
            content: Joi.string()
        }),
        css: Joi.object({
            content: Joi.string()
        })
    }),

    status: Joi.object({
        isPublished: Joi.boolean(),
        isFeatured: Joi.boolean()
    })
}).min(1);

// ObjectId validation
const objectIdSchema = Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
    }
    return value;
}, 'ObjectId validation');

module.exports = {
    createResumeSchema,
    updateResumeSchema,
    createTemplateSchema,
    updateTemplateSchema,
    objectIdSchema
};