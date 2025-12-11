import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PiCheckCircle, PiEye, PiSparkle } from 'react-icons/pi';

const API_BASE_URL = 'http://localhost:5000/api';

const ResumeTemplateSelector = ({ onTemplateSelect, selectedTemplateId: externalSelectedId }) => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState(externalSelectedId || null);
    const [loading, setLoading] = useState(true);
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        fetchTemplates();
    }, []);

    useEffect(() => {
        if (externalSelectedId) {
            setSelectedTemplateId(externalSelectedId);
        }
    }, [externalSelectedId]);

    const fetchTemplates = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/resume-templates`, {
                withCredentials: true
            });

            if (response.data.success) {
                setTemplates(response.data.templates);
                if (!selectedTemplateId && response.data.templates.length > 0) {
                    const firstTemplate = response.data.templates[0];
                    setSelectedTemplateId(firstTemplate._id);
                    onTemplateSelect(firstTemplate._id);
                }
            }
        } catch (error) {
            console.error('Error fetching templates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTemplateSelect = (template) => {
        setSelectedTemplateId(template._id);
        onTemplateSelect(template._id);
    };

    const handlePreviewClick = (template, e) => {
        e.stopPropagation();
        setPreviewTemplate(template);
        setShowPreview(true);
    };

    const TemplateThumbnail = ({ template }) => {
        const colors = [
            'from-blue-100 to-blue-50',
            'from-green-100 to-green-50',
            'from-purple-100 to-purple-50',
            'from-pink-100 to-pink-50',
            'from-orange-100 to-orange-50',
            'from-teal-100 to-teal-50'
        ];

        const colorIndex = template.name.length % colors.length;

        return (
            <div className={`h-48 ${colors[colorIndex]} rounded-lg flex items-center justify-center relative overflow-hidden group`}>
                <div className="text-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-20 h-24 bg-white mx-auto mb-3 rounded shadow-lg flex flex-col overflow-hidden">
                        <div className="h-4 bg-primary"></div>
                        <div className="flex-1 p-2">
                            <div className="h-2 bg-gray-200 rounded mb-1"></div>
                            <div className="h-2 bg-gray-200 rounded mb-1 w-3/4"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{template.name}</span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
        );
    };

    const TemplatePreviewModal = ({ template, onClose }) => {
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
                        <div className="mb-6">
                            <h4 className="text-lg font-bold text-gray-800 mb-3">Template Preview</h4>
                            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border-2 border-dashed border-gray-200">
                                <div className="bg-white shadow-lg p-6 max-w-2xl mx-auto">
                                    {/* Resume Preview Structure */}
                                    <div className="border-b-2 border-primary pb-4 mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                                        <p className="text-gray-600">Software Engineer</p>
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                            <span className="text-gray-600">john@example.com</span>
                                            <span className="text-gray-600">+1 (555) 123-4567</span>
                                            <span className="text-blue-600">linkedin.com/in/johndoe</span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-2 border-l-4 border-primary pl-3">
                                                Professional Summary
                                            </h3>
                                            <p className="text-gray-700">
                                                Experienced software engineer with 5+ years in web development.
                                                Specialized in React, Node.js, and cloud technologies.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-primary pl-3">
                                                Experience
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h4 className="font-bold text-gray-900">Senior Developer</h4>
                                                        <span className="text-gray-600">2020 - Present</span>
                                                    </div>
                                                    <p className="text-gray-700">Tech Company Inc.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-primary pl-3">
                                                Skills
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">React</span>
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">Node.js</span>
                                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">MongoDB</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-gray-800 mb-2">Template Features:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Clean and professional design</li>
                                <li>Responsive layout</li>
                                <li>QR code integration ready</li>
                                <li>Easy to customize sections</li>
                                <li>Print-friendly format</li>
                            </ul>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleTemplateSelect(template);
                                onClose();
                            }}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                        >
                            <PiCheckCircle />
                            Select This Template
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
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
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Choose a Resume Template</h2>
                        <p className="text-gray-600">Select a template to start building your resume</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                        <PiSparkle />
                        <span className="font-medium">{templates.length} templates available</span>
                    </div>
                </div>

                {templates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template) => (
                            <div
                                key={template._id}
                                className={`group cursor-pointer transition-all duration-300 ${selectedTemplateId === template._id
                                        ? 'ring-2 ring-primary ring-offset-2'
                                        : ''
                                    }`}
                                onClick={() => handleTemplateSelect(template)}
                            >
                                <div className={`border-2 rounded-xl overflow-hidden transition-all duration-300 ${selectedTemplateId === template._id
                                        ? 'border-primary shadow-lg'
                                        : 'border-gray-200 group-hover:border-gray-300 group-hover:shadow-md'
                                    }`}>
                                    <div className="relative">
                                        <TemplateThumbnail template={template} />

                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <button
                                                onClick={(e) => handlePreviewClick(template, e)}
                                                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                                title="Preview Template"
                                            >
                                                <PiEye className="w-4 h-4 text-gray-600" />
                                            </button>

                                            {selectedTemplateId === template._id && (
                                                <div className="p-2 bg-primary text-white rounded-lg">
                                                    <PiCheckCircle className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-gray-800 text-lg">{template.name}</h3>
                                            {selectedTemplateId === template._id && (
                                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                    Selected
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{template.description}</p>

                                        <div className="flex justify-between items-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePreviewClick(template, e);
                                                }}
                                                className="text-sm text-primary hover:text-blue-700 font-medium"
                                            >
                                                Preview Details
                                            </button>

                                            {selectedTemplateId === template._id && (
                                                <span className="text-xs text-gray-500">
                                                    Click to change
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PiSparkle className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Templates Available</h3>
                        <p className="text-gray-600 mb-6">Please add templates through the admin panel first.</p>
                        <button
                            onClick={fetchTemplates}
                            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                        >
                            Refresh Templates
                        </button>
                    </div>
                )}

                {selectedTemplateId && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-blue-800">
                                    Template Selected ✓
                                </p>
                                <p className="text-sm text-blue-600">
                                    Continue to fill in your information
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-sm text-green-700">Ready to build</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showPreview && (
                <TemplatePreviewModal
                    template={previewTemplate}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </>
    );
};

export default ResumeTemplateSelector;