import axios from 'axios';

// URL پایه API - در صورت نیاز می‌توانید از .env استفاده کنید
const API_BASE_URL = 'http://localhost:5000/api';

// ایجاد نمونه axios پایه
const createApi = (baseURL) => {
    return axios.create({
        baseURL,
        withCredentials: true, // فعال کردن ارسال کوکی
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        timeout: 30000 // 30 ثانیه تایم‌اوت
    });
};

// API کارت ویزیت
const visitCardsApi = createApi(`${API_BASE_URL}/visit-cards`);

export const visitCardApi = {
    // ================ توابع اصلی CRUD ================

    // دریافت همه کارت ویزیت‌ها
    getAll: async (params = {}) => {
        try {
            const response = await visitCardsApi.get('/', { params });
            return response.data;
        } catch (error) {
            console.error('خطا در دریافت کارت ویزیت‌ها:', error);
            return {
                success: false,
                data: [],
                message: 'خطا در دریافت لیست کارت ویزیت‌ها',
                error: error.message
            };
        }
    },

    // دریافت یک کارت ویزیت
    getById: async (id) => {
        try {
            const response = await visitCardsApi.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('خطا در دریافت کارت ویزیت:', error);

            // بازگرداندن خطای مناسب
            if (error.response) {
                return error.response.data;
            }

            return {
                success: false,
                message: 'خطا در دریافت کارت ویزیت'
            };
        }
    },

    // ایجاد کارت ویزیت جدید
    create: async (data) => {
        try {
            const formData = new FormData();

            // لیست فیلدهای متنی
            const textFields = [
                'title', 'bussinessName', 'description', 'doctorName',
                'medicalDegree', 'specialty', 'subSpecialty', 'medicalCouncilNumber',
                'phone', 'email', 'website', 'address', 'clinicName', 'clinicPhone',
                'status'
            ];

            // اضافه کردن فیلدهای متنی
            textFields.forEach(field => {
                if (data[field] !== undefined && data[field] !== null) {
                    formData.append(field, data[field].toString());
                }
            });

            // اضافه کردن آرایه تخصص‌ها
            if (data.specialities && Array.isArray(data.specialities)) {
                formData.append('specialities', JSON.stringify(data.specialities));
            } else if (data.specialities) {
                formData.append('specialities', data.specialities);
            }

            // اضافه کردن تمپلیت
            if (data.template && Array.isArray(data.template)) {
                formData.append('template', JSON.stringify(data.template));
            } else if (data.template) {
                formData.append('template', data.template);
            }

            // اضافه کردن فایل‌ها
            if (data.icon && data.icon instanceof File) {
                formData.append('icon', data.icon);
            } else if (data.iconFile && data.iconFile instanceof File) {
                formData.append('icon', data.iconFile);
            }

            if (data.coverImage && data.coverImage instanceof File) {
                formData.append('coverImage', data.coverImage);
            } else if (data.coverImageFile && data.coverImageFile instanceof File) {
                formData.append('coverImage', data.coverImageFile);
            }

            console.log('در حال ارسال درخواست ایجاد کارت ویزیت...');

            const response = await visitCardsApi.post('/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        console.log(`پیشرفت آپلود: ${percentCompleted}%`);
                    }
                }
            });

            console.log('پاسخ از سرور:', response.data);
            return response.data;
        } catch (error) {
            console.error('خطا در ایجاد کارت ویزیت:', error);

            // بازگرداندن پیام خطا از سرور
            if (error.response) {
                console.error('پاسخ خطا از سرور:', error.response.data);
                return error.response.data;
            }

            return {
                success: false,
                message: 'خطا در ارتباط با سرور'
            };
        }
    },

    // به‌روزرسانی کارت ویزیت
    update: async (id, data) => {
        try {
            const formData = new FormData();

            // لیست فیلدهای اصلی
            const textFields = [
                'title', 'bussinessName', 'description', 'doctorName',
                'medicalDegree', 'specialty', 'subSpecialty', 'medicalCouncilNumber',
                'phone', 'email', 'website', 'address', 'clinicName', 'clinicPhone',
                'status'
            ];

            // اضافه کردن فیلدهای متنی
            textFields.forEach(field => {
                if (data[field] !== undefined && data[field] !== null) {
                    formData.append(field, data[field].toString());
                }
            });

            // اضافه کردن آرایه تخصص‌ها
            if (data.specialities && Array.isArray(data.specialities)) {
                formData.append('specialities', JSON.stringify(data.specialities));
            } else if (data.specialities) {
                formData.append('specialities', data.specialities);
            }

            // اضافه کردن تمپلیت
            if (data.template && Array.isArray(data.template)) {
                formData.append('template', JSON.stringify(data.template));
            } else if (data.template) {
                formData.append('template', data.template);
            }

            // اضافه کردن فایل‌ها
            if (data.icon && data.icon instanceof File) {
                formData.append('icon', data.icon);
            } else if (data.iconFile && data.iconFile instanceof File) {
                formData.append('icon', data.iconFile);
            }

            if (data.coverImage && data.coverImage instanceof File) {
                formData.append('coverImage', data.coverImage);
            } else if (data.coverImageFile && data.coverImageFile instanceof File) {
                formData.append('coverImage', data.coverImageFile);
            }

            console.log(`در حال به‌روزرسانی کارت ویزیت ${id}...`);

            const response = await visitCardsApi.put(`/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('پاسخ به‌روزرسانی:', response.data);
            return response.data;
        } catch (error) {
            console.error('خطا در به‌روزرسانی کارت ویزیت:', error);

            if (error.response) {
                return error.response.data;
            }

            return {
                success: false,
                message: 'خطا در به‌روزرسانی کارت ویزیت'
            };
        }
    },

    // حذف کارت ویزیت
    delete: async (id) => {
        try {
            const response = await visitCardsApi.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('خطا در حذف کارت ویزیت:', error);
            return {
                success: false,
                message: 'خطا در حذف کارت ویزیت'
            };
        }
    },

    // ================ توابع خاص ================

    // انتشار کارت ویزیت
    publish: async (id) => {
        try {
            const response = await visitCardsApi.post(`/${id}/publish`);
            return response.data;
        } catch (error) {
            console.error('خطا در انتشار کارت ویزیت:', error);
            return {
                success: false,
                message: 'خطا در انتشار کارت ویزیت'
            };
        }
    },

    // دریافت QR Code
    getQRCode: async (id) => {
        try {
            const response = await visitCardsApi.get(`/${id}/qrcode`);
            return response.data;
        } catch (error) {
            console.error('خطا در دریافت QR Code:', error);
            return {
                success: false,
                message: 'خطا در دریافت QR Code'
            };
        }
    },

    // دریافت آمار کاربر
    getStats: async () => {
        try {
            const response = await visitCardsApi.get('/user/stats');
            return response.data;
        } catch (error) {
            console.error('خطا در دریافت آمار:', error);
            return {
                success: false,
                message: 'خطا در دریافت آمار'
            };
        }
    },

    // جستجوی پزشکان
    searchDoctors: async (queryParams = {}) => {
        try {
            const response = await visitCardsApi.get('/search', {
                params: queryParams
            });
            return response.data;
        } catch (error) {
            console.error('خطا در جستجوی پزشکان:', error);
            return {
                success: false,
                data: [],
                message: 'خطا در جستجوی پزشکان'
            };
        }
    },

    // دریافت کارت ویزیت‌های منتشر شده
    getPublished: async (params = {}) => {
        try {
            const response = await visitCardsApi.get('/published', { params });
            return response.data;
        } catch (error) {
            console.error('خطا در دریافت کارت ویزیت‌های منتشر شده:', error);
            return {
                success: false,
                data: [],
                message: 'خطا در دریافت کارت ویزیت‌های منتشر شده'
            };
        }
    },

    // دریافت کارت ویزیت‌های کاربر
    getUserVisitCards: async () => {
        try {
            const response = await visitCardsApi.get('/user/cards');
            return response.data;
        } catch (error) {
            console.error('خطا در دریافت کارت ویزیت‌های کاربر:', error);
            return {
                success: false,
                data: [],
                message: 'خطا در دریافت کارت ویزیت‌های کاربر'
            };
        }
    },

    // افزایش تعداد بازدید
    incrementView: async (id) => {
        try {
            const response = await visitCardsApi.post(`/${id}/view`);
            return response.data;
        } catch (error) {
            console.error('خطا در افزایش بازدید:', error);
            return {
                success: false,
                message: 'خطا در افزایش بازدید'
            };
        }
    }
};

// API تمپلیت‌ها
const templatesApi = createApi(`${API_BASE_URL}/templates`);

export const templateApi = {
    // دریافت همه تمپلیت‌ها
    getAll: async () => {
        try {
            const response = await templatesApi.get('/');
            return response.data;
        } catch (error) {
            console.error('خطا در دریافت تمپلیت‌ها:', error);
            return {
                success: false,
                data: [],
                message: 'خطا در دریافت تمپلیت‌ها'
            };
        }
    },

    // دریافت یک تمپلیت
    getById: async (id) => {
        try {
            const response = await templatesApi.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('خطا در دریافت تمپلیت:', error);
            return {
                success: false,
                message: 'تمپلیت یافت نشد'
            };
        }
    },

    // دریافت تمپلیت‌های پزشکی
    getMedicalTemplates: async () => {
        try {
            const response = await templatesApi.get('/category/medical');
            return response.data;
        } catch (error) {
            console.error('خطا در دریافت تمپلیت‌های پزشکی:', error);
            return {
                success: false,
                data: [],
                message: 'خطا در دریافت تمپلیت‌های پزشکی'
            };
        }
    },

    // دریافت تمپلیت‌های بر اساس دسته‌بندی
    getByCategory: async (category) => {
        try {
            const response = await templatesApi.get(`/category/${category}`);
            return response.data;
        } catch (error) {
            console.error(`خطا در دریافت تمپلیت‌های دسته ${category}:`, error);
            return {
                success: false,
                data: [],
                message: `خطا در دریافت تمپلیت‌های دسته ${category}`
            };
        }
    },

    // جستجوی تمپلیت‌ها
    search: async (query) => {
        try {
            const response = await templatesApi.get('/search', { params: { query } });
            return response.data;
        } catch (error) {
            console.error('خطا در جستجوی تمپلیت‌ها:', error);
            return {
                success: false,
                data: [],
                message: 'خطا در جستجوی تمپلیت‌ها'
            };
        }
    }
};

// ================ توابع کمکی ================

// تابع برای چک کردن وضعیت سرور
export const checkServerHealth = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/health`, {
            withCredentials: true,
            timeout: 5000
        });
        return response.data;
    } catch (error) {
        console.error('سرور در دسترس نیست:', error);
        return {
            success: false,
            message: 'سرور در دسترس نیست',
            details: error.message
        };
    }
};

