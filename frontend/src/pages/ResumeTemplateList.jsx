import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResumeTemplateCard from './ResumeTemplateCard';
import {
    PiMagnifyingGlass,
    PiFunnel,
    PiSparkle,
    PiGridFour,
    PiListBullets,
    PiStar,
    PiClock,
    PiTrendUp
} from 'react-icons/pi';

const API_BASE_URL = 'http://localhost:5000/api';

const ResumeTemplateList = ({ onTemplateSelect, selectedTemplateId }) => {
    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('popularity'); // 'popularity', 'name', 'newest'
    const [previewTemplate, setPreviewTemplate] = useState(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    useEffect(() => {
        filterAndSortTemplates();
    }, [templates, searchTerm, categoryFilter, difficultyFilter, sortBy]);

    const fetchTemplates = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/resume-templates`, {
                withCredentials: true
            });

            if (response.data.success) {
                setTemplates(response.data.templates);
                setFilteredTemplates(response.data.templates);
            }
        } catch (error) {
            console.error('Error fetching templates:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortTemplates = () => {
        let filtered = [...templates];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(template =>
                template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter (simulated based on template name)
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(template => {
                const name = template.name.toLowerCase();
                switch (categoryFilter) {
                    case 'professional':
                        return name.includes('professional') || name.includes('executive') || name.includes('corporate');
                    case 'creative':
                        return name.includes('creative') || name.includes('design') || name.includes('art');
                    case 'minimal':
                        return name.includes('minimal') || name.includes('simple') || name.includes('clean');
                    case 'modern':
                        return name.includes('modern') || name.includes('contemporary') || name.includes('fresh');
                    default:
                        return true;
                }
            });
        }

        // Difficulty filter (simulated)
        if (difficultyFilter !== 'all') {
            filtered = filtered.filter(template => {
                const difficultyLevel = getDifficultyLevel(template);
                return difficultyLevel === difficultyFilter;
            });
        }

        // Sort templates
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'popularity':
                default:
                    const popularityA = getPopularityScore(a);
                    const popularityB = getPopularityScore(b);
                    return popularityB - popularityA;
            }
        });

        setFilteredTemplates(filtered);
    };

    const getDifficultyLevel = (template) => {
        const levels = ['Beginner', 'Intermediate', 'Advanced'];
        return levels[template.name.length % 3];
    };

    const getPopularityScore = (template) => {
        const scores = [85, 92, 78, 95, 88, 91, 83, 96];
        return scores[template.name.length % scores.length];
    };

    const getTemplateCategory = (template) => {
        const name = template.name.toLowerCase();
        if (name.includes('professional') || name.includes('executive')) return 'professional';
        if (name.includes('creative') || name.includes('design')) return 'creative';
        if (name.includes('minimal') || name.includes('simple')) return 'minimal';
        if (name.includes('modern') || name.includes('contemporary')) return 'modern';
        return 'professional';
    };

    const categories = [
        { id: 'all', label: 'All Templates', count: templates.length },
        { id: 'professional', label: 'Professional', icon: '💼', count: templates.filter(t => getTemplateCategory(t) === 'professional').length },
        { id: 'creative', label: 'Creative', icon: '🎨', count: templates.filter(t => getTemplateCategory(t) === 'creative').length },
        { id: 'minimal', label: 'Minimal', icon: '⚪', count: templates.filter(t => getTemplateCategory(t) === 'minimal').length },
        { id: 'modern', label: 'Modern', icon: '🚀', count: templates.filter(t => getTemplateCategory(t) === 'modern').length }
    ];

    const difficulties = [
        { id: 'all', label: 'All Levels' },
        { id: 'Beginner', label: 'Beginner', color: 'text-green-600' },
        { id: 'Intermediate', label: 'Intermediate', color: 'text-yellow-600' },
        { id: 'Advanced', label: 'Advanced', color: 'text-red-600' }
    ];

    const sortOptions = [
        { id: 'popularity', label: 'Most Popular', icon: <PiTrendUp /> },
        { id: 'name', label: 'Name (A-Z)', icon: <PiListBullets /> },
        { id: 'newest', label: 'Newest First', icon: <PiSparkle /> }
    ];

    const handlePreview = (template) => {
        setPreviewTemplate(template);
    };

    const PreviewModal = ({ template, onClose }) => {
        if (!template) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{template.name}</h3>
                            <p className="text-gray-600">{template.description}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                        {/* Preview content would go here */}
                        <div className="text-center py-12 text-gray-500">
                            <PiSparkle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p>Template preview feature would be implemented here</p>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Close Preview
                        </button>
                        <button
                            onClick={() => {
                                onTemplateSelect(template._id);
                                onClose();
                            }}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                        >
                            Use This Template
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading templates...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg p-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Browse Templates</h2>
                        <p className="text-gray-600">Select the perfect template for your resume</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View Toggle */}
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                            >
                                <PiGridFour className={`w-5 h-5 ${viewMode === 'grid' ? 'text-primary' : 'text-gray-500'}`} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                            >
                                <PiListBullets className={`w-5 h-5 ${viewMode === 'list' ? 'text-primary' : 'text-gray-500'}`} />
                            </button>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {sortOptions.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <PiFunnel className="w-4 h-4 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <PiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search templates by name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-4 mb-4">
                        {/* Category Filters */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Category:</span>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setCategoryFilter(category.id)}
                                        className={`px-3 py-1.5 text-sm rounded-full transition-colors ${categoryFilter === category.id
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <span className="mr-1">{category.icon}</span>
                                        {category.label}
                                        <span className="ml-1 text-xs opacity-75">({category.count})</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Filters */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Level:</span>
                            <div className="flex flex-wrap gap-2">
                                {difficulties.map(diff => (
                                    <button
                                        key={diff.id}
                                        onClick={() => setDifficultyFilter(diff.id)}
                                        className={`px-3 py-1.5 text-sm rounded-full transition-colors ${difficultyFilter === diff.id
                                                ? 'bg-gray-800 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            } ${diff.color || ''}`}
                                    >
                                        {diff.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Templates Grid/List */}
                {filteredTemplates.length > 0 ? (
                    <div className={viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                        : 'space-y-4'
                    }>
                        {filteredTemplates.map(template => (
                            <ResumeTemplateCard
                                key={template._id}
                                template={template}
                                isSelected={selectedTemplateId === template._id}
                                onSelect={() => onTemplateSelect(template._id)}
                                onPreview={handlePreview}
                                showActions={viewMode === 'grid'}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PiMagnifyingGlass className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No templates found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm
                                ? `No templates match "${searchTerm}". Try a different search term.`
                                : 'No templates match the selected filters.'}
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setCategoryFilter('all');
                                setDifficultyFilter('all');
                            }}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Results Count */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600">
                            Showing <span className="font-bold">{filteredTemplates.length}</span> of{' '}
                            <span className="font-bold">{templates.length}</span> templates
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <PiSparkle className="w-4 h-4" />
                            <span>Updated just now</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {previewTemplate && (
                <PreviewModal
                    template={previewTemplate}
                    onClose={() => setPreviewTemplate(null)}
                />
            )}
        </>
    );
};

export default ResumeTemplateList;