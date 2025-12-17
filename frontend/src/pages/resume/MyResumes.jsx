// client/src/pages/MyResumes.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    DocumentIcon,
    TrashIcon,
    PencilIcon,
    DocumentDuplicateIcon,
    EyeIcon,
    PlusIcon,
    CalendarIcon,
    ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import { useResume } from '../../contexts/ResumeContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const MyResumes = () => {
    const navigate = useNavigate();
    const { resumesList, loadResume, deleteResume, duplicateResume, clearResumeData } = useResume();
    const [selectedResumes, setSelectedResumes] = useState([]);

    const handleLoadResume = (resumeId) => {
        if (loadResume(resumeId)) {
            navigate('/preview');
        }
    };

    const handleDeleteResume = (resumeId) => {
        if (window.confirm('آیا از حذف این رزومه مطمئن هستید؟')) {
            deleteResume(resumeId);
        }
    };

    const handleDuplicateResume = (resumeId) => {
        const newResumeId = duplicateResume(resumeId);
        if (newResumeId) {
            navigate(`/edit/${newResumeId}`);
        }
    };

    const handleBulkDelete = () => {
        if (selectedResumes.length === 0) {
            toast.error('لطفا حداقل یک رزومه را انتخاب کنید');
            return;
        }

        if (window.confirm(`آیا از حذف ${selectedResumes.length} رزومه انتخاب شده مطمئن هستید؟`)) {
            selectedResumes.forEach(resumeId => {
                deleteResume(resumeId);
            });
            setSelectedResumes([]);
            toast.success('رزومه‌های انتخاب شده حذف شدند');
        }
    };

    const toggleSelectResume = (resumeId) => {
        setSelectedResumes(prev =>
            prev.includes(resumeId)
                ? prev.filter(id => id !== resumeId)
                : [...prev, resumeId]
        );
    };

    const handleSelectAll = () => {
        if (selectedResumes.length === resumesList.length) {
            setSelectedResumes([]);
        } else {
            setSelectedResumes(resumesList.map(r => r.id));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fa-IR');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 rtl" dir="rtl">
            <div className="max-w-7xl mx-auto px-4">
                {/* هدر */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">رزومه‌های من</h1>
                            <p className="opacity-90">
                                تعداد رزومه‌ها: <span className="font-semibold">{resumesList.length}</span>
                            </p>
                        </div>
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <Link
                                to="/templates"
                                className="flex items-center space-x-2 space-x-reverse px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>رزومه جدید</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* عملیات گروهی */}
                {resumesList.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 space-x-reverse">
                                <input
                                    type="checkbox"
                                    checked={selectedResumes.length === resumesList.length}
                                    onChange={handleSelectAll}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-700">
                                    انتخاب همه ({selectedResumes.length} از {resumesList.length})
                                </span>
                            </div>
                            {selectedResumes.length > 0 && (
                                <button
                                    onClick={handleBulkDelete}
                                    className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                    <span>حذف انتخاب‌ها ({selectedResumes.length})</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* لیست رزومه‌ها */}
                {resumesList.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <DocumentIcon className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">هنوز رزومه‌ای ندارید</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            با ساخت رزومه جدید شروع کنید. می‌توانید از بین قالب‌های زیبا و حرفه‌ای انتخاب کنید.
                        </p>
                        <Link
                            to="/templates"
                            className="inline-flex items-center space-x-2 space-x-reverse px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>ساخت اولین رزومه</span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumesList.map((resume, index) => (
                            <motion.div
                                key={resume.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
                            >
                                {/* هدر کارت */}
                                <div className={`p-6 text-white ${getTemplateColor(resume.data.templateId)}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-3 space-x-reverse">
                                            <DocumentIcon className="w-8 h-8" />
                                            <div>
                                                <h3 className="text-xl font-bold truncate max-w-[200px]">{resume.name}</h3>
                                                <p className="text-sm opacity-90">{getTemplateName(resume.data.templateId)}</p>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selectedResumes.includes(resume.id)}
                                            onChange={() => toggleSelectResume(resume.id)}
                                            className="w-5 h-5 text-white bg-white/20 rounded focus:ring-white"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2 space-x-reverse text-sm opacity-90">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>آخرین ویرایش: {formatDate(resume.updatedAt)}</span>
                                    </div>
                                </div>

                                {/* اطلاعات رزومه */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {resume.data.personalInfo.fullName && (
                                            <div>
                                                <p className="text-sm text-gray-500">نام</p>
                                                <p className="font-medium truncate">{resume.data.personalInfo.fullName}</p>
                                            </div>
                                        )}
                                        {resume.data.personalInfo.title && (
                                            <div>
                                                <p className="text-sm text-gray-500">عنوان شغلی</p>
                                                <p className="font-medium truncate">{resume.data.personalInfo.title}</p>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                            <div>
                                                <p className="text-sm text-gray-500">سوابق کاری</p>
                                                <p className="font-medium">{resume.data.experience.length}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">مهارت‌ها</p>
                                                <p className="font-medium">{resume.data.skills.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* دکمه‌های عملیات */}
                                <div className="p-4 bg-gray-50 border-t border-gray-200">
                                    <div className="grid grid-cols-4 gap-2">
                                        <button
                                            onClick={() => handleLoadResume(resume.id)}
                                            className="flex flex-col items-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="مشاهده"
                                        >
                                            <EyeIcon className="w-5 h-5 mb-1" />
                                            <span className="text-xs">مشاهده</span>
                                        </button>
                                        <Link
                                            to={`/edit/${resume.id}`}
                                            className="flex flex-col items-center p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            title="ویرایش"
                                        >
                                            <PencilIcon className="w-5 h-5 mb-1" />
                                            <span className="text-xs">ویرایش</span>
                                        </Link>
                                        <button
                                            onClick={() => handleDuplicateResume(resume.id)}
                                            className="flex flex-col items-center p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                            title="کپی"
                                        >
                                            <DocumentDuplicateIcon className="w-5 h-5 mb-1" />
                                            <span className="text-xs">کپی</span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteResume(resume.id)}
                                            className="flex flex-col items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="حذف"
                                        >
                                            <TrashIcon className="w-5 h-5 mb-1" />
                                            <span className="text-xs">حذف</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// توابع کمکی برای رنگ و نام قالب
const getTemplateColor = (templateId) => {
    const colors = {
        modern: 'bg-gradient-to-r from-blue-600 to-blue-700',
        classic: 'bg-gradient-to-r from-amber-600 to-amber-700',
        minimal: 'bg-gradient-to-r from-gray-600 to-gray-700',
        technical: 'bg-gradient-to-r from-emerald-600 to-emerald-700',
        creative: 'bg-gradient-to-r from-pink-600 to-pink-700',
        academic: 'bg-gradient-to-r from-purple-600 to-purple-700',
        luxury: 'bg-gradient-to-r from-yellow-600 to-yellow-700'
    };
    return colors[templateId] || colors.modern;
};

const getTemplateName = (templateId) => {
    const names = {
        modern: 'مدرن',
        classic: 'کلاسیک',
        minimal: 'مینیمال',
        technical: 'فنی',
        creative: 'خلاقانه',
        academic: 'آکادمیک',
        luxury: 'لوکس'
    };
    return names[templateId] || 'مدرن';
};

export default MyResumes;