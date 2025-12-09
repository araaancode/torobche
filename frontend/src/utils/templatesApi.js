// utils/templatesApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// توابع API برای تمپلیت‌ها
export const getAllTemplates = async () => {
    try {
        const response = await axios.get(`${API_URL}/templates`);
        return response.data;
    } catch (error) {
        console.error('Error fetching templates:', error);
        // داده‌های نمونه برای حالت تست
        return {
            success: true,
            data: [
                {
                    _id: '1',
                    title: 'قالب مدرن کسب‌وکار',
                    description: 'قالب مدرن و حرفه‌ای برای انواع کسب‌وکارها',
                    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=300&fit=crop',
                    category: 'مدرن',
                    price: 0,
                    colorPallete: ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B'],
                    features: ['طراحی ریسپانسیو', 'پالت رنگ مدرن', 'انیمیشن‌های زیبا', 'سازگار با موبایل']
                },
                {
                    _id: '2',
                    title: 'قالب کلاسیک',
                    description: 'قالب کلاسیک و رسمی برای کسب‌وکارهای حرفه‌ای',
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                    category: 'کلاسیک',
                    price: 0,
                    colorPallete: ['#1E40AF', '#0F766E', '#047857', '#78350F'],
                    features: ['طراحی مینیمال', 'مناسب کسب‌وکارهای حرفه‌ای', 'خوانایی بالا', 'چاپ با کیفیت']
                },
                {
                    _id: '3',
                    title: 'قالب خلاقانه',
                    description: 'قالب خلاقانه و جذاب برای استارتاپ‌ها و کسب‌وکارهای نوآور',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
                    category: 'خلاقانه',
                    price: 0,
                    colorPallete: ['#DB2777', '#7C3AED', '#F59E0B', '#10B981'],
                    features: ['طراحی منحصر به فرد', 'انیمیشن‌های تعاملی', 'رنگ‌های جذاب', 'تجربه کاربری عالی']
                },
                {
                    _id: '4',
                    title: 'قالب مینیمال',
                    description: 'قالب ساده و شیک با تمرکز بر محتوا',
                    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
                    category: 'مینیمال',
                    price: 0,
                    colorPallete: ['#374151', '#6B7280', '#9CA3AF', '#D1D5DB'],
                    features: ['طراحی تمیز', 'تمرکز بر محتوا', 'سرعت بالا', 'سازگاری کامل']
                },
                {
                    _id: '5',
                    title: 'قالب شرکتی',
                    description: 'قالب رسمی و ساختاریافته برای شرکت‌ها و سازمان‌ها',
                    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
                    category: 'شرکتی',
                    price: 0,
                    colorPallete: ['#1E3A8A', '#075985', '#0C4A6E', '#1E40AF'],
                    features: ['طراحی ساختاریافته', 'مناسب برندینگ', 'حرفه‌ای', 'قالب‌بندی منظم']
                },
                {
                    _id: '6',
                    title: 'قالب رستوران و کافه',
                    description: 'قالب گرم و جذاب برای رستوران‌ها، کافه‌ها و فودکورت‌ها',
                    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
                    category: 'غذایی',
                    price: 0,
                    colorPallete: ['#C2410C', '#EA580C', '#F97316', '#FB923C'],
                    features: ['طراحی گرم و دعوت‌کننده', 'مناسب منوهای غذایی', 'عکس‌های با کیفیت', 'رنگ‌های اشتهابرانگیز']
                }
            ]
        };
    }
};

export const getTemplateById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/templates/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching template:', error);
        throw error;
    }
};

export const createTemplate = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/templates`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating template:', error);
        throw error;
    }
};

export const updateTemplate = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/templates/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating template:', error);
        throw error;
    }
};

export const deleteTemplate = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/templates/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting template:', error);
        throw error;
    }
};

// Export به صورت object
export const templateApi = {
    getAll: getAllTemplates,
    getById: getTemplateById,
    create: createTemplate,
    update: updateTemplate,
    delete: deleteTemplate
};

export default templateApi;