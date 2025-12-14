import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Import the useResume hook
import { useResume } from '../../contexts/ResumeContext';

// Import components
import TemplateSelector from './ResumeTemplateSelector';
import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import Education from './ResumeEducation';
import Experience from './ResumeExperience';
import Skills from './ResumeSkills';
import ResumePreview from './ResumePreview';

// Import services
import resumeService from '../../services/resumeService';

const ResumeBuilderPage = () => {
    const navigate = useNavigate();

    // Use the resume context
    const {
        selectedTemplate,
        setSelectedTemplate,
        resumeData,
        updateResumeData,
        clearResumeData,
        hasRequiredFields,
        resumeStats
    } = useResume();

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // Steps configuration
    const steps = [
        { number: 1, title: 'Template', description: 'Choose a design' },
        { number: 2, title: 'Personal Info', description: 'Tell us about yourself' },
        { number: 3, title: 'Contact', description: 'How to reach you' },
        { number: 4, title: 'Education', description: 'Your academic background' },
        { number: 5, title: 'Experience', description: 'Work history' },
        { number: 6, title: 'Skills', description: 'Your expertise' },
        { number: 7, title: 'Review', description: 'Final check' },
    ];

    // Handle template selection
    const handleSelectTemplate = (template) => {
        setSelectedTemplate(template);
        toast.success(`Selected: ${template.templateName}`);
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!hasRequiredFields) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (!selectedTemplate) {
            toast.error('Please select a template first');
            setStep(1);
            return;
        }

        setIsSubmitting(true);

        try {
            const resumeToSubmit = {
                ...resumeData,
                templateId: selectedTemplate._id,
            };

            const response = await resumeService.createResume(resumeToSubmit);

            if (response.success) {
                toast.success('Resume created successfully! 🎉');

                // Clear form after successful submission
                clearResumeData();

                // Navigate to preview page
                navigate(`/preview/${response.data.publicId}`);
            } else {
                toast.error(response.error || 'Failed to create resume');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error('Error creating resume:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render current step
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="card">
                        <h2 className="section-title">Select a Template</h2>
                        <TemplateSelector
                            onSelectTemplate={handleSelectTemplate}
                            selectedTemplate={selectedTemplate}
                        />
                    </div>
                );

            case 2:
                return (
                    <div className="card">
                        <h2 className="section-title">Personal Information</h2>
                        <PersonalInfo
                            data={resumeData.personalInfo}
                            onChange={(data) => updateResumeData('personalInfo', data)}
                        />
                    </div>
                );

            case 3:
                return (
                    <div className="card">
                        <h2 className="section-title">Contact Information</h2>
                        <ContactInfo
                            data={resumeData.contactInfo}
                            onChange={(data) => updateResumeData('contactInfo', data)}
                        />
                    </div>
                );

            case 4:
                return (
                    <div className="card">
                        <h2 className="section-title">Education</h2>
                        <Education
                            data={resumeData.education}
                            onChange={(data) => updateResumeData('education', data)}
                        />
                    </div>
                );

            case 5:
                return (
                    <div className="card">
                        <h2 className="section-title">Work Experience</h2>
                        <Experience
                            data={resumeData.workExperience}
                            onChange={(data) => updateResumeData('workExperience', data)}
                        />
                    </div>
                );

            case 6:
                return (
                    <div className="card">
                        <h2 className="section-title">Skills</h2>
                        <Skills
                            data={resumeData.skills}
                            onChange={(data) => updateResumeData('skills', data)}
                        />
                    </div>
                );

            case 7:
                return (
                    <div className="card">
                        <h2 className="section-title">Review Your Resume</h2>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-bold mb-2">Resume Statistics</h3>
                                <ul className="space-y-1">
                                    <li>✓ Personal Info: {resumeStats.hasProfile ? 'Complete' : 'Incomplete'}</li>
                                    <li>✓ Contact Info: {resumeStats.hasContact ? 'Complete' : 'Incomplete'}</li>
                                    <li>✓ Education: {resumeStats.hasEducation ? `(${resumeData.education.length} entries)` : 'Not added'}</li>
                                    <li>✓ Experience: {resumeStats.hasExperience ? `(${resumeData.workExperience.length} entries)` : 'Not added'}</li>
                                    <li>✓ Skills: {resumeStats.hasSkills ? `(${resumeData.skills.length} entries)` : 'Not added'}</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-blue-800">
                                    <strong>Ready to create?</strong> Your resume will be generated with a unique QR code for easy sharing.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Progress bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    {steps.map((s, index) => (
                        <div
                            key={s.number}
                            className={`text-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                        >
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${step >= s.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {s.number}
                            </div>
                            <div className="text-sm hidden md:block">
                                <div className="font-medium">{s.title}</div>
                                <div className="text-gray-500 text-xs">{s.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                    <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${(step / steps.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Content */}
            {renderStepContent()}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={() => setStep(prev => Math.max(1, prev - 1))}
                    disabled={step === 1}
                    className={`btn ${step === 1 ? 'btn-secondary opacity-50' : 'btn-secondary'}`}
                >
                    Previous
                </button>

                {step < steps.length ? (
                    <button
                        onClick={() => setStep(prev => prev + 1)}
                        className="btn btn-primary"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !hasRequiredFields}
                        className={`btn btn-success ${(!hasRequiredFields || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Resume'}
                    </button>
                )}
            </div>

            {/* Preview toggle */}
            <div className="mt-8">
                <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="btn btn-secondary w-full"
                >
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>

                {showPreview && selectedTemplate && (
                    <div className="mt-6 card">
                        <h3 className="font-bold mb-4">Resume Preview</h3>
                        <div className="border rounded-lg p-4">
                            <ResumePreview
                                resume={{
                                    ...resumeData,
                                    templateId: selectedTemplate,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeBuilderPage;