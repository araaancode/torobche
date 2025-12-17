// client/src/pages/ResumePreview.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DocumentArrowDownIcon,
    QrCodeIcon,
    ShareIcon,
    PrinterIcon,
    PencilSquareIcon,
    LinkIcon,
    CheckIcon,
    ArrowLeftIcon,
    DevicePhoneMobileIcon,
    ComputerDesktopIcon,
    EyeIcon,
    XMarkIcon,
    SparklesIcon,
    ArrowPathIcon,
    PhotoIcon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
    ViewColumnsIcon,
    AdjustmentsHorizontalIcon,
    ClockIcon,
    EyeSlashIcon,
    SunIcon,
    MoonIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    InformationCircleIcon,
    HeartIcon,
    StarIcon,
    FireIcon,
    BoltIcon,
    ViewfinderCircleIcon,
    ChartBarIcon,
    UserCircleIcon,
    AcademicCapIcon,
    CpuChipIcon,
    PaintBrushIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { QRCodeSVG } from 'qrcode.react';
import { useResume } from '../../contexts/ResumeContext';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// ایمپورت قالب‌های موجود
import ModernTemplate from '../../templates/ModernTemplate';
import ClassicTemplate from '../../templates/ClassicTemplate';
import MinimalTemplate from '../../templates/MinimalTemplate';
import TechnicalTemplate from '../../templates/TechnicalTemplate';
import CreativeTemplate from '../../templates/CreativeTemplate';
import AcademicTemplate from '../../templates/AcademicTemplate';
import LuxuryTemplate from '../../templates/LuxuryTemplate';

