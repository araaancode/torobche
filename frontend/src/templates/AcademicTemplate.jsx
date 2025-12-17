// client/src/templates/AcademicTemplate.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    LinkIcon,
    CalendarIcon,
    AcademicCapIcon,
    BookOpenIcon,
    DocumentTextIcon,
    UsersIcon,
    BeakerIcon,
    ChartBarIcon,
    TrophyIcon,
    GlobeAltIcon,
    PaperClipIcon,
    ArrowTopRightOnSquareIcon,
    ChevronRightIcon,
    IdentificationIcon,
    BuildingOfficeIcon,
    LightBulbIcon,
    PencilSquareIcon,
    StarIcon,
    UserGroupIcon,
    ScaleIcon,
    ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const AcademicTemplate = ({ data, isPrintMode = false }) => {
    const {
        personalInfo,
        experience = [],
        education = [],
        skills = [],
        projects = [],
        languages = [],
        certifications = [],
        publications = [],
        research = [],
        teaching = [],
        awards = [],
        references = []
    } = data || {};

    // پالت رنگ آکادمیک
    const colors = useMemo(() => ({
        primary: '#1e40af', // آبی آکادمیک
        secondary: '#374151', // خاکستری
        accent: '#dc2626', // قرمز آکادمیک
        background: '#ffffff', // سفید
        surface: '#f9fafb', // خاکستری روشن
        text: '#111827', // مشکی
        textSecondary: '#6b7280', // خاکستری متوسط
        border: '#d1d5db', // خاکستری روشن
        highlight: '#f3f4f6' // هایلایت
    }), []);

    // انیمیشن‌های آکادمیک
    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 }
    };

    const slideUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // کامپوننت هدر آکادمیک
    const AcademicHeader = () => (
        <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* نوار آبی بالایی */}
            <div className="h-2 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 mb-8 rounded-full"></div>

            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                    {personalInfo?.fullName}
                </h1>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                    <div className="text-xl font-semibold text-blue-800">
                        {personalInfo?.title}
                    </div>
                    {personalInfo?.department && (
                        <>
                            <div className="hidden md:block w-1 h-1 rounded-full bg-gray-400"></div>
                            <div className="text-lg text-gray-600">
                                {personalInfo.department}
                            </div>
                        </>
                    )}
                </div>
                {personalInfo?.institution && (
                    <div className="text-xl text-gray-700 font-medium">
                        {personalInfo.institution}
                    </div>
                )}
            </div>

            {/* اطلاعات تماس آکادمیک */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {[
                    { icon: EnvelopeIcon, text: personalInfo?.email, href: `mailto:${personalInfo?.email}`, label: 'رایانامه' },
                    { icon: PhoneIcon, text: personalInfo?.phone, href: `tel:${personalInfo?.phone}`, label: 'تلفن' },
                    { icon: MapPinIcon, text: personalInfo?.address ? `${personalInfo.address.city}, ${personalInfo.address.country}` : null, label: 'موقعیت' },
                    { icon: LinkIcon, text: personalInfo?.website, href: personalInfo?.website, label: 'وبسایت' },
                    { icon: BookOpenIcon, text: personalInfo?.orcid, href: personalInfo?.orcid, label: 'شناسه ORCID' },
                    { icon: LinkIcon, text: personalInfo?.linkedin, href: personalInfo?.linkedin, label: 'لینکدین' }
                ].map((item, index) => (
                    item.text && (
                        <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            <div className="p-2 bg-white rounded-lg shadow-sm border border-blue-100">
                                <item.icon className="w-5 h-5 text-blue-700" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-500">{item.label}</div>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-800 hover:text-blue-700 font-medium truncate block"
                                    >
                                        {item.text}
                                        <ArrowTopRightOnSquareIcon className="w-3 h-3 inline mr-1" />
                                    </a>
                                ) : (
                                    <div className="text-gray-800 font-medium truncate">{item.text}</div>
                                )}
                            </div>
                        </motion.div>
                    )
                ))}
            </motion.div>
        </motion.div>
    );

    // کامپوننت بخش آکادمیک
    const AcademicSection = ({ title, icon: Icon, children, className = "", delay = 0 }) => (
        <motion.section
            className={`mb-10 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Icon className="w-6 h-6 text-blue-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {title}
                </h2>
            </div>
            {children}
        </motion.section>
    );

    // کامپوننت آیتم تحصیلات آکادمیک
    const EducationItem = ({ edu, index }) => (
        <motion.div
            className="mb-6 last:mb-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                <div className="mb-2 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                    <div className="text-lg text-blue-700 font-medium mb-1">{edu.institution}</div>
                    {edu.field && (
                        <div className="text-gray-600 mb-2">
                            <LightBulbIcon className="w-4 h-4 inline mr-1" />
                            رشته: {edu.field}
                        </div>
                    )}
                </div>
                <div className="flex items-center text-gray-600">
                    <CalendarIcon className="w-4 h-4 ml-1" />
                    <span className="font-medium">{edu.startDate} - {edu.endDate}</span>
                </div>
            </div>

            {edu.description && (
                <p className="text-gray-700 leading-relaxed mb-3">
                    {edu.description}
                </p>
            )}

            {edu.gpa && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                    <StarIcon className="w-4 h-4" />
                    معدل: {edu.gpa}
                </div>
            )}

            {edu.honors && edu.honors.length > 0 && (
                <div className="mt-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">افتخارات و جوایز:</div>
                    <div className="flex flex-wrap gap-2">
                        {edu.honors.map((honor, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 rounded-full text-sm border border-blue-200">
                                {honor}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {edu.thesis && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                        <PencilSquareIcon className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-800">پایان‌نامه/رساله:</span>
                    </div>
                    <p className="text-gray-700">{edu.thesis}</p>
                    {edu.advisor && (
                        <div className="text-sm text-gray-600 mt-1">
                            استاد راهنما: {edu.advisor}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );

    // کامپوننت آیتم تجربه آکادمیک
    const AcademicExperienceItem = ({ exp, index }) => (
        <motion.div
            className="mb-6 last:mb-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-3">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.jobTitle}</h3>
                    <div className="text-lg text-blue-700 font-medium mb-1">{exp.institution || exp.company}</div>
                    {exp.department && (
                        <div className="text-gray-600 mb-1">{exp.department}</div>
                    )}
                </div>
                <div className="flex items-center text-gray-600 mt-2 md:mt-0">
                    <CalendarIcon className="w-4 h-4 ml-1" />
                    <span className="font-medium">{exp.startDate} - {exp.current ? 'اکنون' : exp.endDate}</span>
                </div>
            </div>

            {exp.description && (
                <p className="text-gray-700 leading-relaxed mb-3">
                    {exp.description}
                </p>
            )}

            {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                            <ChevronRightIcon className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{resp}</span>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );

    // کامپوننت مقاله/انتشارات
    const PublicationItem = ({ pub, index }) => (
        <motion.div
            className="mb-4 last:mb-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-900">
                        {pub.title}
                    </h4>
                    {pub.year && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded whitespace-nowrap">
                            {pub.year}
                        </span>
                    )}
                </div>

                <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">{pub.authors}</span>
                    {pub.journal && (
                        <span className="mx-2">•</span>
                    )}
                    {pub.journal && (
                        <span className="italic">{pub.journal}</span>
                    )}
                </div>

                {pub.doi && (
                    <div className="flex items-center gap-1 text-sm">
                        <PaperClipIcon className="w-3 h-3 text-gray-500" />
                        <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            شناسه DOI: {pub.doi}
                        </a>
                    </div>
                )}

                {pub.citationCount && (
                    <div className="mt-2 text-xs text-gray-500">
                        تعداد استنادات: {pub.citationCount}
                    </div>
                )}
            </div>
        </motion.div>
    );

    // کامپوننت تحقیقات
    const ResearchItem = ({ research, index }) => (
        <motion.div
            className="mb-4 last:mb-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
                <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-gray-900">
                        {research.title}
                    </h4>
                    {research.status && (
                        <span className={`px-2 py-1 text-xs font-bold rounded ${research.status === 'completed' ? 'bg-green-100 text-green-800' :
                            research.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {research.status === 'completed' ? 'تکمیل شده' :
                                research.status === 'ongoing' ? 'در حال انجام' :
                                    'در حال برنامه‌ریزی'}
                        </span>
                    )}
                </div>

                {research.description && (
                    <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                        {research.description}
                    </p>
                )}

                {research.role && (
                    <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">نقش:</span> {research.role}
                    </div>
                )}

                {research.funding && (
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">منبع تأمین اعتبار:</span> {research.funding}
                    </div>
                )}
            </div>
        </motion.div>
    );

    // کامپوننت تدریس
    const TeachingItem = ({ course, index }) => (
        <motion.div
            className="mb-3 last:mb-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                    <div className="font-medium text-gray-900">{course.code} - {course.title}</div>
                    {course.level && (
                        <div className="text-sm text-gray-600">{course.level}</div>
                    )}
                    {course.semester && (
                        <div className="text-sm text-gray-500">
                            {course.semester} • {course.hours || '3'} واحد
                        </div>
                    )}
                </div>
                {course.role && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded whitespace-nowrap">
                        {course.role === 'Instructor' ? 'مدرس' :
                            course.role === 'Teaching Assistant' ? 'دستیار آموزشی' :
                                course.role === 'Course Designer' ? 'طراح درس' :
                                    course.role}
                    </span>
                )}
            </div>
        </motion.div>
    );

    // کامپوننت مهارت‌های آکادمیک
    const AcademicSkill = ({ skill, index }) => {
        const skillName = typeof skill === 'object' ? skill.name : skill;
        const skillLevel = typeof skill === 'object' ? skill.level : null;

        return (
            <motion.div
                className="mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
            >
                <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800">{skillName}</span>
                    {skillLevel && (
                        <div className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded">
                            {skillLevel}/10
                        </div>
                    )}
                </div>
                {skillLevel && (
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skillLevel * 10}%` }}
                            transition={{ delay: index * 0.05 + 0.2, duration: 1 }}
                        />
                    </div>
                )}
            </motion.div>
        );
    };

    // کامپوننت جوایز و افتخارات
    const AwardItem = ({ award, index }) => (
        <motion.div
            className="mb-3 last:mb-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-white rounded-lg border border-yellow-100">
                <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
                    <TrophyIcon className="w-5 h-5 text-yellow-700" />
                </div>
                <div className="flex-1">
                    <div className="font-bold text-gray-900 mb-1">{award.name}</div>
                    <div className="text-sm text-gray-600 mb-1">{award.organization}</div>
                    {award.year && (
                        <div className="text-xs text-gray-500">
                            سال اعطا: {award.year}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            className="academic-template min-h-screen bg-white font-serif"
            style={{ color: colors.text }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto px-6 py-10">
                {/* هدر آکادمیک */}
                <AcademicHeader />

                {/* اطلاعات تحقیقاتی */}
                {personalInfo?.researchInterests && (
                    <motion.div
                        className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-blue-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm border border-blue-100">
                                <BeakerIcon className="w-6 h-6 text-blue-700" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">علایق پژوهشی</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {personalInfo.researchInterests.map((interest, index) => (
                                <motion.span
                                    key={index}
                                    className="px-4 py-2 bg-white text-blue-800 font-medium rounded-full border border-blue-200 shadow-sm"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    {interest}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* محتوای اصلی - دو ستونی */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ستون چپ */}
                    <div className="lg:col-span-2">
                        {/* تحصیلات */}
                        {education.length > 0 && (
                            <AcademicSection
                                title="تحصیلات"
                                icon={AcademicCapIcon}
                                delay={0.1}
                            >
                                <div className="space-y-1">
                                    {education.map((edu, index) => (
                                        <EducationItem
                                            key={index}
                                            edu={edu}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </AcademicSection>
                        )}

                        {/* سوابق آکادمیک */}
                        {experience.length > 0 && (
                            <AcademicSection
                                title="سوابق آکادمیک"
                                icon={BuildingOfficeIcon}
                                delay={0.2}
                            >
                                <div className="space-y-1">
                                    {experience.map((exp, index) => (
                                        <AcademicExperienceItem
                                            key={index}
                                            exp={exp}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </AcademicSection>
                        )}

                        {/* تحقیقات */}
                        {(research.length > 0 || projects.length > 0) && (
                            <AcademicSection
                                title="تحقیقات و پروژه‌ها"
                                icon={BeakerIcon}
                                delay={0.3}
                            >
                                <div className="space-y-4">
                                    {research.map((item, index) => (
                                        <ResearchItem
                                            key={index}
                                            research={item}
                                            index={index}
                                        />
                                    ))}

                                    {projects.map((project, index) => (
                                        <motion.div
                                            key={`project-${index}`}
                                            className="p-4 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-100"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + (research.length + index) * 0.1 }}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-bold text-gray-900">
                                                    {project.title}
                                                </h4>
                                                {project.year && (
                                                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded">
                                                        {project.year}
                                                    </span>
                                                )}
                                            </div>

                                            {project.description && (
                                                <p className="text-gray-700 text-sm mb-3">
                                                    {project.description}
                                                </p>
                                            )}

                                            {project.technologies && project.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {project.technologies.map((tech, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </AcademicSection>
                        )}

                        {/* تدریس */}
                        {teaching.length > 0 && (
                            <AcademicSection
                                title="سوابق تدریس"
                                icon={UsersIcon}
                                delay={0.4}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {teaching.map((course, index) => (
                                        <TeachingItem
                                            key={index}
                                            course={course}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </AcademicSection>
                        )}
                    </div>

                    {/* ستون راست */}
                    <div className="space-y-10">
                        {/* مهارت‌های آکادمیک */}
                        {skills.length > 0 && (
                            <AcademicSection
                                title="مهارت‌های علمی"
                                icon={ChartBarIcon}
                                className="lg:mt-0"
                                delay={0.5}
                            >
                                <div className="space-y-1">
                                    {skills.map((skill, index) => (
                                        <AcademicSkill
                                            key={index}
                                            skill={skill}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </AcademicSection>
                        )}

                        {/* جوایز و افتخارات */}
                        {awards.length > 0 && (
                            <AcademicSection
                                title="جوایز و افتخارات"
                                icon={TrophyIcon}
                                delay={0.6}
                            >
                                <div className="space-y-1">
                                    {awards.map((award, index) => (
                                        <AwardItem
                                            key={index}
                                            award={award}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </AcademicSection>
                        )}

                        {/* زبان‌ها */}
                        {languages.length > 0 && (
                            <AcademicSection
                                title="زبان‌ها"
                                icon={GlobeAltIcon}
                                delay={0.7}
                            >
                                <div className="space-y-4">
                                    {languages.map((lang, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 + index * 0.1 }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{lang.flag || '🌐'}</span>
                                                <div>
                                                    <div className="font-medium text-gray-900">{lang.name}</div>
                                                    {lang.certification && (
                                                        <div className="text-xs text-gray-600">{lang.certification}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-sm font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded">
                                                {lang.level === 'Native' ? 'بومی' :
                                                    lang.level === 'Fluent' ? 'مسلط' :
                                                        lang.level === 'Intermediate' ? 'متوسط' :
                                                            lang.level === 'Basic' ? 'مقدماتی' :
                                                                lang.level}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </AcademicSection>
                        )}

                        {/* گواهینامه‌های آکادمیک */}
                        {certifications.length > 0 && (
                            <AcademicSection
                                title="گواهینامه‌ها"
                                icon={DocumentTextIcon}
                                delay={0.8}
                            >
                                <div className="space-y-3">
                                    {certifications.map((cert, index) => (
                                        <motion.div
                                            key={index}
                                            className="p-3 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-100"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + index * 0.1 }}
                                        >
                                            <div className="font-medium text-gray-900 mb-1">{cert.name}</div>
                                            <div className="text-sm text-gray-600 mb-1">{cert.issuer}</div>
                                            {cert.date && (
                                                <div className="text-xs text-gray-500">تاریخ اخذ: {cert.date}</div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </AcademicSection>
                        )}

                        {/* عضویت در انجمن‌ها */}
                        {personalInfo?.memberships && personalInfo.memberships.length > 0 && (
                            <AcademicSection
                                title="عضویت در انجمن‌های تخصصی"
                                icon={UserGroupIcon}
                                delay={0.9}
                            >
                                <div className="space-y-2">
                                    {personalInfo.memberships.map((membership, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-white rounded-lg border border-indigo-100"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.9 + index * 0.1 }}
                                        >
                                            <IdentificationIcon className="w-5 h-5 text-indigo-600" />
                                            <span className="font-medium text-gray-900">{membership}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </AcademicSection>
                        )}
                    </div>
                </div>

                {/* انتشارات (در صورت وجود) */}
                {publications.length > 0 && (
                    <AcademicSection
                        title="انتشارات"
                        icon={DocumentTextIcon}
                        className="mt-12"
                        delay={1}
                    >
                        <div className="grid grid-cols-1 gap-4">
                            {publications.slice(0, 5).map((pub, index) => (
                                <PublicationItem
                                    key={index}
                                    pub={pub}
                                    index={index}
                                />
                            ))}

                            {publications.length > 5 && (
                                <motion.div
                                    className="text-center mt-6 pt-4 border-t border-gray-200"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    <div className="inline-flex items-center gap-2 text-blue-600 font-medium">
                                        <span>مشاهده {publications.length - 5} انتشار دیگر</span>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </AcademicSection>
                )}

                {/* رفرنس‌ها */}
                {references.length > 0 && (
                    <AcademicSection
                        title="معرف‌ها"
                        icon={ScaleIcon}
                        className="mt-10"
                        delay={1.1}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {references.map((ref, index) => (
                                <motion.div
                                    key={index}
                                    className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1 + index * 0.1 }}
                                >
                                    <div className="font-bold text-gray-900 mb-2">{ref.name}</div>
                                    <div className="text-gray-700 mb-2">{ref.position}</div>
                                    <div className="text-gray-600 mb-1">{ref.institution}</div>
                                    <div className="text-sm text-gray-500">
                                        {ref.email && (
                                            <div className="flex items-center gap-1">
                                                <EnvelopeIcon className="w-3 h-3" />
                                                {ref.email}
                                            </div>
                                        )}
                                        {ref.phone && (
                                            <div className="flex items-center gap-1">
                                                <PhoneIcon className="w-3 h-3" />
                                                {ref.phone}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AcademicSection>
                )}

                {/* فوتر آکادمیک */}
                <motion.footer
                    className="mt-12 pt-8 border-t border-gray-200 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <div className="text-gray-600 text-sm">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
                            {personalInfo?.orcid && (
                                <div className="flex items-center gap-2">
                                    <BookOpenIcon className="w-4 h-4" />
                                    <span>شناسه ORCID: {personalInfo.orcid}</span>
                                </div>
                            )}
                            {personalInfo?.website && (
                                <div className="flex items-center gap-2">
                                    <LinkIcon className="w-4 h-4" />
                                    <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                        وبسایت شخصی
                                    </a>
                                </div>
                            )}
                        </div>
                        <p className="text-gray-500">
                            رزومه علمی • آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </motion.footer>
            </div>

            {/* استایل‌های تخصصی برای قالب آکادمیک */}
            <style jsx global>{`
                .academic-template {
                    font-family: 'Times New Roman', Times, serif;
                    line-height: 1.6;
                }
                
                .academic-template h1, 
                .academic-template h2, 
                .academic-template h3 {
                    font-family: 'Georgia', serif;
                    font-weight: bold;
                }
                
                .academic-template a {
                    color: #1e40af;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                
                .academic-template a:hover {
                    color: #1e3a8a;
                    text-decoration: underline;
                }
                
                /* استایل‌های چاپ */
                @media print {
                    .academic-template {
                        font-size: 11pt;
                        line-height: 1.4;
                    }
                    
                    .academic-template h1 {
                        font-size: 20pt;
                    }
                    
                    .academic-template h2 {
                        font-size: 16pt;
                    }
                    
                    .academic-template h3 {
                        font-size: 14pt;
                    }
                    
                    .academic-template .bg-gradient-to-r {
                        background: white !important;
                        border: 1px solid #ddd !important;
                    }
                    
                    .academic-template a {
                        color: black !important;
                        text-decoration: none !important;
                    }
                    
                    .academic-template .text-blue-700,
                    .academic-template .text-blue-600 {
                        color: black !important;
                    }
                }
                
                /* انیمیشن‌های تخصصی */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
        </motion.div>
    );
};

export default AcademicTemplate;