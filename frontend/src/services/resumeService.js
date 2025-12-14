// client/src/services/resumeService.js
import { get, post, put, del } from './resumeApi';

// Templates
export const getAllTemplates = async () => {
    try {
        const response = await get('/resume-templates');
        return response;
    } catch (error) {
        console.error('Error fetching templates:', error);
        return {
            success: false,
            error: error.message || 'Failed to fetch templates',
            data: null,
        };
    }
};

export const getTemplate = async (id) => {
    try {
        const response = await get(`/resume-templates/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching template:', error);
        return {
            success: false,
            error: error.message || 'Failed to fetch template',
            data: null,
        };
    }
};

// Resumes
export const createResume = async (resumeData) => {
    try {
        const response = await post('/resumes', resumeData);
        return response;
    } catch (error) {
        console.error('Error creating resume:', error);
        return {
            success: false,
            error: error.message || 'Failed to create resume',
            data: null,
        };
    }
};

export const getResumeSummary = async (publicId) => {
    try {
        const response = await get(`/r/${publicId}`);
        return response;
    } catch (error) {
        console.error('Error fetching resume summary:', error);
        return {
            success: false,
            error: error.message || 'Failed to fetch resume',
            data: null,
        };
    }
};

export const getFullResume = async (publicId) => {
    try {
        const response = await get(`/r/${publicId}/full`);
        return response;
    } catch (error) {
        console.error('Error fetching full resume:', error);
        return {
            success: false,
            error: error.message || 'Failed to fetch resume',
            data: null,
        };
    }
};

export const getResume = async (id) => {
    try {
        const response = await get(`/resumes/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching resume:', error);
        return {
            success: false,
            error: error.message || 'Failed to fetch resume',
            data: null,
        };
    }
};

export const updateResume = async (id, updateData) => {
    try {
        const response = await put(`/resumes/${id}`, updateData);
        return response;
    } catch (error) {
        console.error('Error updating resume:', error);
        return {
            success: false,
            error: error.message || 'Failed to update resume',
            data: null,
        };
    }
};

export const deleteResume = async (id) => {
    try {
        const response = await del(`/resumes/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting resume:', error);
        return {
            success: false,
            error: error.message || 'Failed to delete resume',
            data: null,
        };
    }
};

export const getResumeQRCode = async (resumeId) => {
    try {
        const response = await get(`/resumes/${resumeId}/qr`);
        return response;
    } catch (error) {
        console.error('Error fetching QR code:', error);
        return {
            success: false,
            error: error.message || 'Failed to fetch QR code',
            data: null,
        };
    }
};

// Analytics (optional)
export const trackResumeView = async (publicId) => {
    try {
        const response = await post(`/resumes/${publicId}/view`);
        return response;
    } catch (error) {
        console.error('Error tracking view:', error);
        return {
            success: false,
            error: error.message || 'Failed to track view',
            data: null,
        };
    }
};

// Export all functions as an object
const resumeService = {
    getAllTemplates,
    getTemplate,
    createResume,
    getResumeSummary,
    getFullResume,
    getResume,
    updateResume,
    deleteResume,
    getResumeQRCode,
    trackResumeView,
};

export default resumeService;