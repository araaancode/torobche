import axios from 'axios';

// Set base URL for API requests
// Use environment variable or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Or if using Create React App:
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
    withCredentials: false // Set to true if using cookies/sessions
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => {
        // You can modify response data here if needed
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with error status
            switch (error.response.status) {
                case 401:
                    // Unauthorized - redirect to login
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 403:
                    // Forbidden
                    console.error('دسترسی غیرمجاز');
                    break;
                case 404:
                    // Not found
                    console.error('منبع مورد نظر یافت نشد');
                    break;
                case 500:
                    // Server error
                    console.error('خطای سرور');
                    break;
                default:
                    console.error('خطای ناشناخته');
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('ارتباط با سرور برقرار نشد');
        } else {
            // Something else happened
            console.error('خطای ناشناخته در درخواست');
        }

        return Promise.reject(error);
    }
);

// ==================== MENU API ====================
export const menuApi = {
    getAll: () => api.get('/menus'),
    getById: (id) => api.get(`/menus/${id}`),
    create: (data) => api.post('/menus', data),
    update: (id, data) => api.put(`/menus/${id}`, data),
    delete: (id) => api.delete(`/menus/${id}`),
    getFoods: (menuId) => api.get(`/menus/${menuId}/foods`),
    addFood: (menuId, foodData) => api.post(`/menus/${menuId}/foods`, foodData),
    updateFood: (menuId, foodId, foodData) => api.put(`/menus/${menuId}/foods/${foodId}`, foodData),
    deleteFood: (menuId, foodId) => api.delete(`/menus/${menuId}/foods/${foodId}`),
    toggleStatus: (id, status) => api.patch(`/menus/${id}/status`, { status }),
    getByBusiness: (businessId) => api.get(`/menus/business/${businessId}`),
    generateQR: (menuId) => api.get(`/menus/${menuId}/qr`),
    uploadImage: (menuId, formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return api.post(`/menus/${menuId}/image`, formData, config);
    }
};

// ==================== VISIT CARD API ====================
export const visitCardApi = {
    getAll: () => api.get('/visit-cards'),
    getById: (id) => api.get(`/visit-cards/${id}`),
    create: (data) => api.post('/visit-cards', data),
    createFromTemplate: (templateId, data) => api.post(`/visit-cards/template/${templateId}`, data),
    update: (id, data) => api.put(`/visit-cards/${id}`, data),
    delete: (id) => api.delete(`/visit-cards/${id}`),
    getByTemplate: (templateId) => api.get(`/visit-cards/template/${templateId}`),
    getByUser: (userId) => api.get(`/visit-cards/user/${userId}`),
    toggleStatus: (id, isActive) => api.patch(`/visit-cards/${id}/toggle`, { isActive }),
    incrementView: (id) => api.patch(`/visit-cards/${id}/view`),
    uploadImage: (id, formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return api.post(`/visit-cards/${id}/image`, formData, config);
    },
    generateQR: (id) => api.get(`/visit-cards/${id}/qr`),
    downloadPDF: (id) => api.get(`/visit-cards/${id}/pdf`, {
        responseType: 'blob'
    }),
    share: (id, data) => api.post(`/visit-cards/${id}/share`, data)
};

// ==================== VISIT TEMPLATE API ====================
export const templateApi = {
    getAll: () => api.get('/templates'),
    getById: (id) => api.get(`/templates/${id}`),
    create: (data) => api.post('/templates', data),
    update: (id, data) => api.put(`/templates/${id}`, data),
    delete: (id) => api.delete(`/templates/${id}`),
    getByCategory: (category) => api.get(`/templates/category/${category}`),

    // Visit template specific endpoints
    getAllVisitTemplates: () => api.get('/visit-templates'),
    getVisitTemplateById: (id) => api.get(`/visit-templates/${id}`),
    createVisitTemplate: (data) => api.post('/visit-templates', data),
    updateVisitTemplate: (id, data) => api.put(`/visit-templates/${id}`, data),
    deleteVisitTemplate: (id) => api.delete(`/visit-templates/${id}`),
    getVisitTemplatesBySpecialty: (specialty) => api.get(`/visit-templates/specialty/${specialty}`)
};

// ==================== FOOD API ====================
export const foodApi = {
    getAll: () => api.get('/foods'),
    getById: (id) => api.get(`/foods/${id}`),
    create: (data) => api.post('/foods', data),
    update: (id, data) => api.put(`/foods/${id}`, data),
    delete: (id) => api.delete(`/foods/${id}`),
    getByCategory: (category) => api.get(`/foods/category/${category}`),
    uploadImage: (id, formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return api.post(`/foods/${id}/image`, formData, config);
    },
    toggleAvailability: (id, isAvailable) => api.patch(`/foods/${id}/availability`, { isAvailable })
};

// ==================== AUTH API ====================
export const authApi = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    refreshToken: () => api.post('/auth/refresh'),
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
    verifyEmail: (token) => api.post('/auth/verify-email', { token })
};

// ==================== USER API ====================
export const userApi = {
    getCurrent: () => api.get('/users/me'),
    getById: (id) => api.get(`/users/${id}`),
    getAll: () => api.get('/users'),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
    getUserMenus: (userId) => api.get(`/users/${userId}/menus`),
    getUserVisitCards: (userId) => api.get(`/users/${userId}/visit-cards`),
    uploadAvatar: (id, formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return api.post(`/users/${id}/avatar`, formData, config);
    }
};

// ==================== CATEGORY API ====================
export const categoryApi = {
    getAll: () => api.get('/categories'),
    getById: (id) => api.get(`/categories/${id}`),
    create: (data) => api.post('/categories', data),
    update: (id, data) => api.put(`/categories/${id}`, data),
    delete: (id) => api.delete(`/categories/${id}`),
    getByMenu: (menuId) => api.get(`/categories/menu/${menuId}`)
};

// ==================== UPLOAD API ====================
export const uploadApi = {
    uploadFile: (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return api.post('/upload', formData, config);
    },
    uploadFiles: (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return api.post('/upload/multiple', formData, config);
    },
    deleteFile: (filename) => api.delete(`/upload/${filename}`)
};

// ==================== STATISTICS API ====================
export const statsApi = {
    getDashboardStats: () => api.get('/stats/dashboard'),
    getMenuStats: (menuId) => api.get(`/stats/menu/${menuId}`),
    getVisitCardStats: (cardId) => api.get(`/stats/visit-card/${cardId}`),
    getUserStats: (userId) => api.get(`/stats/user/${userId}`),
    getMonthlyStats: (year, month) => api.get(`/stats/monthly/${year}/${month}`)
};

// ==================== HELPER FUNCTIONS ====================
export const apiHelpers = {
    handleResponse: async (apiCall, successMessage, errorMessage) => {
        try {
            const response = await apiCall();
            return { success: true, data: response.data };
        } catch (error) {
            const errorMsg = error.response?.data?.message || errorMessage || 'خطا در ارتباط با سرور';
            console.error(errorMsg, error);
            return {
                success: false,
                error: errorMsg,
                status: error.response?.status
            };
        }
    },

    uploadWithProgress: (url, formData, onProgress) => {
        return axios.post(`${API_BASE_URL}${url}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token') || ''}`
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    if (onProgress) onProgress(percentCompleted);
                }
            }
        });
    },

    downloadFile: async (url, filename) => {
        try {
            const response = await api.get(url, {
                responseType: 'blob'
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);

            return { success: true };
        } catch (error) {
            console.error('خطا در دانلود فایل', error);
            return { success: false, error: 'خطا در دانلود فایل' };
        }
    }
};

// Export default api instance for custom requests
export default api;