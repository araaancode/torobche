// client/src/pages/ResumeBuilder.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CheckCircleIcon,
    UserIcon,
    BriefcaseIcon,
    AcademicCapIcon,
    WrenchScrewdriverIcon,
    EyeIcon,
    DocumentArrowDownIcon,
    Squares2X2Icon,
    LanguageIcon,
    DocumentCheckIcon,
    UserGroupIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon,
    ArrowUturnLeftIcon,
    ClipboardDocumentCheckIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    LinkIcon,
    CalendarIcon,
    StarIcon,
    GlobeAltIcon,
    ChartBarIcon,
    LightBulbIcon,
    DocumentTextIcon,
    SparklesIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { useResume } from '../../contexts/ResumeContext';

const ResumeBuilder = () => {
    const { templateId } = useParams();
    const navigate = useNavigate();
    const { resumeData, updateResumeData, updateNestedResumeData, addItem, updateItem, removeItem } = useResume();

    const [currentStep, setCurrentStep] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [skillInput, setSkillInput] = useState('');
    const [skillCategory, setSkillCategory] = useState('فنی');
    const [skillLevel, setSkillLevel] = useState('متوسط');
    const [projectInput, setProjectInput] = useState({});

    const steps = [
        { id: 1, title: 'اطلاعات شخصی', icon: UserIcon, required: ['fullName', 'email'] },
        { id: 2, title: 'سوابق کاری', icon: BriefcaseIcon, required: [] },
        { id: 3, title: 'تحصیلات', icon: AcademicCapIcon, required: [] },
        { id: 4, title: 'مهارت‌ها', icon: WrenchScrewdriverIcon, required: [] },
        { id: 5, title: 'پروژه‌ها', icon: Squares2X2Icon, required: [] },
        { id: 6, title: 'زبان‌ها', icon: LanguageIcon, required: [] },
        { id: 7, title: 'گواهینامه‌ها', icon: DocumentCheckIcon, required: [] },
        { id: 8, title: 'مراجع', icon: UserGroupIcon, required: [] }
    ];

    useEffect(() => {
        if (templateId) {
            updateResumeData('templateId', templateId);
        }

        document.body.classList.add('rtl');
        document.body.dir = 'rtl';

        return () => {
            document.body.classList.remove('rtl');
            document.body.dir = 'ltr';
        };
    }, [templateId]);

    const validateStep = (step) => {
        const errors = {};
        const currentStepConfig = steps.find(s => s.id === step);

        if (currentStepConfig) {
            currentStepConfig.required.forEach(field => {
                if (step === 1) {
                    if (!resumeData.personalInfo[field]?.trim()) {
                        errors[field] = `این فیلد الزامی است`;
                    }
                }
            });
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < steps.length) {
                setCurrentStep(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleCreateResume = async () => {
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate('/resume-preview');
        } catch (error) {
            console.error('خطا در ایجاد رزومه:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddSkill = () => {
        if (!skillInput.trim()) return;

        const skillsToAdd = skillInput.split(',')
            .map(s => s.trim())
            .filter(s => s)
            .map(skill => ({
                name: skill,
                category: skillCategory,
                level: skillLevel,
                id: Date.now() + Math.random()
            }));

        if (skillsToAdd.length > 0) {
            updateResumeData('skills', [...resumeData.skills, ...skillsToAdd]);
            setSkillInput('');
        }
    };

    const handleSkillKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const handleAddProject = () => {
        addItem('projects', {
            title: projectInput.title || '',
            description: projectInput.description || '',
            technologies: projectInput.technologies?.split(',').map(t => t.trim()).filter(t => t) || [],
            link: projectInput.link || '',
            role: projectInput.role || '',
            year: projectInput.year || new Date().getFullYear().toString(),
            isActive: projectInput.isActive || false
        });

        setProjectInput({});
    };

    const categories = ['فنی', 'مدیریتی', 'زبانی', 'نرم', 'دیگر'];
    const levels = [
        { value: 'مبتدی', gradient: 'from-gray-400 to-gray-300', color: 'text-gray-700', bg: 'bg-gray-100', progress: '25%' },
        { value: 'متوسط', gradient: 'from-blue-400 to-blue-300', color: 'text-blue-700', bg: 'bg-blue-100', progress: '50%' },
        { value: 'پیشرفته', gradient: 'from-green-400 to-green-300', color: 'text-green-700', bg: 'bg-green-100', progress: '75%' },
        { value: 'حرفه‌ای', gradient: 'from-purple-400 to-purple-300', color: 'text-purple-700', bg: 'bg-purple-100', progress: '85%' },
        { value: 'تخصصی', gradient: 'from-red-400 to-red-300', color: 'text-red-700', bg: 'bg-red-100', progress: '100%' }
    ];

    const languageLevels = ['مبتدی', 'متوسط', 'پیشرفته', 'بومی'];

    // استایل‌های شبیه Features
    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        position: 'relative',
        zIndex: 10
    };

    const sectionStyle = {
        position: 'relative',
        padding: '4rem 1rem',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 50%, #f0f4ff 100%)',
        overflow: 'hidden',
        minHeight: '100vh'
    };

    const floatingShapeStyle = (top, left, width, height, gradient, delay) => ({
        position: 'absolute',
        top: top,
        left: left,
        width: width,
        height: height,
        background: gradient,
        borderRadius: '50%',
        filter: 'blur(60px)',
        opacity: 0.15,
        animation: `float 6s ease-in-out infinite`,
        animationDelay: delay
    });

    const badgeStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '1rem',
        padding: '0.5rem 1rem',
        marginBottom: '1.5rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    };

    const gradientTextStyle = {
        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    };

    const glassCardStyle = {
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '1.5rem',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    };

    const iconWrapperStyle = (gradient) => ({
        width: '4rem',
        height: '4rem',
        background: gradient,
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
    });

    const inputStyle = {
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
    };

    const buttonGradientStyle = (from, to) => ({
        background: `linear-gradient(135deg, ${from}, ${to})`,
        color: 'white',
        border: 'none',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
    });

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                                    <UserIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">اطلاعات شخصی</h3>
                                    <p className="text-gray-600">اطلاعات اصلی خود را وارد کنید</p>
                                </div>
                            </div>
                            <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-lg font-medium">
                                مرحله ۱ از ۸
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* اطلاعات اصلی */}
                            <div style={glassCardStyle}>
                                <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">اطلاعات اصلی</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            نام و نام خانوادگی *
                                        </label>
                                        <input
                                            type="text"
                                            value={resumeData.personalInfo.fullName}
                                            onChange={(e) => updateNestedResumeData('personalInfo', 'fullName', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right ${validationErrors.fullName ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            style={inputStyle}
                                            placeholder="علی محمدی"
                                        />
                                        {validationErrors.fullName && (
                                            <p className="text-red-500 text-sm mt-2 text-right">{validationErrors.fullName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            عنوان شغلی
                                        </label>
                                        <input
                                            type="text"
                                            value={resumeData.personalInfo.title}
                                            onChange={(e) => updateNestedResumeData('personalInfo', 'title', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                            style={inputStyle}
                                            placeholder="مهندس نرم‌افزار ارشد"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            ایمیل *
                                        </label>
                                        <input
                                            type="email"
                                            value={resumeData.personalInfo.email}
                                            onChange={(e) => updateNestedResumeData('personalInfo', 'email', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${validationErrors.email ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            style={inputStyle}
                                            placeholder="ali@example.com"
                                            dir="ltr"
                                        />
                                        {validationErrors.email && (
                                            <p className="text-red-500 text-sm mt-2 text-right">{validationErrors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            تلفن
                                        </label>
                                        <input
                                            type="tel"
                                            value={resumeData.personalInfo.phone}
                                            onChange={(e) => updateNestedResumeData('personalInfo', 'phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            style={inputStyle}
                                            placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* اطلاعات مکانی */}
                            <div style={glassCardStyle}>
                                <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">اطلاعات مکانی</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            شهر
                                        </label>
                                        <input
                                            type="text"
                                            value={resumeData.personalInfo.address?.city || ''}
                                            onChange={(e) => updateNestedResumeData('personalInfo', 'address', {
                                                ...resumeData.personalInfo.address,
                                                city: e.target.value
                                            })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                            style={inputStyle}
                                            placeholder="تهران"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            کشور
                                        </label>
                                        <input
                                            type="text"
                                            value={resumeData.personalInfo.address?.country || ''}
                                            onChange={(e) => updateNestedResumeData('personalInfo', 'address', {
                                                ...resumeData.personalInfo.address,
                                                country: e.target.value
                                            })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                            style={inputStyle}
                                            placeholder="ایران"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* درباره من */}
                            <div style={glassCardStyle}>
                                <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">خلاصه و پروفایل</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        درباره من
                                    </label>
                                    <textarea
                                        value={resumeData.personalInfo.about}
                                        onChange={(e) => updateNestedResumeData('personalInfo', 'about', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                        style={inputStyle}
                                        placeholder="خلاصه‌ای از تجربیات و مهارت‌های خود را بنویسید..."
                                        rows="4"
                                    />
                                    <p className="text-sm text-gray-500 mt-2 text-right">
                                        این قسمت در ابتدای رزومه شما نمایش داده می‌شود
                                    </p>
                                </div>
                            </div>

                            {/* لینک‌های مرتبط */}
                            <div style={glassCardStyle}>
                                <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">لینک‌های مرتبط</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            لینکدین
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="url"
                                                value={resumeData.personalInfo.linkedin}
                                                onChange={(e) => updateNestedResumeData('personalInfo', 'linkedin', e.target.value)}
                                                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                style={inputStyle}
                                                placeholder="linkedin.com/in/username"
                                                dir="ltr"
                                            />
                                            <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            گیت‌هاب
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="url"
                                                value={resumeData.personalInfo.github}
                                                onChange={(e) => updateNestedResumeData('personalInfo', 'github', e.target.value)}
                                                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                style={inputStyle}
                                                placeholder="github.com/username"
                                                dir="ltr"
                                            />
                                            <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                            وبسایت شخصی
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="url"
                                                value={resumeData.personalInfo.website}
                                                onChange={(e) => updateNestedResumeData('personalInfo', 'website', e.target.value)}
                                                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                style={inputStyle}
                                                placeholder="https://example.com"
                                                dir="ltr"
                                            />
                                            <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                                    <BriefcaseIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">سوابق کاری</h3>
                                    <p className="text-gray-600">تجربیات شغلی خود را وارد کنید</p>
                                </div>
                            </div>
                            <button
                                onClick={() => addItem('experience', {
                                    jobTitle: '',
                                    company: '',
                                    location: '',
                                    startDate: '',
                                    endDate: '',
                                    current: false,
                                    description: '',
                                    achievements: ['']
                                })}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>افزودن سابقه کاری</span>
                            </button>
                        </div>

                        {resumeData.experience.length === 0 ? (
                            <div style={glassCardStyle}>
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BriefcaseIcon className="w-10 h-10 text-purple-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">هنوز سابقه کاری اضافه نکرده‌اید</h4>
                                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                                        تجربیات کاری خود را اضافه کنید تا رزومه شما حرفه‌ای‌تر شود.
                                    </p>
                                    <button
                                        onClick={() => addItem('experience', {
                                            jobTitle: '',
                                            company: '',
                                            location: '',
                                            startDate: '',
                                            endDate: '',
                                            current: false,
                                            description: ''
                                        })}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-lg hover:from-purple-200 hover:to-purple-100 font-medium"
                                    >
                                        اولین سابقه کاری را اضافه کنید
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {resumeData.experience.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={glassCardStyle}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg flex items-center justify-center">
                                                    <BriefcaseIcon className="w-6 h-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900">سابقه کاری #{index + 1}</h4>
                                                    <p className="text-sm text-gray-500">
                                                        {exp.company || 'شرکت نامشخص'}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem('experience', index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="حذف"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    عنوان شغلی
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.jobTitle}
                                                    onChange={(e) => updateItem('experience', index, {
                                                        ...exp,
                                                        jobTitle: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="مهندس نرم‌افزار"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    شرکت
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.company}
                                                    onChange={(e) => updateItem('experience', index, {
                                                        ...exp,
                                                        company: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="شرکت دیجی‌کالا"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    مکان
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.location}
                                                    onChange={(e) => updateItem('experience', index, {
                                                        ...exp,
                                                        location: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="تهران، ایران"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    تاریخ شروع
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={exp.startDate}
                                                        onChange={(e) => updateItem('experience', index, {
                                                            ...exp,
                                                            startDate: e.target.value
                                                        })}
                                                        className="w-full px-4 py-2.5 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                        style={inputStyle}
                                                        placeholder="مهر ۱۴۰۰"
                                                    />
                                                    <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    تاریخ پایان
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative flex-1">
                                                        <input
                                                            type="text"
                                                            value={exp.current ? 'اکنون' : exp.endDate}
                                                            onChange={(e) => updateItem('experience', index, {
                                                                ...exp,
                                                                endDate: e.target.value,
                                                                current: false
                                                            })}
                                                            className="w-full px-4 py-2.5 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                            style={inputStyle}
                                                            placeholder="اکنون"
                                                            disabled={exp.current}
                                                        />
                                                        <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`current-${index}`}
                                                            checked={exp.current}
                                                            onChange={(e) => updateItem('experience', index, {
                                                                ...exp,
                                                                current: e.target.checked,
                                                                endDate: e.target.checked ? '' : exp.endDate
                                                            })}
                                                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                                        />
                                                        <label htmlFor={`current-${index}`} className="text-sm text-gray-700 whitespace-nowrap">
                                                            مشغول به کار
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    توضیحات و دستاوردها
                                                </label>
                                                <textarea
                                                    value={exp.description}
                                                    onChange={(e) => updateItem('experience', index, {
                                                        ...exp,
                                                        description: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="• مدیریت تیم ۵ نفره توسعه\n• افزایش ۴۰٪ کارایی سیستم\n• توسعه معماری میکروسرویس"
                                                    rows="4"
                                                />
                                                <p className="text-sm text-gray-500 mt-2 text-right">
                                                    هر دستاورد را در یک خط جدید وارد کنید
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                                    <AcademicCapIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">تحصیلات</h3>
                                    <p className="text-gray-600">سوابق تحصیلی خود را وارد کنید</p>
                                </div>
                            </div>
                            <button
                                onClick={() => addItem('education', {
                                    degree: '',
                                    institution: '',
                                    location: '',
                                    startDate: '',
                                    endDate: '',
                                    current: false,
                                    description: '',
                                    gpa: ''
                                })}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>افزودن مدرک تحصیلی</span>
                            </button>
                        </div>

                        {resumeData.education.length === 0 ? (
                            <div style={glassCardStyle}>
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AcademicCapIcon className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">هنوز مدرک تحصیلی اضافه نکرده‌اید</h4>
                                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                                        سوابق تحصیلی خود را اضافه کنید تا رزومه شما کامل‌تر شود.
                                    </p>
                                    <button
                                        onClick={() => addItem('education', {
                                            degree: '',
                                            institution: '',
                                            location: '',
                                            startDate: '',
                                            endDate: '',
                                            current: false,
                                            description: ''
                                        })}
                                        className="px-6 py-3 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-lg hover:from-green-200 hover:to-green-100 font-medium"
                                    >
                                        اولین مدرک تحصیلی را اضافه کنید
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {resumeData.education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={glassCardStyle}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                                                    <AcademicCapIcon className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900">تحصیلات #{index + 1}</h4>
                                                    <p className="text-sm text-gray-500">
                                                        {edu.institution || 'نامشخص'}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem('education', index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="حذف"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    مدرک تحصیلی
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={(e) => updateItem('education', index, {
                                                        ...edu,
                                                        degree: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="کارشناسی ارشد مهندسی نرم‌افزار"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    مؤسسه آموزشی
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.institution}
                                                    onChange={(e) => updateItem('education', index, {
                                                        ...edu,
                                                        institution: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="دانشگاه تهران"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    مکان
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.location}
                                                    onChange={(e) => updateItem('education', index, {
                                                        ...edu,
                                                        location: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="تهران، ایران"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    تاریخ شروع
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={edu.startDate}
                                                        onChange={(e) => updateItem('education', index, {
                                                            ...edu,
                                                            startDate: e.target.value
                                                        })}
                                                        className="w-full px-4 py-2.5 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                        style={inputStyle}
                                                        placeholder="شهریور ۱۳۹۵"
                                                    />
                                                    <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    تاریخ پایان
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={edu.endDate}
                                                        onChange={(e) => updateItem('education', index, {
                                                            ...edu,
                                                            endDate: e.target.value
                                                        })}
                                                        className="w-full px-4 py-2.5 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                        style={inputStyle}
                                                        placeholder="شهریور ۱۳۹۸"
                                                    />
                                                    <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    معدل (اختیاری)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={edu.gpa}
                                                    onChange={(e) => updateItem('education', index, {
                                                        ...edu,
                                                        gpa: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="۱۷.۵ از ۲۰"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    توضیحات
                                                </label>
                                                <textarea
                                                    value={edu.description}
                                                    onChange={(e) => updateItem('education', index, {
                                                        ...edu,
                                                        description: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="موارد مرتبط، افتخارات، پایان‌نامه..."
                                                    rows="3"
                                                />
                                                <p className="text-sm text-gray-500 mt-2 text-right">
                                                    دروس مرتبط، پروژه‌ها یا دستاوردهای تحصیلی
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                );

            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl flex items-center justify-center">
                                    <WrenchScrewdriverIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">مهارت‌ها</h3>
                                    <p className="text-gray-600">مهارت‌های خود را وارد کنید</p>
                                </div>
                            </div>
                            <div className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 rounded-lg font-medium">
                                {resumeData.skills.length} مهارت ثبت شده
                            </div>
                        </div>

                        {/* راهنمای کاربر */}
                        <div style={glassCardStyle} className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                                    <WrenchScrewdriverIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-blue-800">نحوه افزودن مهارت</h4>
                                    <p className="text-sm text-blue-600">مهارت‌های خود را به راحتی اضافه کنید</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-right text-blue-700">
                                <p className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span>مهارت خود را در کادر زیر وارد کرده و Enter بزنید</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span>برای افزودن سریع چند مهارت، آن‌ها را با ویرگول جدا کنید</span>
                                </p>
                            </div>
                        </div>

                        {/* فرم افزودن مهارت */}
                        <div style={glassCardStyle} className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">افزودن مهارت جدید</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        مهارت جدید
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={skillInput}
                                            onChange={(e) => setSkillInput(e.target.value)}
                                            onKeyPress={handleSkillKeyPress}
                                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                            style={inputStyle}
                                            placeholder="مثال: React, Python, مدیریت پروژه، زبان انگلیسی"
                                            dir="rtl"
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                            <button
                                                onClick={handleAddSkill}
                                                disabled={!skillInput.trim()}
                                                className="px-3 py-1 text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                افزودن
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2 text-right">
                                        برای افزودن چند مهارت با هم، آن‌ها را با ویرگول جدا کنید
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        دسته‌بندی
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSkillCategory(cat)}
                                                className={`px-4 py-2 rounded-lg border transition-all ${skillCategory === cat
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600'
                                                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        سطح مهارت
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {levels.map((level) => (
                                            <button
                                                key={level.value}
                                                onClick={() => setSkillLevel(level.value)}
                                                className={`px-4 py-2 rounded-lg border transition-all ${skillLevel === level.value
                                                    ? `bg-gradient-to-r ${level.gradient} text-white border-current`
                                                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {level.value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={handleAddSkill}
                                    disabled={!skillInput.trim()}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                                >
                                    <PlusIcon className="w-5 h-5" />
                                    <span>افزودن مهارت</span>
                                </button>
                            </div>
                        </div>

                        {/* نمایش مهارت‌های اضافه شده */}
                        {resumeData.skills.length > 0 ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xl font-bold text-gray-900">مهارت‌های شما</h4>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('آیا از حذف تمام مهارت‌ها مطمئن هستید؟')) {
                                                updateResumeData('skills', []);
                                            }
                                        }}
                                        className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                        <span>حذف همه</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {resumeData.skills.map((skill, index) => {
                                        const levelConfig = levels.find(l => l.value === skill.level);
                                        return (
                                            <motion.div
                                                key={skill.id || index}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                style={glassCardStyle}
                                                className="hover:transform hover:-translate-y-1 transition-transform"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="font-bold text-lg">{skill.name}</span>
                                                            <span className={`text-xs px-2 py-1 ${levelConfig?.bg || 'bg-gray-100'} rounded`}>
                                                                {skill.category}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full ${skill.level === 'مبتدی' ? 'w-1/4 bg-gray-400' :
                                                                        skill.level === 'متوسط' ? 'w-1/2 bg-blue-400' :
                                                                            skill.level === 'پیشرفته' ? 'w-3/4 bg-green-400' :
                                                                                skill.level === 'حرفه‌ای' ? 'w-4/5 bg-purple-400' :
                                                                                    'w-full bg-red-400'}`}
                                                                ></div>
                                                            </div>
                                                            <span className={`text-sm ${levelConfig?.color || 'text-gray-600'}`}>
                                                                {skill.level}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            const newSkills = resumeData.skills.filter((_, i) => i !== index);
                                                            updateResumeData('skills', newSkills);
                                                        }}
                                                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-white/50 rounded-lg transition-colors"
                                                        title="حذف"
                                                    >
                                                        <XMarkIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div style={glassCardStyle}>
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <WrenchScrewdriverIcon className="w-10 h-10 text-orange-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">هنوز مهارتی اضافه نکرده‌اید</h4>
                                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                                        با افزودن مهارت‌های خود، شانس استخدام خود را افزایش دهید.
                                    </p>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        <button
                                            onClick={() => setSkillInput('React, JavaScript, TypeScript')}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-lg hover:from-blue-200 hover:to-blue-100"
                                        >
                                            مهارت‌های برنامه‌نویسی
                                        </button>
                                        <button
                                            onClick={() => setSkillInput('مدیریت پروژه، کار تیمی، حل مسئله')}
                                            className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-lg hover:from-green-200 hover:to-green-100"
                                        >
                                            مهارت‌های نرم
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                );

            case 5:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center">
                                    <Squares2X2Icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">پروژه‌ها</h3>
                                    <p className="text-gray-600">پروژه‌های خود را وارد کنید</p>
                                </div>
                            </div>
                            <button
                                onClick={handleAddProject}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
                                disabled={!projectInput.title}
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>افزودن پروژه</span>
                            </button>
                        </div>

                        {/* فرم پروژه جدید */}
                        <div style={glassCardStyle} className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">پروژه جدید</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        عنوان پروژه *
                                    </label>
                                    <input
                                        type="text"
                                        value={projectInput.title || ''}
                                        onChange={(e) => setProjectInput({ ...projectInput, title: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                        style={inputStyle}
                                        placeholder="سامانه مدیریت مشتریان"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        نقش شما
                                    </label>
                                    <input
                                        type="text"
                                        value={projectInput.role || ''}
                                        onChange={(e) => setProjectInput({ ...projectInput, role: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                        style={inputStyle}
                                        placeholder="توسعه دهنده Frontend"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        فناوری‌های استفاده شده
                                    </label>
                                    <input
                                        type="text"
                                        value={projectInput.technologies || ''}
                                        onChange={(e) => setProjectInput({ ...projectInput, technologies: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                        style={inputStyle}
                                        placeholder="React, Node.js, MongoDB, Docker"
                                    />
                                    <p className="text-sm text-gray-500 mt-2 text-right">
                                        فناوری‌ها را با ویرگول جدا کنید
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        سال اجرا
                                    </label>
                                    <input
                                        type="text"
                                        value={projectInput.year || ''}
                                        onChange={(e) => setProjectInput({ ...projectInput, year: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                        style={inputStyle}
                                        placeholder="۱۴۰۲"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        لینک پروژه (اختیاری)
                                    </label>
                                    <input
                                        type="url"
                                        value={projectInput.link || ''}
                                        onChange={(e) => setProjectInput({ ...projectInput, link: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                        style={inputStyle}
                                        placeholder="https://github.com/username/project"
                                        dir="ltr"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        توضیحات
                                    </label>
                                    <textarea
                                        value={projectInput.description || ''}
                                        onChange={(e) => setProjectInput({ ...projectInput, description: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                        style={inputStyle}
                                        placeholder="توضیحات کامل پروژه، چالش‌ها و راه‌حل‌ها..."
                                        rows="4"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* لیست پروژه‌ها */}
                        {resumeData.projects && resumeData.projects.length > 0 ? (
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold text-gray-900 mb-4 text-right">پروژه‌های شما</h4>
                                {resumeData.projects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={glassCardStyle}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-lg flex items-center justify-center">
                                                    <Squares2X2Icon className="w-6 h-6 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900">{project.title}</h4>
                                                    <p className="text-sm text-gray-500">
                                                        {project.role} • {project.year}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem('projects', index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="حذف"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {project.description && (
                                            <p className="text-gray-700 mb-4 text-right">{project.description}</p>
                                        )}

                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4 justify-end">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span key={techIndex} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {project.link && (
                                            <div className="flex justify-end">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    <LinkIcon className="w-4 h-4" />
                                                    <span>مشاهده پروژه</span>
                                                </a>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div style={glassCardStyle}>
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Squares2X2Icon className="w-10 h-10 text-indigo-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">هنوز پروژه‌ای اضافه نکرده‌اید</h4>
                                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                                        پروژه‌های خود را اضافه کنید تا تجربه عملی شما به نمایش گذاشته شود.
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                );

            case 6:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl flex items-center justify-center">
                                    <LanguageIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">زبان‌ها</h3>
                                    <p className="text-gray-600">زبان‌های خارجی خود را وارد کنید</p>
                                </div>
                            </div>
                            <button
                                onClick={() => addItem('languages', {
                                    language: '',
                                    level: 'متوسط'
                                })}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all shadow-md hover:shadow-lg"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>افزودن زبان</span>
                            </button>
                        </div>

                        {(!resumeData.languages || resumeData.languages.length === 0) ? (
                            <div style={glassCardStyle}>
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <LanguageIcon className="w-10 h-10 text-pink-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">هنوز زبانی اضافه نکرده‌اید</h4>
                                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                                        زبان‌های خارجی خود را اضافه کنید تا رزومه شما بین‌المللی شود.
                                    </p>
                                    <button
                                        onClick={() => addItem('languages', {
                                            language: 'انگلیسی',
                                            level: 'متوسط'
                                        })}
                                        className="px-6 py-3 bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700 rounded-lg hover:from-pink-200 hover:to-pink-100 font-medium"
                                    >
                                        افزودن زبان انگلیسی
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {resumeData.languages.map((lang, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={glassCardStyle}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-pink-50 rounded-lg flex items-center justify-center">
                                                    <LanguageIcon className="w-6 h-6 text-pink-600" />
                                                </div>
                                                <h4 className="text-lg font-bold text-gray-900">زبان #{index + 1}</h4>
                                            </div>
                                            <button
                                                onClick={() => removeItem('languages', index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="حذف"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    نام زبان
                                                </label>
                                                <input
                                                    type="text"
                                                    value={lang.language}
                                                    onChange={(e) => updateItem('languages', index, {
                                                        ...lang,
                                                        language: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="انگلیسی"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    سطح تسلط
                                                </label>
                                                <select
                                                    value={lang.level}
                                                    onChange={(e) => updateItem('languages', index, {
                                                        ...lang,
                                                        level: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                >
                                                    {languageLevels.map(level => (
                                                        <option key={level} value={level}>{level}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                );

            case 7:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl flex items-center justify-center">
                                    <DocumentCheckIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">گواهینامه‌ها</h3>
                                    <p className="text-gray-600">گواهینامه‌های خود را وارد کنید</p>
                                </div>
                            </div>
                            <button
                                onClick={() => addItem('certifications', {
                                    name: '',
                                    issuer: '',
                                    date: '',
                                    link: ''
                                })}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all shadow-md hover:shadow-lg"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>افزودن گواهینامه</span>
                            </button>
                        </div>

                        {(!resumeData.certifications || resumeData.certifications.length === 0) ? (
                            <div style={glassCardStyle}>
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <DocumentCheckIcon className="w-10 h-10 text-yellow-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">هنوز گواهینامه‌ای اضافه نکرده‌اید</h4>
                                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                                        گواهینامه‌های خود را اضافه کنید تا رزومه شما کامل‌تر شود.
                                    </p>
                                    <button
                                        onClick={() => addItem('certifications', {
                                            name: 'AWS Certified Solutions Architect',
                                            issuer: 'Amazon Web Services',
                                            date: '۱۴۰۲',
                                            link: ''
                                        })}
                                        className="px-6 py-3 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 rounded-lg hover:from-yellow-200 hover:to-yellow-100 font-medium"
                                    >
                                        افزودن نمونه گواهینامه
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {resumeData.certifications.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={glassCardStyle}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-lg flex items-center justify-center">
                                                    <DocumentCheckIcon className="w-6 h-6 text-yellow-600" />
                                                </div>
                                                <h4 className="text-lg font-bold text-gray-900">گواهینامه #{index + 1}</h4>
                                            </div>
                                            <button
                                                onClick={() => removeItem('certifications', index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="حذف"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    نام گواهینامه
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.name}
                                                    onChange={(e) => updateItem('certifications', index, {
                                                        ...cert,
                                                        name: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="AWS Certified Solutions Architect"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    مرجع صادرکننده
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.issuer}
                                                    onChange={(e) => updateItem('certifications', index, {
                                                        ...cert,
                                                        issuer: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="Amazon Web Services"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    تاریخ دریافت
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.date}
                                                    onChange={(e) => updateItem('certifications', index, {
                                                        ...cert,
                                                        date: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="مهر ۱۴۰۲"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    لینک گواهینامه (اختیاری)
                                                </label>
                                                <input
                                                    type="url"
                                                    value={cert.link}
                                                    onChange={(e) => updateItem('certifications', index, {
                                                        ...cert,
                                                        link: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="https://example.com/certificate"
                                                    dir="ltr"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                );

            case 8:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                                    <UserGroupIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">مراجع</h3>
                                    <p className="text-gray-600">اطلاعات مراجع خود را وارد کنید</p>
                                </div>
                            </div>
                            <button
                                onClick={() => addItem('references', {
                                    name: '',
                                    position: '',
                                    company: '',
                                    email: '',
                                    phone: ''
                                })}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>افزودن مرجع</span>
                            </button>
                        </div>

                        <div style={glassCardStyle} className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                                    <UserGroupIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-blue-800">توصیه می‌شود</h4>
                                    <p className="text-sm text-blue-600">تنها در صورت درخواست کارفرما اطلاعات را وارد کنید</p>
                                </div>
                            </div>
                            <p className="text-blue-700 text-right">
                                معمولاً عبارت "در صورت درخواست ارائه می‌شود" کافی است. فقط در صورتی که کارفرما درخواست کرده باشد، اطلاعات تماس مراجع را وارد کنید.
                            </p>
                        </div>

                        {(!resumeData.references || resumeData.references.length === 0) ? (
                            <div style={glassCardStyle}>
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <UserGroupIcon className="w-10 h-10 text-red-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">مرجعی اضافه نکرده‌اید</h4>
                                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                                        در صورت نیاز، اطلاعات مراجع خود را اضافه کنید.
                                    </p>
                                    <button
                                        onClick={() => addItem('references', {
                                            name: '',
                                            position: '',
                                            company: '',
                                            email: '',
                                            phone: ''
                                        })}
                                        className="px-6 py-3 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-lg hover:from-red-200 hover:to-red-100 font-medium"
                                    >
                                        افزودن مرجع
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {resumeData.references.map((ref, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={glassCardStyle}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-red-100 to-red-50 rounded-lg flex items-center justify-center">
                                                    <UserGroupIcon className="w-6 h-6 text-red-600" />
                                                </div>
                                                <h4 className="text-lg font-bold text-gray-900">مرجع #{index + 1}</h4>
                                            </div>
                                            <button
                                                onClick={() => removeItem('references', index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="حذف"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    نام و نام خانوادگی
                                                </label>
                                                <input
                                                    type="text"
                                                    value={ref.name}
                                                    onChange={(e) => updateItem('references', index, {
                                                        ...ref,
                                                        name: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="علی احمدی"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    سمت
                                                </label>
                                                <input
                                                    type="text"
                                                    value={ref.position}
                                                    onChange={(e) => updateItem('references', index, {
                                                        ...ref,
                                                        position: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="مدیر فنی"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    شرکت
                                                </label>
                                                <input
                                                    type="text"
                                                    value={ref.company}
                                                    onChange={(e) => updateItem('references', index, {
                                                        ...ref,
                                                        company: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="شرکت فناوری اطلاعات"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    ایمیل
                                                </label>
                                                <input
                                                    type="email"
                                                    value={ref.email}
                                                    onChange={(e) => updateItem('references', index, {
                                                        ...ref,
                                                        email: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="ali@company.com"
                                                    dir="ltr"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                                    تلفن
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={ref.phone}
                                                    onChange={(e) => updateItem('references', index, {
                                                        ...ref,
                                                        phone: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-right"
                                                    style={inputStyle}
                                                    placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                );

            default:
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={glassCardStyle}
                    >
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircleIcon className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">تبریک! اطلاعات شما تکمیل شد</h3>
                            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                                حالا می‌توانید رزومه حرفه‌ای خود را مشاهده، ویرایش یا دانلود کنید.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div style={glassCardStyle} className="text-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <EyeIcon className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">مشاهده رزومه</h4>
                                    <p className="text-gray-600 text-sm">رزومه نهایی خود را با فرمت مناسب مشاهده کنید</p>
                                </div>
                                <div style={glassCardStyle} className="text-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <DocumentArrowDownIcon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">دانلود PDF</h4>
                                    <p className="text-gray-600 text-sm">رزومه را به فرمت PDF با کیفیت بالا دانلود کنید</p>
                                </div>
                                <div style={glassCardStyle} className="text-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ClipboardDocumentCheckIcon className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">اشتراک‌گذاری</h4>
                                    <p className="text-gray-600 text-sm">رزومه خود را با کارفرمایان به اشتراک بگذارید</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/resume-preview')}
                                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                                >
                                    مشاهده رزومه نهایی
                                </button>
                                <button
                                    onClick={() => navigate('/templates')}
                                    className="px-8 py-3 border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-50 text-lg font-medium transition-colors"
                                >
                                    ساخت رزومه جدید
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <div style={sectionStyle} className="rtl" dir="rtl">
            {/* Animated Background Shapes */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                <div style={floatingShapeStyle('10%', '10%', '300px', '300px', 'linear-gradient(135deg, #3B82F6, #8B5CF6)', '0s')}></div>
                <div style={floatingShapeStyle('10%', '60%', '400px', '400px', 'linear-gradient(135deg, #EC4899, #F59E0B)', '-2s')}></div>
                <div style={floatingShapeStyle('50%', '20%', '200px', '200px', 'linear-gradient(135deg, #10B981, #06B6D4)', '-4s')}></div>
                <div style={floatingShapeStyle('30%', '70%', '250px', '250px', 'linear-gradient(135deg, #F59E0B, #EF4444)', '-1s')}></div>
            </div>

            <div style={containerStyle}>
                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div style={badgeStyle} className="mb-6">
                        <SparklesIcon className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm font-bold text-gray-800">
                            ساخت رزومه حرفه‌ای
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/templates')}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                style={glassCardStyle}
                                title="بازگشت به انتخاب قالب"
                            >
                                <ArrowUturnLeftIcon className="w-6 h-6 text-gray-700" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 text-right mb-2">
                                    رزومه‌ساز <span style={gradientTextStyle}>حرفه‌ای</span>
                                </h1>
                                <p className="text-gray-600 text-lg text-right">
                                    قالب: <span className="font-semibold text-gray-800">{resumeData.templateId || 'مدرن'}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowPreview(true)}
                                className="flex items-center gap-2 px-4 py-2.5 text-gray-800 rounded-lg hover:bg-white/20 transition-colors"
                                style={glassCardStyle}
                            >
                                <EyeIcon className="w-5 h-5" />
                                <span>پیش‌نمایش زنده</span>
                            </button>
                            <button
                                onClick={() => navigate('/resume-preview')}
                                className="flex items-center gap-2 px-4 py-2.5 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors font-medium"
                                style={buttonGradientStyle('#3B82F6', '#1D4ED8')}
                            >
                                <ClipboardDocumentCheckIcon className="w-5 h-5" />
                                <span>مشاهده نهایی</span>
                            </button>
                        </div>
                    </div>

                    {/* Steps Progress */}
                    <div className="relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200/50 rounded-full transform -translate-y-1/2"></div>
                        <div className="relative flex justify-between">
                            {steps.map((step, index) => {
                                const isCompleted = index + 1 < currentStep;
                                const isCurrent = index + 1 === currentStep;
                                const stepNumber = index + 1;

                                return (
                                    <div key={step.id} className="flex flex-col items-center relative z-10">
                                        <button
                                            onClick={() => {
                                                if (validateStep(stepNumber)) {
                                                    setCurrentStep(stepNumber);
                                                }
                                            }}
                                            className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${isCompleted
                                                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                                                : isCurrent
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg ring-4 ring-blue-200/30'
                                                    : 'bg-white/50 backdrop-blur-sm text-gray-600 border border-gray-200'
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <CheckCircleIcon className="w-7 h-7" />
                                            ) : (
                                                <step.icon className="w-6 h-6" />
                                            )}
                                        </button>
                                        <span className={`text-sm font-medium ${isCurrent ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>
                                            {step.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Form Content */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="mb-12"
                >
                    {renderStepContent()}
                </motion.div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        {currentStep < steps.length ? (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 px-8 py-3 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
                                style={buttonGradientStyle('#3B82F6', '#1D4ED8')}
                            >
                                <span>ادامه</span>
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleCreateResume}
                                    disabled={isSaving}
                                    className="flex items-center gap-2 px-8 py-3 text-white rounded-lg hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={buttonGradientStyle('#10B981', '#059669')}
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>در حال ایجاد...</span>
                                        </>
                                    ) : (
                                        <>
                                            <ClipboardDocumentCheckIcon className="w-5 h-5" />
                                            <span>ایجاد رزومه نهایی</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    style={glassCardStyle}
                                >
                                    ویرایش مجدد
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        {currentStep > 1 && (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 font-medium hover:bg-white/50 rounded-lg transition-colors"
                                style={glassCardStyle}
                            >
                                <span>مرحله قبلی</span>
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Tips Section */}
                {currentStep <= steps.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={glassCardStyle}
                        className="mt-12"
                    >
                        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center justify-end">
                            <LightBulbIcon className="w-6 h-6 ml-2" />
                            نکات حرفه‌ای این بخش
                        </h3>
                        <ul className="space-y-3 text-blue-700 text-right">
                            {currentStep === 1 && (
                                <>
                                    <li className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>از آدرس ایمیل حرفه‌ای با نام و نام خانوادگی خود استفاده کنید</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>خلاصه‌ای جذاب و مختصر (۳-۴ خط) درباره خود بنویسید</span>
                                    </li>
                                </>
                            )}
                            {currentStep === 2 && (
                                <>
                                    <li className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>از آخرین شغل خود شروع کنید و به ترتیب معکوس ادامه دهید</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>دستاوردها را با اعداد و درصد کمی کنید</span>
                                    </li>
                                </>
                            )}
                            {currentStep === 3 && (
                                <>
                                    <li className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>بالاترین مدرک تحصیلی را اول بیاورید</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>در صورت داشتن معدل بالا حتماً ذکر کنید</span>
                                    </li>
                                </>
                            )}
                            {currentStep === 4 && (
                                <>
                                    <li className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>مهارت‌های مرتبط با شغل مورد نظر را در اولویت قرار دهید</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>هر دو مهارت فنی و نرم را شامل شوید</span>
                                    </li>
                                </>
                            )}
                        </ul>
                    </motion.div>
                )}

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12"
                >
                    <div style={glassCardStyle}>
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <RocketLaunchIcon className="w-8 h-8 text-blue-600" />
                            <h3 className="text-2xl font-bold text-gray-900">
                                آماده <span style={gradientTextStyle}>ساخت</span> رزومه حرفه‌ای هستید؟
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-center">
                            همین حالا شروع کنید و در کمتر از ۱۰ دقیقه رزومه حرفه‌ای خود را بسازید
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => navigate('/resume-preview')}
                                className="flex items-center gap-2 px-6 py-3 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                                style={buttonGradientStyle('#3B82F6', '#1D4ED8')}
                            >
                                <EyeIcon className="w-5 h-5" />
                                <span>مشاهده پیش‌نمایش</span>
                            </button>
                            <button
                                onClick={handleCreateResume}
                                className="flex items-center gap-2 px-6 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                                style={glassCardStyle}
                            >
                                <DocumentArrowDownIcon className="w-5 h-5" />
                                <span>دانلود PDF</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Inline Styles for Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }
                
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                }
                
                @media (max-width: 768px) {
                    .steps-container {
                        overflow-x: auto;
                        padding-bottom: 1rem;
                    }
                    
                    .steps-wrapper {
                        min-width: 800px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ResumeBuilder;