// تابع برای تست اتصال به API کارت ویزیت
export const testVisitCardsApi = async () => {
    try {
        const response = await visitCardsApi.get('/');
        return {
            success: true,
            message: 'API کارت ویزیت در دسترس است',
            data: response.data
        };
    } catch (error) {
        console.error('API کارت ویزیت در دسترس نیست:', error);
        return {
            success: false,
            message: 'API کارت ویزیت در دسترس نیست',
            error: error.message
        };
    }
};

// تابع برای تست اتصال به API تمپلیت‌ها
export const testTemplatesApi = async () => {
    try {
        const response = await templatesApi.get('/');
        return {
            success: true,
            message: 'API تمپلیت‌ها در دسترس است',
            data: response.data
        };
    } catch (error) {
        console.error('API تمپلیت‌ها در دسترس نیست:', error);
        return {
            success: false,
            message: 'API تمپلیت‌ها در دسترس نیست',
            error: error.message
        };
    }
};

// تابع برای گرفتن URL کامل تصاویر
export const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // اگر آدرس کامل است
    if (imagePath.startsWith('http')) return imagePath;

    // اگر آدرس نسبی است (با اسلش شروع شود)
    if (imagePath.startsWith('/')) {
        return `${API_BASE_URL.replace('/api', '')}${imagePath}`;
    }

    // برای آدرس‌های بدون اسلش
    return `${API_BASE_URL.replace('/api', '')}/${imagePath}`;
};

// تابع برای تولید QR Code آنلاین (fallback)
export const generateQRCodeUrl = (data) => {
    if (!data) return null;

    const qrData = typeof data === 'string' ? data : JSON.stringify(data);
    const encodedData = encodeURIComponent(qrData);

    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedData}`;
};

// تابع برای ارسال آمار بازدید (client-side)
export const trackView = async (visitCardId) => {
    try {
        // ذخیره در localStorage برای جلوگیری از شمارش تکراری
        const viewedCards = JSON.parse(localStorage.getItem('viewedVisitCards') || '[]');

        if (!viewedCards.includes(visitCardId)) {
            viewedCards.push(visitCardId);
            localStorage.setItem('viewedVisitCards', JSON.stringify(viewedCards));

            // ارسال به سرور
            await visitCardApi.incrementView(visitCardId);
        }

        return { success: true };
    } catch (error) {
        console.error('خطا در ردیابی بازدید:', error);
        return { success: false, error: error.message };
    }
};

// اکسپورت پیش‌فرض
export default {
    visitCardApi,
    templateApi,
    checkServerHealth,
    testVisitCardsApi,
    testTemplatesApi,
    getFullImageUrl,
    generateQRCodeUrl,
    trackView
};