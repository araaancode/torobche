import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaEye, FaDownload, FaShareAlt, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import QRCodeDisplay from '../components/common/QRCodeDisplay';
import { getResumeSummary } from '../services/resumeService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PublicSummaryPage = () => {
    const { publicId } = useParams();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchResumeSummary();
    }, [publicId]);

    const fetchResumeSummary = async () => {
        try {
            setLoading(true);
            const response = await getResumeSummary(publicId);

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

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Resume Summary */}
                <div className="lg:col-span-2">
                    <div className="card">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6 mb-8">
                            {resume.personalInfo.avatar && (
                                <img
                                    src={resume.personalInfo.avatar}
                                    alt={resume.personalInfo.fullName}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            )}

                            <div className="flex-grow">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    {resume.personalInfo.fullName}
                                </h1>
                                <p className="text-2xl text-blue-600 font-semibold mb-4">
                                    {resume.personalInfo.jobTitle}
                                </p>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <FaEye />
                                        <span>{resume.viewCount || 0} views</span>
                                    </div>
                                    {resume.template && (
                                        <div className="flex items-center space-x-2">
                                            <span className="px-2 py-1 bg-gray-100 rounded">
                                                {resume.template.templateName} Template
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Summary Section */}
                        {resume.personalInfo.summary && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {resume.personalInfo.summary}
                                </p>
                            </div>
                        )}

                        {/* Skills Preview */}
                        {resume.skills && resume.skills.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Key Skills</h2>
                                <div className="flex flex-wrap gap-3">
                                    {resume.skills.slice(0, 10).map((skill, index) => (
                                        <div
                                            key={index}
                                            className="badge badge-primary text-sm py-2 px-4"
                                        >
                                            {skill.name}
                                            {skill.level && (
                                                <span className="ml-2 text-xs">
                                                    {Array(skill.level).fill('★').join('')}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Info */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {resume.contactInfo?.email && (
                                    <div className="flex items-center space-x-3">
                                        <FaEnvelope className="text-blue-600" />
                                        <span>{resume.contactInfo.email}</span>
                                    </div>
                                )}
                                {resume.contactInfo?.phone && (
                                    <div className="flex items-center space-x-3">
                                        <FaPhone className="text-blue-600" />
                                        <span>{resume.contactInfo.phone}</span>
                                    </div>
                                )}
                                {resume.contactInfo?.address && (
                                    <div className="flex items-center space-x-3">
                                        <FaMapMarkerAlt className="text-blue-600" />
                                        <span>{resume.contactInfo.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to={`/r/${publicId}/full`}
                                className="btn btn-primary flex items-center justify-center space-x-2 flex-grow"
                            >
                                <FaEye />
                                <span>View Full Resume</span>
                            </Link>

                            <button className="btn btn-secondary flex items-center justify-center space-x-2">
                                <FaDownload />
                                <span>Download PDF</span>
                            </button>

                            <button className="btn btn-secondary flex items-center justify-center space-x-2">
                                <FaShareAlt />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - QR Code and Actions */}
                <div>
                    <QRCodeDisplay
                        publicId={publicId}
                        qrCodeUrl={resume.qrCodeUrl}
                        resumeName={resume.personalInfo.fullName}
                    />

                    {/* Share Tips */}
                    <div className="card mt-6">
                        <h3 className="font-bold text-lg mb-4">Sharing Tips</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start space-x-2">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">
                                    1
                                </div>
                                <span>Print the QR code on your business card</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">
                                    2
                                </div>
                                <span>Add it to your email signature</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">
                                    3
                                </div>
                                <span>Share the link on social media profiles</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mt-0.5">
                                    4
                                </div>
                                <span>Include it in your LinkedIn profile</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicSummaryPage;