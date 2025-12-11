import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResumeTemplateSelector from '../components/ResumeTemplateSelector';
import ResumeTemplateList from '../components/ResumeTemplateList';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import {
    PiArrowLeft,
    PiDownload,
    PiQrCode,
    PiFloppyDisk,
    PiCaretRight,
    PiCheckCircle
} from 'react-icons/pi';

const API_BASE_URL = 'http://localhost:5000/api';

const Builder = () => {
    const navigate = useNavigate();
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            linkedin: '',
            github: ''
        },
        summary: '',
        education: [],
        experience: [],
        skills: [],
        projects: []
    });
    const [resumeId, setResumeId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Select template, 2: Fill form

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplateId(templateId);
        setStep(2);
    };

    const handleSaveResume = async () => {
        if (!selectedTemplateId) {
            alert('Please select a template first!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/resumes`,
                {
                    templateId: selectedTemplateId,
                    ...resumeData
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                setResumeId(response.data.resumeId);
                alert('Resume saved successfully! You can now generate a QR code.');
            }
        } catch (error) {
            console.error('Error saving resume:', error);
            alert('Failed to save resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateResume = async () => {
        if (!resumeId) {
            alert('Please save the resume first!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.put(
                `${API_BASE_URL}/resumes/${resumeId}`,
                {
                    templateId: selectedTemplateId,
                    ...resumeData
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                alert('Resume updated successfully!');
            }
        } catch (error) {
            console.error('Error updating resume:', error);
            alert('Failed to update resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateQR = () => {
        if (!resumeId) {
            alert('Please save the resume first to generate QR code!');
            return;
        }
        window.open(`${API_BASE_URL}/resumes/${resumeId}/qrcode`, '_blank');
    };

    const handleDownloadPDF = () => {
        // This would integrate with a PDF generation service
        alert('PDF download feature would be implemented here');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <PiArrowLeft />
                            Back to Home
                        </button>

                        <div className="flex items-center gap-4">
                            {/* Progress Steps */}
                            <div className="hidden md:flex items-center gap-2">
                                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
                                        }`}>
                                        {step > 1 ? <PiCheckCircle /> : '1'}
                                    </div>
                                    <span className="text-sm font-medium">Template</span>
                                </div>

                                <PiCaretRight className="text-gray-300" />

                                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
                                        }`}>
                                        {step > 2 ? <PiCheckCircle /> : '2'}
                                    </div>
                                    <span className="text-sm font-medium">Information</span>
                                </div>

                                <PiCaretRight className="text-gray-300" />

                                <div className={`flex items-center gap-2 ${resumeId ? 'text-primary' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${resumeId ? 'bg-primary text-white' : 'bg-gray-200'
                                        }`}>
                                        {resumeId ? <PiCheckCircle /> : '3'}
                                    </div>
                                    <span className="text-sm font-medium">Finish</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDownloadPDF}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={!resumeId}
                                >
                                    <PiDownload />
                                    PDF
                                </button>

                                <button
                                    onClick={handleGenerateQR}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    disabled={!resumeId}
                                >
                                    <PiQrCode />
                                    QR Code
                                </button>

                                {resumeId ? (
                                    <button
                                        onClick={handleUpdateResume}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                        disabled={loading}
                                    >
                                        <PiFloppyDisk />
                                        {loading ? 'Updating...' : 'Update'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSaveResume}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        disabled={loading}
                                    >
                                        <PiFloppyDisk />
                                        {loading ? 'Saving...' : 'Save Resume'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {step === 1 ? (
                    // Step 1: Template Selection
                    <div>
                        <div className="mb-8 text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                                Choose Your Resume Template
                            </h1>
                            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                                Select from our professionally designed templates. Each template includes
                                QR code integration and is fully customizable.
                            </p>
                        </div>

                        {/* You can use either ResumeTemplateSelector or ResumeTemplateList */}
                        <ResumeTemplateList
                            onTemplateSelect={handleTemplateSelect}
                            selectedTemplateId={selectedTemplateId}
                        />

                        {/* Alternative: Use ResumeTemplateSelector for a simpler view */}
                        {/* <ResumeTemplateSelector 
              onTemplateSelect={handleTemplateSelect}
              selectedTemplateId={selectedTemplateId}
            /> */}

                        {/* Next Step Button */}
                        {selectedTemplateId && (
                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setStep(2)}
                                    className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium inline-flex items-center gap-2"
                                >
                                    Continue to Information
                                    <PiCaretRight />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    // Step 2: Form and Preview
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Form */}
                        <div>
                            <div className="bg-white rounded-xl shadow-lg mb-6">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Fill Your Information</h2>
                                            <p className="text-gray-600">Complete all sections below</p>
                                        </div>
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-sm text-primary hover:text-blue-700 font-medium"
                                        >
                                            Change Template
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <ResumeForm
                                        resumeData={resumeData}
                                        onUpdate={setResumeData}
                                    />
                                </div>
                            </div>

                            {/* Save Button for Mobile */}
                            <div className="lg:hidden bg-white rounded-xl shadow-lg p-6">
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleSaveResume}
                                        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
                                        disabled={loading}
                                    >
                                        <PiFloppyDisk />
                                        {loading ? 'Saving...' : 'Save Resume'}
                                    </button>

                                    {resumeId && (
                                        <button
                                            onClick={handleGenerateQR}
                                            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
                                        >
                                            <PiQrCode />
                                            Generate QR Code
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Preview */}
                        <div className="lg:sticky lg:top-24">
                            <div className="bg-white rounded-xl shadow-lg">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">Live Preview</h2>
                                            <p className="text-sm text-gray-600">Updates in real-time</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {resumeId && (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                                    Saved
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <ResumePreview
                                        templateId={selectedTemplateId}
                                        resumeData={resumeData}
                                    />

                                    {/* QR Code Section */}
                                    {resumeId && (
                                        <div className="mt-8 pt-6 border-t border-gray-200">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-bold text-gray-800">Your QR Code</h3>
                                                <button
                                                    onClick={handleGenerateQR}
                                                    className="text-sm text-primary hover:text-blue-700 font-medium"
                                                >
                                                    Download
                                                </button>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-800">Resume is live!</p>
                                                        <p className="text-sm text-gray-600">
                                                            Scan the QR code to view your resume online
                                                        </p>
                                                    </div>
                                                    <div className="bg-white p-2 rounded-lg border">
                                                        <img
                                                            src={`${API_BASE_URL}/resumes/${resumeId}/qrcode`}
                                                            alt="Resume QR Code"
                                                            className="w-20 h-20"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                                    <p className="text-sm text-blue-700">
                                                        <strong>Share URL:</strong>{' '}
                                                        <span className="font-mono">{window.location.origin}/resume/{resumeId}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Success Toast */}
            {resumeId && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up">
                        <div className="flex items-center gap-3">
                            <PiCheckCircle className="w-5 h-5" />
                            <div>
                                <p className="font-medium">Resume saved successfully!</p>
                                <p className="text-sm opacity-90">QR code is now available</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Builder;