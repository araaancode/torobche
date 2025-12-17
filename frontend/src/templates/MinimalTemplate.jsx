// client/src/templates/MinimalTemplate.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    LinkIcon,
    CalendarIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    CodeBracketIcon,
    LanguageIcon,
    CheckBadgeIcon,
    ArrowRightIcon,
    ArrowDownTrayIcon,
    UserIcon,
    StarIcon,
    DocumentIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

const MinimalTemplate = ({ data, onPrint }) => {
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        projects = [],
        languages = [],
        certifications = []
    } = data || {};

    // پالت رنگ مینیمال
    const colors = useMemo(() => ({
        primary: '#111827',        // خاکستری تیره
        secondary: '#374151',      // خاکستری متوسط
        accent: '#000000',         // سیاه خالص
        background: '#ffffff',     // سفید خالص
        border: '#e5e7eb',        // خاکستری روشن
        highlight: '#000000'       // برای تأکید
    }), []);

    // انیمیشن‌های ساده
    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6 }
    };

    const slideUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    // کامپوننت خط جداکننده
    const Separator = () => (
        <div className="h-px w-full bg-gray-200 my-6" />
    );

    // کامپوننت بخش‌بندی
    const Section = ({ title, icon: Icon, children, delay = 0 }) => (
        <motion.section
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
        >
            <div className="flex items-center mb-4">
                {Icon && <Icon className="w-4 h-4 mr-3 text-gray-700" />}
                <h2 className="text-lg font-medium tracking-wide uppercase letter-spacing-2">
                    {title}
                </h2>
            </div>
            {children}
        </motion.section>
    );

    // کامپوننت آیتم تجربه
    const ExperienceItem = ({ exp, index }) => (
        <motion.div
            className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * index }}
        >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <div>
                    <h3 className="font-medium text-gray-900">{exp.jobTitle}</h3>
                    <p className="text-gray-700 text-sm">{exp.company}</p>
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-1 sm:mt-0">
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    <span>{exp.startDate} – {exp.current ? 'اکنون' : exp.endDate}</span>
                </div>
            </div>
            {exp.description && (
                <p className="text-gray-600 text-sm leading-relaxed mt-2">
                    {exp.description}
                </p>
            )}
        </motion.div>
    );

    // کامپوننت مهارت
    const SkillItem = ({ skill }) => {
        const skillName = typeof skill === 'object' ? skill.name : skill;
        const skillLevel = typeof skill === 'object' ? skill.level : null;

        return (
            <div className="flex items-center justify-between py-1">
                <span className="text-gray-700 text-sm">{skillName}</span>
                {skillLevel && (
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(skillLevel / 20) ? 'text-gray-900' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // کامپوننت پروژه
    const ProjectItem = ({ project, index }) => (
        <motion.div
            className="mb-3 last:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * index }}
        >
            <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                {project.year && (
                    <span className="text-gray-500 text-xs">{project.year}</span>
                )}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-2">
                {project.description}
            </p>
            {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                        <span
                            key={i}
                            className="text-xs text-gray-500 px-2 py-0.5 bg-gray-50 rounded"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    );

    return (
        <motion.div
            className="min-h-screen bg-white font-sans"
            style={{ color: colors.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* هدر اصلی */}
            <motion.header
                className="px-8 py-10 md:px-12 md:py-14"
                variants={slideUp}
                initial="initial"
                animate="animate"
            >
                <div className="max-w-4xl mx-auto">
                    {/* نام و عنوان */}
                    <div className="mb-6">
                        <motion.h1
                            className="text-4xl md:text-5xl font-light tracking-tight mb-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {personalInfo?.fullName}
                        </motion.h1>
                        <motion.p
                            className="text-lg text-gray-600"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {personalInfo?.title}
                        </motion.p>
                    </div>

                    {/* درباره */}
                    {personalInfo?.about && (
                        <motion.p
                            className="text-gray-700 leading-relaxed max-w-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {personalInfo.about}
                        </motion.p>
                    )}

                    {/* اطلاعات تماس */}
                    <motion.div
                        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {[
                            { icon: EnvelopeIcon, text: personalInfo?.email, href: personalInfo?.email ? `mailto:${personalInfo.email}` : null },
                            { icon: PhoneIcon, text: personalInfo?.phone, href: personalInfo?.phone ? `tel:${personalInfo.phone}` : null },
                            { icon: MapPinIcon, text: personalInfo?.address ? `${personalInfo.address.city}, ${personalInfo.address.country}` : null },
                            { icon: LinkIcon, text: personalInfo?.linkedin, href: personalInfo?.linkedin }
                        ].map((item, index) => (
                            item.text && (
                                <a
                                    key={index}
                                    href={item.href}
                                    target={item.href?.includes('http') ? "_blank" : undefined}
                                    rel={item.href?.includes('http') ? "noopener noreferrer" : undefined}
                                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
                                >
                                    <item.icon className="w-3 h-3 mr-2" />
                                    <span className="truncate">{item.text}</span>
                                    {item.href && (
                                        <ArrowRightIcon className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </a>
                            )
                        ))}
                    </motion.div>
                </div>
            </motion.header>

            <Separator />

            {/* محتوای اصلی */}
            <main className="px-8 md:px-12 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* ستون چپ */}
                        <div className="lg:col-span-2">
                            {/* تجربه کاری */}
                            {experience?.length > 0 && (
                                <Section
                                    title="سوابق کاری"
                                    icon={BriefcaseIcon}
                                    delay={0.1}
                                >
                                    <div className="space-y-0">
                                        {experience.map((exp, index) => (
                                            <ExperienceItem
                                                key={index}
                                                exp={exp}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </Section>
                            )}

                            {/* پروژه‌ها */}
                            {projects?.length > 0 && (
                                <Section
                                    title="پروژه‌ها"
                                    icon={CodeBracketIcon}
                                    delay={0.2}
                                >
                                    <div className="space-y-4">
                                        {projects.map((project, index) => (
                                            <ProjectItem
                                                key={index}
                                                project={project}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </Section>
                            )}

                            {/* تحصیلات */}
                            {education?.length > 0 && (
                                <Section
                                    title="تحصیلات"
                                    icon={AcademicCapIcon}
                                    delay={0.3}
                                >
                                    <div className="space-y-4">
                                        {education.map((edu, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex flex-col sm:flex-row sm:items-start sm:justify-between"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 * index }}
                                            >
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                                                    <p className="text-gray-700 text-sm">{edu.institution}</p>
                                                </div>
                                                <div className="text-gray-600 text-sm mt-1 sm:mt-0">
                                                    {edu.startDate} – {edu.endDate}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </Section>
                            )}
                        </div>

                        {/* ستون راست */}
                        <div>
                            {/* مهارت‌ها */}
                            {skills?.length > 0 && (
                                <Section
                                    title="مهارت‌ها"
                                    icon={CheckBadgeIcon}
                                    delay={0.4}
                                >
                                    <div className="space-y-2">
                                        {skills.slice(0, 8).map((skill, index) => (
                                            <SkillItem
                                                key={index}
                                                skill={skill}
                                            />
                                        ))}
                                    </div>
                                </Section>
                            )}

                            {/* زبان‌ها */}
                            {languages?.length > 0 && (
                                <Section
                                    title="زبان‌ها"
                                    icon={LanguageIcon}
                                    delay={0.5}
                                >
                                    <div className="space-y-3">
                                        {languages.map((lang, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex justify-between items-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 * index }}
                                            >
                                                <span className="text-gray-700 text-sm">{lang.name}</span>
                                                <span className="text-gray-500 text-xs uppercase tracking-wide">
                                                    {lang.level}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </Section>
                            )}

                            {/* گواهینامه‌ها */}
                            {certifications?.length > 0 && (
                                <Section
                                    title="گواهینامه‌ها"
                                    icon={DocumentIcon}
                                    delay={0.6}
                                >
                                    <div className="space-y-3">
                                        {certifications.map((cert, index) => (
                                            <motion.div
                                                key={index}
                                                className="text-gray-700"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 * index }}
                                            >
                                                <div className="font-medium text-sm">{cert.name}</div>
                                                <div className="text-gray-500 text-xs">{cert.issuer}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </Section>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* فوتر */}
            <motion.footer
                className="px-8 md:px-12 py-6 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                            <UserIcon className="w-3 h-3 mr-2" />
                            <span>{personalInfo?.fullName} • رزومه حرفه‌ای</span>
                        </div>
                        <div className="mt-2 sm:mt-0">
                            {onPrint && (
                                <button
                                    onClick={onPrint}
                                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowDownTrayIcon className="w-3 h-3 mr-1" />
                                    دریافت PDF
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.footer>

            {/* دکمه پرینت موبایل */}
            <motion.button
                className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg lg:hidden"
                onClick={onPrint}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ArrowDownTrayIcon className="w-5 h-5" />
            </motion.button>
        </motion.div>
    );
};

// استایل‌های داخلی برای مینیمالیسم
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    
    .minimal-template {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    .letter-spacing-2 {
        letter-spacing: 0.2em;
    }
    
    .print\\:hidden {
        @media print {
            display: none;
        }
    }
`;

// اضافه کردن استایل‌ها به صورت inline در صورت نیاز
const StyleTag = () => (
    <style dangerouslySetInnerHTML={{ __html: styles }} />
);

export default MinimalTemplate;
export { StyleTag };