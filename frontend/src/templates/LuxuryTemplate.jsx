// client/src/templates/LuxuryTemplate.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    LinkIcon,
    CalendarIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    StarIcon,
    TrophyIcon,
    SparklesIcon,
    GlobeAltIcon,
    UserCircleIcon,
    ShieldCheckIcon,
    ChartBarIcon,
    LightBulbIcon,
    ArrowTopRightOnSquareIcon,
    ChevronRightIcon,
    DocumentTextIcon,
    CogIcon,
    CameraIcon
} from '@heroicons/react/24/outline';

const LuxuryTemplate = ({ data, isPrintMode = false }) => {
    const [activeSection, setActiveSection] = useState('overview');
    const [watermarkVisible, setWatermarkVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setWatermarkVisible(v => !v);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        projects = [],
        languages = [],
        certifications = [],
        achievements = []
    } = data || {};

    // پالت رنگ لوکس بهبود یافته
    const colors = useMemo(() => ({
        primary: '#D4AF37', // طلایی کلاسیک
        secondary: '#C0C0C0', // نقره‌ای
        accent: '#B8860B', // طلایی تیره
        background: '#0A0A0A', // مشکی خالص
        surface: '#1A1A1A', // خاکستری بسیار تیره
        text: '#F5F5F5', // سفید مرواریدی
        textSecondary: '#B0B0B0', // خاکستری روشن
        border: '#333333', // خاکستری متوسط
        goldGradient: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)',
        silverGradient: 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #A9A9A9 100%)'
    }), []);

    // انیمیشن‌های بهبود یافته
    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const slideUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" }
    };

    // کامپوننت کارت لوکس
    const LuxuryCard = ({ children, className = "", glow = false, hoverEffect = true }) => (
        <motion.div
            className={`relative rounded-xl overflow-hidden border ${className}`}
            style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                boxShadow: glow ? `0 8px 32px ${colors.primary}20` : '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={hoverEffect ? {
                y: -4,
                boxShadow: glow ? `0 12px 40px ${colors.primary}30` : '0 8px 32px rgba(0, 0, 0, 0.15)'
            } : {}}
        >
            {glow && (
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at 50% 0%, ${colors.primary}40 0%, transparent 70%)`
                    }}
                />
            )}
            <div className="relative z-10 p-6">
                {children}
            </div>
        </motion.div>
    );

    // کامپوننت Timeline
    const TimelineItem = ({ item, index, type = 'experience' }) => (
        <motion.div
            className="relative pb-8 last:pb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{
                        background: colors.goldGradient,
                        boxShadow: `0 4px 12px ${colors.primary}40`
                    }}>
                    {type === 'experience' ? (
                        <BriefcaseIcon className="w-6 h-6 text-white" />
                    ) : (
                        <AcademicCapIcon className="w-6 h-6 text-white" />
                    )}
                </div>

                <div className="flex-1">
                    <LuxuryCard className="mb-0">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                            <div className="flex-1">
                                <h4 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                                    {type === 'experience' ? item.jobTitle : item.degree}
                                </h4>
                                <p className="text-lg mb-1" style={{ color: colors.primary }}>
                                    {type === 'experience' ? item.company : item.institution}
                                </p>
                            </div>
                            <div className="flex items-center mt-2 md:mt-0 px-3 py-1.5 rounded-full"
                                style={{
                                    backgroundColor: colors.primary + '15',
                                    border: `1px solid ${colors.primary + '30'}`
                                }}>
                                <CalendarIcon className="w-4 h-4 ml-2" style={{ color: colors.primary }} />
                                <span className="text-sm font-medium" style={{ color: colors.primary }}>
                                    {item.startDate} – {item.current ? 'Present' : item.endDate}
                                </span>
                            </div>
                        </div>

                        {item.description && (
                            <p className="mb-4 leading-relaxed" style={{ color: colors.textSecondary }}>
                                {item.description}
                            </p>
                        )}

                        {item.achievements && item.achievements.length > 0 && (
                            <div className="space-y-2">
                                {item.achievements.slice(0, 3).map((achievement, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <SparklesIcon className="w-4 h-4 mt-1 flex-shrink-0"
                                            style={{ color: colors.primary }} />
                                        <span className="text-sm" style={{ color: colors.textSecondary }}>
                                            {achievement}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </LuxuryCard>
                </div>
            </div>
        </motion.div>
    );

    // کامپوننت مهارت
    const SkillProgress = ({ name, level, index }) => {
        const delay = index * 0.05;

        return (
            <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay }}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="font-medium" style={{ color: colors.text }}>{name}</span>
                    <span className="text-sm font-bold px-2 py-1 rounded-full"
                        style={{
                            backgroundColor: colors.primary + '15',
                            color: colors.primary
                        }}>
                        {level}%
                    </span>
                </div>
                <div className="relative h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: colors.border }}>
                    <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{ background: colors.goldGradient }}
                        initial={{ width: 0 }}
                        animate={{ width: `${level}%` }}
                        transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
                    />
                </div>
            </motion.div>
        );
    };

    // محاسبه آمار
    const calculateStats = () => {
        return {
            experienceCount: experience?.length || 0,
            skillCount: skills?.length || 0,
            projectCount: projects?.length || 0,
            educationCount: education?.length || 0
        };
    };

    const stats = calculateStats();

    return (
        <div className="luxury-template min-h-screen relative"
            style={{
                backgroundColor: colors.background,
                color: colors.text
            }}>

            {/* Watermark */}
            {watermarkVisible && (
                <div className="fixed inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                    <div className="text-8xl font-light tracking-widest"
                        style={{
                            background: colors.goldGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                        LUXURY
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    className="relative overflow-hidden rounded-2xl mb-8 p-8"
                    style={{
                        background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
                        border: `1px solid ${colors.border}`
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4"
                                style={{ borderColor: colors.primary }}>
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                    <UserCircleIcon className="w-20 h-20" style={{ color: colors.primary }} />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center"
                                style={{
                                    background: colors.goldGradient,
                                    boxShadow: `0 4px 12px ${colors.primary}40`
                                }}>
                                <SparklesIcon className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-1 rounded-full" style={{ background: colors.goldGradient }} />
                                    <span className="text-sm font-medium tracking-wider uppercase opacity-70">
                                        Premium Resume
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-light mb-4">
                                    {personalInfo?.fullName}
                                </h1>

                                <motion.p
                                    className="text-2xl mb-6"
                                    style={{ color: colors.primary }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {personalInfo?.title}
                                </motion.p>

                                <motion.p
                                    className="text-lg leading-relaxed max-w-3xl opacity-90"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {personalInfo?.about}
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <motion.div
                        className="mt-8 pt-8 border-t"
                        style={{ borderColor: colors.border }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { icon: EnvelopeIcon, text: personalInfo?.email, href: `mailto:${personalInfo?.email}` },
                                { icon: PhoneIcon, text: personalInfo?.phone, href: `tel:${personalInfo?.phone}` },
                                { icon: MapPinIcon, text: personalInfo?.address ? `${personalInfo.address.city}, ${personalInfo.address.country}` : null },
                                { icon: LinkIcon, text: personalInfo?.linkedin, href: personalInfo?.linkedin }
                            ].map((item, index) => (
                                item.text && (
                                    <motion.a
                                        key={index}
                                        href={item.href}
                                        target={item.href?.includes('http') ? "_blank" : undefined}
                                        rel={item.href?.includes('http') ? "noopener noreferrer" : undefined}
                                        className="flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-opacity-10"
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            border: `1px solid ${colors.border}`
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                    >
                                        <div className="p-2 rounded"
                                            style={{ backgroundColor: colors.primary + '15' }}>
                                            <item.icon className="w-4 h-4" style={{ color: colors.primary }} />
                                        </div>
                                        <span className="flex-1 truncate">{item.text}</span>
                                        {item.href && (
                                            <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-60" />
                                        )}
                                    </motion.a>
                                )
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Navigation Tabs */}
                <div className="flex overflow-x-auto mb-8 gap-2 pb-2">
                    {['overview', 'experience', 'education', 'skills', 'achievements'].map((section) => (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeSection === section ? 'text-black' : 'opacity-70 hover:opacity-100'}`}
                            style={{
                                backgroundColor: activeSection === section ? colors.primary : colors.surface,
                                border: `1px solid ${activeSection === section ? colors.primary : colors.border}`
                            }}
                        >
                            {section === 'overview' && 'Overview'}
                            {section === 'experience' && 'Experience'}
                            {section === 'education' && 'Education'}
                            {section === 'skills' && 'Skills'}
                            {section === 'achievements' && 'Achievements'}
                        </button>
                    ))}
                </div>

                {/* Content Sections */}
                <AnimatePresence mode="wait">
                    {/* Overview Section */}
                    {activeSection === 'overview' && (
                        <motion.div
                            key="overview"
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                            {...fadeIn}
                        >
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Quick Stats */}
                                <LuxuryCard glow>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 rounded-lg"
                                            style={{
                                                background: colors.goldGradient,
                                                boxShadow: `0 4px 12px ${colors.primary}40`
                                            }}>
                                            <LightBulbIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-1">Executive Summary</h3>
                                            <p className="text-sm opacity-75">Professional Overview</p>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed opacity-90 mb-6">
                                        {personalInfo?.about || "Seasoned professional with extensive experience in leadership and strategic planning."}
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Experience', value: `${stats.experienceCount}+ Years` },
                                            { label: 'Projects', value: `${stats.projectCount}+` },
                                            { label: 'Skills', value: `${stats.skillCount}+` },
                                            { label: 'Education', value: `${stats.educationCount}` }
                                        ].map((stat, index) => (
                                            <div key={index} className="text-center p-4 rounded-lg"
                                                style={{
                                                    backgroundColor: colors.background,
                                                    border: `1px solid ${colors.border}`
                                                }}>
                                                <div className="text-2xl font-bold mb-1"
                                                    style={{ color: colors.primary }}>
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm opacity-75">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </LuxuryCard>

                                {/* Latest Experience */}
                                {experience.length > 0 && (
                                    <LuxuryCard>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-3 rounded-lg"
                                                style={{
                                                    background: colors.goldGradient,
                                                    boxShadow: `0 4px 12px ${colors.primary}40`
                                                }}>
                                                <BriefcaseIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold mb-1">Latest Experience</h3>
                                                <p className="text-sm opacity-75">Recent Career Highlights</p>
                                            </div>
                                        </div>
                                        <TimelineItem
                                            item={experience[0]}
                                            index={0}
                                            type="experience"
                                        />
                                    </LuxuryCard>
                                )}
                            </div>

                            {/* Right Column */}
                            <div className="space-y-8">
                                {/* Skills Preview */}
                                {skills.length > 0 && (
                                    <LuxuryCard>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-3 rounded-lg"
                                                style={{
                                                    background: colors.goldGradient,
                                                    boxShadow: `0 4px 12px ${colors.primary}40`
                                                }}>
                                                <ChartBarIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold mb-1">Top Skills</h3>
                                                <p className="text-sm opacity-75">Key Competencies</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {skills.slice(0, 5).map((skill, index) => (
                                                <SkillProgress
                                                    key={index}
                                                    name={typeof skill === 'object' ? skill.name : skill}
                                                    level={typeof skill === 'object' ? skill.level || 85 : 85}
                                                    index={index}
                                                />
                                            ))}
                                        </div>
                                    </LuxuryCard>
                                )}

                                {/* Languages */}
                                {languages.length > 0 && (
                                    <LuxuryCard>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-3 rounded-lg"
                                                style={{
                                                    background: colors.goldGradient,
                                                    boxShadow: `0 4px 12px ${colors.primary}40`
                                                }}>
                                                <GlobeAltIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold mb-1">Languages</h3>
                                                <p className="text-sm opacity-75">Language Proficiency</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            {languages.map((lang, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">{lang.flag || '🌐'}</span>
                                                        <span>{lang.name}</span>
                                                    </div>
                                                    <span className="text-sm opacity-75">{lang.level}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </LuxuryCard>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Experience Section */}
                    {activeSection === 'experience' && (
                        <motion.div key="experience" {...fadeIn}>
                            <LuxuryCard glow className="mb-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 rounded-lg"
                                        style={{
                                            background: colors.goldGradient,
                                            boxShadow: `0 4px 12px ${colors.primary}40`
                                        }}>
                                        <BriefcaseIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Professional Experience</h3>
                                        <p className="text-sm opacity-75">Career Timeline & Achievements</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {experience.map((exp, index) => (
                                        <TimelineItem
                                            key={index}
                                            item={exp}
                                            index={index}
                                            type="experience"
                                        />
                                    ))}
                                </div>
                            </LuxuryCard>
                        </motion.div>
                    )}

                    {/* Education Section */}
                    {activeSection === 'education' && (
                        <motion.div key="education" {...fadeIn}>
                            <LuxuryCard glow className="mb-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 rounded-lg"
                                        style={{
                                            background: colors.goldGradient,
                                            boxShadow: `0 4px 12px ${colors.primary}40`
                                        }}>
                                        <AcademicCapIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Education & Qualifications</h3>
                                        <p className="text-sm opacity-75">Academic Background & Certifications</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {education.map((edu, index) => (
                                        <TimelineItem
                                            key={index}
                                            item={edu}
                                            index={index}
                                            type="education"
                                        />
                                    ))}

                                    {/* Certifications */}
                                    {certifications.length > 0 && (
                                        <div className="mt-12 pt-8 border-t"
                                            style={{ borderColor: colors.border }}>
                                            <h4 className="text-xl font-bold mb-6"
                                                style={{ color: colors.primary }}>
                                                Professional Certifications
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {certifications.map((cert, index) => (
                                                    <motion.div
                                                        key={index}
                                                        className="p-4 rounded-lg"
                                                        style={{
                                                            backgroundColor: colors.background,
                                                            border: `1px solid ${colors.border}`
                                                        }}
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h5 className="font-bold mb-1">{cert.name}</h5>
                                                                <p className="text-sm opacity-75">{cert.issuer}</p>
                                                            </div>
                                                            {cert.date && (
                                                                <span className="text-xs px-2 py-1 rounded-full"
                                                                    style={{
                                                                        backgroundColor: colors.primary + '15',
                                                                        color: colors.primary
                                                                    }}>
                                                                    {cert.date}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </LuxuryCard>
                        </motion.div>
                    )}

                    {/* Skills Section */}
                    {activeSection === 'skills' && (
                        <motion.div key="skills" {...fadeIn}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <LuxuryCard glow>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-3 rounded-lg"
                                            style={{
                                                background: colors.goldGradient,
                                                boxShadow: `0 4px 12px ${colors.primary}40`
                                            }}>
                                            <ChartBarIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-1">Technical Skills</h3>
                                            <p className="text-sm opacity-75">Professional Competencies</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {skills.map((skill, index) => (
                                            <SkillProgress
                                                key={index}
                                                name={typeof skill === 'object' ? skill.name : skill}
                                                level={typeof skill === 'object' ? skill.level || 85 : 85}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </LuxuryCard>

                                <LuxuryCard glow>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-3 rounded-lg"
                                            style={{
                                                background: colors.goldGradient,
                                                boxShadow: `0 4px 12px ${colors.primary}40`
                                            }}>
                                            <TrophyIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-1">Core Competencies</h3>
                                            <p className="text-sm opacity-75">Key Strengths & Abilities</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Leadership', 'Strategic Planning', 'Team Management', 'Problem Solving',
                                            'Communication', 'Innovation', 'Project Management', 'Client Relations'].map((skill, index) => (
                                                <div key={index} className="p-3 rounded-lg text-center"
                                                    style={{
                                                        backgroundColor: colors.background,
                                                        border: `1px solid ${colors.border}`
                                                    }}>
                                                    <div className="font-medium">{skill}</div>
                                                </div>
                                            ))}
                                    </div>
                                </LuxuryCard>
                            </div>
                        </motion.div>
                    )}

                    {/* Achievements Section */}
                    {activeSection === 'achievements' && (
                        <motion.div key="achievements" {...fadeIn}>
                            <LuxuryCard glow className="mb-8">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 rounded-lg"
                                        style={{
                                            background: colors.goldGradient,
                                            boxShadow: `0 4px 12px ${colors.primary}40`
                                        }}>
                                        <TrophyIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">Notable Achievements</h3>
                                        <p className="text-sm opacity-75">Awards, Recognitions & Milestones</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(achievements.length > 0 ? achievements : [
                                        { title: "Industry Innovation Award", year: "2023", description: "Recognized for groundbreaking work in digital transformation" },
                                        { title: "Leadership Excellence", year: "2022", description: "Awarded for exceptional team leadership and project delivery" },
                                        { title: "Client Satisfaction Award", year: "2021", description: "Achieved 98% client satisfaction rating across all projects" },
                                        { title: "Technology Pioneer", year: "2020", description: "Early adopter and implementer of cutting-edge technologies" }
                                    ]).map((achievement, index) => (
                                        <motion.div
                                            key={index}
                                            className="p-6 rounded-lg relative overflow-hidden"
                                            style={{
                                                backgroundColor: colors.background,
                                                border: `1px solid ${colors.border}`
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10"
                                                style={{ background: colors.goldGradient }} />
                                            <div className="relative z-10">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h4 className="font-semibold text-lg">{achievement.title}</h4>
                                                    <span className="text-sm px-3 py-1 rounded-full"
                                                        style={{
                                                            backgroundColor: colors.primary + '15',
                                                            color: colors.primary
                                                        }}>
                                                        {achievement.year}
                                                    </span>
                                                </div>
                                                <p className="text-sm opacity-90">{achievement.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </LuxuryCard>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <motion.footer
                    className="mt-12 pt-8 border-t text-center"
                    style={{ borderColor: colors.border }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="opacity-75">
                        Resume generated with <span style={{ color: colors.primary, fontWeight: 'bold' }}>CVBuilder</span> •
                        Template: <span style={{ color: colors.primary }}>Luxury Edition</span>
                    </p>
                </motion.footer>
            </div>

            {/* Style Tag */}
            <style jsx>{`
                .luxury-template {
                    font-family: 'Cormorant Garamond', serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    overflow-x: hidden;
                }
                
                @media print {
                    .luxury-template {
                        background: white !important;
                        color: black !important;
                    }
                    
                    .luxury-template * {
                        color: black !important;
                        border-color: #ddd !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default LuxuryTemplate;