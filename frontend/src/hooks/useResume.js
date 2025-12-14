import { useState, useEffect } from 'react';
import { getAllTemplates, createResume } from '../services/resumeService';

export const useTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const refreshTemplates = () => {
        fetchTemplates();
    };

    return {
        templates,
        loading,
        error,
        refreshTemplates,
    };
};

export const useResumeBuilder = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [createdResume, setCreatedResume] = useState(null);
    const [error, setError] = useState(null);

    const buildResume = async (resumeData) => {
        try {
            setIsCreating(true);
            setError(null);
            const response = await createResume(resumeData);

            if (response.success) {
                setCreatedResume(response.data);
                return response.data;
            } else {
                throw new Error(response.error || 'Failed to create resume');
            }
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsCreating(false);
        }
    };

    const resetBuilder = () => {
        setCreatedResume(null);
        setError(null);
    };

    return {
        buildResume,
        isCreating,
        createdResume,
        error,
        resetBuilder,
    };
};