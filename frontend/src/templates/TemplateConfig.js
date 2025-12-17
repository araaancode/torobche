// client/src/templates/TemplateConfig.js
/**
 * پیکربندی کامل برای همه قالب‌های رزومه
 * هر قالب ویژگی‌های منحصر به فردی دارد
 */

export const templateConfigs = {
    modern: {
        id: 'modern',
        name: 'حرفه‌ای مدرن',
        description: 'طراحی مدرن و حرفه‌ای با رنگ‌های آبی و سبک مینیمال',
        icon: '💼',

        // طرح‌بندی
        layout: 'two-column', // دو ستونی
        columns: {
            left: 2, // عرض ستون چپ (از 3)
            right: 1  // عرض ستون راست (از 3)
        },

        // رنگ‌بندی
        colors: {
            primary: '#2563eb', // آبی اصلی
            secondary: '#1d4ed8', // آبی تیره
            accent: '#3b82f6', // آبی روشن
            background: '#ffffff', // پس‌زمینه سفید
            card: '#f8fafc', // رنگ کارت‌ها
            text: '#1f2937', // متن اصلی
            textSecondary: '#4b5563', // متن ثانویه
            border: '#e5e7eb', // حاشیه
            headerGradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)', // گرادیان هدر
            success: '#10b981', // سبز
            warning: '#f59e0b', // زرد
            danger: '#ef4444' // قرمز
        },

        // تایپوگرافی
        typography: {
            heading: 'Vazirmatn, sans-serif',
            body: 'Vazirmatn, sans-serif',
            mono: 'monospace',
            headingWeight: 700,
            bodyWeight: 400,
            fontSize: {
                base: '1rem',
                sm: '0.875rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem'
            }
        },

        // ویژگی‌های ظاهری
        features: {
            showSkillsChart: true, // نمایش نمودار مهارت‌ها
            showProgressBars: true, // نمایش نوارهای پیشرفت
            showPhoto: true, // نمایش عکس پروفایل
            showSocialIcons: true, // نمایش آیکون‌های اجتماعی
            showRatingStars: false, // نمایش ستاره‌های رتبه‌بندی
            roundedCorners: true, // گوشه‌های گرد
            shadow: 'lg', // سایه (sm, md, lg, xl, 2xl)
            borderWidth: '1px',
            spacing: '1.5rem',
            animation: true // انیمیشن‌ها
        },

        // نحوه نمایش بخش‌ها
        sections: {
            personalInfo: 'full', // کامل با عکس و اطلاعات
            experience: 'detailed', // با جزئیات کامل
            education: 'compact', // فشرده
            skills: 'withLevels', // با سطح مهارت
            projects: 'detailed', // با جزئیات
            languages: 'withLevels', // با سطح
            certifications: 'compact', // فشرده
            references: 'minimal' // حداقل
        },

        // المان‌های خاص
        elements: {
            skillChart: 'progress-bar', // نوع نمودار مهارت‌ها
            timeline: 'vertical', // خط زمان عمودی
            divider: 'gradient', // جداکننده گرادیان
            badgeStyle: 'rounded-full' // استایل نشان‌ها
        }
    },

    classic: {
        id: 'classic',
        name: 'کلاسیک',
        description: 'طراحی کلاسیک و رسمی با رنگ‌های گرم و ظاهر سنتی',
        icon: '📜',

        layout: 'single-column', // یک ستونی
        columns: {
            left: 3,
            right: 0
        },

        colors: {
            primary: '#92400e', // قهوه‌ای
            secondary: '#78350f',
            accent: '#b45309',
            background: '#fef3c7', // زرد کمرنگ
            card: '#fffbeb',
            text: '#1f2937',
            textSecondary: '#4b5563',
            border: '#fbbf24', // زرد
            headerGradient: 'linear-gradient(135deg, #92400e, #78350f)',
            success: '#059669',
            warning: '#d97706',
            danger: '#dc2626'
        },

        typography: {
            heading: 'Vazirmatn, serif',
            body: 'Vazirmatn, serif',
            mono: 'monospace',
            headingWeight: 700,
            bodyWeight: 400,
            fontSize: {
                base: '1rem',
                sm: '0.875rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem'
            }
        },

        features: {
            showSkillsChart: false,
            showProgressBars: false,
            showPhoto: false,
            showSocialIcons: true,
            showRatingStars: false,
            roundedCorners: false,
            shadow: 'md',
            borderWidth: '2px',
            spacing: '1.25rem',
            animation: false
        },

        sections: {
            personalInfo: 'compact',
            experience: 'detailed',
            education: 'detailed',
            skills: 'simple',
            projects: 'compact',
            languages: 'simple',
            certifications: 'detailed',
            references: 'detailed'
        },

        elements: {
            skillChart: 'none',
            timeline: 'classic',
            divider: 'solid',
            badgeStyle: 'rounded'
        }
    },

    minimal: {
        id: 'minimal',
        name: 'مینیمال',
        description: 'طراحی فوق العاده ساده و مینیمال با حداقل المان‌ها',
        icon: '⚫',

        layout: 'single-column',
        columns: {
            left: 3,
            right: 0
        },

        colors: {
            primary: '#4b5563', // خاکستری
            secondary: '#374151',
            accent: '#6b7280',
            background: '#ffffff',
            card: '#f9fafb',
            text: '#111827',
            textSecondary: '#6b7280',
            border: '#d1d5db',
            headerGradient: 'none',
            success: '#059669',
            warning: '#d97706',
            danger: '#dc2626'
        },

        typography: {
            heading: 'Vazirmatn, sans-serif',
            body: 'Vazirmatn, sans-serif',
            mono: 'monospace',
            headingWeight: 600,
            bodyWeight: 300,
            fontSize: {
                base: '1rem',
                sm: '0.875rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem'
            }
        },

        features: {
            showSkillsChart: false,
            showProgressBars: false,
            showPhoto: false,
            showSocialIcons: false,
            showRatingStars: false,
            roundedCorners: false,
            shadow: 'sm',
            borderWidth: '1px',
            spacing: '1rem',
            animation: false
        },

        sections: {
            personalInfo: 'minimal',
            experience: 'compact',
            education: 'compact',
            skills: 'simple',
            projects: 'minimal',
            languages: 'simple',
            certifications: 'minimal',
            references: 'none'
        },

        elements: {
            skillChart: 'none',
            timeline: 'simple',
            divider: 'none',
            badgeStyle: 'simple'
        }
    },

    technical: {
        id: 'technical',
        name: 'فنی',
        description: 'طراحی تخصصی برای مهندسان و توسعه‌دهندگان با نمودارهای فنی',
        icon: '💻',

        layout: 'two-column',
        columns: {
            left: 1,
            right: 2
        },

        colors: {
            primary: '#059669', // سبز
            secondary: '#047857',
            accent: '#10b981',
            background: '#f0fdfa',
            card: '#ecfdf5',
            text: '#064e3b',
            textSecondary: '#065f46',
            border: '#a7f3d0',
            headerGradient: 'linear-gradient(135deg, #059669, #047857)',
            success: '#10b981',
            warning: '#d97706',
            danger: '#ef4444'
        },

        typography: {
            heading: 'Vazirmatn, monospace',
            body: 'Vazirmatn, sans-serif',
            mono: 'monospace',
            headingWeight: 700,
            bodyWeight: 400,
            fontSize: {
                base: '0.875rem',
                sm: '0.75rem',
                lg: '1rem',
                xl: '1.125rem',
                '2xl': '1.25rem',
                '3xl': '1.5rem',
                '4xl': '1.875rem'
            }
        },

        features: {
            showSkillsChart: true,
            showProgressBars: true,
            showPhoto: true,
            showSocialIcons: true,
            showRatingStars: true,
            roundedCorners: true,
            shadow: 'lg',
            borderWidth: '1px',
            spacing: '1.5rem',
            animation: true
        },

        sections: {
            personalInfo: 'technical',
            experience: 'technical',
            education: 'compact',
            skills: 'withChart',
            projects: 'technical',
            languages: 'withLevels',
            certifications: 'detailed',
            references: 'compact'
        },

        elements: {
            skillChart: 'radial', // نمودار دایره‌ای
            timeline: 'technical',
            divider: 'dashed',
            badgeStyle: 'technical'
        }
    },

    creative: {
        id: 'creative',
        name: 'خلاقانه',
        description: 'طراحی هنری و خلاق با رنگ‌های جسورانه و افکت‌های ویژه',
        icon: '🎨',

        layout: 'two-column',
        columns: {
            left: 2,
            right: 1
        },

        colors: {
            primary: '#db2777', // صورتی
            secondary: '#be185d',
            accent: '#ec4899',
            background: '#fdf2f8',
            card: '#fce7f3',
            text: '#831843',
            textSecondary: '#9d174d',
            border: '#f9a8d4',
            headerGradient: 'linear-gradient(135deg, #db2777, #be185d)',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444'
        },

        typography: {
            heading: 'Vazirmatn, cursive',
            body: 'Vazirmatn, sans-serif',
            mono: 'monospace',
            headingWeight: 800,
            bodyWeight: 400,
            fontSize: {
                base: '1rem',
                sm: '0.875rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem'
            }
        },

        features: {
            showSkillsChart: false,
            showProgressBars: false,
            showPhoto: true,
            showSocialIcons: true,
            showRatingStars: true,
            roundedCorners: true,
            shadow: 'xl',
            borderWidth: '2px',
            spacing: '2rem',
            animation: true
        },

        sections: {
            personalInfo: 'creative',
            experience: 'detailed',
            education: 'detailed',
            skills: 'withIcons',
            projects: 'detailed',
            languages: 'withLevels',
            certifications: 'compact',
            references: 'minimal'
        },

        elements: {
            skillChart: 'icons',
            timeline: 'vertical',
            divider: 'gradient',
            badgeStyle: 'rounded-full'
        }
    }
};

