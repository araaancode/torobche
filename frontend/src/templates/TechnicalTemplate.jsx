// client/src/templates/TechnicalTemplate.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
    CpuChipIcon,
    CodeBracketIcon,
    ServerIcon,
    WrenchScrewdriverIcon,
    ChartBarSquareIcon,
    CommandLineIcon, // به جای TerminalIcon
    EnvelopeIcon,    // اضافه کردن آیکون‌های لازم
    PhoneIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import { getTemplateConfig, generateTemplateStyles } from './TemplateConfig';

const TechnicalTemplate = ({ data }) => {
    const config = getTemplateConfig('technical');
    const styles = generateTemplateStyles('technical');

    const { personalInfo, experience, skills, projects, education, languages, certifications } = data;

    return (
        <motion.div
            className="resume-template technical-template font-mono"
            style={styles.container}
            dir="rtl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* هدر فنی */}
            <div className="p-8" style={{
                background: `linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary})`,
                color: 'white'
            }}>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-3">{personalInfo.fullName}</h1>
                        <div className="flex items-center space-x-4 space-x-reverse mb-4">
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <CpuChipIcon className="w-5 h-5" />
                                <span>{personalInfo.title}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <CodeBracketIcon className="w-5 h-5" />
                                <span>توسعه‌دهنده نرم‌افزار</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-white/10 p-3 rounded">
                                <div className="font-bold flex items-center">
                                    <EnvelopeIcon className="w-4 h-4 ml-1" />
                                    ایمیل
                                </div>
                                <div>{personalInfo.email}</div>
                            </div>
                            <div className="bg-white/10 p-3 rounded">
                                <div className="font-bold flex items-center">
                                    <PhoneIcon className="w-4 h-4 ml-1" />
                                    تلفن
                                </div>
                                <div>{personalInfo.phone}</div>
                            </div>
                            <div className="bg-white/10 p-3 rounded">
                                <div className="font-bold flex items-center">
                                    <MapPinIcon className="w-4 h-4 ml-1" />
                                    موقعیت
                                </div>
                                <div>{personalInfo.address?.city}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30">
                        <div className="w-full h-full bg-gradient-to-br from-emerald-200 to-emerald-400 flex items-center justify-center">
                            <CommandLineIcon className="w-16 h-16 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* محتوای اصلی */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ستون چپ - مهارت‌ها تخصصی */}
                <div>
                    {/* نمودار مهارت‌ها */}
                    {skills.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <ChartBarSquareIcon className="w-5 h-5 ml-2" />
                                مهارت‌های فنی
                            </h3>
                            <div className="space-y-4">
                                {skills.slice(0, 6).map((skill, index) => {
                                    const skillName = typeof skill === 'object' ? skill.name : skill;
                                    const level = typeof skill === 'object' ? skill.level || 85 : 85;
                                    return (
                                        <div key={index}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm">{skillName}</span>
                                                <span className="text-xs font-mono">{level}%</span>
                                            </div>
                                            <div className="h-2 rounded-full overflow-hidden bg-gray-200">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: config.colors.accent }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${level}%` }}
                                                    transition={{ delay: index * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* تکنولوژی‌ها */}
                    <motion.div
                        className="mb-8 p-4 rounded"
                        style={styles.card}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="font-bold mb-3 flex items-center">
                            <WrenchScrewdriverIcon className="w-5 h-5 ml-2" />
                            تکنولوژی‌ها
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                            {['React', 'Node.js', 'Python', 'Docker', 'AWS', 'MongoDB', 'Git', 'Linux', 'Redis'].map((tech, index) => (
                                <div
                                    key={index}
                                    className="text-center p-2 rounded text-sm"
                                    style={{
                                        backgroundColor: `${config.colors.accent}15`,
                                        color: config.colors.secondary
                                    }}
                                >
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* زبان‌ها */}
                    {languages && languages.length > 0 && (
                        <motion.div
                            className="mb-8 p-4 rounded"
                            style={styles.card}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h4 className="font-bold mb-3">زبان‌ها</h4>
                            <div className="space-y-2">
                                {languages.map((lang, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span>{lang.name}</span>
                                        <span className="text-sm" style={{ color: config.colors.accent }}>
                                            {lang.level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* ستون وسط و راست - تجربیات و پروژه‌ها */}
                <div className="lg:col-span-2">
                    {/* تجربیات */}
                    {experience.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-2xl font-bold mb-6 border-b pb-2" style={{ borderColor: config.colors.accent }}>
                                تجربیات کاری
                            </h3>
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div key={index} className="relative">
                                        <div className="absolute right-0 top-0 w-2 h-full" style={{ backgroundColor: config.colors.accent }}></div>
                                        <div className="pr-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="text-xl font-bold">{exp.jobTitle}</h4>
                                                    <p className="text-lg" style={{ color: config.colors.secondary }}>{exp.company}</p>
                                                </div>
                                                <span className="text-sm px-2 py-1 rounded"
                                                    style={{
                                                        backgroundColor: `${config.colors.accent}20`,
                                                        color: config.colors.secondary
                                                    }}>
                                                    {exp.startDate} - {exp.current ? 'اکنون' : exp.endDate}
                                                </span>
                                            </div>
                                            <div className="p-4 rounded border-r-4"
                                                style={{
                                                    borderColor: config.colors.primary,
                                                    backgroundColor: `${config.colors.card}`
                                                }}>
                                                <pre className="text-sm whitespace-pre-line font-sans">{exp.description}</pre>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* پروژه‌ها */}
                    {projects.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-bold mb-6 border-b pb-2" style={{ borderColor: config.colors.accent }}>
                                <ServerIcon className="w-6 h-6 inline ml-2" />
                                پروژه‌ها
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projects.map((project, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg border"
                                        style={{
                                            borderColor: config.colors.border,
                                            backgroundColor: config.colors.card
                                        }}
                                    >
                                        <h4 className="font-bold mb-2">{project.title}</h4>
                                        <p className="text-sm mb-3">{project.description}</p>
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-2 py-1 text-xs rounded"
                                                        style={{
                                                            backgroundColor: `${config.colors.accent}20`,
                                                            color: config.colors.secondary
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* تحصیلات */}
                    {education && education.length > 0 && (
                        <motion.div
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-2xl font-bold mb-6 border-b pb-2" style={{ borderColor: config.colors.accent }}>
                                تحصیلات
                            </h3>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="ml-4 mt-1">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.colors.accent }}></div>
                                            {index !== education.length - 1 && (
                                                <div className="w-0.5 h-full mx-auto" style={{ backgroundColor: config.colors.border }}></div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold">{edu.degree}</h4>
                                            <p className="text-sm">{edu.institution}</p>
                                            <p className="text-xs opacity-75">{edu.startDate} - {edu.endDate}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default TechnicalTemplate;