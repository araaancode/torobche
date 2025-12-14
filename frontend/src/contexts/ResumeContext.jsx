// client/src/contexts/ResumeContext.jsx
import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

// Create context
const ResumeContext = createContext(undefined);

// Custom hook to use the resume context
export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};

// Resume provider component
export const ResumeProvider = ({ children }) => {
    // Initial state
    const [currentResume, setCurrentResume] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [resumeData, setResumeData] = useState({
        templateId: '',
        personalInfo: {
            fullName: '',
            jobTitle: '',
            summary: '',
            avatar: '',
            profession: '',
            dateOfBirth: '',
            nationality: '',
        },
        contactInfo: {
            email: '',
            phone: '',
            address: '',
            city: '',
            country: '',
            website: '',
            postalCode: '',
        },
        education: [],
        workExperience: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        socialLinks: {
            linkedin: '',
            github: '',
            twitter: '',
            stackoverflow: '',
            behance: '',
            dribbble: '',
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [savedResumes, setSavedResumes] = useState([]);

    // Load saved resumes from localStorage on mount
    React.useEffect(() => {
        const loadSavedResumes = () => {
            try {
                const saved = localStorage.getItem('smartResume_savedResumes');
                if (saved) {
                    setSavedResumes(JSON.parse(saved));
                }
            } catch (err) {
                console.error('Failed to load saved resumes:', err);
            }
        };
        loadSavedResumes();
    }, []);

    // Save resumes to localStorage whenever they change
    React.useEffect(() => {
        if (savedResumes.length > 0) {
            try {
                localStorage.setItem('smartResume_savedResumes', JSON.stringify(savedResumes));
            } catch (err) {
                console.error('Failed to save resumes:', err);
            }
        }
    }, [savedResumes]);

    // Update resume data
    const updateResumeData = useCallback((section, data) => {
        setResumeData(prev => ({
            ...prev,
            [section]: data
        }));
    }, []);

    // Update specific field in resume data
    const updateField = useCallback((section, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    }, []);

    // Add item to array field
    const addArrayItem = useCallback((section, item) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], item]
        }));
    }, []);

    // Update item in array field
    const updateArrayItem = useCallback((section, index, updatedItem) => {
        setResumeData(prev => {
            const updatedArray = [...prev[section]];
            updatedArray[index] = { ...updatedArray[index], ...updatedItem };
            return {
                ...prev,
                [section]: updatedArray
            };
        });
    }, []);

    // Remove item from array field
    const removeArrayItem = useCallback((section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    }, []);

    // Save current resume
    const saveResume = useCallback(() => {
        if (!resumeData.personalInfo.fullName) {
            toast.error('Please provide your name before saving');
            return false;
        }

        const newResume = {
            id: Date.now().toString(),
            ...resumeData,
            templateId: selectedTemplate?._id || resumeData.templateId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setSavedResumes(prev => {
            const updated = [newResume, ...prev.filter(r => r.id !== newResume.id)];
            return updated.slice(0, 10); // Keep only last 10 resumes
        });

        toast.success('Resume saved successfully!');
        return true;
    }, [resumeData, selectedTemplate]);

    // Load resume by ID
    const loadResume = useCallback((resumeId) => {
        const resume = savedResumes.find(r => r.id === resumeId);
        if (resume) {
            setResumeData(resume);
            setCurrentResume(resume);
            toast.success('Resume loaded successfully!');
            return resume;
        }
        toast.error('Resume not found');
        return null;
    }, [savedResumes]);

    // Delete resume by ID
    const deleteResume = useCallback((resumeId) => {
        setSavedResumes(prev => prev.filter(r => r.id !== resumeId));
        if (currentResume?.id === resumeId) {
            setCurrentResume(null);
        }
        toast.success('Resume deleted successfully!');
    }, [currentResume]);

    // Clear all resume data
    const clearResumeData = useCallback(() => {
        setResumeData({
            templateId: '',
            personalInfo: {
                fullName: '',
                jobTitle: '',
                summary: '',
                avatar: '',
                profession: '',
                dateOfBirth: '',
                nationality: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                address: '',
                city: '',
                country: '',
                website: '',
                postalCode: '',
            },
            education: [],
            workExperience: [],
            skills: [],
            projects: [],
            certifications: [],
            languages: [],
            socialLinks: {
                linkedin: '',
                github: '',
                twitter: '',
                stackoverflow: '',
                behance: '',
                dribbble: '',
            },
        });
        setSelectedTemplate(null);
        setCurrentResume(null);
        setError(null);
        toast.success('Resume data cleared!');
    }, []);

    // Set template
    const setTemplate = useCallback((template) => {
        setSelectedTemplate(template);
        setResumeData(prev => ({
            ...prev,
            templateId: template?._id || ''
        }));
    }, []);

    // Check if resume has required fields
    const hasRequiredFields = useCallback(() => {
        return !!(
            resumeData.personalInfo.fullName &&
            resumeData.personalInfo.jobTitle &&
            resumeData.contactInfo.email &&
            resumeData.templateId
        );
    }, [resumeData]);

    // Get resume statistics
    const getResumeStats = useCallback(() => {
        return {
            sectionsFilled: Object.keys(resumeData).filter(key => {
                const value = resumeData[key];
                if (Array.isArray(value)) return value.length > 0;
                if (typeof value === 'object') return Object.values(value).some(v => v && v.toString().trim());
                return value && value.toString().trim();
            }).length,
            totalSections: Object.keys(resumeData).length,
            hasProfile: !!resumeData.personalInfo.fullName,
            hasContact: !!resumeData.contactInfo.email,
            hasEducation: resumeData.education.length > 0,
            hasExperience: resumeData.workExperience.length > 0,
            hasSkills: resumeData.skills.length > 0,
        };
    }, [resumeData]);

    // Memoized context value
    const contextValue = useMemo(() => ({
        // State
        currentResume,
        selectedTemplate,
        resumeData,
        isLoading,
        error,
        savedResumes,

        // Setters
        setCurrentResume,
        setSelectedTemplate: setTemplate,
        setIsLoading,
        setError,

        // Actions
        updateResumeData,
        updateField,
        addArrayItem,
        updateArrayItem,
        removeArrayItem,
        saveResume,
        loadResume,
        deleteResume,
        clearResumeData,

        // Computed values
        hasRequiredFields: hasRequiredFields(),
        resumeStats: getResumeStats(),

        // Validation
        isValid: hasRequiredFields(),
    }), [
        currentResume,
        selectedTemplate,
        resumeData,
        isLoading,
        error,
        savedResumes,
        setTemplate,
        updateResumeData,
        updateField,
        addArrayItem,
        updateArrayItem,
        removeArrayItem,
        saveResume,
        loadResume,
        deleteResume,
        clearResumeData,
        hasRequiredFields,
        getResumeStats,
    ]);

    return (
        <ResumeContext.Provider value={contextValue}>
            {children}
        </ResumeContext.Provider>
    );
};

// Export default provider
export default ResumeProvider;