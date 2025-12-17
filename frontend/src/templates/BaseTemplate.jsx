// client/src/templates/ModernProTemplate.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    LinkIcon,
    CalendarIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    UserCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    StarIcon,
    CodeBracketIcon,
    CommandLineIcon,
    GlobeAltIcon,
    DocumentTextIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import {
    StarIcon as StarIconSolid,
    CheckCircleIcon
} from '@heroicons/react/24/solid';

const ModernProTemplate = ({ data, templateId = 'modern-pro' }) => {
    const [activeSection, setActiveSection] = useState('experience');
    const [printMode, setPrintMode] = useState(false);

    // کانفیگ قالب Modern Pro
    const config = {
        name: 'Modern Pro',
        colors: {
            primary: '#2563eb',    // آبی مدرن
            secondary: '#475569',  // خاکستری آبی
            accent: '#7c3aed',     // بنفش مدرن
            background: '#ffffff',
            cardBg: '#f8fafc',
            border: '#e2e8f0',
            text: '#1e293b',
            textLight: '#64748b'
        },
        gradients: {
            primary: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            accent: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)'
        }
    };

    // داده‌های نمونه
    const defaultData = {
        personalInfo: {
            fullName: 'علی محمدی',
            title: 'مهندس نرم‌افزار ارشد | Full Stack Developer',
            email: 'ali.mohammadi@example.com',
            phone: '۰۹۱۲۱۲۳۴۵۶۷',
            address: {
                city: 'تهران',
                country: 'ایران'
            },
            about: 'با ۸ سال تجربه در توسعه اپلیکیشن‌های وب و موبایل مقیاس‌پذیر. متخصص در معماری سیستم‌های مدرن و مدیریت تیم‌های توسعه. علاقه‌مند به حل مسائل پیچیده با راه‌حل‌های خلاقانه و فناوری‌های روز.',
            linkedin: 'linkedin.com/in/alimohammadi',
            github: 'github.com/alimohammadi',
            portfolio: 'alimohammadi.dev'
        },
        experience: [
            {
                jobTitle: 'مهندس نرم‌افزار ارشد',
                company: 'دیجی‌کالا',
                startDate: '۱۴۰۰',
                endDate: 'اکنون',
                description: 'مدیریت تیم ۵ نفره توسعه، طراحی معماری سیستم‌های جدید، افزایش ۴۰٪ کارایی سیستم',
                achievements: [
                    'طراحی و پیاده‌سازی معماری میکروسرویس برای سیستم پردازش سفارشات',
                    'کاهش ۶۰٪ زمان پاسخگویی API‌های اصلی',
                    'رهبری پروژه انتقال به کانتینر با Docker و Kubernetes'
                ],
                technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker']
            },
            {
                jobTitle: 'توسعه‌دهنده Full Stack',
                company: 'اسنپ',
                startDate: '۱۳۹۸',
                endDate: '۱۴۰۰',
                description: 'توسعه و نگهداری سرویس‌های اصلی پلتفرم',
                achievements: [
                    'توسعه ماژول پرداخت چندوجهی',
                    'بهینه‌سازی عملکرد فرانت‌اند با React.memo و lazy loading'
                ],
                technologies: ['React', 'Python', 'PostgreSQL', 'Redis']
            }
        ],
        education: [
            {
                degree: 'کارشناسی ارشد مهندسی نرم‌افزار',
                institution: 'دانشگاه تهران',
                startDate: '۱۳۹۵',
                endDate: '۱۳۹۸',
                gpa: '۱۸.۵',
                description: 'پایان‌نامه: بهینه‌سازی الگوریتم‌های یادگیری ماشین برای پردازش داده‌های بزرگ'
            },
            {
                degree: 'کارشناسی مهندسی کامپیوتر',
                institution: 'شریف',
                startDate: '۱۳۹۱',
                endDate: '۱۳۹۵',
                gpa: '۱۷.۸'
            }
        ],
        skills: [
            { name: 'React/Next.js', level: 95 },
            { name: 'Node.js/NestJS', level: 90 },
            { name: 'TypeScript', level: 88 },
            { name: 'Python/Django', level: 85 },
            { name: 'Docker/Kubernetes', level: 80 },
            { name: 'AWS/Cloud', level: 85 },
            { name: 'CI/CD', level: 75 },
            { name: 'Microservices', level: 88 }
        ],
        projects: [
            {
                title: 'سیستم مدیریت محتوای سازمانی',
                description: 'توسعه یک سیستم CMS برای مدیریت محتوای چندزبانه با قابلیت SEO پیشرفته',
                technologies: ['React', 'Node.js', 'MongoDB', 'Redis'],
                link: 'https://github.com/alimohammadi/cms-system',
                year: '۱۴۰۲'
            },
            {
                title: 'پلتفرم تحلیل داده Real-time',
                description: 'سیستم تحلیل داده‌های زنده با قابلیت نمایش dashboard تعاملی',
                technologies: ['React', 'Python', 'WebSocket', 'D3.js'],
                year: '۱۴۰۱'
            }
        ],
        certifications: [
            'AWS Certified Solutions Architect',
            'Scrum Master Certified',
            'Google Professional Cloud Architect'
        ],
        languages: [
            { name: 'فارسی', level: 'مادری' },
            { name: 'انگلیسی', level: 'حرفه‌ای (IELTS 8.0)' },
            { name: 'آلمانی', level: 'متوسط' }
        ]
    };

    const resumeData = data || defaultData;
    const { personalInfo, experience, education, skills, projects, certifications, languages } = resumeData;

    // کامپوننت اسکلتون برای لودینگ
    const SkillBar = ({ skill }) => (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm opacity-75">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: config.gradients.accent }}
                />
            </div>
        </div>
    );

    const SectionHeader = ({ title, icon: Icon }) => (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center mb-6"
        >
            <div className="p-2 rounded-lg mr-3" style={{ background: config.gradients.primary }}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: config.colors.primary }}>
                {title}
            </h2>
        </motion.div>
    );

    return (
        <motion.div
            className="resume-template min-h-screen"
            dir="rtl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* هدر حرفه‌ای */}
            <motion.header
                className="relative overflow-hidden"
                style={{ background: config.gradients.primary }}
                initial={{ y: -50 }}
                animate={{ y: 0 }}
            >
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="container mx-auto px-6 py-12 relative">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="text-center md:text-right mb-8 md:mb-0 md:ml-8">
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold text-white mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {personalInfo.fullName}
                            </motion.h1>
                            <motion.p
                                className="text-xl text-blue-100 mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {personalInfo.title}
                            </motion.p>
                            <motion.p
                                className="text-blue-50 max-w-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {personalInfo.about}
                            </motion.p>
                        </div>
                        <motion.div
                            className="w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                        >
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                                <UserCircleIcon className="w-32 h-32 text-white opacity-80" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.header>

            {/* نوار اطلاعات تماس */}
            <motion.div
                className="py-4 shadow-md"
                style={{ backgroundColor: config.colors.cardBg }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        {personalInfo.email && (
                            <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:opacity-80 transition-opacity">
                                <EnvelopeIcon className="w-5 h-5 ml-2" style={{ color: config.colors.accent }} />
                                <span>{personalInfo.email}</span>
                            </a>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center">
                                <PhoneIcon className="w-5 h-5 ml-2" style={{ color: config.colors.accent }} />
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.address && (
                            <div className="flex items-center">
                                <MapPinIcon className="w-5 h-5 ml-2" style={{ color: config.colors.accent }} />
                                <span>{personalInfo.address.city}، {personalInfo.address.country}</span>
                            </div>
                        )}
                        {personalInfo.github && (
                            <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer"
                                className="flex items-center hover:opacity-80 transition-opacity">
                                <CodeBracketIcon className="w-5 h-5 ml-2" style={{ color: config.colors.accent }} />
                                <span>GitHub</span>
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* محتوای اصلی */}
            <main className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* سایدبار */}
                    <motion.aside
                        className="lg:col-span-1 space-y-8"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {/* بخش مهارت‌ها */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{ borderColor: config.colors.border }}>
                            <SectionHeader title="مهارت‌های فنی" icon={CommandLineIcon} />
                            <div className="space-y-4">
                                {skills.map((skill, index) => (
                                    <SkillBar key={index} skill={skill} />
                                ))}
                            </div>
                        </div>

                        {/* بخش تحصیلات */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{ borderColor: config.colors.border }}>
                            <SectionHeader title="تحصیلات" icon={AcademicCapIcon} />
                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="pb-4 border-b last:border-b-0 last:pb-0"
                                        style={{ borderColor: config.colors.border }}
                                    >
                                        <h3 className="font-bold text-lg">{edu.degree}</h3>
                                        <p className="text-gray-600 mt-1">{edu.institution}</p>
                                        <div className="flex items-center mt-2 text-sm text-gray-500">
                                            <CalendarIcon className="w-4 h-4 ml-1" />
                                            <span>{edu.startDate} - {edu.endDate}</span>
                                            {edu.gpa && (
                                                <span className="mr-auto bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                                                    معدل: {edu.gpa}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* بخش زبان‌ها */}
                        {languages && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{ borderColor: config.colors.border }}>
                                <SectionHeader title="زبان‌ها" icon={GlobeAltIcon} />
                                <div className="space-y-3">
                                    {languages.map((lang, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="font-medium">{lang.name}</span>
                                            <span className="px-3 py-1 rounded-full text-sm"
                                                style={{
                                                    backgroundColor: `${config.colors.accent}15`,
                                                    color: config.colors.accent
                                                }}>
                                                {lang.level}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.aside>

                    {/* محتوای اصلی */}
                    <motion.div
                        className="lg:col-span-2 space-y-8"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        {/* سوابق کاری */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border" style={{ borderColor: config.colors.border }}>
                            <SectionHeader title="سوابق کاری" icon={BriefcaseIcon} />
                            <div className="space-y-8">
                                {experience.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative pl-8 border-r-4"
                                        style={{ borderColor: config.colors.accent }}
                                    >
                                        <div className="absolute right-[-12px] top-0 w-6 h-6 rounded-full"
                                            style={{ background: config.gradients.accent }} />
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                                            <div>
                                                <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
                                                <p className="text-lg text-gray-600 mt-1">{exp.company}</p>
                                            </div>
                                            <div className="flex items-center mt-2 md:mt-0 text-gray-500">
                                                <CalendarIcon className="w-4 h-4 ml-1" />
                                                <span>{exp.startDate} - {exp.endDate}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">{exp.description}</p>

                                        {exp.achievements && (
                                            <div className="mb-4">
                                                <h4 className="font-bold mb-2" style={{ color: config.colors.primary }}>
                                                    دستاوردها:
                                                </h4>
                                                <ul className="space-y-2">
                                                    {exp.achievements.map((achievement, i) => (
                                                        <li key={i} className="flex items-start">
                                                            <CheckCircleIcon className="w-5 h-5 ml-2 mt-0.5 flex-shrink-0"
                                                                style={{ color: config.colors.accent }} />
                                                            <span>{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {exp.technologies && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {exp.technologies.map((tech, i) => (
                                                    <span key={i} className="px-3 py-1 rounded-full text-sm"
                                                        style={{
                                                            backgroundColor: `${config.colors.accent}10`,
                                                            color: config.colors.accent
                                                        }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* پروژه‌ها */}
                        {projects && (
                            <div className="bg-white rounded-2xl shadow-lg p-8 border" style={{ borderColor: config.colors.border }}>
                                <SectionHeader title="پروژه‌های شاخص" icon={DocumentTextIcon} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.map((project, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-5 rounded-xl border hover:shadow-lg transition-shadow"
                                            style={{ borderColor: config.colors.border }}
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-bold text-lg">{project.title}</h3>
                                                {project.year && (
                                                    <span className="text-sm px-2 py-1 rounded"
                                                        style={{
                                                            backgroundColor: `${config.colors.primary}10`,
                                                            color: config.colors.primary
                                                        }}>
                                                        {project.year}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, i) => (
                                                    <span key={i} className="px-2 py-1 text-xs rounded"
                                                        style={{
                                                            backgroundColor: `${config.colors.secondary}10`,
                                                            color: config.colors.secondary
                                                        }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

            {/* فوتر */}
            <motion.footer
                className="py-6 mt-8 text-center"
                style={{ backgroundColor: config.colors.cardBg }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            <SparklesIcon className="w-5 h-5 ml-2" style={{ color: config.colors.accent }} />
                            <span className="font-medium" style={{ color: config.colors.primary }}>
                                {config.name} Resume Template
                            </span>
                        </div>
                        <p className="text-sm opacity-75">
                            آخرین بروزرسانی: آذر ۱۴۰۳
                        </p>
                    </div>
                </div>
            </motion.footer>
        </motion.div>
    );
};

export default ModernProTemplate;