/**
 * دریافت پیکربندی یک قالب خاص
 * @param {string} templateId - شناسه قالب
 * @returns {Object} پیکربندی قالب
 */
export const getTemplateConfig = (templateId) => {
    return templateConfigs[templateId] || templateConfigs.modern;
};

/**
 * تولید استایل‌های CSS بر اساس پیکربندی قالب
 * @param {string} templateId - شناسه قالب
 * @returns {Object} استایل‌های تولید شده
 */
export const generateTemplateStyles = (templateId) => {
    const config = getTemplateConfig(templateId);

    return {
        container: {
            fontFamily: config.typography.body,
            backgroundColor: config.colors.background,
            color: config.colors.text,
            borderRadius: config.features.roundedCorners ? '1rem' : '0',
            boxShadow: config.features.shadow === 'none' ? 'none' :
                config.features.shadow === 'sm' ? '0 1px 3px rgba(0,0,0,0.12)' :
                    config.features.shadow === 'md' ? '0 4px 6px rgba(0,0,0,0.1)' :
                        config.features.shadow === 'lg' ? '0 10px 25px rgba(0,0,0,0.15)' :
                            config.features.shadow === 'xl' ? '0 20px 40px rgba(0,0,0,0.2)' :
                                '0 10px 25px rgba(0,0,0,0.15)',
            overflow: 'hidden'
        },
        header: {
            background: config.colors.headerGradient === 'none' ?
                config.colors.primary :
                config.colors.headerGradient,
            color: 'white',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        },
        sectionTitle: {
            color: config.colors.primary,
            borderBottom: `2px solid ${config.colors.accent}`,
            display: 'flex',
            alignItems: 'center'
        },
        card: {
            backgroundColor: config.colors.card,
            border: `1px solid ${config.colors.border}`,
            borderRadius: config.features.roundedCorners ? '0.75rem' : '0.25rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        },
        skillBar: {
            backgroundColor: `${config.colors.textSecondary}20`,
            fill: config.colors.accent
        },
        progressCircle: {
            stroke: config.colors.accent,
            backgroundColor: `${config.colors.textSecondary}20`
        },
        badge: {
            backgroundColor: `${config.colors.accent}15`,
            color: config.colors.secondary,
            borderRadius: config.elements.badgeStyle === 'rounded-full' ? '9999px' :
                config.elements.badgeStyle === 'rounded' ? '0.5rem' :
                    config.elements.badgeStyle === 'technical' ? '0.25rem' :
                        '0.25rem',
            border: `1px solid ${config.colors.accent}30`
        }
    };
};

/**
 * دریافت لیست تمام قالب‌های موجود
 * @returns {Array} لیست قالب‌ها
 */
export const getAllTemplates = () => {
    return Object.values(templateConfigs).map(template => ({
        id: template.id,
        name: template.name,
        description: template.description,
        icon: template.icon
    }));
};

/**
 * دریافت قالب پیش‌فرض
 * @returns {Object} قالب پیش‌فرض
 */
export const getDefaultTemplate = () => {
    return templateConfigs.modern;
};

/**
 * دریافت قالب بر اساس نوع
 * @param {string} type - نوع قالب (modern, classic, minimal, technical, creative)
 * @returns {Object} پیکربندی قالب
 */
export const getTemplateByType = (type) => {
    return templateConfigs[type] || getDefaultTemplate();
};

/**
 * بررسی وجود قالب
 * @param {string} templateId - شناسه قالب
 * @returns {boolean} آیا قالب وجود دارد
 */
export const templateExists = (templateId) => {
    return templateConfigs.hasOwnProperty(templateId);
};