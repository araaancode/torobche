import axios from 'axios';

// تنظیم base URL
const API_BASE_URL = 'http://localhost:5000/api';

// ایجاد instance از axios با withCredentials
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000, // افزایش timeout
    withCredentials: true, // برای ارسال کوکی‌ها و session
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor برای هندل کردن خطاها
api.interceptors.response.use(
    (response) => {
        // برای پاسخ‌های موفق
        return response.data;
    },
    (error) => {
        console.error('API Error:', error);

        if (error.response) {
            // سرور پاسخ داده اما کد خطا است
            const status = error.response.status;
            let message = 'خطا در ارتباط با سرور';

            if (status === 400) {
                message = error.response.data?.message || 'داده‌های ارسالی نامعتبر است';
            } else if (status === 401) {
                message = 'لطفا ابتدا وارد حساب کاربری خود شوید';
                // می‌توانید کاربر را به صفحه لاگین هدایت کنید
                // window.location.href = '/login';
            } else if (status === 403) {
                message = 'شما دسترسی لازم برای این عمل را ندارید';
            } else if (status === 404) {
                message = 'منبع مورد نظر یافت نشد';
            } else if (status === 500) {
                message = 'خطای سرور. لطفا بعدا تلاش کنید';
            }

            return Promise.reject({
                success: false,
                message: message,
                data: null,
                status: status,
                details: error.response.data
            });
        } else if (error.request) {
            // درخواست ارسال شده اما پاسخی دریافت نشده
            return Promise.reject({
                success: false,
                message: 'خطا در ارتباط با سرور. لطفا اتصال اینترنت خود را بررسی کنید.',
                data: null
            });
        } else {
            // خطا در تنظیم درخواست
            return Promise.reject({
                success: false,
                message: 'خطا در ارسال درخواست',
                data: null
            });
        }
    }
);

