// services/api.js
import axios from 'axios';

// ایجاد نمونه axios با تنظیمات پایه
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor برای اضافه کردن توکن به هدرها
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor برای مدیریت خطاها
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            // توکن منقضی شده، کاربر را به صفحه لاگین هدایت کن
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || error.message);
    }
);

// سرویس‌های Business Cards
export const businessCardService = {
    // دریافت همه کارت‌ها
    getBusinessCards: (params = {}) => api.get('/business-cards', { params }),

    // دریافت کارت‌های کاربر
    getMyBusinessCards: () => api.get('/business-cards/user/my-cards'),

    // دریافت یک کارت
    getBusinessCard: (id) => api.get(`/business-cards/${id}`),

    // ایجاد کارت جدید
    createBusinessCard: (data) => api.post('/business-cards', data),

    // ایجاد کارت از قالب
    createFromTemplate: (templateId, data = {}) =>
        api.post(`/business-cards/from-template/${templateId}`, data),

    // ویرایش کارت
    updateBusinessCard: (id, data) => api.put(`/business-cards/${id}`, data),

    // حذف کارت
    deleteBusinessCard: (id) => api.delete(`/business-cards/${id}`),

    // تولید QR Code
    generateQRCode: (id, options = {}) =>
        api.post(`/business-cards/${id}/generate-qr`, options),

    // دریافت آمار QR Code
    getQRAnalytics: (id) => api.get(`/business-cards/${id}/qr-analytics`),

    // دریافت کارت بر اساس short URL
    getByShortUrl: (shortUrl) => api.get(`/business-cards/short/${shortUrl}`),

    // جستجوی کارت‌های نزدیک
    getNearby: (params) => api.get('/business-cards/search/nearby', { params }),

    // دریافت انواع کسب‌وکار
    getBusinessTypes: () => api.get('/business-cards/types/list'),

    // کپی کارت
    duplicate: (id) => api.post(`/business-cards/${id}/duplicate`),

    // دریافت کارت‌های یک قالب
    getByTemplate: (templateId, params = {}) =>
        api.get(`/business-cards/template/${templateId}`, { params }),
};

// سرویس‌های Business Templates
export const businessTemplateService = {
    // دریافت همه قالب‌ها
    getBusinessTemplates: (params = {}) => api.get('/business-templates', { params }),

    // دریافت قالب‌های محبوب
    getPopularTemplates: (limit = 6) =>
        api.get('/business-templates/popular', { params: { limit } }),

    // دریافت یک قالب
    getBusinessTemplate: (id) => api.get(`/business-templates/${id}`),

    // دریافت قالب‌های بر اساس نوع کسب‌وکار
    getByBusinessType: (businessType, params = {}) =>
        api.get(`/business-templates/type/${businessType}`, { params }),

    // پیش‌نمایش قالب
    previewTemplate: (id) => api.get(`/business-templates/${id}/preview`),

    // ایجاد قالب جدید
    createBusinessTemplate: (data) => api.post('/business-templates', data),

    // ویرایش قالب
    updateBusinessTemplate: (id, data) => api.put(`/business-templates/${id}`, data),

    // حذف قالب
    deleteBusinessTemplate: (id) => api.delete(`/business-templates/${id}`),

    // امتیازدهی به قالب
    rateTemplate: (id, rating) =>
        api.post(`/business-templates/${id}/rate`, { rating }),

    // کپی قالب
    duplicateTemplate: (id) => api.post(`/business-templates/${id}/duplicate`),

    // دریافت آمار قالب
    getTemplateStats: (id) => api.get(`/business-templates/${id}/stats`),
};