// client/src/components/ResumePreviewModal.jsx
import React from 'react';
import { XMarkIcon, ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/24/outline';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';

const ResumePreviewModal = ({ data, template, onClose }) => {
    const renderTemplate = () => {
        const templateType = template?.designType || 'modern';

        switch (templateType) {
            case 'classic':
                return <ClassicTemplate data={data} templateId={template} />;
            case 'minimal':
                return <MinimalTemplate data={data} templateId={template} />;
            case 'modern':
            default:
                return <ModernTemplate data={data} templateId={template} />;
        }
    };

    const handlePrint = () => {
        const printContent = document.getElementById('modal-resume-preview');
        if (printContent) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
        <html>
          <head>
            <title>Resume Preview</title>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
              @media print {
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    const handleDownloadImage = async () => {
        try {
            // This is a simplified version. In production, use html2canvas
            alert('In a real application, this would download the resume as an image using html2canvas');
        } catch (error) {
            console.error('Failed to download image:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
                        <p className="text-gray-600">Template: {template?.name || 'Modern'}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleDownloadImage}
                            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                            title="Download as Image"
                        >
                            <ArrowDownTrayIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Download</span>
                        </button>

                        <button
                            onClick={handlePrint}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                            title="Print"
                        >
                            <PrinterIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Print</span>
                        </button>

                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-700"
                            title="Close"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Preview Content */}
                <div className="flex-1 overflow-auto p-4">
                    <div
                        id="modal-resume-preview"
                        className="bg-white rounded-lg shadow-lg mx-auto max-w-4xl"
                    >
                        {renderTemplate()}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            <p>This is a preview of how your resume will look. Make sure all information is correct.</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Continue Editing
                            </button>

                            <button
                                onClick={() => {
                                    alert('In a real application, this would save the resume');
                                    onClose();
                                }}
                                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                            >
                                Save and Continue
                            </button>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">💡 Preview Tips:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Check for spelling and grammar errors</li>
                            <li>• Ensure contact information is correct</li>
                            <li>• Verify dates and job titles are accurate</li>
                            <li>• Make sure the layout looks good on both desktop and mobile</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePreviewModal;