// client/src/pages/TemplateSelection.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    StarIcon,
    ArrowDownTrayIcon,
    EyeIcon,
    CheckCircleIcon,
    FunnelIcon,
    XMarkIcon,
    Squares2X2Icon,
    SparklesIcon,
    AcademicCapIcon,
    CodeBracketIcon,
    PaintBrushIcon,
    BriefcaseIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const TemplateSelection = () => {
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        designType: '',
        premium: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    // داده‌های نمونه برای قالب‌ها - با نام‌ها و مشخصات فارسی
    const templates = [
        {
            _id: '1',
            name: 'حرفه‌ای مدرن',
            description: 'قالبی تمیز و مدرن، ایده‌آل برای افراد حرفه‌ای',
            previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            designType: 'مدرن',
            category: 'حرفه‌ای',
            isPremium: false,
            rating: 4.8,
            downloads: 1250,
            activeSections: ['درباره من', 'سوابق کاری', 'تحصیلات', 'مهارت‌ها'],
            designStyle: 'modern',
            icon: <BriefcaseIcon className="w-8 h-8 text-blue-600" />
        },
        {
            _id: '2',
            name: 'اجرایی کلاسیک',
            description: 'طرح دوستونی سنتی مناسب مدیران اجرایی',
            previewImage: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            designType: 'کلاسیک',
            category: 'حرفه‌ای',
            isPremium: false,
            rating: 4.6,
            downloads: 890,
            activeSections: ['درباره من', 'سوابق کاری', 'تحصیلات', 'مهارت‌ها', 'گواهینامه‌ها'],
            designStyle: 'classic',
            icon: <SparklesIcon className="w-8 h-8 text-amber-600" />
        },
        {
            _id: '3',
            name: 'خلاقانه مینیمال',
            description: 'طراحی ساده و شیک برای حرفه‌های خلاق',
            previewImage: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            designType: 'مینیمال',
            category: 'خلاق',
            isPremium: false,
            rating: 4.7,
            downloads: 1120,
            activeSections: ['درباره من', 'سوابق کاری', 'پروژه‌ها', 'مهارت‌ها'],
            designStyle: 'minimal',
            icon: <PaintBrushIcon className="w-8 h-8 text-gray-600" />
        },
        {
            _id: '4',
            name: 'متخصص فنی',
            description: 'طراحی شده برای توسعه‌دهندگان و متخصصان فنی',
            previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            designType: 'مدرن',
            category: 'فنی',
            isPremium: true,
            price: 29.99,
            rating: 4.9,
            downloads: 540,
            activeSections: ['درباره من', 'سوابق کاری', 'پروژه‌ها', 'مهارت‌ها', 'گواهینامه‌ها'],
            designStyle: 'technical',
            icon: <CodeBracketIcon className="w-8 h-8 text-emerald-600" />
        },
        {
            _id: '5',
            name: 'آکادمیک پژوهشی',
            description: 'قالب مناسب برای اساتید و پژوهشگران دانشگاهی',
            previewImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            designType: 'کلاسیک',
            category: 'آکادمیک',
            isPremium: false,
            rating: 4.5,
            downloads: 750,
            activeSections: ['درباره من', 'تجربیات تدریس', 'مقالات', 'تحصیلات', 'جوایز'],
            designStyle: 'academic',
            icon: <AcademicCapIcon className="w-8 h-8 text-purple-600" />
        },
        {
            _id: '6',
            name: 'گرافیکی هنری',
            description: 'طراحی هنری و گرافیکی با المان‌های خلاق',
            previewImage: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            designType: 'خلاقانه',
            category: 'گرافیک',
            isPremium: true,
            price: 19.99,
            rating: 4.8,
            downloads: 420,
            activeSections: ['درباره من', 'پورتفولیو', 'مهارت‌ها', 'نمونه کارها'],
            designStyle: 'creative',
            icon: <PaintBrushIcon className="w-8 h-8 text-pink-600" />
        },
        {
            _id: '7',
            name: 'کارآفرین مدرن',
            description: 'طراحی پویا و جسورانه برای کارآفرینان',
            previewImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            designType: 'مدرن',
            category: 'کارآفرینی',
            isPremium: true,
            price: 24.99,
            rating: 4.7,
            downloads: 380,
            activeSections: ['درباره من', 'تجربیات کارآفرینی', 'پروژه‌ها', 'مهارت‌ها', 'دستاوردها'],
            designStyle: 'entrepreneur',
            icon: <SparklesIcon className="w-8 h-8 text-indigo-600" />
        },
        {
            _id: '8',
            name: 'آموزشی ساده',
            description: 'قالب شفاف و خوانا مناسب معلمان و مربیان',
            previewImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            designType: 'ساده',
            category: 'آموزشی',
            isPremium: false,
            rating: 4.4,
            downloads: 920,
            activeSections: ['درباره من', 'تجربه تدریس', 'تحصیلات', 'مهارت‌ها', 'کلاس‌ها'],
            designStyle: 'educational',
            icon: <AcademicCapIcon className="w-8 h-8 text-teal-600" />
        },
        {
            _id: '9',
            name: 'مدیریتی لوکس',
            description: 'طراحی لوکس و پرستیژی برای مدیران ارشد',
            previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=70',
            designType: 'لوکس',
            category: 'مدیریتی',
            isPremium: true,
            price: 39.99,
            rating: 4.9,
            downloads: 290,
            activeSections: ['درباره من', 'تجربیات مدیریتی', 'تحصیلات', 'مهارت‌ها', 'دستاوردها', 'مراجع'],
            designStyle: 'luxury',
            icon: <BriefcaseIcon className="w-8 h-8 text-gold-600" />
        }
    ];

    const popularTemplates = templates.slice(0, 3);

    const categories = [
        { id: '', name: 'همه دسته‌بندی‌ها' },
        { id: 'حرفه‌ای', name: 'حرفه‌ای' },
        { id: 'آکادمیک', name: 'آکادمیک' },
        { id: 'خلاق', name: 'خلاق' },
        { id: 'فنی', name: 'فنی' },
        { id: 'گرافیک', name: 'گرافیک' },
        { id: 'کارآفرینی', name: 'کارآفرینی' },
        { id: 'آموزشی', name: 'آموزشی' },
        { id: 'مدیریتی', name: 'مدیریتی' }
    ];

    const designTypes = [
        { id: '', name: 'همه طرح‌ها' },
        { id: 'مدرن', name: 'مدرن' },
        { id: 'کلاسیک', name: 'کلاسیک' },
        { id: 'مینیمال', name: 'مینیمال' },
        { id: 'خلاقانه', name: 'خلاقانه' },
        { id: 'ساده', name: 'ساده' },
        { id: 'لوکس', name: 'لوکس' }
    ];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            designType: '',
            premium: ''
        });
    };

    const filteredTemplates = templates.filter(template => {
        if (filters.category && template.category !== filters.category) return false;
        if (filters.designType && template.designType !== filters.designType) return false;
        if (filters.premium === 'free' && template.isPremium) return false;
        if (filters.premium === 'premium' && !template.isPremium) return false;
        return true;
    });

    // تابع برای استایل هر تم بر اساس نوع آن
    const getTemplateStyle = (template) => {
        const styles = {
            modern: {
                card: 'bg-gradient-to-br from-white to-blue-50',
                border: 'border-l-4 border-blue-500',
                button: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
                badge: 'bg-blue-100 text-blue-800',
                shadow: 'shadow-lg shadow-blue-100/50',
                imageGradient: 'from-blue-400/20 to-blue-600/10',
                overlay: 'from-blue-900/70 to-transparent'
            },
            classic: {
                card: 'bg-gradient-to-br from-white to-amber-50',
                border: 'border-l-4 border-amber-600',
                button: 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800',
                badge: 'bg-amber-100 text-amber-800',
                shadow: 'shadow-lg shadow-amber-100/50',
                imageGradient: 'from-amber-400/20 to-amber-600/10',
                overlay: 'from-amber-900/70 to-transparent'
            },
            minimal: {
                card: 'bg-gradient-to-br from-white to-gray-50',
                border: 'border-l-4 border-gray-400',
                button: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800',
                badge: 'bg-gray-100 text-gray-800',
                shadow: 'shadow-lg shadow-gray-100/50',
                imageGradient: 'from-gray-400/20 to-gray-600/10',
                overlay: 'from-gray-900/70 to-transparent'
            },
            technical: {
                card: 'bg-gradient-to-br from-white to-emerald-50',
                border: 'border-l-4 border-emerald-500',
                button: 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800',
                badge: 'bg-emerald-100 text-emerald-800',
                shadow: 'shadow-lg shadow-emerald-100/50',
                imageGradient: 'from-emerald-400/20 to-emerald-600/10',
                overlay: 'from-emerald-900/70 to-transparent'
            },
            academic: {
                card: 'bg-gradient-to-br from-white to-purple-50',
                border: 'border-l-4 border-purple-500',
                button: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
                badge: 'bg-purple-100 text-purple-800',
                shadow: 'shadow-lg shadow-purple-100/50',
                imageGradient: 'from-purple-400/20 to-purple-600/10',
                overlay: 'from-purple-900/70 to-transparent'
            },
            creative: {
                card: 'bg-gradient-to-br from-white to-pink-50',
                border: 'border-l-4 border-pink-500',
                button: 'bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800',
                badge: 'bg-pink-100 text-pink-800',
                shadow: 'shadow-lg shadow-pink-100/50',
                imageGradient: 'from-pink-400/20 to-pink-600/10',
                overlay: 'from-pink-900/70 to-transparent'
            },
            entrepreneur: {
                card: 'bg-gradient-to-br from-white to-indigo-50',
                border: 'border-l-4 border-indigo-500',
                button: 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800',
                badge: 'bg-indigo-100 text-indigo-800',
                shadow: 'shadow-lg shadow-indigo-100/50',
                imageGradient: 'from-indigo-400/20 to-indigo-600/10',
                overlay: 'from-indigo-900/70 to-transparent'
            },
            educational: {
                card: 'bg-gradient-to-br from-white to-teal-50',
                border: 'border-l-4 border-teal-500',
                button: 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800',
                badge: 'bg-teal-100 text-teal-800',
                shadow: 'shadow-lg shadow-teal-100/50',
                imageGradient: 'from-teal-400/20 to-teal-600/10',
                overlay: 'from-teal-900/70 to-transparent'
            },
            luxury: {
                card: 'bg-gradient-to-br from-white to-yellow-50',
                border: 'border-l-4 border-yellow-500',
                button: 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800',
                badge: 'bg-yellow-100 text-yellow-800',
                shadow: 'shadow-lg shadow-yellow-100/50',
                imageGradient: 'from-yellow-400/20 to-yellow-600/10',
                overlay: 'from-yellow-900/70 to-transparent'
            }
        };
        return styles[template.designStyle] || styles.modern;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
            {/* بخش هیرو */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-800 text-white py-20 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-8 font-[Vazir]"
                    >
                        <span className="text-emerald-200">قالب رزومه</span> ایده‌آل خود را انتخاب کنید
                    </motion.h1>
                    <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
                        از بین <span className="font-bold text-emerald-200">{templates.length}</span> قالب طراحی حرفه‌ای انتخاب کنید که به هزاران نفر کمک کرده تا به شغل رویایی خود دست یابند
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/30"
                        >
                            <CheckCircleIcon className="w-6 h-6" />
                            <span className="font-medium">۱۰۰٪ رایگان</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/30"
                        >
                            <ArrowDownTrayIcon className="w-6 h-6" />
                            <span className="font-medium">دانلود فوری</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/30"
                        >
                            <EyeIcon className="w-6 h-6" />
                            <span className="font-medium">مناسب موبایل</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* محتوای اصلی */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* فیلترها */}
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3 font-[Vazir]">
                                {filteredTemplates.length} قالب موجود
                            </h2>
                            <p className="text-gray-600 text-lg">قالب مورد علاقه خود را مرور و انتخاب کنید</p>
                        </div>

                        <div className="flex items-center space-x-4 space-x-reverse">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-3 space-x-reverse px-6 py-3 bg-white border-2 border-emerald-200 text-emerald-700 rounded-xl hover:bg-emerald-50 transition-all shadow-md hover:shadow-lg"
                            >
                                <FunnelIcon className="w-5 h-5" />
                                <span className="font-medium">فیلترها</span>
                                {Object.values(filters).some(v => v) && (
                                    <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                                )}
                            </motion.button>

                            {Object.values(filters).some(v => v) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 hover:text-emerald-700 font-medium"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                    <span>پاک کردن فیلترها</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-lg mb-10 border border-emerald-100"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3 font-[Vazir]">
                                    دسته‌بندی
                                </label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full px-5 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white text-gray-800 font-[Vazir]"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3 font-[Vazir]">
                                    نوع طرح
                                </label>
                                <select
                                    value={filters.designType}
                                    onChange={(e) => handleFilterChange('designType', e.target.value)}
                                    className="w-full px-5 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white text-gray-800 font-[Vazir]"
                                >
                                    {designTypes.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3 font-[Vazir]">
                                    نوع قیمت‌گذاری
                                </label>
                                <select
                                    value={filters.premium}
                                    onChange={(e) => handleFilterChange('premium', e.target.value)}
                                    className="w-full px-5 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white text-gray-800 font-[Vazir]"
                                >
                                    <option value="">همه</option>
                                    <option value="free">فقط رایگان</option>
                                    <option value="premium">پرمیوم</option>
                                </select>
                            </div>
                        </motion.div>
                    )}

                    {/* قالب‌های محبوب */}
                    {popularTemplates.length > 0 && (
                        <div className="mb-20">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center font-[Vazir]">
                                    <StarIconSolid className="w-7 h-7 text-yellow-500 ml-3 animate-pulse" />
                                    محبوب‌ترین قالب‌ها
                                </h3>
                                <Link
                                    to="/templates/popular"
                                    className="text-emerald-600 hover:text-emerald-700 font-medium text-lg flex items-center group"
                                >
                                    مشاهده همه محبوب‌ها
                                    <span className="mr-2 group-hover:mr-3 transition-all">←</span>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {popularTemplates.map(template => {
                                    const style = getTemplateStyle(template);
                                    return (
                                        <motion.div
                                            key={template._id}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            className={`rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-emerald-300 transition-all duration-300 ${style.card} ${style.shadow}`}
                                        >
                                            <div className="relative h-64 overflow-hidden">
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-br bg-cover bg-center"
                                                    style={{
                                                        backgroundImage: `url(${template.previewImage})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}
                                                >
                                                    <div className={`absolute inset-0 bg-gradient-to-t ${style.overlay} opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-6`}>
                                                        <div className="text-white transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                                                            <h4 className="font-bold text-lg mb-2">پیش‌نمایش سریع</h4>
                                                            <p className="text-sm opacity-90">برای مشاهده جزئیات کلیک کنید</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* برچسب رتبه */}
                                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-2 space-x-reverse shadow-md">
                                                    <StarIconSolid className="w-4 h-4 text-yellow-500" />
                                                    <span className="font-bold text-gray-800">{template.rating.toFixed(1)}</span>
                                                </div>
                                                {/* برچسب پرمیوم */}
                                                {template.isPremium && (
                                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                                        پرمیوم
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-8">
                                                <div className={`absolute top-0 right-0 w-12 h-2 ${style.border}`}></div>
                                                <div className="flex items-start justify-between mb-5">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 space-x-reverse mb-3">
                                                            {template.icon}
                                                            <h3 className="font-bold text-gray-900 text-xl font-[Vazir]">{template.name}</h3>
                                                        </div>
                                                        <p className="text-gray-600 leading-relaxed">{template.description}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-3 mb-6">
                                                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${style.badge}`}>
                                                        {template.designType}
                                                    </span>
                                                    <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                                        {template.category}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm text-gray-500 mb-8">
                                                    <div className="flex items-center space-x-5 space-x-reverse">
                                                        <div className="flex items-center space-x-2 space-x-reverse">
                                                            <EyeIcon className="w-5 h-5" />
                                                            <span className="font-medium">{template.downloads.toLocaleString()} بار دانلود</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4 space-x-reverse">
                                                    <Link
                                                        to={`/build-resume/${template._id}`}
                                                        className={`flex-1 text-white py-4 text-center rounded-xl hover:shadow-lg transition-all ${style.button} flex items-center justify-center space-x-3 space-x-reverse font-medium`}
                                                    >
                                                        <span>استفاده از قالب</span>
                                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => setSelectedTemplate(template)}
                                                        className={`p-4 rounded-xl border-2 ${selectedTemplate?._id === template._id
                                                            ? `bg-emerald-50 border-emerald-500 text-emerald-700`
                                                            : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                                                            }`}
                                                    >
                                                        <CheckCircleIcon className={`w-6 h-6 ${selectedTemplate?._id === template._id ? 'text-emerald-600' : ''}`} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* تمام قالب‌ها */}
                <div>
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-bold text-gray-900 font-[Vazir]">
                            گالری قالب‌های رزومه
                        </h3>
                        <div className="text-gray-600 text-lg">
                            <span className="font-bold text-emerald-600">{templates.length}</span> قالب متنوع
                        </div>
                    </div>

                    {filteredTemplates.length === 0 ? (
                        <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-inner">
                            <div className="text-gray-400 text-7xl mb-6">📄</div>
                            <h4 className="text-2xl font-medium text-gray-900 mb-4">قالبی یافت نشد</h4>
                            <p className="text-gray-600 mb-8 text-lg">فیلترهای خود را تنظیم کنید</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={clearFilters}
                                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all font-medium text-lg"
                            >
                                پاک کردن همه فیلترها
                            </motion.button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredTemplates.map(template => {
                                const style = getTemplateStyle(template);
                                return (
                                    <motion.div
                                        key={template._id}
                                        whileHover={{ y: -3 }}
                                        className={`rounded-2xl overflow-hidden border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 ${style.card} ${style.shadow}`}
                                    >
                                        <div className="relative h-56 overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${template.previewImage})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-t ${style.overlay} opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4`}>
                                                    <div className="text-white text-sm p-3">
                                                        <h4 className="font-bold mb-1">قالب {template.designType}</h4>
                                                        <p>مناسب برای {template.category}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* برچسب رتبه */}
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-2 space-x-reverse shadow-sm">
                                                <StarIconSolid className="w-3 h-3 text-yellow-500" />
                                                <span className="font-bold text-gray-800 text-xs">{template.rating.toFixed(1)}</span>
                                            </div>
                                            {/* برچسب پرمیوم */}
                                            {template.isPremium && (
                                                <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                                                    $
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <div className={`absolute top-0 right-0 w-12 h-2 ${style.border}`}></div>
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                                                        {template.icon}
                                                        <h3 className="font-bold text-gray-900 text-lg font-[Vazir]">{template.name}</h3>
                                                    </div>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.badge}`}>
                                                    {template.designType}
                                                </span>
                                                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                                                    {template.category}
                                                </span>
                                                {template.isPremium && (
                                                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 rounded-full text-xs font-medium">
                                                        پرمیوم
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                                <div className="flex items-center space-x-4 space-x-reverse">
                                                    <div className="flex items-center space-x-1 space-x-reverse">
                                                        <EyeIcon className="w-3 h-3" />
                                                        <span>{template.downloads.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1 space-x-reverse">
                                                        <SparklesIcon className="w-3 h-3" />
                                                        <span>{template.activeSections.length} بخش</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 space-x-reverse">
                                                <Link
                                                    to={`/build-resume/${template._id}`}
                                                    className={`flex-1 text-white py-3 text-center rounded-xl hover:shadow-lg transition-all ${style.button} flex items-center justify-center space-x-2 space-x-reverse text-sm font-medium`}
                                                >
                                                    <span>استفاده از قالب</span>
                                                    <ArrowDownTrayIcon className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setSelectedTemplate(template)}
                                                    className={`p-3 rounded-xl border ${selectedTemplate?._id === template._id
                                                        ? `bg-emerald-50 border-emerald-500 text-emerald-700`
                                                        : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                                                        }`}
                                                >
                                                    <CheckCircleIcon className={`w-5 h-5 ${selectedTemplate?._id === template._id ? 'text-emerald-600' : ''}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* بخش آمار */}
                <div className="mt-20 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center font-[Vazir]">
                        آمار قالب‌های ما
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl p-6 text-center shadow-md">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">{templates.length}</div>
                            <div className="text-gray-600">قالب متنوع</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 text-center shadow-md">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {templates.filter(t => !t.isPremium).length}
                            </div>
                            <div className="text-gray-600">قالب رایگان</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 text-center shadow-md">
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                {templates.reduce((sum, t) => sum + t.downloads, 0).toLocaleString()}
                            </div>
                            <div className="text-gray-600">کل دانلودها</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 text-center shadow-md">
                            <div className="text-3xl font-bold text-yellow-600 mb-2">
                                {templates.reduce((sum, t) => sum + t.rating, 0) / templates.length}
                            </div>
                            <div className="text-gray-600">میانگین امتیاز</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* دکمه انتخاب */}
            {selectedTemplate && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-0 right-0 left-0 bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-200 shadow-2xl p-6 z-40"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center space-x-6 space-x-reverse">
                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-md">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${selectedTemplate.previewImage})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xl mb-2 font-[Vazir]">{selectedTemplate.name}</h4>
                                    <p className="text-gray-600 mb-3">{selectedTemplate.description}</p>
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <span className="text-sm px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                                            {selectedTemplate.designType}
                                        </span>
                                        {selectedTemplate.isPremium && (
                                            <span className="text-sm px-4 py-1.5 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 rounded-full font-medium">
                                                پرمیوم - ${selectedTemplate.price}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 space-x-reverse">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedTemplate(null)}
                                    className="px-8 py-3 bg-white text-gray-700 rounded-xl border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-medium transition-all"
                                >
                                    تغییر قالب
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate(`/build-resume/${selectedTemplate._id}`)}
                                    className="px-10 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium text-lg"
                                >
                                    استفاده از این قالب
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* اضافه کردن فونت فارسی */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap');
                
                * {
                    font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                }
                
                body {
                    font-family: 'Vazirmatn', sans-serif;
                }
                
                .font-[Vazir] {
                    font-family: 'Vazirmatn', sans-serif;
                }
                
                /* استایل اسکرول بار */
                ::-webkit-scrollbar {
                    width: 10px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #10b981, #059669);
                    border-radius: 10px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #059669, #047857);
                }
            `}</style>
        </div>
    );
};

export default TemplateSelection;