// ==================== MENU API ====================
export const menuApi = {
    // گرفتن همه منوها
    getAll: async () => {
        try {
            const response = await api.get('/menus');
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // گرفتن یک منو با ID
    getById: async (id) => {
        try {
            const response = await api.get(`/menus/${id}`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // ایجاد منوی جدید (بدون نیاز به فایل)
    create: async (data) => {
        try {
            // ساختار داده‌ای که سرور انتظار دارد
            const menuData = {
                title: data.title || '',
                bussinessName: data.bussinessName || '',
                description: data.description || '',
                template: Array.isArray(data.template) ? data.template : (data.template ? [data.template] : []),
                icon: data.icon || '/uploads/default/menu-icon.png',
                coverImage: data.coverImage || '/uploads/default/menu-cover.jpg',
                qrcode: data.qrcode || '',
                foods: data.foods || [],
                status: data.status || 'draft'
            };

            console.log('در حال ارسال داده‌های منو:', menuData);

            const response = await api.post('/menus', menuData);
            return response;
        } catch (error) {
            console.error('خطا در ایجاد منو:', error);
            return Promise.reject(error);
        }
    },

    // ایجاد منوی جدید با فایل‌ها (استفاده از FormData)
    createWithFiles: async (data, iconFile = null, coverFile = null) => {
        try {
            const formData = new FormData();

            // اضافه کردن فیلدهای متنی
            formData.append('title', data.title || '');
            formData.append('bussinessName', data.bussinessName || '');
            formData.append('description', data.description || '');
            formData.append('status', data.status || 'draft');

            // template باید آرایه باشد
            if (data.template) {
                const templateArray = Array.isArray(data.template) ? data.template : [data.template];
                formData.append('template', JSON.stringify(templateArray));
            } else {
                formData.append('template', JSON.stringify([]));
            }

            // اضافه کردن فایل‌ها
            if (iconFile) {
                formData.append('icon', iconFile);
            } else {
                // ایجاد فایل پیش‌فرض
                const defaultIcon = new Blob(['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'],
                    { type: 'image/svg+xml' });
                formData.append('icon', defaultIcon, 'default-icon.svg');
            }

            if (coverFile) {
                formData.append('coverImage', coverFile);
            } else {
                const defaultCover = new Blob(['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'],
                    { type: 'image/svg+xml' });
                formData.append('coverImage', defaultCover, 'default-cover.svg');
            }

            console.log('FormData محتوا:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            // ارسال با هدر multipart/form-data
            const response = await api.post('/menus', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            console.error('خطا در ایجاد منو با فایل‌ها:', error);
            return Promise.reject(error);
        }
    },

    // بروزرسانی منو
    update: async (id, data) => {
        try {
            console.log('در حال بروزرسانی منو:', { id, data });

            // ساختار داده‌ای مناسب
            const updateData = {
                title: data.title,
                bussinessName: data.bussinessName,
                description: data.description,
                template: Array.isArray(data.template) ? data.template : (data.template ? [data.template] : []),
                foods: data.foods || [],
                status: data.status || 'draft'
            };

            // حذف فیلدهای undefined
            Object.keys(updateData).forEach(key => {
                if (updateData[key] === undefined) {
                    delete updateData[key];
                }
            });

            const response = await api.put(`/menus/${id}/update`, updateData);
            return response;
        } catch (error) {
            console.error('خطا در بروزرسانی منو:', error);
            return Promise.reject(error);
        }
    },

    // آپلود آیکون منو
    uploadIcon: async (id, file) => {
        try {
            const formData = new FormData();
            formData.append('icon', file);

            const response = await api.put(`/menus/${id}/update-icon`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // آپلود عکس کاور منو
    uploadCoverImage: async (id, file) => {
        try {
            const formData = new FormData();
            formData.append('coverImage', file);

            const response = await api.put(`/menus/${id}/update-cover-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // حذف منو
    delete: async (id) => {
        try {
            const response = await api.delete(`/menus/${id}`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // گرفتن QR Code منو
    getQRCode: async (id) => {
        try {
            const response = await api.get(`/menus/${id}/qrcode`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

// ==================== TEMPLATE API ====================
export const templateApi = {
    // گرفتن همه تمپلیت‌ها
    getAll: async () => {
        try {
            const response = await api.get('/templates');
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // گرفتن یک تمپلیت با ID
    getById: async (id) => {
        try {
            const response = await api.get(`/templates/${id}`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // ایجاد تمپلیت جدید
    create: async (data) => {
        try {
            const response = await api.post('/templates', data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // بروزرسانی تمپلیت
    update: async (id, data) => {
        try {
            const response = await api.put(`/templates/${id}/update`, data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // آپلود عکس تمپلیت
    uploadImage: async (id, file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await api.put(`/templates/${id}/update-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // بروزرسانی رنگ‌های تمپلیت
    updateColors: async (id, colors) => {
        try {
            const response = await api.put(`/templates/${id}/update-colors`, {
                colorPallete: Array.isArray(colors) ? colors : [colors]
            });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // حذف تمپلیت
    delete: async (id) => {
        try {
            const response = await api.delete(`/templates/${id}`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // جستجو در تمپلیت‌ها
    search: async (query) => {
        try {
            const response = await api.get('/templates/search', { params: { q: query } });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

// ==================== FOOD API ====================
export const foodApi = {
    // گرفتن همه غذاها
    getAll: async () => {
        try {
            const response = await api.get('/foods');
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // گرفتن یک غذا با ID
    getById: async (id) => {
        try {
            const response = await api.get(`/foods/${id}`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // ایجاد غذا جدید
    create: async (data) => {
        try {
            const response = await api.post('/foods', data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // بروزرسانی غذا
    update: async (id, data) => {
        try {
            const response = await api.put(`/foods/${id}/update`, data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // آپلود عکس غذا
    uploadImage: async (id, file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await api.put(`/foods/${id}/update-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // حذف غذا
    delete: async (id) => {
        try {
            const response = await api.delete(`/foods/${id}`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // غذاهای بر اساس دسته‌بندی
    getByCategory: async (category) => {
        try {
            const response = await api.get(`/foods/category/${category}`);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // جستجو در غذاها
    search: async (query) => {
        try {
            const response = await api.get('/foods/search', { params: { q: query } });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

// ==================== AUTH API ====================
export const authApi = {
    // لاگین
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // ثبت نام
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // خروج
    logout: async () => {
        try {
            const response = await api.post('/auth/logout');
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // بررسی وضعیت احراز هویت
    checkAuth: async () => {
        try {
            const response = await api.get('/auth/check');
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // دریافت اطلاعات کاربر
    getProfile: async () => {
        try {
            const response = await api.get('/auth/profile');
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // بروزرسانی پروفایل
    updateProfile: async (data) => {
        try {
            const response = await api.put('/auth/profile', data);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

// ==================== UPLOAD API ====================
export const uploadApi = {
    // آپلود فایل عمومی
    uploadFile: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // آپلود چند فایل
    uploadMultiple: async (files) => {
        try {
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });

            const response = await api.post('/upload/multiple', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

// ==================== UTILITY FUNCTIONS ====================

// ساخت URL کامل برای فایل‌ها
export const getFullUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${API_BASE_URL.replace('/api', '')}${path}`;
};

// بررسی وضعیت آنلاین بودن سرور
export const checkServerStatus = async () => {
    try {
        const response = await api.get('/health');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

// بررسی وضعیت احراز هویت
export const isAuthenticated = async () => {
    try {
        const response = await authApi.checkAuth();
        return response && response.success === true;
    } catch (error) {
        return false;
    }
};

// تبدیل blob URL به File object
export const blobUrlToFile = async (blobUrl, fileName = 'image.png') => {
    try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    } catch (error) {
        console.error('خطا در تبدیل blob URL به File:', error);
        return null;
    }
};

// هندل کردن آپلود فایل با progress
export const uploadWithProgress = (url, file, onProgress) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable && onProgress) {
                const percentCompleted = Math.round((event.loaded * 100) / event.total);
                onProgress(percentCompleted);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                } catch (error) {
                    resolve(xhr.responseText);
                }
            } else {
                reject(new Error(`Upload failed with status ${xhr.status}`));
            }
        });

        xhr.addEventListener('error', () => {
            reject(new Error('Network error during upload'));
        });

        xhr.open('POST', `${API_BASE_URL}${url}`);
        xhr.withCredentials = true;
        xhr.send(formData);
    });
};

// تابع کمکی برای دیباگ
export const debugApiRequest = async (method, url, data = null) => {
    console.log(`🔍 API Debug - ${method} ${url}:`, data);

    try {
        let response;
        switch (method.toLowerCase()) {
            case 'get':
                response = await api.get(url);
                break;
            case 'post':
                response = await api.post(url, data);
                break;
            case 'put':
                response = await api.put(url, data);
                break;
            case 'delete':
                response = await api.delete(url);
                break;
            default:
                throw new Error(`Method ${method} not supported`);
        }

        console.log(`✅ API Debug - ${method} ${url} Success:`, response);
        return response;
    } catch (error) {
        console.error(`❌ API Debug - ${method} ${url} Error:`, error);
        throw error;
    }
};

// تابع برای تست connection
export const testConnection = async () => {
    try {
        const startTime = Date.now();
        const response = await api.get('/health');
        const endTime = Date.now();

        return {
            success: true,
            message: 'اتصال موفق',
            ping: endTime - startTime,
            data: response
        };
    } catch (error) {
        return {
            success: false,
            message: 'اتصال ناموفق',
            error: error.message
        };
    }
};

export default api;