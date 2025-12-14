// client/src/services/resumeApi.js
import axios from 'axios';

// Configuration - Use window._env_ or default
const API_URL = window._env_?.API_URL || 'http://localhost:5000/api';

console.log('API URL configured:', API_URL);

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
                data: config.data,
                params: config.params,
            });
        }

        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`API Response: ${response.status} ${response.config.url}`, response.data);
        }

        // Return data in consistent format
        return {
            success: true,
            status: response.status,
            data: response.data,
        };
    },
    (error) => {
        // Enhanced error handling
        const errorResponse = {
            success: false,
            message: 'An error occurred',
            status: null,
            data: null,
        };

        if (error.response) {
            // Server responded with error
            errorResponse.status = error.response.status;
            errorResponse.data = error.response.data;

            switch (error.response.status) {
                case 400:
                    errorResponse.message = error.response.data?.error || 'Bad request';
                    break;
                case 401:
                    errorResponse.message = 'Unauthorized access';
                    // Clear token and redirect to login if needed
                    localStorage.removeItem('auth_token');
                    break;
                case 403:
                    errorResponse.message = 'Forbidden access';
                    break;
                case 404:
                    errorResponse.message = error.response.data?.error || 'Resource not found';
                    break;
                case 500:
                    errorResponse.message = 'Server error. Please try again later.';
                    break;
                default:
                    errorResponse.message = error.response.data?.error || `Error ${error.response.status}`;
            }
        } else if (error.request) {
            // No response received
            errorResponse.message = 'Network error. Please check your connection.';
        } else {
            // Request setup error
            errorResponse.message = error.message || 'Request failed';
        }

        console.error('API Error:', errorResponse);

        return Promise.reject(errorResponse);
    }
);

// Export API methods
export const get = (url, params = {}) => api.get(url, { params });
export const post = (url, data = {}) => api.post(url, data);
export const put = (url, data = {}) => api.put(url, data);
export const patch = (url, data = {}) => api.patch(url, data);
export const del = (url) => api.delete(url);

// File upload helper
export const upload = (url, file, onProgress = null) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress ? (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
        } : undefined,
    });
};

// Export axios instance
export default api;