const ResumePreview = () => {
    const navigate = useNavigate();
    const { resumeData, updateResumeData, saveResume, downloadResume } = useResume();
    const [showQRCode, setShowQRCode] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showMobilePreview, setShowMobilePreview] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [templateGridSize, setTemplateGridSize] = useState('grid-cols-3');
    const [selectedTemplateId, setSelectedTemplateId] = useState(resumeData?.templateId || 'modern');
    const [theme, setTheme] = useState('light');
    const [zoomLevel, setZoomLevel] = useState(100);
    const [showStats, setShowStats] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [showPreviewOptions, setShowPreviewOptions] = useState(false);
    const [favoriteTemplates, setFavoriteTemplates] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTemplate, setSearchTemplate] = useState('');
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [resumeViews, setResumeViews] = useState(0);
    const [isDownloadAvailable, setIsDownloadAvailable] = useState(false);

    // دریافت لیست کامل قالب‌ها با جزئیات کامل
    const availableTemplates = [
        {
            id: 'modern',
            name: 'مدرن حرفه‌ای',
            description: 'طراحی مدرن با گرادیانتی آبی برای مشاغل حرفه‌ای',
            icon: '💼',
            color: 'blue',
            category: 'professional',
            stars: 4.8,
            downloads: '12.5K',
            features: ['گرادیانتی', 'تک ستون', 'انیمیشن', 'واکنش‌گرا'],
            layout: 'single',
            favorite: false,
            recommendedFor: 'مشاغل حرفه‌ای، مدیران، کارشناسان',
            previewColor: 'from-blue-500 to-blue-700'
        },
        {
            id: 'classic',
            name: 'کلاسیک شرکتی',
            description: 'طراحی کلاسیک و رسمی برای محیط‌های شرکتی',
            icon: '🏢',
            color: 'gray',
            category: 'professional',
            stars: 4.6,
            downloads: '15.3K',
            features: ['رسمی', 'ساختارمند', 'پرینت بهینه'],
            layout: 'single',
            favorite: false,
            recommendedFor: 'شرکت‌ها، سازمان‌ها، محیط‌های رسمی',
            previewColor: 'from-gray-500 to-gray-700'
        },
        {
            id: 'creative',
            name: 'خلاقانه رنگارنگ',
            description: 'طراحی هنری با رنگ‌های جسورانه و انیمیشن',
            icon: '🎨',
            color: 'pink',
            category: 'creative',
            stars: 4.9,
            downloads: '9.7K',
            features: ['رنگارنگ', 'انیمیشن', 'نمایش آثار', 'خلاقانه'],
            layout: 'creative',
            favorite: false,
            recommendedFor: 'طراحان، هنرمندان، خلاقان',
            previewColor: 'from-pink-500 to-pink-700'
        },
        {
            id: 'technical',
            name: 'فنی پیشرفته',
            description: 'قالب تخصصی برای مهندسان و توسعه‌دهندگان',
            icon: '💻',
            color: 'green',
            category: 'technical',
            stars: 4.8,
            downloads: '18.5K',
            features: ['کدگذاری', 'نمودار مهارت', 'پروژه‌ها', 'فنی'],
            layout: 'double',
            favorite: false,
            recommendedFor: 'مهندسان، برنامه‌نویسان، متخصصان فناوری',
            previewColor: 'from-green-500 to-green-700'
        },
        {
            id: 'academic',
            name: 'آکادمیک پژوهشی',
            description: 'قالب رسمی برای اساتید دانشگاه و محققان',
            icon: '🎓',
            color: 'purple',
            category: 'academic',
            stars: 4.5,
            downloads: '9.2K',
            features: ['مقالات', 'تحقیقات', 'ارجاعات', 'علمی'],
            layout: 'single',
            favorite: false,
            recommendedFor: 'اساتید، محققان، دانشجویان تحصیلات تکمیلی',
            previewColor: 'from-purple-500 to-purple-700'
        },
        {
            id: 'minimal',
            name: 'مینیمال سیاه و سفید',
            description: 'طراحی فوق‌العاده ساده و مینیمال',
            icon: '⚫',
            color: 'gray',
            category: 'minimal',
            stars: 4.7,
            downloads: '14.8K',
            features: ['ساده', 'خوانا', 'پرینت بهینه', 'مینیمال'],
            layout: 'single',
            favorite: false,
            recommendedFor: 'همه مشاغل، تأکید بر محتوا',
            previewColor: 'from-gray-800 to-black'
        },
        {
            id: 'luxury',
            name: 'لوکس پریمیوم',
            description: 'طراحی لوکس و پریمیوم برای رهبران',
            icon: '⭐',
            color: 'yellow',
            category: 'professional',
            stars: 4.9,
            downloads: '6.5K',
            features: ['پریمیوم', 'لوکس', 'انیمیشن', 'گرادیانتی'],
            layout: 'double',
            favorite: false,
            recommendedFor: 'رهبران، مدیران اجرایی، برندهای لوکس',
            previewColor: 'from-yellow-500 to-yellow-700'
        }
    ];

    // دسته‌بندی‌ها
    const categories = [
        { id: 'all', name: 'همه قالب‌ها', icon: '🔍', count: availableTemplates.length },
        { id: 'professional', name: 'حرفه‌ای', icon: '💼', count: availableTemplates.filter(t => t.category === 'professional').length },
        { id: 'creative', name: 'خلاقانه', icon: '🎨', count: availableTemplates.filter(t => t.category === 'creative').length },
        { id: 'technical', name: 'فنی', icon: '💻', count: availableTemplates.filter(t => t.category === 'technical').length },
        { id: 'academic', name: 'آکادمیک', icon: '🎓', count: availableTemplates.filter(t => t.category === 'academic').length },
        { id: 'minimal', name: 'مینیمال', icon: '⚫', count: availableTemplates.filter(t => t.category === 'minimal').length }
    ];

    // تنظیمات قالب‌ها با جزئیات بیشتر
    const templateDetails = {
        modern: { color: 'آبی', category: 'حرفه‌ای', recommendedFor: 'کسب‌وکار، شرکت‌ها', icon: '💼' },
        classic: { color: 'قهوه‌ای', category: 'سنتی', recommendedFor: 'مشاغل سنتی، بانک‌ها', icon: '🏢' },
        minimal: { color: 'خاکستری', category: 'مینیمال', recommendedFor: 'طراحان، خلاقان', icon: '⚫' },
        technical: { color: 'سبز', category: 'فنی', recommendedFor: 'مهندسان، برنامه‌نویسان', icon: '💻' },
        creative: { color: 'صورتی', category: 'خلاقانه', recommendedFor: 'هنرمندان، طراحان', icon: '🎨' },
        academic: { color: 'بنفش', category: 'آکادمیک', recommendedFor: 'اساتید، محققان', icon: '🎓' },
        luxury: { color: 'طلایی', category: 'لوکس', recommendedFor: 'مدیران، رهبران', icon: '⭐' }
    };

    // اثر برای تنظیم تم و بررسی داده‌ها
    useEffect(() => {
        if (!resumeData || !resumeData.personalInfo?.fullName) {
            toast.error('لطفا ابتدا رزومه خود را بسازید');
            navigate('/templates');
            return;
        }

        // تنظیم تم
        if (theme === 'dark') {
            document.body.classList.add('dark');
            document.body.style.backgroundColor = '#111827';
        } else {
            document.body.classList.remove('dark');
            document.body.style.backgroundColor = '#ffffff';
        }

        // افزایش تعداد بازدید
        setResumeViews(prev => {
            const newViews = prev + 1;
            localStorage.setItem('resumeViews', newViews);
            return newViews;
        });

        // بررسی در دسترس بودن دانلود
        const checkDownloadAvailability = () => {
            const element = document.getElementById('resume-preview');
            setIsDownloadAvailable(!!element && typeof html2canvas === 'function' && typeof jsPDF === 'function');
        };

        checkDownloadAvailability();

        // رفرش خودکار
        let refreshInterval;
        if (autoRefresh) {
            refreshInterval = setInterval(() => {
                setSelectedTemplateId(prev => prev);
            }, 5000);
        }

        return () => {
            if (refreshInterval) clearInterval(refreshInterval);
        };
    }, [resumeData, navigate, theme, autoRefresh]);

    // بارگذاری بازدیدها از localStorage
    useEffect(() => {
        const savedViews = localStorage.getItem('resumeViews');
        if (savedViews) {
            setResumeViews(parseInt(savedViews));
        }

        // بارگذاری علاقه‌مندی‌ها
        const savedFavorites = localStorage.getItem('templateFavorites');
        if (savedFavorites) {
            setFavoriteTemplates(JSON.parse(savedFavorites));
        }
    }, []);

    // ذخیره علاقه‌مندی‌ها
    useEffect(() => {
        localStorage.setItem('templateFavorites', JSON.stringify(favoriteTemplates));
    }, [favoriteTemplates]);

    // همگام‌سازی templateId با Context
    useEffect(() => {
        if (selectedTemplateId && selectedTemplateId !== resumeData?.templateId) {
            updateResumeData('templateId', selectedTemplateId);
        }
    }, [selectedTemplateId, resumeData?.templateId, updateResumeData]);

    // فیلتر کردن قالب‌ها بر اساس دسته‌بندی و جستجو
    const filteredTemplates = availableTemplates.filter(template => {
        if (selectedCategory !== 'all' && template.category !== selectedCategory) return false;
        if (searchTemplate && !template.name.includes(searchTemplate) && !template.description.includes(searchTemplate)) return false;
        return true;
    });

    // =============== تابع‌های جدید برای حل مشکل PDF ===============

    // تابع برای جایگزینی رنگ‌های oklch با hex
    const replaceProblematicColors = (element) => {
        try {
            // حذف تمام style tags که ممکن است حاوی oklch باشند
            const styleTags = element.querySelectorAll('style');
            styleTags.forEach(styleTag => {
                if (styleTag.textContent.includes('oklch')) {
                    styleTag.remove();
                }
            });

            // حذف تمام کلاس‌های tailwind که ممکن است مشکل‌ساز باشند
            const allElements = element.querySelectorAll('*');
            allElements.forEach(el => {
                // حذف تمام inline styles مشکل‌ساز
                if (el.style) {
                    // بررسی و حذف تمام مقادیر oklch
                    const styleProps = ['color', 'backgroundColor', 'borderColor', 'background', 'backgroundImage'];
                    styleProps.forEach(prop => {
                        if (el.style[prop] && el.style[prop].includes('oklch')) {
                            el.style[prop] = '';
                        }
                    });
                }

                // حذف classهای problematice
                if (el.className) {
                    const classes = el.className.split(' ');
                    const safeClasses = classes.filter(cls =>
                        !cls.includes('oklch') &&
                        !cls.includes('gradient') &&
                        !cls.includes('animate') &&
                        !cls.includes('dark:')
                    );
                    el.className = safeClasses.join(' ');
                }
            });

            // اضافه کردن استایل‌های ایمن
            element.style.backgroundColor = '#ffffff';
            element.style.color = '#000000';

        } catch (error) {
            console.warn('خطا در جایگزینی رنگ‌ها:', error);
        }
    };

    // تابع ایجاد نسخه ایمن برای PDF
    const createSafePdfVersion = async () => {
        try {
            const originalElement = document.getElementById('resume-preview');
            if (!originalElement) {
                throw new Error('المان رزومه یافت نشد');
            }

            // ایجاد یک container جدید
            const safeContainer = document.createElement('div');
            safeContainer.id = 'pdf-safe-container';
            safeContainer.style.cssText = `
                position: fixed;
                left: -9999px;
                top: -9999px;
                width: 210mm;
                min-height: 297mm;
                background-color: #ffffff;
                color: #000000;
                padding: 20mm;
                font-family: 'Vazirmatn', Arial, sans-serif;
                direction: rtl;
                z-index: -9999;
            `;

            // استخراج محتوای متنی و ساختار اصلی
            const extractSafeContent = (element) => {
                let content = '';

                // استخراج اطلاعات شخصی
                if (resumeData?.personalInfo) {
                    const { personalInfo } = resumeData;
                    content += `
                        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #1e40af; padding-bottom: 20px;">
                            <h1 style="color: #1e40af; font-size: 28px; margin-bottom: 10px;">${personalInfo.fullName || ''}</h1>
                            <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">${personalInfo.title || ''}</h2>
                            <div style="color: #6b7280; font-size: 14px;">
                                ${personalInfo.email ? `<div>📧 ${personalInfo.email}</div>` : ''}
                                ${personalInfo.phone ? `<div>📱 ${personalInfo.phone}</div>` : ''}
                                ${personalInfo.about ? `<div style="margin-top: 15px; max-width: 600px; margin-left: auto; margin-right: auto;">${personalInfo.about}</div>` : ''}
                            </div>
                        </div>
                    `;
                }

                // بخش تجربیات
                if (resumeData?.experience?.length > 0) {
                    content += `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #1e40af; font-size: 20px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px; margin-bottom: 15px;">سوابق کاری</h3>
                            ${resumeData.experience.map(exp => `
                                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px dashed #e5e7eb;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                        <strong style="color: #111827;">${exp.jobTitle || ''}</strong>
                                        <span style="color: #6b7280; font-size: 14px;">${exp.startDate || ''} - ${exp.endDate || 'اکنون'}</span>
                                    </div>
                                    <div style="color: #374151; margin-bottom: 5px;">${exp.company || ''}</div>
                                    <div style="color: #6b7280; font-size: 14px;">${exp.description || ''}</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }

                // بخش مهارت‌ها
                if (resumeData?.skills?.length > 0) {
                    content += `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #1e40af; font-size: 20px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px; margin-bottom: 15px;">مهارت‌ها</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                ${resumeData.skills.map(skill => {
                        const skillName = typeof skill === 'object' ? skill.name : skill;
                        return `<span style="background-color: #e0e7ff; color: #3730a3; padding: 4px 12px; border-radius: 20px; font-size: 14px;">${skillName}</span>`;
                    }).join('')}
                            </div>
                        </div>
                    `;
                }

                // بخش تحصیلات
                if (resumeData?.education?.length > 0) {
                    content += `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #1e40af; font-size: 20px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px; margin-bottom: 15px;">تحصیلات</h3>
                            ${resumeData.education.map(edu => `
                                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px dashed #e5e7eb;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                        <strong style="color: #111827;">${edu.degree || ''} در ${edu.field || ''}</strong>
                                        <span style="color: #6b7280; font-size: 14px;">${edu.startDate || ''} - ${edu.endDate || ''}</span>
                                    </div>
                                    <div style="color: #374151;">${edu.institution || ''}</div>
                                    ${edu.description ? `<div style="color: #6b7280; font-size: 14px; margin-top: 5px;">${edu.description}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    `;
                }

                // بخش پروژه‌ها
                if (resumeData?.projects?.length > 0) {
                    content += `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #1e40af; font-size: 20px; border-bottom: 1px solid #d1d5db; padding-bottom: 5px; margin-bottom: 15px;">پروژه‌ها</h3>
                            ${resumeData.projects.map(project => `
                                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px dashed #e5e7eb;">
                                    <strong style="color: #111827; display: block; margin-bottom: 5px;">${project.name || ''}</strong>
                                    <div style="color: #6b7280; font-size: 14px;">${project.description || ''}</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }

                return content;
            };

            safeContainer.innerHTML = extractSafeContent(originalElement);
            document.body.appendChild(safeContainer);

            return safeContainer;

        } catch (error) {
            console.error('خطا در ایجاد نسخه ایمن PDF:', error);
            throw error;
        }
    };

    // تابع اصلی دانلود PDF
    const downloadResumeDirectly = async (templateId) => {
        let safeContainer = null;

        try {
            console.log('🚀 شروع دانلود PDF ایمن');

            // 1. ایجاد نسخه ایمن
            safeContainer = await createSafePdfVersion();

            // 2. صبر برای رندر شدن
            await new Promise(resolve => setTimeout(resolve, 300));

            // 3. گرفتن عکس با html2canvas
            const canvas = await html2canvas(safeContainer, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                allowTaint: false
            });

            // 4. حذف container ایمن
            if (safeContainer && safeContainer.parentNode) {
                safeContainer.parentNode.removeChild(safeContainer);
            }

            // 5. ایجاد PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; // عرض با حاشیه
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const imgData = canvas.toDataURL('image/png', 1.0);
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

            // 6. نام فایل
            const name = resumeData.personalInfo?.fullName?.replace(/\s+/g, '_') || 'رزومه';
            const date = new Date().toLocaleDateString('fa-IR').replace(/\//g, '-');
            const fileName = `${name}_${templateId}_${date}.pdf`;

            // 7. دانلود
            pdf.save(fileName);

            console.log('✅ PDF با موفقیت دانلود شد');
            return true;

        } catch (error) {
            console.error('❌ خطا در دانلود PDF:', error);

            // حذف container در صورت وجود
            if (safeContainer && safeContainer.parentNode) {
                safeContainer.parentNode.removeChild(safeContainer);
            }

            throw error;
        }
    };

    // =============== توابع عملیاتی ===============

    const handleCopyLink = useCallback(() => {
        const url = `${window.location.origin}/resume/${Date.now()}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopied(true);
                toast.success('لینک در کلیپ‌بورد کپی شد!', {
                    icon: '📋',
                    style: {
                        background: '#10b981',
                        color: 'white',
                    }
                });
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {
                toast.error('کپی لینک با خطا مواجه شد');
            });
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `رزومه ${resumeData.personalInfo.fullName}`,
                    text: `رزومه ${resumeData.personalInfo.fullName} - ${resumeData.personalInfo.title}`,
                    url: window.location.href,
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    toast.error('اشتراک‌گذاری با خطا مواجه شد');
                }
            }
        } else {
            setShowShareOptions(true);
        }
    };

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);

        try {
            // نمایش پیام لودینگ
            const loadingToast = toast.loading('🚀 در حال تولید PDF...', {
                id: 'pdf-loading'
            });

            // استفاده از templateId فعلی
            const currentTemplateId = selectedTemplateId || resumeData?.templateId || 'modern';

            console.log('📥 دانلود رزومه با قالب:', currentTemplateId);

            // روش 1: اگر downloadResume در Context وجود دارد
            if (typeof downloadResume === 'function') {
                try {
                    // انتقال templateId به تابع
                    await downloadResume(currentTemplateId);
                    toast.dismiss(loadingToast);
                    toast.success('✅ PDF با موفقیت دانلود شد!', {
                        duration: 3000,
                        icon: '📥'
                    });
                    return;
                } catch (contextError) {
                    console.warn('خطا در downloadResume از Context:', contextError);
                }
            }

            // روش 2: دانلود مستقیم با نسخه ایمن
            await downloadResumeDirectly(currentTemplateId);

            toast.dismiss(loadingToast);
            toast.success('✅ PDF با موفقیت دانلود شد!', {
                duration: 3000,
                icon: '📥'
            });

        } catch (error) {
            console.error('🔥 خطای کلی در دانلود:', error);

            let errorMessage = 'خطا در تولید PDF';
            if (error.message.includes('oklch')) {
                errorMessage = 'قالب رزومه از رنگ‌های پیشرفته استفاده می‌کند. لطفا از گزینه "چاپ" استفاده کنید.';
            }

            toast.error(`${errorMessage}`, {
                duration: 5000,
                icon: '❌'
            });

        } finally {
            setIsGeneratingPDF(false);
        }
    };

    const handlePrint = () => {
        toast.success('در حال آماده‌سازی برای چاپ...', {
            icon: '🖨️'
        });

        // تاخیر برای اطمینان از رندر کامل
        setTimeout(() => {
            window.print();
        }, 500);
    };

    const handleSaveResume = () => {
        const resumeName = prompt('نامی برای رزومه خود وارد کنید:',
            `${resumeData.personalInfo.fullName} - ${new Date().toLocaleDateString('fa-IR')}`);

        if (resumeName) {
            saveResume(resumeName);
            toast.success(' رزومه با موفقیت ذخیره شد!');
        }
    };

    const handleChangeTemplate = useCallback((templateId) => {
        setSelectedTemplateId(templateId);
        updateResumeData('templateId', templateId);
        const template = availableTemplates.find(t => t.id === templateId);
        toast.success(`قالب به "${template.name}" تغییر کرد`, {
            icon: template.icon,
            style: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
            }
        });
    }, [updateResumeData, availableTemplates]);

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            toast.success(`حالت ${newTheme === 'light' ? 'روشن' : 'تیره'} فعال شد`, {
                icon: newTheme === 'light' ? '☀️' : '🌙'
            });
            return newTheme;
        });
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 10, 200));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 10, 50));
    };

    const handleResetZoom = () => {
        setZoomLevel(100);
        toast.success('نمایش بازنشانی شد', { icon: '🔄' });
    };

    const changeGridSize = (size) => {
        setTemplateGridSize(size);
        toast.success(`حالت نمایش ${size === 'grid-cols-2' ? '۲ ستون' : size === 'grid-cols-3' ? '۳ ستون' : '۴ ستون'}`, {
            icon: '👁️'
        });
    };

    const toggleFavorite = (templateId, e) => {
        if (e) e.stopPropagation();

        if (favoriteTemplates.includes(templateId)) {
            setFavoriteTemplates(favoriteTemplates.filter(id => id !== templateId));
            toast('از علاقه‌مندی‌ها حذف شد', {
                icon: '💔',
                style: {
                    background: '#fef2f2',
                    color: '#dc2626'
                }
            });
        } else {
            setFavoriteTemplates([...favoriteTemplates, templateId]);
            toast('به علاقه‌مندی‌ها اضافه شد', {
                icon: '❤️',
                style: {
                    background: '#fef2f2',
                    color: '#dc2626'
                }
            });
        }
    };

    // رندر قالب انتخاب شده
    const renderTemplate = () => {
        if (!resumeData) return null;

        const templateType = selectedTemplateId || resumeData.templateId || 'modern';

        const templates = {
            modern: ModernTemplate,
            classic: ClassicTemplate,
            minimal: MinimalTemplate,
            technical: TechnicalTemplate,
            creative: CreativeTemplate,
            academic: AcademicTemplate,
            luxury: LuxuryTemplate
        };

        const TemplateComponent = templates[templateType] || ModernTemplate;

        return (
            <div
                id="resume-preview"
                data-template={templateType}
                className="resume-template"
            >
                <motion.div
                    key={templateType}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                >
                    <TemplateComponent data={resumeData} />
                </motion.div>
            </div>
        );
    };

    // رندر پیش‌نمایش موبایل
    // const renderMobilePreview = () => {
    //     return (
    //         <div className="w-full max-w-md mx-auto">
    //             <motion.div
    //                 className="relative h-[800px] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl border-8 border-gray-800 dark:border-gray-700 shadow-2xl"
    //                 initial={{ scale: 0.9, rotate: -5 }}
    //                 animate={{ scale: 1, rotate: 0 }}
    //                 transition={{ type: "spring", stiffness: 100 }}
    //             >
    //                 {/* ناتچ گوشی */}
    //                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 dark:bg-gray-900 rounded-b-2xl z-10"></div>
    //                 <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-600 dark:bg-gray-700 rounded-full z-10"></div>

    //                 {/* محتوای گوشی */}
    //                 <div className="p-6 pt-10 h-full overflow-y-auto">
    //                     <div className="text-center mb-6">
    //                         <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl">
    //                             {resumeData.personalInfo.fullName?.charAt(0) || '👤'}
    //                         </div>
    //                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
    //                             {resumeData.personalInfo.fullName}
    //                         </h2>
    //                         {resumeData.personalInfo.title && (
    //                             <p className="text-gray-600 dark:text-gray-400">{resumeData.personalInfo.title}</p>
    //                         )}
    //                     </div>

    //                     <div className="space-y-4">
    //                         {resumeData.personalInfo.email && (
    //                             <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
    //                                 <span className="text-sm text-gray-500 dark:text-gray-400">📧 ایمیل</span>
    //                                 <span className="font-medium text-blue-600 dark:text-blue-400">{resumeData.personalInfo.email}</span>
    //                             </div>
    //                         )}

    //                         {resumeData.personalInfo.phone && (
    //                             <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
    //                                 <span className="text-sm text-gray-500 dark:text-gray-400">📱 تلفن</span>
    //                                 <span className="font-medium text-green-600 dark:text-green-400">{resumeData.personalInfo.phone}</span>
    //                             </div>
    //                         )}

    //                         {resumeData.skills.length > 0 && (
    //                             <div className="mt-8">
    //                                 <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg border-b pb-2 dark:border-gray-700">مهارت‌ها</h3>
    //                                 <div className="flex flex-wrap gap-2">
    //                                     {resumeData.skills.slice(0, 8).map((skill, index) => {
    //                                         const skillName = typeof skill === 'object' ? skill.name : skill;
    //                                         const level = typeof skill === 'object' ? skill.level || 50 : 50;
    //                                         return (
    //                                             <motion.div
    //                                                 key={index}
    //                                                 initial={{ opacity: 0, y: 10 }}
    //                                                 animate={{ opacity: 1, y: 0 }}
    //                                                 transition={{ delay: index * 0.05 }}
    //                                                 className="relative group"
    //                                             >
    //                                                 <span className="px-3 py-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium shadow-sm">
    //                                                     {skillName}
    //                                                 </span>
    //                                                 <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
    //                                                     <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
    //                                                         سطح: {level}%
    //                                                     </div>
    //                                                 </div>
    //                                             </motion.div>
    //                                         );
    //                                     })}
    //                                 </div>
    //                             </div>
    //                         )}

    //                         {/* نوار پایین گوشی */}
    //                         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
    //                     </div>
    //                 </div>
    //             </motion.div>
    //         </div>
    //     );
    // };

    // رندر انتخاب قالب حرفه‌ای
    const renderTemplateSelector = () => {
        const currentTemplate = availableTemplates.find(t => t.id === selectedTemplateId);

        return (
            <AnimatePresence>
                {showTemplateSelector && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >

                            {/* جستجو و فیلتر */}
                            <div className="mb-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-2xl">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="جستجوی قالب بر اساس نام یا توضیحات..."
                                            value={searchTemplate}
                                            onChange={(e) => setSearchTemplate(e.target.value)}
                                            className="w-full pr-12 pl-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                        <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>


                                </div>
                            </div>

                            {/* لیست قالب‌ها */}
                            <div className="flex-1 overflow-y-auto pr-2">
                                {filteredTemplates.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                                            <MagnifyingGlassIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">قالبی یافت نشد</h4>
                                        <p className="text-gray-600 dark:text-gray-400">لطفاً عبارت جستجو یا دسته‌بندی را تغییر دهید</p>
                                    </div>
                                ) : (
                                    <div className={`grid ${templateGridSize} gap-6 pb-4`}>
                                        {filteredTemplates.map((template) => {
                                            const details = templateDetails[template.id];
                                            const isSelected = selectedTemplateId === template.id;
                                            const isFavorite = favoriteTemplates.includes(template.id);

                                            return (
                                                <motion.div
                                                    key={template.id}
                                                    whileHover={{ scale: 1.02, y: -5 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`group relative cursor-pointer ${isSelected ? 'ring-4 ring-blue-500 ring-offset-2' : ''
                                                        }`}
                                                    onClick={() => handleChangeTemplate(template.id)}
                                                >
                                                    <div className={`
                                                        relative overflow-hidden rounded-2xl p-6
                                                        ${isSelected
                                                            ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-2 border-blue-400'
                                                            : 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700'
                                                        }
                                                        transition-all duration-300 hover:shadow-2xl h-full
                                                    `}>
                                                        {/* نشان انتخاب شده */}
                                                        {isSelected && (
                                                            <div className="absolute top-4 left-4 z-10">
                                                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                                                    <CheckIcon className="w-6 h-6 text-white" />
                                                                </div>
                                                            </div>
                                                        )}



                                                        {/* هدر قالب */}
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className="flex items-center space-x-3 space-x-reverse">

                                                                <div>
                                                                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                                                                        {template.name}
                                                                    </h4>

                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* پیش‌نمایش گرافیکی */}
                                                        <div className="mb-4 relative">
                                                            <div className={`bg-gradient-to-r h-32 rounded-xl overflow-hidden relative group ${template.previewColor}`}>


                                                                {/* آیتم‌های نمونه */}
                                                                <div className="absolute inset-0 p-4">
                                                                    <img src="https://cdn-icons-png.flaticon.com/128/3135/3135686.png" alt="resume" />
                                                                </div>
                                                            </div>
                                                        </div>


                                                        {/* دکمه انتخاب */}
                                                        <div className="mt-6">
                                                            <button
                                                                className={`
                                                                    w-full py-3 rounded-xl font-bold transition-all duration-300 relative overflow-hidden
                                                                    ${isSelected
                                                                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700'
                                                                        : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700'
                                                                    }
                                                                `}
                                                            >
                                                                {isSelected ? (
                                                                    <>
                                                                        <span className="relative z-10"> قالب انتخاب شده</span>
                                                                        <div className="absolute inset-0 bg-white/20"></div>
                                                                    </>
                                                                ) : (
                                                                    ' انتخاب این قالب'
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* افکت hover */}
                                                    {!isSelected && (
                                                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* پایین مودال */}
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                    <InformationCircleIcon className="w-5 h-5 inline ml-1" />
                                    با کلیک بر روی هر قالب، پیش‌نمایش بلافاصله تغییر می‌کند
                                </div>
                                <div className="flex space-x-3 space-x-reverse">
                                    <button
                                        onClick={() => setShowTemplateSelector(false)}
                                        className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium"
                                    >
                                        انصراف
                                    </button>
                                    <button
                                        onClick={() => setShowTemplateSelector(false)}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                                    >
                                        تأیید و بستن
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };

    // محاسبه آمار
    const calculateStats = () => {
        if (!resumeData) return {};

        return {
            experienceCount: resumeData.experience?.length || 0,
            skillCount: resumeData.skills?.length || 0,
            projectCount: resumeData.projects?.length || 0,
            educationCount: resumeData.education?.length || 0,
            certificationCount: resumeData.certifications?.length || 0,
            languageCount: resumeData.languages?.length || 0,
            totalSections: [
                resumeData.experience?.length || 0,
                resumeData.skills?.length || 0,
                resumeData.projects?.length || 0,
                resumeData.education?.length || 0,
                resumeData.certifications?.length || 0,
                resumeData.languages?.length || 0
            ].reduce((a, b) => a + b, 0)
        };
    };

    const stats = calculateStats();
    const currentTemplate = availableTemplates.find(t => t.id === selectedTemplateId);

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 rtl transition-colors duration-300 ${isFullscreen ? 'p-0' : ''}`} dir="rtl">
            <div className={`${isFullscreen ? 'h-screen overflow-auto' : 'max-w-7xl mx-auto px-4'}`} id="resume-preview-container">
                {/* هدر اصلی */}
                {!isFullscreen && (
                    <motion.div
                        className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 text-white rounded-2xl shadow-2xl p-8 mb-8 relative overflow-hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* افکت‌های پس‌زمینه */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">

                            {/* کنترل‌های پیشرفته */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                <button
                                    onClick={handleDownloadPDF}
                                    disabled={isGeneratingPDF || !isDownloadAvailable}
                                    className={`group flex flex-col items-center justify-center p-4 backdrop-blur-sm border border-white/20 text-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${isGeneratingPDF
                                        ? 'bg-white/20 cursor-not-allowed'
                                        : !isDownloadAvailable
                                            ? 'bg-white/10 opacity-50 cursor-not-allowed'
                                            : 'bg-white/10 hover:bg-white/20'
                                        }`}
                                    title={!isDownloadAvailable ? "پکیج‌های لازم نصب نشده‌اند" : "دانلود PDF"}
                                >
                                    {isGeneratingPDF ? (
                                        <>
                                            <div className="w-7 h-7 mb-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span className="font-medium text-sm">در حال تولید...</span>
                                        </>
                                    ) : (
                                        <>
                                            <DocumentArrowDownIcon className="w-7 h-7 mb-2 group-hover:animate-bounce" />
                                            <span className="font-medium text-sm">دانلود PDF</span>
                                            {!isDownloadAvailable && (
                                                <span className="text-xs mt-1 text-yellow-300">نیاز به نصب</span>
                                            )}
                                        </>
                                    )}
                                </button>


                                <button
                                    onClick={handleSaveResume}
                                    className="group flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <PencilSquareIcon className="w-7 h-7 mb-2 group-hover:animate-pulse" />
                                    <span className="font-medium text-sm">ذخیره</span>
                                </button>

                                <button
                                    onClick={() => setShowQRCode(true)}
                                    className="group flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <QrCodeIcon className="w-7 h-7 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="font-medium text-sm">کیوآر کد</span>
                                </button>

                                {/* <button
                                    onClick={() => setShowMobilePreview(!showMobilePreview)}
                                    className="group flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    {showMobilePreview ? (
                                        <ComputerDesktopIcon className="w-7 h-7 mb-2 group-hover:rotate-180 transition-transform" />
                                    ) : (
                                        <DevicePhoneMobileIcon className="w-7 h-7 mb-2 group-hover:rotate-12 transition-transform" />
                                    )}
                                    <span className="font-medium text-sm">
                                        {showMobilePreview ? 'دسکتاپ' : 'موبایل'}
                                    </span>
                                </button> */}

                                <button
                                    onClick={handleFullscreen}
                                    className="group flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    {isFullscreen ? (
                                        <ArrowsPointingInIcon className="w-7 h-7 mb-2 group-hover:animate-pulse" />
                                    ) : (
                                        <ArrowsPointingOutIcon className="w-7 h-7 mb-2 group-hover:animate-pulse" />
                                    )}
                                    <span className="font-medium text-sm">
                                        {isFullscreen ? 'خروج' : 'تمام صفحه'}
                                    </span>
                                </button>


                                <button
                                    onClick={() => navigate(`/build/${resumeData.templateId || 'modern'}`)}
                                    className="group flex flex-col items-center justify-center p-4 bg-gradient-to-r from-green-500 to-emerald-600 border border-white/20 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                                >
                                    <PencilSquareIcon className="w-7 h-7 mb-2 group-hover:animate-bounce" />
                                    <span className="font-medium text-sm">ویرایش</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* کنترل‌های پیشرفته نمایش */}
                <AnimatePresence>
                    {showPreviewOptions && !isFullscreen && (
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    <AdjustmentsHorizontalIcon className="w-6 h-6 inline ml-2" />
                                    تنظیمات پیشرفته نمایش
                                </h3>
                                <button
                                    onClick={() => setShowPreviewOptions(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* کنترل زوم */}
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">کنترل زوم</h4>
                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            onClick={handleZoomOut}
                                            className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                                        >
                                            <span className="text-lg">-</span>
                                        </button>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{zoomLevel}%</div>
                                        </div>
                                        <button
                                            onClick={handleZoomIn}
                                            className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                                        >
                                            <span className="text-lg">+</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleResetZoom}
                                        className="w-full py-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all"
                                    >
                                        بازنشانی زوم
                                    </button>
                                </div>



                                {/* تنظیمات قالب */}
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">قالب نمایش</h4>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">قالب فعلی:</span>
                                            <button
                                                onClick={() => setShowTemplateSelector(true)}
                                                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm hover:from-blue-600 hover:to-blue-700"
                                            >
                                                {currentTemplate?.name}
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">پیش‌نمایش:</span>
                                            <span className={`px-2 py-1 rounded text-xs ${showMobilePreview
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                                }`}>
                                                {showMobilePreview ? 'موبایل' : 'دسکتاپ'}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowTemplateSelector(true)}
                                        className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                                    >
                                        تغییر قالب
                                    </button>
                                </div>


                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* پیش‌نمایش رزومه */}
                <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl ${isFullscreen ? 'h-full rounded-none shadow-none' : 'p-8'} transition-all duration-300`}>
                    {!isFullscreen && (
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    <EyeIcon className="w-6 h-6 inline ml-2" />
                                    پیش‌نمایش زنده رزومه
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    تغییرات به صورت زنده اعمال می‌شوند • قالب: {currentTemplate?.name}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2 space-x-reverse">
                                    <span className='mx-2'>قالب فعلی:</span>
                                    <button
                                        onClick={() => setShowTemplateSelector(true)}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium flex items-center space-x-2 space-x-reverse group"
                                    >
                                        <span>{currentTemplate?.name}</span>
                                        <ChevronUpIcon className="w-4 h-4 mx-2 group-hover:rotate-180 transition-transform duration-300" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* نمایش رزومه */}
                    {showMobilePreview && !isFullscreen ? (
                        <div className="flex justify-center items-center min-h-[600px]">
                            {renderMobilePreview()}
                        </div>
                    ) : (
                        <div
                            id="resume-preview"
                            className={`${isFullscreen ? 'h-full overflow-auto' : 'border-2 border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden shadow-inner max-w-5xl mx-auto'} transition-all duration-300`}
                            style={{ zoom: `${zoomLevel}%` }}
                        >
                            <AnimatePresence mode="wait">
                                {renderTemplate()}
                            </AnimatePresence>
                        </div>
                    )}


                </div>
            </div>

            {/* مودال کیوآر کد */}
            <AnimatePresence>
                {showQRCode && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowQRCode(false)}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl"
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">کیوآر کد رزومه</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                        اسکن کنید و رزومه را در موبایل مشاهده کنید
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowQRCode(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 mb-6 shadow-2xl">
                                    <QRCodeSVG
                                        value={`${window.location.origin}/resume/${Date.now()}`}
                                        size={200}
                                        level="H"
                                        includeMargin
                                        fgColor="#2563eb"
                                        imageSettings={{
                                            src: '/logo.svg',
                                            x: undefined,
                                            y: undefined,
                                            height: 40,
                                            width: 40,
                                            excavate: true,
                                        }}
                                    />
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                                    این کیوآر کد را با دوربین موبایل خود اسکن کنید
                                    تا نسخه بهینه‌شده برای موبایل رزومه را مشاهده کنید.
                                </p>

                                <div className="flex space-x-3 space-x-reverse w-full">
                                    <button
                                        onClick={handleCopyLink}
                                        className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                                    >
                                        کپی لینک
                                    </button>
                                    <button
                                        onClick={() => setShowQRCode(false)}
                                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg"
                                    >
                                        بستن
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* رندر انتخاب قالب */}
            {renderTemplateSelector()}

            {/* استایل‌های سفارشی */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap');
                
                * {
                    font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, sans-serif;
                }
                
                body {
                    font-family: 'Vazirmatn', sans-serif;
                    transition: background-color 0.3s ease, color 0.3s ease;
                }
                
                body.dark {
                    background: #111827;
                    color: #f9fafb;
                }
                
                /* استایل‌های چاپ */
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    
                    body {
                        background: white !important;
                        color: black !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    
                    #resume-preview {
                        border: none !important;
                        box-shadow: none !important;
                        margin: 0 !important;
                        max-width: 100% !important;
                        width: 100% !important;
                        zoom: 100% !important;
                    }
                    
                    .resume-template {
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                    
                    .resume-template * {
                        color: #000 !important;
                        background: white !important;
                    }
                    
                    /* بهبود چاپ برای قالب‌ها */
                    .modern-template {
                        border: 1px solid #ddd !important;
                    }
                    
                    .classic-template {
                        border: 1px solid #ddd !important;
                    }
                    
                    .technical-template {
                        font-size: 12pt !important;
                    }
                }
                
                /* استایل‌های fullscreen */
                :fullscreen #resume-preview {
                    margin: 0;
                    border: none;
                    border-radius: 0;
                }
                
                :fullscreen .resume-template {
                    min-height: 100vh;
                }
                
                /* انیمیشن‌های سفارشی */
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                /* اسکرول بار زیبا */
                ::-webkit-scrollbar {
                    width: 10px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 5px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
                    border-radius: 5px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #2563eb, #7c3aed);
                }
                
                body.dark ::-webkit-scrollbar-track {
                    background: #374151;
                }
                
                body.dark ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #1d4ed8, #6d28d9);
                }
                
                body.dark ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #1e40af, #5b21b6);
                }
                
                /* افکت‌های شیشه‌ای */
                .glass-effect {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                body.dark .glass-effect {
                    background: rgba(31, 41, 55, 0.7);
                    border: 1px solid rgba(75, 85, 99, 0.5);
                }
                
                /* انیمیشن برای قالب‌ها */
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
                
                .shimmer-effect {
                    background: linear-gradient(90deg, 
                        rgba(255,255,255,0) 0%, 
                        rgba(255,255,255,0.2) 50%, 
                        rgba(255,255,255,0) 100%);
                    background-size: 1000px 100%;
                    animation: shimmer 2s infinite;
                }
                
                /* افکت‌های card */
                .card-hover-effect {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .card-hover-effect:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }
                
                body.dark .card-hover-effect:hover {
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }
                
                /* جلوگیری از نمایش رنگ‌های oklch در PDF */
                #pdf-safe-container {
                    all: initial !important;
                }
                
                #pdf-safe-container * {
                    all: initial !important;
                    font-family: 'Vazirmatn', Arial, sans-serif !important;
                    direction: rtl !important;
                }
            `}</style>
        </div>
    );
};

export default ResumePreview;