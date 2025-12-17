// client/src/pages/TemplatesGallery.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useResume } from '../../contexts/ResumeContext';

// Import only necessary icons
import {
    ArrowLeftIcon,
    SparklesIcon,
    StarIcon,
    HeartIcon,
    EyeIcon,
    CheckIcon,
    FireIcon,
    BoltIcon,
    ClockIcon,
    ArrowTrendingUpIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowsUpDownIcon,
    XMarkIcon,
    Squares2X2Icon,
    ListBulletIcon,
    ViewfinderCircleIcon,
    ArrowDownTrayIcon,
    CheckBadgeIcon,
    DevicePhoneMobileIcon,
    ComputerDesktopIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid';

// Constants for better maintainability
const SORT_OPTIONS = [
    { value: 'popularity', label: ' محبوب‌ترین' },
    { value: 'stars', label: ' بالاترین امتیاز' },
    { value: 'downloads', label: ' بیشترین دانلود' },
    { value: 'newest', label: ' جدیدترین' }
];

const FILTER_OPTIONS = [
    { value: 'all', label: 'همه قالب‌ها' },
    { value: 'favorites', label: 'علاقه‌مندی‌ها' },
    { value: 'animation', label: 'دارای انیمیشن' },
    { value: 'responsive', label: 'واکنش‌گرا' }
];

const LAYOUT_OPTIONS = [
    { value: 'all', label: 'همه طرح‌ها' },
    { value: 'single', label: ' تک ستون' },
    { value: 'double', label: ' دو ستون' },
    { value: 'creative', label: ' خلاقانه' },
    { value: 'portfolio', label: ' پورتفولیو' }
];

// Template data (could be moved to separate file)
const CATEGORY_TEMPLATES = {
    'professional': [
        {
            id: 'modern',
            name: 'حرفه‌ای مدرن',
            description: 'طراحی مدرن با المان‌های گرادیانتی برای مشاغل حرفه‌ای و مدیران',
            icon: '',
            color: 'blue',
            stars: 4.8,
            downloads: '12.5K',
            lastUpdated: '2 روز پیش',
            features: ['گرادیانتی', 'تک ستون', 'نمایش مهارت‌ها'],
            tags: ['مدیریتی', 'شرکتی', 'رسمی'],
            popularity: 95,
            layout: 'single',
            pages: 1,
            animation: true,
            responsive: true,
            previewColor: 'from-blue-500 via-blue-600 to-blue-700'
        },
        // ... rest of professional templates
    ],
    // ... other categories
};

const CATEGORY_NAMES = {
    'professional': 'حرفه‌ای و مدیریتی',
    'creative': 'خلاقانه و هنری',
    'technical': 'فنی و تخصصی',
    'academic': 'آکادمیک و پژوهشی',
    'minimal': 'مینیمال و ساده'
};

const CATEGORY_DESCRIPTIONS = {
    'professional': 'قالب‌های رسمی و ساختاریافته برای مدیران، کارشناسان و محیط‌های شرکتی',
    'creative': 'طراحی‌های هنری و خلاقانه برای طراحان، هنرمندان و مشاغل مبتنی بر خلاقیت',
    'technical': 'قالب‌های تخصصی برای مهندسان، توسعه‌دهندگان و متخصصان فناوری',
    'academic': 'قالب‌های رسمی برای اساتید دانشگاه، محققان و جامعه علمی',
    'minimal': 'طراحی‌های ساده و مینیمال با تمرکز بر محتوا و خوانایی'
};

const CATEGORY_ICONS = {
    'professional': '💼',
    'creative': '🎨',
    'technical': '💻',
    'academic': '🎓',
    'minimal': '⚫'
};

// Utility functions
const getColorClass = (color) => {
    const colorMap = {
        blue: 'from-blue-500 to-blue-700',
        amber: 'from-amber-500 to-amber-700',
        gray: 'from-gray-500 to-gray-700',
        pink: 'from-pink-500 to-pink-700',
        purple: 'from-purple-500 to-purple-700',
        green: 'from-green-500 to-green-700',
        teal: 'from-teal-500 to-teal-700',
        cyan: 'from-cyan-500 to-cyan-700',
        indigo: 'from-indigo-500 to-indigo-700',
        zinc: 'from-zinc-500 to-zinc-700',
        rose: 'from-rose-500 to-rose-700',
        violet: 'from-violet-500 to-violet-700',
        slate: 'from-slate-500 to-slate-700',
        neutral: 'from-neutral-500 to-neutral-700'
    };
    return colorMap[color] || 'from-blue-500 to-blue-700';
};

const getPopularityColor = (popularity) => {
    if (popularity >= 90) return 'bg-gradient-to-r from-green-500 to-emerald-600';
    if (popularity >= 80) return 'bg-gradient-to-r from-blue-500 to-cyan-600';
    if (popularity >= 70) return 'bg-gradient-to-r from-yellow-500 to-amber-600';
    return 'bg-gradient-to-r from-gray-500 to-gray-600';
};

const getLayoutName = (layout) => {
    switch (layout) {
        case 'single': return 'تک ستون';
        case 'double': return 'دو ستون';
        case 'creative': return 'خلاقانه';
        case 'portfolio': return 'پورتفولیو';
        default: return layout;
    }
};

// Custom hook for favorites
const useFavorites = () => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('templateFavorites');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('templateFavorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favorites]);

    const toggleFavorite = useCallback((templateId) => {
        setFavorites(prev => {
            if (prev.includes(templateId)) {
                return prev.filter(id => id !== templateId);
            }
            return [...prev, templateId];
        });
    }, []);

    const isFavorite = useCallback((templateId) =>
        favorites.includes(templateId),
        [favorites]
    );

    return { favorites, toggleFavorite, isFavorite };
};

// Template Card Component
const TemplateCard = React.memo(({
    template,
    index,
    isFavorite,
    onSelect,
    onQuickView,
    onToggleFavorite,
    isLoading,
    viewMode
}) => {
    const handleQuickView = useCallback((e) => {
        e?.stopPropagation();
        onQuickView?.(template, e);
    }, [template, onQuickView]);

    const handleToggleFavorite = useCallback((e) => {
        e?.stopPropagation();
        onToggleFavorite?.(template.id, e);
    }, [template.id, onToggleFavorite]);

    const handleSelect = useCallback((e) => {
        e?.stopPropagation();
        onSelect?.(template);
    }, [template, onSelect]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
            }}
            whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 300 }
            }}
            className={`
        group relative overflow-hidden rounded-3xl
        ${viewMode === 'grid' ? 'h-full' : 'flex flex-col md:flex-row'}
        bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300
        border border-gray-200 dark:border-gray-700
        cursor-pointer
      `}
            onClick={handleQuickView}
        >
            {/* Badges */}
            {template.popularity > 90 && (
                <div className="absolute top-4 right-4 z-10">
                    <div className={`flex items-center space-x-1 space-x-reverse text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${getPopularityColor(template.popularity)}`}>
                        <FireIcon className="w-3 h-3" />
                        <span>پرفروش</span>
                    </div>
                </div>
            )}

            {template.lastUpdated === 'امروز' && (
                <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center space-x-1 space-x-reverse bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        <span>🆕 جدید</span>
                    </div>
                </div>
            )}

            {/* Card Header */}
            <div className={`
        relative h-48 overflow-hidden
        ${viewMode === 'grid' ? '' : 'md:w-64 md:flex-shrink-0'}
      `}>
                <div className={`absolute inset-0 bg-gradient-to-br ${getColorClass(template.color)}`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Preview Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                {/* Mock Content */}
                <div className="absolute inset-0 p-6">
                    <div className="h-full flex flex-col">
                        <div className="h-8 bg-white/30 rounded-lg mb-4"></div>
                        <div className="flex-1 grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <div className="h-3 bg-white/30 rounded-full"></div>
                                <div className="h-3 bg-white/30 rounded-full w-3/4"></div>
                                <div className="h-3 bg-white/30 rounded-full w-1/2"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-8 bg-white/30 rounded-lg"></div>
                                <div className="h-8 bg-white/30 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/30"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <span className="text-3xl">{template.icon}</span>
                    </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-4 left-4 flex space-x-3 space-x-reverse">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleQuickView}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                        title="مشاهده سریع"
                    >
                        <EyeIcon className="w-6 h-6 text-white" />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleToggleFavorite}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                        title={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                    >
                        {isFavorite ? (
                            <HeartSolid className="w-6 h-6 text-red-400" />
                        ) : (
                            <HeartIcon className="w-6 h-6 text-white" />
                        )}
                    </motion.button>
                </div>

                {/* Stats */}
                <div className="absolute bottom-4 right-4">
                    <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-1 space-x-reverse bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                            <StarSolid className="w-4 h-4 text-yellow-300" />
                            <span className="text-white font-bold">{template.stars}</span>
                            <span className="text-white/80 text-xs">/5</span>
                        </div>
                        <div className="text-xs text-white/80 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            {template.downloads} دانلود
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className={`p-6 ${viewMode === 'grid' ? '' : 'md:flex-1'}`}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 space-x-reverse mb-2">
                            <span className="text-2xl">{template.icon}</span>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {template.name}
                                </h3>
                                <div className="flex items-center space-x-2 space-x-reverse mt-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {getLayoutName(template.layout)}
                                    </span>
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {template.pages} صفحه
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                            {template.description}
                        </p>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-lg border border-gray-200 dark:border-gray-600"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {template.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 space-x-reverse">
                            <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-xs text-gray-600 dark:text-gray-400 truncate">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4 space-x-reverse text-sm">
                        <div className="flex items-center space-x-2 space-x-reverse text-gray-500 dark:text-gray-400">
                            <ClockIcon className="w-4 h-4" />
                            <span>{template.lastUpdated}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                            {template.animation && (
                                <span className="text-xs px-2 py-1 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 dark:from-yellow-900/30 dark:to-yellow-800/30 dark:text-yellow-400 rounded">
                                    ✨
                                </span>
                            )}
                            {template.responsive && (
                                <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-400 rounded">
                                    📱
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                        <div className={`w-3 h-3 rounded-full ${template.popularity >= 90 ? 'bg-green-500' : template.popularity >= 80 ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{template.popularity}% محبوبیت</span>
                    </div>
                </div>

                {/* Select Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSelect}
                    disabled={isLoading}
                    className={`w-full py-3.5 mt-6 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 space-x-reverse ${isLoading
                        ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                        } text-white`}
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>در حال بارگذاری...</span>
                        </>
                    ) : (
                        <>
                            <span>انتخاب این قالب</span>
                            <BoltIcon className="w-5 h-5" />
                        </>
                    )}
                </motion.button>
            </div>

            {/* Bottom Border */}
            <div className={`h-1 bg-gradient-to-r ${getColorClass(template.color)}`}></div>
        </motion.div>
    );
});

TemplateCard.displayName = 'TemplateCard';

// Quick View Modal Component
const QuickViewModal = React.memo(({
    template,
    isFavorite,
    isLoading,
    onClose,
    onToggleFavorite,
    onSelectTemplate
}) => {
    const handleSelect = useCallback(() => {
        onSelectTemplate(template);
        onClose();
    }, [template, onSelectTemplate, onClose]);

    const handleToggle = useCallback((e) => {
        e?.stopPropagation();
        onToggleFavorite(template.id, e);
    }, [template.id, onToggleFavorite]);

    return (
        <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className={`h-64 bg-gradient-to-br ${getColorClass(template.color)} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <motion.div
                                className="text-8xl opacity-30 mb-4"
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {template.icon}
                            </motion.div>
                            <h2 className="text-3xl font-bold text-white/90">{template.name}</h2>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 left-4 flex space-x-3 space-x-reverse">
                        <button
                            onClick={onClose}
                            className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                            title="بستن"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleToggle}
                            className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                            title={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                        >
                            {isFavorite ? (
                                <HeartSolid className="w-6 h-6 text-red-400" />
                            ) : (
                                <HeartIcon className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>

                    {/* Top Stats */}
                    <div className="absolute top-4 right-4 flex items-center space-x-4 space-x-reverse">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-white">{template.stars}</div>
                            <div className="text-white/80 text-sm">امتیاز</div>
                        </div>
                        <div className="h-8 w-px bg-white/30"></div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-white">{template.downloads}</div>
                            <div className="text-white/80 text-sm">دانلود</div>
                        </div>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Info */}
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">توضیحات قالب</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {template.description}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">ویژگی‌های اصلی</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {template.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center space-x-2 space-x-reverse">
                                            <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Technical Info */}
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">مشخصات فنی</h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">طرح چیدمان</div>
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {getLayoutName(template.layout)}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">تعداد صفحات</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{template.pages} صفحه</div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">میزان محبوبیت</div>
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${getPopularityColor(template.popularity)}`}
                                                style={{ width: `${template.popularity}%` }}
                                            ></div>
                                        </div>
                                        <span className="font-medium text-gray-900 dark:text-white">{template.popularity}%</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">آخرین بروزرسانی</div>
                                    <div className="font-medium text-gray-900 dark:text-white">{template.lastUpdated}</div>
                                </div>

                                <div className="flex items-center space-x-4 space-x-reverse pt-4 border-t border-gray-200 dark:border-gray-700">
                                    {template.animation && (
                                        <div className="text-center">
                                            <div className="text-2xl">✨</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">انیمیشن</div>
                                        </div>
                                    )}
                                    {template.responsive && (
                                        <div className="text-center">
                                            <div className="text-2xl">📱</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">واکنش‌گرا</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 space-x-reverse">
                        <button
                            onClick={handleSelect}
                            disabled={isLoading}
                            className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${isLoading
                                ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                                } text-white shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 space-x-reverse`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>در حال بارگذاری...</span>
                                </>
                            ) : (
                                <>
                                    <span>انتخاب و ادامه</span>
                                    <ArrowDownTrayIcon className="w-6 h-6" />
                                </>
                            )}
                        </button>

                        <button
                            onClick={onClose}
                            className="flex-1 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-bold"
                        >
                            بستن و بازگشت
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});

QuickViewModal.displayName = 'QuickViewModal';

// Main Component - تغییرات اصلی در این بخش انجام شده
const TemplatesGallery = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { updateResumeData } = useResume();

    // State
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');
    const [selectedLayout, setSelectedLayout] = useState('all');

    // Custom Hooks
    const { isFavorite, toggleFavorite } = useFavorites();

    // Data
    const templates = CATEGORY_TEMPLATES[category] || [];
    const categoryName = CATEGORY_NAMES[category] || 'قالب‌ها';
    const categoryIcon = CATEGORY_ICONS[category] || '🎯';
    const categoryDescription = CATEGORY_DESCRIPTIONS[category] || '';

    // Memoized calculations
    const filteredTemplates = useMemo(() => {
        return templates
            .filter(template => {
                if (filter === 'favorites' && !isFavorite(template.id)) return false;
                if (selectedLayout !== 'all' && template.layout !== selectedLayout) return false;
                if (filter === 'animation' && !template.animation) return false;
                if (filter === 'responsive' && !template.responsive) return false;

                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    return (
                        template.name.toLowerCase().includes(query) ||
                        template.description.toLowerCase().includes(query) ||
                        template.tags.some(tag => tag.toLowerCase().includes(query))
                    );
                }
                return true;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'popularity': return b.popularity - a.popularity;
                    case 'stars': return b.stars - a.stars;
                    case 'downloads': return parseInt(b.downloads) - parseInt(a.downloads);
                    case 'newest': return a.id.includes('new') ? -1 : 1;
                    default: return 0;
                }
            });
    }, [templates, filter, selectedLayout, searchQuery, sortBy, isFavorite]);

    const totalDownloads = useMemo(() =>
        templates.reduce((acc, t) => acc + parseInt(t.downloads), 0),
        [templates]
    );

    const activeFilters = useMemo(() => {
        const filters = [];
        if (searchQuery) filters.push({ type: 'search', label: `جستجو: "${searchQuery}"`, clear: () => setSearchQuery('') });
        if (filter !== 'all') filters.push({
            type: 'filter',
            label: FILTER_OPTIONS.find(f => f.value === filter)?.label || filter,
            clear: () => setFilter('all')
        });
        if (selectedLayout !== 'all') filters.push({
            type: 'layout',
            label: LAYOUT_OPTIONS.find(l => l.value === selectedLayout)?.label || selectedLayout,
            clear: () => setSelectedLayout('all')
        });
        return filters;
    }, [searchQuery, filter, selectedLayout]);

    // Handlers
    const handleSelectTemplate = useCallback(async (template) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            updateResumeData('templateId', template.id);

            toast.success(
                <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-2xl">{template.icon}</span>
                    <div>
                        <div className="font-bold">قالب "{template.name}" انتخاب شد!</div>
                        <div className="text-sm opacity-90">در حال انتقال به ویرایشگر...</div>
                    </div>
                </div>,
                {
                    duration: 3000,
                    icon: '✅',
                    style: {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                    }
                }
            );

            setTimeout(() => navigate(`/build/${template.id}`), 1500);
        } catch (error) {
            toast.error('خطا در انتخاب قالب! لطفاً دوباره تلاش کنید.');
            console.error('Template selection error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [updateResumeData, navigate]);

    const handleQuickView = useCallback((template, e) => {
        e?.stopPropagation();
        setSelectedTemplate(template);
    }, []);

    const handleToggleFavorite = useCallback((templateId, e) => {
        e?.stopPropagation();
        toggleFavorite(templateId);
    }, [toggleFavorite]);

    const resetFilters = useCallback(() => {
        setSearchQuery('');
        setFilter('all');
        setSortBy('popularity');
        setSelectedLayout('all');
    }, []);

    // Render functions
    const renderTemplateCards = () => {
        if (viewMode === 'grid') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTemplates.map((template, index) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            index={index}
                            isFavorite={isFavorite(template.id)}
                            onSelect={handleSelectTemplate}
                            onQuickView={handleQuickView}
                            onToggleFavorite={handleToggleFavorite}
                            isLoading={isLoading}
                            viewMode={viewMode}
                        />
                    ))}
                </div>
            );
        }

        return (
            <div className="space-y-8">
                {filteredTemplates.map((template, index) => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        index={index}
                        isFavorite={isFavorite(template.id)}
                        onSelect={handleSelectTemplate}
                        onQuickView={handleQuickView}
                        onToggleFavorite={handleToggleFavorite}
                        isLoading={isLoading}
                        viewMode={viewMode}
                    />
                ))}
            </div>
        );
    };

    const renderEmptyState = () => (
        <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                <MagnifyingGlassIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                قالبی یافت نشد
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                با تنظیمات فعلی هیچ قالبی پیدا نشد. لطفاً عبارت جستجو یا فیلترها را تغییر دهید.
            </p>
            <button
                onClick={resetFilters}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
                نمایش همه قالب‌ها
            </button>
        </motion.div>
    );

    const renderLoadingState = () => (
        <div className="flex flex-col items-center justify-center py-24">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-8"></div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">در حال بارگذاری قالب...</h3>
            <p className="text-gray-600 dark:text-gray-400">لطفاً چند لحظه صبر کنید</p>
        </div>
    );

    const renderHelpSection = () => (
        <motion.div
            className="mt-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 space-x-reverse mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                                <SparklesIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    نکات طلایی انتخاب قالب مناسب
                                </h3>
                                <p className="text-blue-600 dark:text-blue-400 font-medium">
                                    هر قالب برای هدف خاصی طراحی شده است
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start space-x-3 space-x-reverse">
                                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 shadow">
                                    <UserGroupIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">مخاطب خود را بشناسید</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        برای شرکت‌های بزرگ از قالب‌های رسمی و برای استارتاپ‌ها از قالب‌های مدرن استفاده کنید
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 space-x-reverse">
                                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 shadow">
                                    <ArrowTrendingUpIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">قالب پرطرفدار</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        قالب‌های با امتیاز بالا و دانلود زیاد معمولاً تأثیر بیشتری دارند
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 space-x-reverse">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 shadow">
                                    <DevicePhoneMobileIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">واکنش‌گرایی</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        حتماً قالب‌های واکنش‌گرا را انتخاب کنید تا در موبایل هم زیبا نمایش داده شود
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 space-x-reverse">
                                <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 shadow">
                                    <CheckBadgeIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">تخصصی بودن</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        برای مشاغل تخصصی مانند برنامه‌نویسی از قالب‌های مخصوص آن حوزه استفاده کنید
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/templates')}
                        className="px-10 py-4 bg-white dark:bg-gray-800 border-2 border-blue-500 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-700 font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                        مشاهده همه دسته‌بندی‌ها
                    </button>
                </div>
            </div>
        </motion.div>
    );

    // Render
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => navigate('/templates')}
                            className="flex items-center space-x-2 space-x-reverse text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group transition-all duration-300 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
                        >
                            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">بازگشت به دسته‌بندی‌ها</span>
                        </button>

                        <div className="flex items-center space-x-3 space-x-reverse">
                            <button
                                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === 'grid'
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                title={viewMode === 'grid' ? 'حالت لیست' : 'حالت گرید'}
                            >
                                {viewMode === 'grid' ? <ListBulletIcon className="w-5 h-5" /> : <Squares2X2Icon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Category Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-4 space-x-reverse mb-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                                            <span className="text-3xl">{categoryIcon}</span>
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                                {categoryName}
                                            </h1>
                                            <div className="flex items-center space-x-4 space-x-reverse">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    {filteredTemplates.length} قالب حرفه‌ای
                                                </span>
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                                <span className="text-blue-600 dark:text-blue-400 font-medium">
                                                    دسته‌بندی: {category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-2xl text-lg">
                                        {categoryDescription}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-6 space-x-reverse">
                                    <div className="text-center p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 min-w-[120px]">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {filteredTemplates.length}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">قالب موجود</div>
                                    </div>
                                    <div className="text-center p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 min-w-[120px]">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {totalDownloads}K
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">مجموع دانلود</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Controls */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8 border border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="جستجوی قالب‌ها بر اساس نام، توضیحات یا تگ‌ها..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pr-12 pl-4 py-3.5 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex space-x-3 space-x-reverse">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-3.5 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 font-medium"
                                    >
                                        {SORT_OPTIONS.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="px-4 py-3.5 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 font-medium"
                                    >
                                        {FILTER_OPTIONS.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex space-x-3 space-x-reverse">
                                    <select
                                        value={selectedLayout}
                                        onChange={(e) => setSelectedLayout(e.target.value)}
                                        className="px-4 py-3.5 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 font-medium"
                                    >
                                        {LAYOUT_OPTIONS.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={resetFilters}
                                        className="px-5 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2 space-x-reverse font-medium"
                                    >
                                        <ArrowPathIcon className="w-5 h-5" />
                                        <span>بازنشانی</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {activeFilters.length > 0 && (
                            <motion.div
                                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">فیلترهای فعال:</span>
                                    {activeFilters.map((activeFilter, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full flex items-center space-x-2 space-x-reverse font-medium"
                                        >
                                            <span>{activeFilter.label}</span>
                                            <button onClick={activeFilter.clear} className="text-blue-500 hover:text-blue-700">
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Main Content */}
                {isLoading ? (
                    renderLoadingState()
                ) : filteredTemplates.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <>
                        {/* Stats */}
                        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                            <div className="text-lg text-gray-600 dark:text-gray-400">
                                نمایش <span className="font-bold text-gray-900 dark:text-white">{filteredTemplates.length}</span> قالب از <span className="font-bold text-gray-900 dark:text-white">{templates.length}</span> قالب موجود
                            </div>
                            <div className="flex items-center space-x-6 space-x-reverse text-sm">
                                <div className="flex items-center space-x-2 space-x-reverse">
                                    <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
                                    <span className="text-gray-600 dark:text-gray-400">بیش از 90% محبوبیت</span>
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse">
                                    <div className="w-3.5 h-3.5 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-600 dark:text-gray-400">بیش از 80% محبوبیت</span>
                                </div>
                            </div>
                        </div>

                        {/* Templates */}
                        {renderTemplateCards()}

                        {/* Bottom Info */}
                        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
                            <p className="text-lg">برای مشاهده جزئیات بیشتر روی هر قالب کلیک کنید یا از دکمه 👁️ استفاده کنید.</p>
                        </div>
                    </>
                )}

                {/* Help Section */}
                {renderHelpSection()}
            </div>

            {/* Quick View Modal */}
            <AnimatePresence>
                {selectedTemplate && (
                    <QuickViewModal
                        template={selectedTemplate}
                        isFavorite={isFavorite(selectedTemplate.id)}
                        isLoading={isLoading}
                        onClose={() => setSelectedTemplate(null)}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectTemplate={handleSelectTemplate}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default TemplatesGallery;