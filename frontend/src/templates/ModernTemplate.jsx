// client/src/templates/ModernTemplate.jsx
import React, { useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    LinkIcon,
    CalendarIcon,
    AcademicCapIcon,
    CodeBracketIcon,
    StarIcon,
    ChartBarIcon,
    BriefcaseIcon,
    GlobeAltIcon,
    UserCircleIcon,
    WrenchScrewdriverIcon,
    TrophyIcon,
    SparklesIcon,
    ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { getTemplateConfig, generateTemplateStyles } from './TemplateConfig';
import { useRef } from 'react';

const ModernTemplate = ({ data, isPrintMode = false }) => {
    const containerRef = useRef();
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    const config = useMemo(() => getTemplateConfig('modern'), []);
    const styles = useMemo(() => generateTemplateStyles('modern'), []);

    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        projects = [],
        languages = [],
        certifications = []
    } = data;

    // انیمیشن‌های پیش‌فرض
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // کامپوننت مهارت با نمودار پیشرفته
    const SkillBar = ({ name, level, index }) => (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.colors.accent }} />
                    <span className="font-medium text-gray-800">{name}</span>
                </div>
                <span className="text-sm font-bold px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${config.colors.accent}15`, color: config.colors.secondary }}>
                    {level}%
                </span>
            </div>
            <div className="relative h-3 rounded-full overflow-hidden bg-gray-100">
                <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{
                        background: `linear-gradient(90deg, ${config.colors.primary}, ${config.colors.accent})`,
                        boxShadow: `0 2px 8px ${config.colors.accent}40`
                    }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.8, ease: "easeOut" }}
                />
                <div className="absolute inset-0 flex">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex-1 border-r border-white/30 last:border-r-0" />
                    ))}
                </div>
            </div>
        </div>
    );

    // کامپوننت تگ تکنولوژی
    const TechTag = ({ technology }) => (
        <motion.span
            className="px-3 py-1.5 text-xs font-medium rounded-full inline-flex items-center gap-1"
            style={{
                backgroundColor: `${config.colors.accent}10`,
                color: config.colors.secondary,
                border: `1px solid ${config.colors.accent}20`
            }}
            whileHover={{
                scale: 1.05,
                backgroundColor: `${config.colors.accent}20`
            }}
        >
            <CodeBracketIcon className="w-3 h-3" />
            {technology}
        </motion.span>
    );

    // کامپوننت کارت حرفه‌ای
    const ProfessionalCard = ({ children, className = "", hoverEffect = true }) => (
        <motion.div
            className={`rounded-2xl p-6 ${className}`}
            style={{
                backgroundColor: 'white',
                border: `1px solid ${config.colors.border}`,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}
            whileHover={hoverEffect ? {
                y: -4,
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
                borderColor: config.colors.accent
            } : {}}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );

    return (
        <motion.div
            ref={containerRef}
            className="resume-template modern-template font-sans"
            style={{
                ...styles.container,
                background: isPrintMode ? 'white' : `linear-gradient(135deg, ${config.colors.background} 0%, #f8fafc 100%)`,
                minHeight: '100vh'
            }}
            dir="rtl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* هدر مدرن با افکت شیشه‌ای */}
            <motion.div
                className="relative overflow-hidden"
                style={styles.header}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
            >
                {/* افکت پس‌زمینه */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                <div className="relative p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
                        {config.features.showPhoto && (
                            <motion.div
                                className="relative"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <div className="w-44 h-44 rounded-2xl overflow-hidden border-4 border-white/80 shadow-2xl">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                                        <UserCircleIcon className="w-24 h-24 text-gray-600" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <SparklesIcon className="w-6 h-6 text-white" />
                                </div>
                            </motion.div>
                        )}

                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-1 rounded-full" style={{ background: config.colors.accent }} />
                                    <span className="text-sm font-semibold tracking-wider uppercase opacity-70">
                                        Professional Resume
                                    </span>
                                </div>

                                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    {personalInfo.fullName}
                                </h1>

                                <motion.p
                                    className="text-2xl mb-6 font-medium"
                                    style={{ color: config.colors.secondary }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {personalInfo.title}
                                </motion.p>

                                <motion.p
                                    className="text-lg leading-relaxed max-w-3xl opacity-90"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {personalInfo.about}
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>

                    {/* اطلاعات تماس پیشرفته */}
                    <motion.div
                        className="mt-12 pt-8 border-t border-white/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: EnvelopeIcon, text: personalInfo.email, href: `mailto:${personalInfo.email}` },
                                { icon: PhoneIcon, text: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                                { icon: MapPinIcon, text: `${personalInfo.address?.city}, ${personalInfo.address?.country}` },
                                { icon: LinkIcon, text: personalInfo.linkedin, href: personalInfo.linkedin }
                            ].map((item, index) => (
                                item.text && (
                                    <motion.a
                                        key={index}
                                        href={item.href}
                                        target={item.href ? "_blank" : undefined}
                                        rel={item.href ? "noopener noreferrer" : undefined}
                                        className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${item.href ? 'cursor-pointer hover:shadow-lg' : ''}`}
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                        whileHover={item.href ? {
                                            y: -2,
                                            backgroundColor: 'rgba(255, 255, 255, 0.25)'
                                        } : {}}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                    >
                                        <div className="p-2 rounded-lg bg-white/20">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="flex-1">{item.text}</span>
                                        {item.href && <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-60" />}
                                    </motion.a>
                                )
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* محتوای اصلی */}
            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                {/* ستون چپ (اصلی) */}
                <div className="lg:col-span-2 space-y-8 md:space-y-12">
                    {/* سوابق کاری */}
                    {experience.length > 0 && (
                        <motion.section
                            variants={staggerContainer}
                            initial="initial"
                            animate={isInView ? "animate" : "initial"}
                        >
                            <motion.div variants={fadeInUp}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${config.colors.primary}15` }}>
                                        <BriefcaseIcon className="w-7 h-7" style={{ color: config.colors.primary }} />
                                    </div>
                                    <h3 className="text-3xl font-bold" style={{ color: config.colors.primary }}>
                                        سوابق کاری
                                    </h3>
                                </div>
                            </motion.div>

                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute right-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-transparent" />

                                <div className="space-y-8">
                                    {experience.map((exp, index) => (
                                        <motion.div
                                            key={index}
                                            variants={fadeInUp}
                                            className="relative"
                                        >
                                            <div className="absolute right-0 top-5 -translate-x-1/2">
                                                <div className="w-4 h-4 rounded-full border-4 border-white"
                                                    style={{ backgroundColor: config.colors.accent }} />
                                            </div>

                                            <ProfessionalCard>
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                                    <div>
                                                        <h4 className="text-2xl font-bold mb-2 text-gray-900">
                                                            {exp.jobTitle}
                                                        </h4>
                                                        <p className="text-lg font-medium" style={{ color: config.colors.secondary }}>
                                                            {exp.company}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50">
                                                        <CalendarIcon className="w-4 h-4 opacity-60" />
                                                        <span className="text-sm font-medium">
                                                            {exp.startDate} - {exp.current ? 'اکنون' : exp.endDate}
                                                        </span>
                                                    </div>
                                                </div>

                                                {exp.description && (
                                                    <div className="prose prose-lg max-w-none mt-6">
                                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                            {exp.description}
                                                        </p>
                                                    </div>
                                                )}

                                                {exp.achievements && exp.achievements.length > 0 && (
                                                    <ul className="mt-6 space-y-3">
                                                        {exp.achievements.map((achievement, idx) => (
                                                            <li key={idx} className="flex items-start gap-3">
                                                                <TrophyIcon className="w-5 h-5 mt-1 flex-shrink-0"
                                                                    style={{ color: config.colors.accent }} />
                                                                <span>{achievement}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </ProfessionalCard>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* پروژه‌ها */}
                    {projects.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: `${config.colors.accent}15` }}>
                                    <CodeBracketIcon className="w-7 h-7" style={{ color: config.colors.accent }} />
                                </div>
                                <h3 className="text-3xl font-bold" style={{ color: config.colors.primary }}>
                                    پروژه‌ها
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                    >
                                        <ProfessionalCard hoverEffect>
                                            <div className="flex items-start justify-between mb-4">
                                                <h4 className="text-xl font-bold text-gray-900">{project.title}</h4>
                                                {project.year && (
                                                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100">
                                                        {project.year}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

                                            {project.technologies && project.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {project.technologies.map((tech, techIndex) => (
                                                        <TechTag key={techIndex} technology={tech} />
                                                    ))}
                                                </div>
                                            )}

                                            {project.link && (
                                                <div className="mt-6 pt-4 border-t border-gray-100">
                                                    <a href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-sm font-medium"
                                                        style={{ color: config.colors.secondary }}>
                                                        مشاهده پروژه
                                                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            )}
                                        </ProfessionalCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>

                {/* ستون راست */}
                <div className="space-y-8 md:space-y-12">
                    {/* مهارت‌ها */}
                    {skills.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: `${config.colors.secondary}15` }}>
                                    <ChartBarIcon className="w-7 h-7" style={{ color: config.colors.secondary }} />
                                </div>
                                <h3 className="text-2xl font-bold" style={{ color: config.colors.primary }}>
                                    مهارت‌های تخصصی
                                </h3>
                            </div>

                            <ProfessionalCard>
                                <div className="space-y-6">
                                    {skills.slice(0, 6).map((skill, index) => {
                                        const skillName = typeof skill === 'object' ? skill.name : skill;
                                        const level = typeof skill === 'object' ? skill.level || 85 : 85;
                                        return (
                                            <SkillBar key={index} name={skillName} level={level} index={index} />
                                        );
                                    })}
                                </div>

                                {skills.length > 6 && (
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <div className="flex flex-wrap gap-2">
                                            {skills.slice(6, 12).map((skill, index) => {
                                                const skillName = typeof skill === 'object' ? skill.name : skill;
                                                return (
                                                    <span key={index}
                                                        className="px-3 py-1.5 text-sm rounded-lg bg-gray-50 text-gray-700 border border-gray-200">
                                                        {skillName}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </ProfessionalCard>
                        </motion.section>
                    )}

                    {/* تحصیلات */}
                    {education.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: `${config.colors.primary}15` }}>
                                    <AcademicCapIcon className="w-7 h-7" style={{ color: config.colors.primary }} />
                                </div>
                                <h3 className="text-2xl font-bold" style={{ color: config.colors.primary }}>
                                    تحصیلات
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        <ProfessionalCard hoverEffect={false}>
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                                                    <AcademicCapIcon className="w-6 h-6" style={{ color: config.colors.primary }} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg text-gray-900 mb-1">{edu.degree}</h4>
                                                    <p className="text-gray-700 mb-2">{edu.institution}</p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <CalendarIcon className="w-4 h-4" />
                                                        <span>{edu.startDate} - {edu.endDate}</span>
                                                    </div>
                                                    {edu.gpa && (
                                                        <div className="mt-2 inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-50 text-green-700">
                                                            GPA: {edu.gpa}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </ProfessionalCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* زبان‌ها */}
                    {languages.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: `${config.colors.accent}15` }}>
                                    <GlobeAltIcon className="w-7 h-7" style={{ color: config.colors.accent }} />
                                </div>
                                <h3 className="text-2xl font-bold" style={{ color: config.colors.primary }}>
                                    زبان‌ها
                                </h3>
                            </div>

                            <ProfessionalCard>
                                <div className="grid grid-cols-2 gap-4">
                                    {languages.map((lang, index) => (
                                        <div key={index} className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                            <div className="text-3xl mb-2" style={{ color: config.colors.primary }}>
                                                {lang.flag || '🌐'}
                                            </div>
                                            <div className="font-bold text-gray-900">{lang.name}</div>
                                            <div className="text-sm mt-1 px-3 py-1 inline-block rounded-full bg-gray-100 text-gray-600">
                                                {lang.level}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ProfessionalCard>
                        </motion.section>
                    )}

                    {/* گواهینامه‌ها */}
                    {certifications.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: `${config.colors.secondary}15` }}>
                                    <TrophyIcon className="w-7 h-7" style={{ color: config.colors.secondary }} />
                                </div>
                                <h3 className="text-2xl font-bold" style={{ color: config.colors.primary }}>
                                    گواهینامه‌ها
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                    >
                                        <ProfessionalCard hoverEffect={false}>
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                                                    <StarIcon className="w-5 h-5" style={{ color: config.colors.accent }} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{cert.name}</div>
                                                    <div className="text-sm text-gray-600 mt-1">{cert.issuer}</div>
                                                    {cert.date && (
                                                        <div className="text-xs text-gray-500 mt-2">
                                                            دریافت شده در {cert.date}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </ProfessionalCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </div>

            {/* فوتر مدرن */}
            <motion.footer
                className="mt-12 py-8 px-6 border-t"
                style={{ borderColor: config.colors.border }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <SparklesIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-lg" style={{ color: config.colors.primary }}>
                                    {personalInfo.fullName}
                                </p>
                                <p className="text-sm opacity-75">
                                    آخرین بروزرسانی: {new Date().toLocaleDateString('fa-IR')}
                                </p>
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-sm opacity-75">
                                رزومه حرفه‌ای ایجاد شده با{' '}
                                <span className="font-bold" style={{ color: config.colors.primary }}>
                                    CVBuilder Pro
                                </span>
                            </p>
                            <p className="text-xs mt-1 opacity-60">
                                قالب: <span style={{ color: config.colors.secondary }}>{config.name}</span> •
                                نسخه: ۲.۰
                            </p>
                        </div>
                    </div>
                </div>
            </motion.footer>
        </motion.div>
    );
};

export default ModernTemplate;