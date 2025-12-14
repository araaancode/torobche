import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaPrint, FaShareAlt } from 'react-icons/fa';
import { getFullResume } from '../services/resumeService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ModernTemplate from '../components/resume/preview/templates/ModernTemplate';
import ClassicTemplate from '../components/resume/preview/templates/ClassicTemplate';
import CreativeTemplate from '../components/resume/preview/templates/CreativeTemplate';

const PublicFullPage = () => {
    const { publicId } = useParams();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFullResume();
    }, [publicId]);

    const fetchFullResume = async () => {
        try {
            setLoading(true);
            const response = await getFullResume(publicId);

            if (response.success) {
                setResume(response.data);
            } else {
                setError(response.error || 'Failed to load resume');
            }
        } catch (error) {
            setError('An error occurred while loading the resume');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        // Implement PDF download functionality
        console.log('Download PDF');
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !resume) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume Not Found</h2>
                <p className="text-gray-600 mb-8">The resume you're looking for doesn't exist or has been removed.</p>
                <Link to="/" className="btn btn-primary">
                    Go to Homepage
                </Link>
            </div>
        );
    }

    // Select template component based on template name
    const renderTemplate = () => {
        if (!resume.templateId) return <ModernTemplate resume={resume} />;

        const templateName = resume.templateId.templateName?.toLowerCase() || '';

        if (templateName.includes('classic')) {
            return <ClassicTemplate resume={resume} />;
        } else if (templateName.includes('creative')) {
            return <CreativeTemplate resume={resume} />;
        } else {
            return <ModernTemplate resume={resume} />;
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Action Bar */}
            <div className="mb-6 bg-white rounded-lg shadow p-4 flex flex-wrap justify-between items-center">
                <Link
                    to={`/r/${publicId}`}
                    className="btn btn-secondary flex items-center space-x-2"
                >
                    <FaArrowLeft />
                    <span>Back to Summary</span>
                </Link>

                <div className="flex space-x-3 mt-2 md:mt-0">
                    <button
                        onClick={handlePrint}
                        className="btn btn-secondary flex items-center space-x-2"
                    >
                        <FaPrint />
                        <span>Print</span>
                    </button>

                    <button
                        onClick={handleDownload}
                        className="btn btn-primary flex items-center space-x-2"
                    >
                        <FaDownload />
                        <span>Download PDF</span>
                    </button>

                    <button
                        onClick={() => navigator.share?.({ url: window.location.href })}
                        className="btn btn-secondary flex items-center space-x-2"
                        disabled={!navigator.share}
                    >
                        <FaShareAlt />
                        <span>Share</span>
                    </button>
                </div>
            </div>

            {/* Resume Template */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none">
                {renderTemplate()}
            </div>

            {/* Print Notice */}
            <div className="print:hidden mt-8 text-center text-sm text-gray-500">
                <p>Tip: Use the Print button above for best printing results. The resume is optimized for A4 paper.</p>
            </div>
        </div>
    );
};

export default PublicFullPage;