// client/src/templates/CreativeTemplate.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
    SparklesIcon,
    PaintBrushIcon,

    LightBulbIcon,
    RocketLaunchIcon,
    CubeIcon,
    CursorArrowRaysIcon,
    PlayCircleIcon,
    MusicalNoteIcon,
    CameraIcon,
    FilmIcon,
    CodeBracketIcon,
    GlobeAltIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    LinkIcon,
    CalendarIcon,
    UserCircleIcon,
    StarIcon,
    TrophyIcon,
    FireIcon,
    ArrowPathIcon,
    HeartIcon,
    EyeIcon,
    BeakerIcon,
    PencilSquareIcon,
    ScissorsIcon,
    PhotoIcon,
    ChatBubbleBottomCenterTextIcon,
    PuzzlePieceIcon,
    CloudIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const CreativeTemplate = ({ data, isPrintMode = false }) => {
    const [activeColor, setActiveColor] = useState(0);
    const [hoveredSection, setHoveredSection] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const controls = useAnimation();
    const containerRef = React.useRef();
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        projects = [],
        languages = [],
        certifications = [],
        portfolio = [],
        socialLinks = []
    } = data || {};

    // پالت رنگ‌های خلاقانه
    const colorPalettes = useMemo(() => [
        {
            name: 'آبی-بنفش',
            primary: '#6366F1', // بنفش روشن
            secondary: '#3B82F6', // آبی
            accent: '#8B5CF6', // بنفش
            background: '#F8FAFC',
            surface: '#FFFFFF',
            text: '#1E293B',
            gradient: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)'
        },
        {
            name: 'سبز-آبی',
            primary: '#10B981', // سبز زمردی
            secondary: '#06B6D4', // آبی فیروزه‌ای
            accent: '#8B5CF6', // بنفش
            background: '#F0FDF4',
            surface: '#FFFFFF',
            text: '#064E3B',
            gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)'
        },
        {
            name: 'نارنجی-صورتی',
            primary: '#F97316', // نارنجی
            secondary: '#EC4899', // صورتی
            accent: '#8B5CF6', // بنفش
            background: '#FFF7ED',
            surface: '#FFFFFF',
            text: '#7C2D12',
            gradient: 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)'
        },
        {
            name: 'طلایی-مشکی',
            primary: '#F59E0B', // طلایی
            secondary: '#1F2937', // خاکستری تیره
            accent: '#DC2626', // قرمز
            background: '#FEF3C7',
            surface: '#FFFFFF',
            text: '#92400E',
            gradient: 'linear-gradient(135deg, #F59E0B 0%, #1F2937 100%)'
        }
    ], []);

    const colors = colorPalettes[activeColor];

    // انیمیشن‌های خلاقانه
    const floatAnimation = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const rotateAnimation = {
        animate: {
            rotate: 360,
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const pulseAnimation = {
        animate: {
            scale: [1, 1.1, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    // کامپوننت دکمه رنگ
    const ColorButton = ({ color, index }) => (
        <motion.button
            onClick={() => setActiveColor(index)}
            className={`w-8 h-8 rounded-full border-2 ${activeColor === index ? 'border-white scale-110' : 'border-transparent'} shadow-lg`}
            style={{ backgroundColor: color.primary }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={activeColor === index ? pulseAnimation.animate : {}}
            title={color.name}
        />
    );

    // کامپوننت کارت خلاقانه
    const CreativeCard = ({ children, className = "", hoverEffect = true, delay = 0 }) => (
        <motion.div
            className={`relative overflow-hidden rounded-3xl ${className}`}
            style={{
                backgroundColor: colors.surface,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={hoverEffect ? {
                y: -8,
                scale: 1.02,
                boxShadow: `0 20px 60px ${colors.primary}30`
            } : {}}
            onMouseEnter={() => hoverEffect && setHoveredSection('card')}
            onMouseLeave={() => hoverEffect && setHoveredSection(null)}
        >
            {/* افکت پس‌زمینه */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(${colors.primary}40 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                    }}
                />
            </div>

            {/* جلوه گوشه‌ها */}
            <div className="absolute top-0 left-0 w-20 h-20 -translate-x-10 -translate-y-10 opacity-20"
                style={{
                    background: colors.gradient,
                    filter: 'blur(40px)'
                }}
            />

            <div className="relative z-10 p-8">
                {children}
            </div>
        </motion.div>
    );

    // کامپوننت Bubble Skill فارسی
    const SkillBubble = ({ skill, index }) => {
        const skillName = typeof skill === 'object' ? skill.name : skill;
        const level = typeof skill === 'object' ? skill.level || 70 : 70;
        const size = 60 + (level / 100) * 40;

        return (
            <motion.div
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1 }}
            >
                <div className="relative">
                    <motion.div
                        className="rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            background: colors.gradient,
                            fontSize: `${size * 0.2}px`
                        }}
                        animate={floatAnimation.animate}
                    >
                        {skillName.charAt(0)}
                    </motion.div>

                    {/* دایره پیشرفت */}
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={size / 2 - 4}
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="text-white/30"
                        />
                        <motion.circle
                            cx={size / 2}
                            cy={size / 2}
                            r={size / 2 - 4}
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            className="text-white"
                            initial={{ strokeDasharray: 100, strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 100 - level }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                        />
                    </svg>
                </div>

                <div className="mt-3 text-center">
                    <div className="font-bold" style={{ color: colors.text }}>{skillName}</div>
                    <div className="text-sm opacity-75" style={{ color: colors.primary }}>
                        {level}%
                    </div>
                </div>
            </motion.div>
        );
    };

    // کامپوننت Timeline خلاقانه فارسی
    const CreativeTimeline = ({ items, type = 'experience' }) => (
        <div className="relative">
            {/* خط تایم‌لاین */}
            <div className="absolute right-8 top-0 bottom-0 w-1"
                style={{
                    background: colors.gradient,
                    opacity: 0.3
                }}
            />

            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className="relative mb-12 last:mb-0 pr-16"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                >
                    {/* نقطه تایم‌لاین */}
                    <motion.div
                        className="absolute right-0 top-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                        style={{
                            background: colors.gradient,
                            border: `3px solid ${colors.surface}`
                        }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="text-white font-bold text-lg">
                            {index + 1}
                        </div>
                    </motion.div>

                    {/* محتوا */}
                    <CreativeCard hoverEffect={false}>
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-2"
                                    style={{ color: colors.text }}>
                                    {type === 'experience' ? item.jobTitle : item.degree}
                                </h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p-2 rounded-lg"
                                        style={{ backgroundColor: colors.primary + '20' }}>
                                        {type === 'experience' ? (
                                            <BriefcaseIcon className="w-5 h-5" style={{ color: colors.primary }} />
                                        ) : (
                                            <AcademicCapIcon className="w-5 h-5" style={{ color: colors.primary }} />
                                        )}
                                    </div>
                                    <span className="text-lg font-medium"
                                        style={{ color: colors.primary }}>
                                        {type === 'experience' ? item.company : item.institution}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 rounded-full mt-2 md:mt-0"
                                style={{
                                    backgroundColor: colors.primary + '15',
                                    border: `1px solid ${colors.primary + '30'}`
                                }}>
                                <CalendarIcon className="w-4 h-4" style={{ color: colors.primary }} />
                                <span className="text-sm font-medium"
                                    style={{ color: colors.primary }}>
                                    {item.startDate} – {item.current ? 'اکنون' : item.endDate}
                                </span>
                            </div>
                        </div>

                        {item.description && (
                            <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                                {item.description}
                            </p>
                        )}

                        {item.technologies && item.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {item.technologies.map((tech, idx) => (
                                    <motion.span
                                        key={idx}
                                        className="px-3 py-1.5 rounded-full text-sm font-medium"
                                        style={{
                                            backgroundColor: colors.secondary + '20',
                                            color: colors.secondary
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        )}
                    </CreativeCard>
                </motion.div>
            ))}
        </div>
    );

    // کامپوننت پروژه خلاقانه فارسی
    const CreativeProject = ({ project, index }) => {
        const [isLiked, setIsLiked] = useState(false);

        return (
            <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
            >
                <CreativeCard hoverEffect={false} className="h-full">
                    {/* تصویر پروژه */}
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            {project.icon || (
                                <CubeIcon className="w-16 h-16 text-white opacity-80" />
                            )}
                        </div>

                        {/* Overlay تعاملی */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                                <EyeIcon className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* محتوای پروژه */}
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                            <h4 className="text-xl font-bold" style={{ color: colors.text }}>
                                {project.title}
                            </h4>
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="p-2 hover:bg-red-50 rounded-full transition-colors"
                            >
                                {isLiked ? (
                                    <HeartSolid className="w-5 h-5 text-red-500" />
                                ) : (
                                    <HeartIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed text-justify">
                            {project.description}
                        </p>

                        {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 text-xs font-medium rounded-full"
                                        style={{
                                            backgroundColor: colors.accent + '20',
                                            color: colors.accent
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-4">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-sm font-medium"
                                        style={{ color: colors.primary }}
                                    >
                                        <CodeBracketIcon className="w-4 h-4" />
                                        کد پروژه
                                    </a>
                                )}
                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-sm font-medium"
                                        style={{ color: colors.primary }}
                                    >
                                        <RocketLaunchIcon className="w-4 h-4" />
                                        مشاهده دمو
                                    </a>
                                )}
                            </div>

                            {project.year && (
                                <span className="text-sm text-gray-500">
                                    سال {project.year}
                                </span>
                            )}
                        </div>
                    </div>
                </CreativeCard>
            </motion.div>
        );
    };

    // کامپوننت Floating Elements
    const FloatingElements = () => (
        <div className="fixed inset-0 pointer-events-none z-0">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 40 + 10}px`,
                        height: `${Math.random() * 40 + 10}px`,
                        background: i % 3 === 0 ? colors.primary :
                            i % 3 === 1 ? colors.secondary : colors.accent,
                        opacity: 0.1,
                        borderRadius: i % 2 === 0 ? '50%' : '20%'
                    }}
                    animate={{
                        y: [0, Math.random() * 100 - 50, 0],
                        x: [0, Math.random() * 100 - 50, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );

    // افکت پس‌زمینه تعاملی
    const InteractiveBackground = () => (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute inset-0"
                style={{
                    background: `radial-gradient(circle at 20% 80%, ${colors.primary}15 0%, transparent 50%),
                                  radial-gradient(circle at 80% 20%, ${colors.secondary}15 0%, transparent 50%)`
                }}
            />
        </div>
    );

    useEffect(() => {
        if (isInView) {
            controls.start("animate");
        }
    }, [controls, isInView]);

    return (
        <div ref={containerRef} className="creative-template min-h-screen relative overflow-hidden"
            style={{ backgroundColor: colors.background }} dir="rtl">

            {/* افکت‌های پس‌زمینه */}
            <FloatingElements />
            <InteractiveBackground />

            {/* کنترل‌های رنگ */}
            <motion.div
                className="fixed top-6 left-6 z-50 flex flex-col gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <SparklesIcon className="w-5 h-5" style={{ color: colors.primary }} />
                    <span className="text-sm font-bold" style={{ color: colors.text }}>طرح رنگ</span>
                </div>
                {colorPalettes.map((palette, index) => (
                    <ColorButton key={index} color={palette} index={index} />
                ))}
            </motion.div>

            {/* دکمه پخش موزیک */}
            <motion.button
                className="fixed top-6 right-6 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl"
                style={{ color: colors.primary }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
            >
                {isPlaying ? (
                    <PauseIcon className="w-6 h-6" />
                ) : (
                    <MusicalNoteIcon className="w-6 h-6" />
                )}
            </motion.button>

            {/* محتوای اصلی */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* هدر خلاقانه */}
                <motion.header
                    className="text-center mb-16"
                    variants={staggerContainer}
                    initial="initial"
                    animate={controls}
                >
                    <motion.div
                        className="inline-block mb-6"
                        variants={floatAnimation}
                        animate="animate"
                    >
                        <div className="relative">
                            <motion.div
                                className="w-40 h-40 rounded-full mx-auto border-8"
                                style={{
                                    borderColor: colors.primary,
                                    background: colors.gradient
                                }}
                                animate={rotateAnimation.animate}
                            >
                                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center">
                                    {personalInfo?.avatar ? (
                                        <img
                                            src={personalInfo.avatar}
                                            alt={personalInfo.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <UserCircleIcon className="w-24 h-24 text-white" />
                                    )}
                                </div>
                            </motion.div>

                            {/* دکمه‌های تعاملی */}
                            <motion.div
                                className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full shadow-lg"
                                style={{ background: colors.gradient }}
                                whileHover={{ scale: 1.2, rotate: 180 }}
                            >
                                <SparklesIcon className="w-8 h-8 text-white" />
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
                        style={{
                            color: colors.text,
                            textShadow: `0 4px 20px ${colors.primary}30`
                        }}
                        variants={fadeInUp}
                    >
                        {personalInfo?.fullName}
                    </motion.h1>

                    <motion.p
                        className="text-2xl mb-8 font-medium"
                        style={{ color: colors.primary }}
                        variants={fadeInUp}
                    >
                        {personalInfo?.title}
                    </motion.p>

                    <motion.div
                        className="max-w-3xl mx-auto mb-10"
                        variants={fadeInUp}
                    >
                        <p className="text-lg leading-relaxed text-gray-700 text-justify">
                            {personalInfo?.about}
                        </p>
                    </motion.div>

                    {/* تگ‌های خلاقانه */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mb-12"
                        variants={fadeInUp}
                    >
                        {personalInfo?.tags?.map((tag, index) => (
                            <motion.span
                                key={index}
                                className="px-4 py-2 rounded-full font-medium"
                                style={{
                                    backgroundColor: colors.primary + '15',
                                    color: colors.primary
                                }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                #{tag}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* اطلاعات تماس خلاقانه */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
                        variants={staggerContainer}
                    >
                        {[
                            { icon: EnvelopeIcon, text: personalInfo?.email, color: colors.primary, label: 'ایمیل' },
                            { icon: PhoneIcon, text: personalInfo?.phone, color: colors.secondary, label: 'تلفن' },
                            { icon: MapPinIcon, text: personalInfo?.address ? `${personalInfo.address.city}` : null, color: colors.accent, label: 'موقعیت' }
                        ].map((item, index) => (
                            item.text && (
                                <motion.a
                                    key={index}
                                    href={item.label === 'ایمیل' ? `mailto:${item.text}` :
                                        item.label === 'تلفن' ? `tel:${item.text}` : '#'}
                                    className="flex items-center gap-4 p-4 rounded-2xl group"
                                    style={{
                                        backgroundColor: colors.surface,
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
                                    }}
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="p-3 rounded-xl"
                                        style={{ backgroundColor: item.color + '20' }}>
                                        <item.icon className="w-6 h-6" style={{ color: item.color }} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                                        <div className="font-medium" style={{ color: colors.text }}>
                                            {item.text}
                                        </div>
                                    </div>
                                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mr-auto" />
                                </motion.a>
                            )
                        ))}
                    </motion.div>
                </motion.header>

                {/* مهارت‌های خلاقانه */}
                {skills.length > 0 && (
                    <motion.section
                        className="mb-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-12">
                            <div className="p-3 rounded-xl"
                                style={{
                                    background: colors.gradient,
                                    boxShadow: `0 8px 30px ${colors.primary}30`
                                }}>
                                <PaintBrushIcon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold" style={{ color: colors.text }}>
                                    مهارت‌های خلاقانه
                                </h2>
                                <p className="text-gray-600">تخصص در تکنولوژی‌های مدرن و خلاقانه</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                            {skills.map((skill, index) => (
                                <SkillBubble
                                    key={index}
                                    skill={skill}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* تجربه و تحصیلات */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* تجربه کاری */}
                    {experience.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-xl"
                                    style={{
                                        background: colors.gradient,
                                        boxShadow: `0 8px 30px ${colors.primary}30`
                                    }}>
                                    <RocketLaunchIcon className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                                    سفر خلاقانه حرفه‌ای
                                </h2>
                            </div>

                            <CreativeTimeline items={experience} type="experience" />
                        </motion.section>
                    )}

                    {/* تحصیلات */}
                    {education.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 rounded-xl"
                                    style={{
                                        background: colors.gradient,
                                        boxShadow: `0 8px 30px ${colors.secondary}30`
                                    }}>
                                    <LightBulbIcon className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                                    تحصیلات و آموزش
                                </h2>
                            </div>

                            <CreativeTimeline items={education} type="education" />
                        </motion.section>
                    )}
                </div>

                {/* پروژه‌های خلاقانه */}
                {projects.length > 0 && (
                    <motion.section
                        className="mb-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-12">
                            <div className="p-3 rounded-xl"
                                style={{
                                    background: colors.gradient,
                                    boxShadow: `0 8px 30px ${colors.accent}30`
                                }}>
                                <CubeIcon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold" style={{ color: colors.text }}>
                                    پروژه‌های خلاقانه
                                </h2>
                                <p className="text-gray-600">کارهای نوآورانه و آزمایشات خلاقانه</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <CreativeProject
                                    key={index}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* گواهینامه‌ها و جوایز */}
                {(certifications.length > 0 || awards?.length > 0) && (
                    <motion.section
                        className="mb-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-xl"
                                style={{
                                    background: colors.gradient,
                                    boxShadow: `0 8px 30px ${colors.primary}30`
                                }}>
                                <TrophyIcon className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                                دستاوردها و گواهینامه‌ها
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    className="p-6 rounded-2xl relative overflow-hidden group"
                                    style={{
                                        backgroundColor: colors.surface,
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="absolute left-8 -top-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                                        style={{ background: colors.gradient }}
                                    />

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl"
                                            style={{ backgroundColor: colors.primary + '20' }}>
                                            <StarIcon className="w-6 h-6" style={{ color: colors.primary }} />
                                        </div>
                                        <div className="text-right">
                                            <h4 className="font-bold text-lg mb-1" style={{ color: colors.text }}>
                                                {cert.name}
                                            </h4>
                                            <p className="text-gray-600 text-sm mb-2">{cert.issuer}</p>
                                            {cert.date && (
                                                <div className="text-xs text-gray-500">تاریخ دریافت: {cert.date}</div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* زبان‌ها */}
                {languages.length > 0 && (
                    <motion.section
                        className="mb-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-xl"
                                style={{
                                    background: colors.gradient,
                                    boxShadow: `0 8px 30px ${colors.secondary}30`
                                }}>
                                <GlobeAltIcon className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                                مهارت‌های زبانی
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {languages.map((lang, index) => (
                                <motion.div
                                    key={index}
                                    className="p-6 rounded-2xl relative overflow-hidden"
                                    style={{
                                        backgroundColor: colors.surface,
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl">{lang.flag || '🌐'}</span>
                                            <div className="text-right">
                                                <div className="font-bold text-lg" style={{ color: colors.text }}>
                                                    {lang.name}
                                                </div>
                                                <div className="text-gray-600 text-sm">{lang.level}</div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold px-3 py-1 rounded-full"
                                            style={{
                                                backgroundColor: colors.primary + '20',
                                                color: colors.primary
                                            }}>
                                            {lang.proficiency || 'مسلط'}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Footer خلاقانه */}
                <motion.footer
                    className="mt-20 pt-12 border-t border-gray-200 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg"
                                style={{ background: colors.gradient }}>
                                <SparklesIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-lg" style={{ color: colors.text }}>
                                    {personalInfo?.fullName}
                                </div>
                                <div className="text-sm text-gray-600">متخصص خلاق</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {[
                                { icon: LinkIcon, url: personalInfo?.linkedin, label: 'لینکدین' },
                                { icon: FilmIcon, url: personalInfo?.portfolio, label: 'پورتفولیو' },
                                { icon: CameraIcon, url: personalInfo?.instagram, label: 'اینستاگرام' }
                            ].map((social, index) => (
                                social.url && (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full hover:scale-110 transition-transform"
                                        style={{ backgroundColor: colors.primary + '15' }}
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        whileTap={{ scale: 0.9 }}
                                        title={social.label}
                                    >
                                        <social.icon className="w-5 h-5" style={{ color: colors.primary }} />
                                    </motion.a>
                                )
                            ))}
                        </div>

                        <div className="text-sm text-gray-600">
                            <span className="font-bold" style={{ color: colors.primary }}>قالب خلاقانه</span> • طراحی شده با ❤️
                        </div>
                    </div>
                </motion.footer>
            </div>

            {/* استایل‌های سفارشی */}
            <style jsx global>{`
                .creative-template {
                    font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    direction: rtl;
                }
                
                .creative-template ::selection {
                    background-color: ${colors.primary}40;
                    color: ${colors.text};
                }
                
                /* انیمیشن‌های سفارشی */
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse 2s ease-in-out infinite;
                }
                
                /* اسکرول بار سفارشی */
                .creative-template::-webkit-scrollbar {
                    width: 10px;
                }
                
                .creative-template::-webkit-scrollbar-track {
                    background: ${colors.background};
                }
                
                .creative-template::-webkit-scrollbar-thumb {
                    background: ${colors.gradient};
                    border-radius: 5px;
                }
                
                /* افکت‌های Glassmorphism */
                .glass-effect {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                /* افکت‌های نئومورفیک */
                .neumorphic {
                    background: ${colors.surface};
                    box-shadow: 20px 20px 60px ${colors.primary}10,
                                -20px -20px 60px rgba(255, 255, 255, 0.5);
                }
                
                /* بهبود تایپوگرافی فارسی */
                .creative-template h1,
                .creative-template h2,
                .creative-template h3,
                .creative-template h4,
                .creative-template h5,
                .creative-template h6 {
                    font-family: 'Vazirmatn', sans-serif;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                }
                
                .creative-template p {
                    line-height: 1.8;
                    text-align: justify;
                }
                
                .text-justify {
                    text-align: justify;
                    text-justify: inter-word;
                }
                
                /* بهبود خوانایی متن فارسی */
                .creative-template .text-right {
                    text-align: right;
                }
                
                .creative-template .text-left {
                    text-align: left;
                }
                
                .creative-template .text-center {
                    text-align: center;
                }
                
                /* استایل‌های چاپ */
                @media print {
                    .creative-template {
                        direction: rtl;
                        font-size: 12pt;
                    }
                    
                    .creative-template h1 {
                        font-size: 24pt;
                    }
                    
                    .creative-template h2 {
                        font-size: 18pt;
                    }
                    
                    .creative-template p {
                        line-height: 1.6;
                        text-align: justify;
                    }
                    
                    /* مخفی کردن المان‌های تعاملی در چاپ */
                    .creative-template button,
                    .creative-template .group-hover\:opacity-100 {
                        display: none !important;
                    }
                    
                    .creative-template .bg-gradient-to-r {
                        background: ${colors.primary} !important;
                        color: white !important;
                    }
                }
            `}</style>
        </div>
    );
};

// آیکون Pause برای دکمه موزیک
const PauseIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <SparklesIcon strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// آیکون ArrowTopRightOnSquareIcon
const ArrowTopRightOnSquareIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

export default CreativeTemplate;