import React from 'react';
import { PiEye, PiCheckCircle, PiStar, PiClock } from 'react-icons/pi';

const ResumeTemplateCard = ({
    template,
    isSelected,
    onSelect,
    onPreview,
    showActions = true
}) => {
    const getDifficultyLevel = (template) => {
        // This could be based on template properties
        const levels = ['Beginner', 'Intermediate', 'Advanced'];
        return levels[template.name.length % 3];
    };

    const getTimeEstimate = (template) => {
        const estimates = ['5-10 min', '10-15 min', '15-20 min'];
        return estimates[template.description.length % 3];
    };

    const getPopularityScore = (template) => {
        // Simulate popularity based on template name
        const scores = [85, 92, 78, 95, 88];
        return scores[template.name.length % scores.length];
    };

    const TemplateBadge = ({ type }) => {
        const badges = {
            popular: { label: 'Popular', color: 'bg-red-100 text-red-800' },
            new: { label: 'New', color: 'bg-green-100 text-green-800' },
            featured: { label: 'Featured', color: 'bg-purple-100 text-purple-800' },
            professional: { label: 'Pro', color: 'bg-blue-100 text-blue-800' },
            creative: { label: 'Creative', color: 'bg-yellow-100 text-yellow-800' }
        };

        const badge = badges[type] || badges.professional;

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}>
                {badge.label}
            </span>
        );
    };

    const renderTemplateThumbnail = () => {
        const templateColors = {
            'Modern': 'from-blue-500 to-cyan-400',
            'Professional': 'from-gray-700 to-gray-900',
            'Creative': 'from-purple-500 to-pink-500',
            'Minimal': 'from-green-500 to-emerald-400',
            'Executive': 'from-indigo-600 to-blue-500',
            'Academic': 'from-amber-600 to-orange-500'
        };

        const defaultColor = 'from-primary to-blue-400';
        const templateName = template.name.split(' ')[0];
        const gradient = templateColors[templateName] || defaultColor;

        return (
            <div className={`relative h-48 ${gradient} rounded-t-xl overflow-hidden group`}>
                {/* Template Design Preview */}
                <div className="absolute inset-4 bg-white bg-opacity-90 rounded-lg shadow-inner">
                    {/* Header section */}
                    <div className="h-6 bg-gradient-to-r from-primary/20 to-primary/10 rounded-t-lg"></div>

                    {/* Content sections */}
                    <div className="p-3 space-y-2">
                        {/* Name line */}
                        <div className="h-3 bg-gray-300 rounded w-3/4"></div>

                        {/* Contact info */}
                        <div className="flex gap-2">
                            <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                        </div>

                        {/* Section headers */}
                        <div className="space-y-3 pt-2">
                            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                            <div className="h-2 bg-gray-200 rounded w-full"></div>
                            <div className="h-2 bg-gray-200 rounded w-5/6"></div>

                            <div className="h-3 bg-gray-300 rounded w-1/3 mt-2"></div>
                            <div className="grid grid-cols-3 gap-1">
                                <div className="h-2 bg-gray-200 rounded"></div>
                                <div className="h-2 bg-gray-200 rounded"></div>
                                <div className="h-2 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* QR Code Preview */}
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-0.5">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-gray-800"></div>
                        ))}
                    </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                {/* Selected indicator */}
                {isSelected && (
                    <div className="absolute top-3 left-3">
                        <div className="bg-primary text-white p-1.5 rounded-full shadow-lg">
                            <PiCheckCircle className="w-4 h-4" />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderTemplateStats = () => {
        const difficulty = getDifficultyLevel(template);
        const timeEstimate = getTimeEstimate(template);
        const popularity = getPopularityScore(template);

        return (
            <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                <div className="flex items-center gap-1">
                    <PiClock className="w-3 h-3" />
                    <span>{timeEstimate}</span>
                </div>

                <div className={`px-2 py-0.5 rounded-full ${difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                    }`}>
                    {difficulty}
                </div>

                <div className="flex items-center gap-1">
                    <PiStar className="w-3 h-3 text-yellow-500" />
                    <span>{popularity}%</span>
                </div>
            </div>
        );
    };

    const getTemplateBadgeType = () => {
        const name = template.name.toLowerCase();
        if (name.includes('popular') || getPopularityScore(template) > 90) return 'popular';
        if (name.includes('new') || name.includes('latest')) return 'new';
        if (name.includes('featured') || name.includes('premium')) return 'featured';
        if (name.includes('creative') || name.includes('design')) return 'creative';
        if (name.includes('executive') || name.includes('professional')) return 'professional';
        return 'professional';
    };

    return (
        <div className={`relative transition-all duration-300 ${isSelected ? 'transform -translate-y-1' : ''
            }`}>
            <div className={`border-2 rounded-xl overflow-hidden bg-white h-full flex flex-col transition-all duration-300 ${isSelected
                    ? 'border-primary shadow-xl'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}>
                {/* Thumbnail */}
                {renderTemplateThumbnail()}

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Header with badge */}
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg">{template.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <TemplateBadge type={getTemplateBadgeType()} />
                                <span className="text-xs text-gray-500">
                                    {template.structure?.sections?.length || 6} sections
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-3 flex-1">
                        {template.description}
                    </p>

                    {/* Stats */}
                    {renderTemplateStats()}

                    {/* Actions */}
                    {showActions && (
                        <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                            <button
                                onClick={() => onPreview(template)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <PiEye className="w-4 h-4" />
                                Preview
                            </button>

                            <button
                                onClick={() => onSelect(template)}
                                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${isSelected
                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                        : 'bg-primary text-white hover:bg-blue-600'
                                    }`}
                            >
                                {isSelected ? (
                                    <>
                                        <PiCheckCircle className="w-4 h-4" />
                                        Selected
                                    </>
                                ) : (
                                    'Select'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Selected glow effect */}
            {isSelected && (
                <div className="absolute -inset-1 bg-primary bg-opacity-5 rounded-xl blur-md -z-10"></div>
            )}
        </div>
    );
};

export default ResumeTemplateCard;