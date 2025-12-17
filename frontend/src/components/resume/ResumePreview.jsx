// client/src/components/ResumePreview.jsx
import React from 'react';
import { useTemplate } from '../hooks/useTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';

const ResumePreview = ({ data }) => {
    const { template } = useTemplate(data.templateId);

    const renderTemplate = () => {
        switch (template?.designType) {
            case 'classic':
                return <ClassicTemplate data={data} />;
            case 'modern':
                return <ModernTemplate data={data} />;
            case 'minimal':
                return <MinimalTemplate data={data} />;
            default:
                return <ModernTemplate data={data} />;
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">پیش‌نمایش رزومه</h2>
                <div className="flex gap-4">
                    <button
                        onClick={handleDownloadPDF}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        دانلود PDF
                    </button>
                    <button
                        onClick={handleGenerateQR}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        تولید QR Code
                    </button>
                    <button
                        onClick={handleShare}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        اشتراک‌گذاری
                    </button>
                </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
                {renderTemplate()}
            </div>
        </div>
    );
};