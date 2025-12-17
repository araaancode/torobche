// client/src/templates/CorporateClassicTemplate.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CalendarIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    GlobeAltIcon,
    UserIcon,
    LanguageIcon,
    CheckBadgeIcon,
    TrophyIcon,
    StarIcon
} from '@heroicons/react/24/outline';
import { getTemplateConfig, generateTemplateStyles } from './TemplateConfig';

const CorporateClassicTemplate = ({ data }) => {
    const config = getTemplateConfig('corporate-classic');
    const styles = generateTemplateStyles('corporate-classic');

    const { personalInfo, experience, education, skills, projects, languages, certifications } = data;

    // محاسبه سال‌های تجربه
    const calculateTotalExperience = () => {
        if (!experience || experience.length === 0) return 0;
        const earliestYear = Math.min(...experience.map(exp => {
            const year = parseInt(exp.startDate.split('/')[0]);
            return isNaN(year) ? new Date().getFullYear() : year;
        }));
        return new Date().getFullYear() - earliestYear;
    };

    return (
        <motion.div
            className="resume-template corporate-classic-template"
            style={styles.container}
            dir="rtl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* هدر حرفه‌ای با گرادیانت شرکتی */}
            <motion.header
                className="relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.dark} 100%)`,
                    color: config.colors.light
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* الگوی دکوراتیو */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 border-2 border-white rounded-full -translate-x-32 -translate-y-32"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 border-2 border-white rounded-full translate-x-32 translate-y-32"></div>
                </div>

                <div className="relative z-10 p-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* بخش اطلاعات شخصی */}
                        <div className="flex-1 text-center md:text-right">
                            <motion.h1
                                className="text-5xl font-bold mb-4 leading-tight"
                                style={{ fontFamily: "'Vazirmatn', sans-serif" }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {personalInfo.fullName}
                            </motion.h1>
                            <motion.p
                                className="text-2xl mb-6 opacity-90"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {personalInfo.title}
                            </motion.p>
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <TrophyIcon className="w-5 h-5" />
                                <span className="font-medium">بیش از {calculateTotalExperience()} سال تجربه</span>
                            </motion.div>
                        </div>

                        {/* آواتار و اطلاعات تماس */}
                        <motion.div
                            className="flex flex-col items-center space-y-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* آواتار دایره‌ای */}
                            <div className="relative">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                                    {personalInfo.avatar ? (
                                        <img
                                            src={personalInfo.avatar}
                                            alt={personalInfo.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center"
                                            style={{ backgroundColor: config.colors.accent }}>
                                            <UserIcon className="w-20 h-20 text-white" />
                                        </div>
                                    )}
                                </div>
                                {/* نشان‌تایید */}
                                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: config.colors.success }}>
                                    <CheckBadgeIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            {/* اطلاعات تماس */}
                            <div className="space-y-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <EnvelopeIcon className="w-5 h-5" />
                                    <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                                        {personalInfo.email}
                                    </a>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <PhoneIcon className="w-5 h-5" />
                                    <a href={`tel:${personalInfo.phone}`} className="hover:underline">
                                        {personalInfo.phone}
                                    </a>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <MapPinIcon className="w-5 h-5" />
                                    <span>{personalInfo.address?.full || `${personalInfo.address?.city}، ${personalInfo.address?.country}`}</span>
                                </div>
                                {personalInfo.website && (
                                    <div className="flex items-center justify-center gap-2">
                                        <GlobeAltIcon className="w-5 h-5" />
                                        <a href={personalInfo.website} target="_blank" rel="noopener noreferrer"
                                            className="hover:underline truncate max-w-xs">
                                            {personalInfo.website.replace(/^https?:\/\//, '')}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.header>

            {/* محتوای اصلی */}
            <div className="p-10">
                {/* خلاصه پروفایل */}
                {personalInfo.about && (
                    <motion.section
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-3xl font-bold mb-8 pb-4 relative" style={{ color: config.colors.primary }}>
                            <span className="relative">
                                خلاصه پروفایل
                                <span className="absolute bottom-0 right-0 w-full h-1 rounded-full"
                                    style={{ backgroundColor: config.colors.accent }}></span>
                            </span>
                        </h2>
                        <div className="p-8 rounded-2xl shadow-lg" style={styles.card}>
                            <p className="text-lg leading-relaxed text-justify">{personalInfo.about}</p>
                        </div>
                    </motion.section>
                )}

                {/* سوابق کاری */}
                {experience.length > 0 && (
                    <motion.section
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold mb-8 pb-4 relative" style={{ color: config.colors.primary }}>
                            <span className="flex items-center gap-3">
                                <BriefcaseIcon className="w-8 h-8" />
                                سوابق کاری
                            </span>
                        </h2>
                        <div className="relative">
                            {/* خط زمانی */}
                            <div className="absolute right-7 top-0 bottom-0 w-0.5"
                                style={{ backgroundColor: config.colors.accent }}></div>

                            <div className="space-y-8">
                                {experience.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative pr-14"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {/* نقطه خط زمانی */}
                                        <div className="absolute right-4 top-6 w-6 h-6 rounded-full border-4"
                                            style={{
                                                backgroundColor: styles.container.backgroundColor,
                                                borderColor: config.colors.accent
                                            }}></div>

                                        <div className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                            style={styles.card}>
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-2">{exp.jobTitle}</h3>
                                                    <p className="text-xl mb-3" style={{ color: config.colors.secondary }}>
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                                                    style={{
                                                        backgroundColor: `${config.colors.accent}15`,
                                                        color: config.colors.secondary
                                                    }}>
                                                    <CalendarIcon className="w-5 h-5" />
                                                    <span className="font-medium">
                                                        {exp.startDate} - {exp.current ? 'اکنون' : exp.endDate}
                                                    </span>
                                                </div>
                                            </div>

                                            {exp.description && (
                                                <div className="mt-4">
                                                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                                        {exp.description}
                                                    </p>
                                                </div>
                                            )}

                                            {exp.achievements && exp.achievements.length > 0 && (
                                                <div className="mt-6 pt-6 border-t" style={{ borderColor: config.colors.border }}>
                                                    <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                                                        <StarIcon className="w-5 h-5" />
                                                        دستاوردهای کلیدی
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {exp.achievements.map((achievement, idx) => (
                                                            <li key={idx} className="flex items-start gap-2">
                                                                <span className="w-2 h-2 rounded-full mt-2"
                                                                    style={{ backgroundColor: config.colors.accent }}></span>
                                                                <span>{achievement}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* بخش‌های کنار هم */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* تحصیلات */}
                    {education.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold mb-8 pb-4 relative" style={{ color: config.colors.primary }}>
                                <span className="flex items-center gap-3">
                                    <AcademicCapIcon className="w-8 h-8" />
                                    تحصیلات
                                </span>
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                        style={styles.card}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                                        <p className="text-lg mb-3" style={{ color: config.colors.secondary }}>
                                            {edu.institution}
                                        </p>
                                        {edu.field && (
                                            <p className="text-gray-600 mb-3">رشته: {edu.field}</p>
                                        )}
                                        <div className="flex items-center gap-2 text-sm">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span>{edu.startDate} - {edu.endDate}</span>
                                        </div>
                                        {edu.description && (
                                            <p className="mt-3 text-gray-700">{edu.description}</p>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* بخش راست (مهارت‌ها، زبان‌ها، گواهینامه‌ها) */}
                    <div className="space-y-8">
                        {/* مهارت‌ها */}
                        {skills.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h2 className="text-3xl font-bold mb-8 pb-4 relative" style={{ color: config.colors.primary }}>
                                    <span className="flex items-center gap-3">
                                        <DocumentTextIcon className="w-8 h-8" />
                                        مهارت‌ها
                                    </span>
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill, index) => (
                                        <motion.span
                                            key={index}
                                            className="px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                                            style={{
                                                backgroundColor: `${config.colors.accent}15`,
                                                color: config.colors.secondary,
                                                border: `2px solid ${config.colors.accent}30`
                                            }}
                                            whileHover={{
                                                backgroundColor: config.colors.accent,
                                                color: 'white',
                                                borderColor: config.colors.accent
                                            }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* زبان‌ها */}
                        {languages && languages.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h2 className="text-3xl font-bold mb-6 pb-4 relative" style={{ color: config.colors.primary }}>
                                    <span className="flex items-center gap-3">
                                        <LanguageIcon className="w-8 h-8" />
                                        زبان‌ها
                                    </span>
                                </h2>
                                <div className="space-y-4">
                                    {languages.map((lang, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="font-medium">{lang.name}</span>
                                                <span className="text-sm" style={{ color: config.colors.secondary }}>
                                                    {lang.level}
                                                </span>
                                            </div>
                                            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: config.colors.accent }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${lang.proficiency || 80}%` }}
                                                    transition={{ delay: index * 0.1, duration: 1 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* گواهینامه‌ها */}
                        {certifications && certifications.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <h2 className="text-3xl font-bold mb-6 pb-4 relative" style={{ color: config.colors.primary }}>
                                    <span className="flex items-center gap-3">
                                        <CheckBadgeIcon className="w-8 h-8" />
                                        گواهینامه‌ها
                                    </span>
                                </h2>
                                <div className="space-y-4">
                                    {certifications.map((cert, index) => (
                                        <div key={index} className="p-4 rounded-lg"
                                            style={{
                                                backgroundColor: `${config.colors.accent}10`,
                                                borderRight: `4px solid ${config.colors.accent}`
                                            }}>
                                            <h4 className="font-bold">{cert.name}</h4>
                                            <p className="text-sm opacity-75">{cert.issuer}</p>
                                            {cert.date && (
                                                <p className="text-xs mt-2">{cert.date}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>
                </div>

                {/* پروژه‌ها (اختیاری) */}
                {projects && projects.length > 0 && (
                    <motion.section
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <h2 className="text-3xl font-bold mb-8 pb-4 relative" style={{ color: config.colors.primary }}>
                            پروژه‌های شاخص
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    style={styles.card}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                                    {project.technologies && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.slice(0, 3).map((tech, idx) => (
                                                <span key={idx} className="text-xs px-2 py-1 rounded"
                                                    style={{
                                                        backgroundColor: `${config.colors.accent}20`,
                                                        color: config.colors.secondary
                                                    }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <p className="text-gray-700 line-clamp-3">{project.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* فوتر */}
                <motion.footer
                    className="pt-8 mt-12 border-t text-center"
                    style={{ borderColor: config.colors.border }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-sm opacity-75">
                        آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR')}
                    </p>
                    <p className="text-xs mt-2 opacity-50">
                        رزومه حرفه‌ای تولید شده با سیستم مدیریت رزومه
                    </p>
                </motion.footer>
            </div>
        </motion.div>
    );
};

export default CorporateClassicTemplate;