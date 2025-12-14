import React, { useState, useEffect } from 'react';
import { getAllTemplates } from '../../services/resumeService';
import LoadingSpinner from './LoadingSpinner';

const TemplateSelector = ({ onSelectTemplate }) => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const response = await getAllTemplates();
            if (response.success) {
                setTemplates(response.data);
            }
        } catch (error) {
            console.error('Error fetching templates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (template) => {
        setSelectedId(template._id);
        onSelectTemplate(template);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
                <div
                    key={template._id}
                    className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${selectedId === template._id
                        ? 'border-blue-500 shadow-lg scale-[1.02]'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                    onClick={() => handleSelect(template)}
                >
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                        {template.previewImage ? (
                            <img
                                src={template.previewImage}
                                alt={template.templateName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-gray-400">No Preview</div>
                            </div>
                        )}

                        {selectedId === template._id && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {template.templateName}
                        </h3>

                        <div className="flex items-center space-x-2 mb-3">
                            <div className="flex space-x-1">
                                {Object.values(template.themeColors || {}).slice(0, 4).map((color, index) => (
                                    <div
                                        key={index}
                                        className="w-4 h-4 rounded-full border border-gray-300"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">
                                {template.sections?.length || 0} sections
                            </span>
                        </div>

                        <button
                            type="button"
                            className={`w-full py-2 rounded-lg font-medium ${selectedId === template._id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(template);
                            }}
                        >
                            {selectedId === template._id ? 'Selected' : 'Select Template'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TemplateSelector;