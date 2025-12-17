import React from 'react';
import { motion } from 'framer-motion';
import {
    HeartIcon,
    EyeIcon,
    CheckIcon,
    ClockIcon,
    BoltIcon,
    HeartIcon as HeartSolid
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { getColorClass, getLayoutIcon, getPopularityColor } from '../../utils/templateUtils';

const TemplateCard = ({
    template,
    index,
    isFavorite,
    onSelect,
    onQuickView,
    onToggleFavorite,
    isLoading,
    viewMode
}) => {
    const handleQuickView = (e) => {
        if (onQuickView) onQuickView(template, e);
    };

    const handleToggleFavorite = (e) => {
        if (onToggleFavorite) onToggleFavorite(template.id, e);
    };

    const handleSelect = (e) => {
        e.stopPropagation();
        if (onSelect) onSelect(template);
    };

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
            {/* Popular badge */}
            {template.popularity > 90 && (
                <div className="absolute top-4 right-4 z-10">
                    <div className={`flex items-center space-x-1 space-x-reverse text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${getPopularityColor(template.popularity)}`}>
                        <FireIcon className="w-3 h-3" />
                        <span>پرفروش</span>
                    </div>
                </div>
            )}

            {/* New badge */}
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
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getColorClass(template.color)}`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Dynamic background pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                {/* Template preview simulation */}
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

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/30"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <span className="text-3xl">{template.icon}</span>
                    </motion.div>
                </div>

                {/* Action buttons */}
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

                {/* Rating and downloads */}
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
                                        {template.layout === 'single' ? 'تک ستون' :
                                            template.layout === 'double' ? 'دو ستون' :
                                                template.layout === 'creative' ? 'خلاقانه' : 'پورتفولیو'}
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

                {/* Bottom info */}
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

                {/* Select button */}
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

            {/* Color bottom line */}
            <div className={`h-1 bg-gradient-to-r ${getColorClass(template.color)}`}></div>
        </motion.div>
    );
};

export default TemplateCard;