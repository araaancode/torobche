import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as yup from 'yup';

// Components
import TemplateSelector from './TemplateSelector';
import PersonalInfo from './sections/PersonalInfo';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import ContactInfo from './sections/ContactInfo';

// Services
import { createResume } from '../../services/resumeService';

// Validation Schema
const resumeSchema = yup.object().shape({
    templateId: yup.string().required('Please select a template'),
    personalInfo: yup.object().shape({
        fullName: yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
        jobTitle: yup.string().required('Job title is required'),
        summary: yup.string().max(500, 'Summary must be less than 500 characters'),
    }),
    contactInfo: yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        phone: yup.string(),
    }),
});

const ResumeBuilder = () => {
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(resumeSchema),
        defaultValues: {
            personalInfo: {
                fullName: '',
                jobTitle: '',
                summary: '',
                avatar: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                address: '',
                website: '',
            },
            education: [],
            workExperience: [],
            skills: [],
            socialLinks: {},
        }
    });

    const onSubmit = async (data) => {
        if (!selectedTemplate) {
            toast.error('Please select a template first');
            return;
        }

        setIsSubmitting(true);

        try {
            const resumeData = {
                ...data,
                templateId: selectedTemplate._id
            };

            const response = await createResume(resumeData);

            if (response.success) {
                toast.success('Resume created successfully!');
                navigate(`/r/${response.data.publicId}`);
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

    const steps = [
        { number: 1, title: 'Select Template' },
        { number: 2, title: 'Personal Information' },
        { number: 3, title: 'Contact Details' },
        { number: 4, title: 'Education' },
        { number: 5, title: 'Experience' },
        { number: 6, title: 'Skills' },
        { number: 7, title: 'Review & Save' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    {steps.map((s) => (
                        <div key={s.number} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= s.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {s.number}
                            </div>
                            <span className="text-sm hidden md:inline">{s.title}</span>
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Step 1: Template Selection */}
                {step === 1 && (
                    <div className="card">
                        <h2 className="section-title">Select a Template</h2>
                        <TemplateSelector onSelectTemplate={setSelectedTemplate} />
                        {selectedTemplate && (
                            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-800">
                                    <strong>Selected:</strong> {selectedTemplate.templateName}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 2: Personal Information */}
                {step === 2 && (
                    <div className="card">
                        <h2 className="section-title">Personal Information</h2>
                        <PersonalInfo register={register} errors={errors} control={control} />
                    </div>
                )}

                {/* Step 3: Contact Information */}
                {step === 3 && (
                    <div className="card">
                        <h2 className="section-title">Contact Information</h2>
                        <ContactInfo register={register} errors={errors} />
                    </div>
                )}

                {/* Step 4: Education */}
                {step === 4 && (
                    <div className="card">
                        <h2 className="section-title">Education</h2>
                        <Education control={control} watch={watch} setValue={setValue} />
                    </div>
                )}

                {/* Step 5: Experience */}
                {step === 5 && (
                    <div className="card">
                        <h2 className="section-title">Work Experience</h2>
                        <Experience control={control} watch={watch} setValue={setValue} />
                    </div>
                )}

                {/* Step 6: Skills */}
                {step === 6 && (
                    <div className="card">
                        <h2 className="section-title">Skills</h2>
                        <Skills control={control} watch={watch} setValue={setValue} />
                    </div>
                )}

                {/* Step 7: Review */}
                {step === 7 && (
                    <div className="card">
                        <h2 className="section-title">Review Your Resume</h2>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-bold text-lg mb-2">Preview</h3>
                                <p className="text-gray-600">
                                    Your resume is ready! Click "Create Resume" to generate your QR code and shareable link.
                                </p>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-yellow-800">
                                    <strong>Note:</strong> Once created, you'll receive a QR code and a unique link to share your resume.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => setStep(prev => Math.max(1, prev - 1))}
                        disabled={step === 1}
                        className={`btn ${step === 1 ? 'btn-secondary opacity-50' : 'btn-secondary'}`}
                    >
                        Previous
                    </button>

                    {step < steps.length ? (
                        <button
                            type="button"
                            onClick={() => setStep(prev => Math.min(steps.length, prev + 1))}
                            className="btn btn-primary"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting || !selectedTemplate}
                            className="btn btn-success"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Resume'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ResumeBuilder;