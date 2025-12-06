// stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// تنظیم baseURL
const API_BASE_URL = 'http://localhost:5000';

// ایجاد axios instance با تنظیمات پایه
const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true, // ارسال کوکی‌ها به صورت خودکار
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor برای مدیریت خطاها
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // اگر خطا 401 بود و درخواست قبلاً retry نشده
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // تلاش برای refresh token
                const refreshResponse = await api.post('/auth/refresh-token');

                // تکرار درخواست اصلی
                return api(originalRequest);
            } catch (refreshError) {
                // اگر refresh token هم کار نکرد، کاربر را logout کن
                useAuthStore.getState().logout();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            isLoading: false,
            error: null,
            requiresVerification: false,
            verificationPhone: null,
            needsProfileCompletion: false,

            // Actions
            loginWithPassword: async (phone, password) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await api.post('/auth/login/password', { phone, password });
                    const data = response.data;

                    if (!data.success) {
                        set({
                            isLoading: false,
                            error: data.message || 'ورود ناموفق بود'
                        });
                        return { success: false, message: data.message };
                    }

                    set({
                        user: data.user,
                        isLoading: false,
                        error: null,
                        requiresVerification: false,
                    });

                    // هدایت به صفحه پروفایل
                    window.location.href = '/profile';
                    return { success: true, user: data.user };
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'خطا در ارتباط با سرور';
                    set({
                        isLoading: false,
                        error: errorMessage
                    });
                    return { success: false, message: errorMessage };
                }
            },

            register: async (firstName, lastName, phone, password, confirmPassword) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await api.post('/auth/register', {
                        firstName,
                        lastName,
                        phone,
                        password,
                        confirmPassword
                    });
                    const data = response.data;

                    if (!data.success) {
                        set({
                            isLoading: false,
                            error: data.message || 'ثبت نام ناموفق بود'
                        });
                        return { success: false, message: data.message };
                    }

                    if (data.requiresVerification) {
                        set({
                            verificationPhone: phone,
                            requiresVerification: true,
                            isLoading: false,
                            error: null,
                        });
                        return {
                            success: true,
                            requiresVerification: true,
                            message: data.message
                        };
                    }

                    set({
                        user: data.user,
                        isLoading: false,
                        error: null,
                        requiresVerification: false,
                    });

                    // هدایت به صفحه پروفایل
                    window.location.href = '/profile';
                    return { success: true, user: data.user };
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'خطا در ارتباط با سرور';
                    set({
                        isLoading: false,
                        error: errorMessage
                    });
                    return { success: false, message: errorMessage };
                }
            },

            verifyRegisterOTP: async (phone, code) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await api.post('/auth/register/verify', { phone, code });
                    const data = response.data;

                    if (!data.success) {
                        set({
                            isLoading: false,
                            error: data.message || 'کد تایید نامعتبر است'
                        });
                        return { success: false, message: data.message };
                    }

                    set({
                        user: data.user,
                        isLoading: false,
                        error: null,
                        requiresVerification: false,
                        needsProfileCompletion: data.needsProfileCompletion || false,
                        verificationPhone: null,
                    });

                    // اگر نیاز به تکمیل پروفایل دارد، به صفحه تکمیل پروفایل برو
                    if (data.needsProfileCompletion) {
                        window.location.href = '/profile';
                    } else {
                        // در غیر این صورت به صفحه پروفایل برو
                        window.location.href = '/profile';
                    }

                    return {
                        success: true,
                        user: data.user,
                        needsProfileCompletion: data.needsProfileCompletion
                    };
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'خطا در ارتباط با سرور';
                    set({
                        isLoading: false,
                        error: errorMessage
                    });
                    return { success: false, message: errorMessage };
                }
            },

            requestLoginOTP: async (phone) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await api.post('/auth/login/request-otp', { phone });
                    const data = response.data;

                    if (!data.success) {
                        set({
                            isLoading: false,
                            error: data.message || 'خطا در ارسال کد تایید'
                        });
                        return { success: false, message: data.message };
                    }

                    set({
                        verificationPhone: phone,
                        requiresVerification: true,
                        isLoading: false,
                        error: null,
                    });

                    return { success: true, message: data.message };
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'خطا در ارتباط با سرور';
                    set({
                        isLoading: false,
                        error: errorMessage
                    });
                    return { success: false, message: errorMessage };
                }
            },

            verifyLoginOTP: async (phone, code) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await api.post('/auth/login/verify-otp', { phone, code });
                    const data = response.data;

                    if (!data.success) {
                        set({
                            isLoading: false,
                            error: data.message || 'کد تایید نامعتبر است'
                        });
                        return { success: false, message: data.message };
                    }

                    set({
                        user: data.user,
                        isLoading: false,
                        error: null,
                        requiresVerification: false,
                        needsProfileCompletion: data.needsProfileCompletion || false,
                        verificationPhone: null,
                    });

                    // اگر نیاز به تکمیل پروفایل دارد، به صفحه تکمیل پروفایل برو
                    if (data.needsProfileCompletion) {
                        window.location.href = '/complete-profile';
                    } else {
                        // در غیر این صورت به صفحه پروفایل برو
                        window.location.href = '/profile';
                    }

                    return {
                        success: true,
                        user: data.user,
                        needsProfileCompletion: data.needsProfileCompletion
                    };
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'خطا در ارتباط با سرور';
                    set({
                        isLoading: false,
                        error: errorMessage
                    });
                    return { success: false, message: errorMessage };
                }
            },

            resendVerificationCode: async (phone, type = 'register') => {
                set({ isLoading: true, error: null });

                try {
                    const endpoint = type === 'register'
                        ? '/auth/register/resend-code'
                        : '/auth/login/resend-otp';

                    const response = await api.post(endpoint, { phone });
                    const data = response.data;

                    if (!data.success) {
                        set({
                            isLoading: false,
                            error: data.message || 'خطا در ارسال مجدد کد'
                        });
                        return { success: false, message: data.message };
                    }

                    set({
                        isLoading: false,
                        error: null,
                    });

                    return { success: true, message: data.message };
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'خطا در ارتباط با سرور';
                    set({
                        isLoading: false,
                        error: errorMessage
                    });
                    return { success: false, message: errorMessage };
                }
            },

            completeProfile: async (firstName, lastName) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await api.put('/auth/profile/complete', {
                        firstName,
                        lastName
                    });
                    const data = response.data;

                    if (!data.success) {
                        set({
                            isLoading: false,
                            error: data.message || 'خطا در تکمیل پروفایل'
                        });
                        return { success: false, message: data.message };
                    }

                    set({
                        user: data.user,
                        isLoading: false,
                        error: null,
                        needsProfileCompletion: false,
                    });

                    // بعد از تکمیل پروفایل، به صفحه پروفایل برو
                    window.location.href = '/profile';
                    return { success: true, user: data.user };
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'خطا در ارتباط با سرور';
                    set({
                        isLoading: false,
                        error: errorMessage
                    });
                    return { success: false, message: errorMessage };
                }
            },

            logout: async () => {
                try {
                    await api.post('/auth/logout');
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    set({
                        user: null,
                        isLoading: false,
                        error: null,
                        requiresVerification: false,
                        verificationPhone: null,
                        needsProfileCompletion: false,
                    });

                    // هدایت به صفحه login
                    window.location.href = '/login';
                }
            },

            getCurrentUser: async () => {
                set({ isLoading: true, error: null });

                try {
                    const response = await api.get('/auth/me');
                    const data = response.data;

                    if (!data.success) {
                        set({
                            isLoading: false,
                            error: data.message || 'خطا در دریافت اطلاعات کاربر'
                        });
                        return null;
                    }

                    set({
                        user: data.user,
                        isLoading: false,
                        error: null,
                        needsProfileCompletion: data.user?.firstName === 'کاربر' && data.user?.lastName === 'جدید',
                    });

                    return data.user;
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'خطا در ارتباط با سرور';

                    // اگر خطا 401 بود، کاربر را logout کن
                    if (error.response?.status === 401) {
                        set({
                            user: null,
                            isLoading: false,
                            error: null,
                            requiresVerification: false,
                            verificationPhone: null,
                            needsProfileCompletion: false,
                        });
                    } else {
                        set({
                            isLoading: false,
                            error: errorMessage
                        });
                    }

                    return null;
                }
            },

            clearError: () => set({ error: null }),

            isAuthenticated: () => {
                const { user } = get();
                return !!user;
            },

            // بررسی اولیه وضعیت auth
            initializeAuth: async () => {
                try {
                    const user = await get().getCurrentUser();
                    return !!user;
                } catch (error) {
                    return false;
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                needsProfileCompletion: state.needsProfileCompletion,
            }),
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.error('Error during rehydration:', error);
                    }
                };
            }
        }
    )
);

export default useAuthStore;