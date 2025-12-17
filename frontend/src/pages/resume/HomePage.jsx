// client/src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    DocumentArrowDownIcon,
    Squares2X2Icon,
    BoltIcon,
    UserGroupIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    SparklesIcon,
    StarIcon,
    EyeIcon,
    ArrowDownTrayIcon,
    AcademicCapIcon,
    BriefcaseIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
    const features = [
        {
            icon: <Squares2X2Icon className="w-8 h-8" />,
            title: 'قالب‌های حرفه‌ای',
            description: 'از بین بیش از ۵۰ قالب طراحی شده حرفه‌ای انتخاب کنید'
        },
        {
            icon: <BoltIcon className="w-8 h-8" />,
            title: 'سریع و آسان',
            description: 'در عرض چند دقیقه با سازنده کاربرپسند ما رزومه ایجاد کنید'
        },
        {
            icon: <DocumentArrowDownIcon className="w-8 h-8" />,
            title: 'دانلود و چاپ',
            description: 'فوری به PDF، PNG صادر کنید یا آنلاین به اشتراک بگذارید'
        },
        {
            icon: <UserGroupIcon className="w-8 h-8" />,
            title: 'نیاز به ثبت‌نام ندارد',
            description: 'بلافاصله و بدون ثبت‌نام شروع به ساخت کنید'
        }
    ];

    const steps = [
        {
            number: '1',
            title: 'انتخاب قالب',
            description: 'از بین طرح‌های مدرن، کلاسیک یا مینیمال انتخاب کنید',
            icon: <Squares2X2Icon className="w-6 h-6" />
        },
        {
            number: '2',
            title: 'وارد کردن اطلاعات',
            description: 'تجربیات، تحصیلات و مهارت‌های خود را وارد کنید',
            icon: <BriefcaseIcon className="w-6 h-6" />
        },
        {
            number: '3',
            title: 'سفارشی‌سازی و دانلود',
            description: 'رزومه عالی خود را پیش‌نمایش و دانلود کنید',
            icon: <DocumentArrowDownIcon className="w-6 h-6" />
        }
    ];

    const templates = [
        {
            name: 'حرفه‌ای مدرن',
            category: 'حرفه‌ای',
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            description: 'طراحی تمیز و معاصر',
            features: ['طرح‌بندی مدرن', 'رنگ‌های حرفه‌ای', 'سازگار با سیستم‌های ATS']
        },
        {
            name: 'اجرایی کلاسیک',
            category: 'اجرایی',
            color: 'bg-gradient-to-br from-gray-700 to-gray-900',
            description: 'طرح‌بندی دو ستونه سنتی',
            features: ['طراحی کلاسیک', 'سبک رسمی', 'ظاهر اجرایی']
        },
        {
            name: 'خلاقانه مینیمال',
            category: 'خلاقانه',
            color: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
            description: 'طراحی ساده و زیبا',
            features: ['طراحی مینیمال', 'طرح‌بندی خلاقانه', 'تایپوگرافی مدرن']
        }
    ];

    const stats = [
        { number: '۱۰,۰۰۰+', label: 'رزومه ساخته شده' },
        { number: '۵۰+', label: 'قالب' },
        { number: '۱۰۰٪', label: 'رایگان' },
        { number: '۲۴/۷', label: 'در دسترس' }
    ];

    const benefits = [
        'نیاز به کارت اعتباری ندارد',
        'دانلود نامحدود',
        'بدون واترمارک',
        'کیفیت حرفه‌ای',
        'سازگار با موبایل',
        'پیش‌نمایش فوری'
    ];

    return (
        <div className="min-h-screen">
            {/* بخش اصلی */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 md:py-24">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <SparklesIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">نیاز به ثبت‌نام ندارد</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            رزومه عالی خود را
                            <span className="block text-blue-200 mt-2">در عرض چند دقیقه ایجاد کنید</span>
                        </h1>

                        <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
                            با سازنده رایگان ما یک رزومه حرفه‌ای بسازید. از بین قالب‌های مدرن انتخاب کنید،
                            محتوای خود را سفارشی کرده و فوری دانلود کنید.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link
                                to="/templates"
                                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-blue-700 rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
                            >
                                <span>شروع ساخت</span>
                                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/templates"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                            >
                                مشاهده قالب‌ها
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-sm text-blue-200">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* نحوه عملکرد */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            نحوه عملکرد
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            در سه مرحله ساده رزومه عالی خود را ایجاد کنید
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                        {step.number}
                                    </div>
                                    <div className="mt-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                                        <ArrowRightIcon className="w-8 h-8 text-gray-300" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* پیش‌نمایش قالب‌ها */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            قالب‌های محبوب
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            از بین محبوب‌ترین قالب‌های طراحی شده حرفه‌ای ما انتخاب کنید
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {templates.map((template, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className={`h-48 ${template.color} flex items-center justify-center`}>
                                    <DocumentArrowDownIcon className="w-20 h-20 text-white opacity-80" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                            {template.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-6">{template.description}</p>
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">ویژگی‌ها:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {template.features.map((feature, i) => (
                                                <span key={i} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <Link
                                        to="/templates"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        استفاده از قالب
                                        <ArrowRightIcon className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            to="/templates"
                            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
                        >
                            مشاهده تمام قالب‌ها
                        </Link>
                    </div>
                </div>
            </section>

            {/* بخش آمار */}
            <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                                <div className="text-lg text-gray-300">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* بخش اقدام */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white"
                    >
                        <h2 className="text-4xl font-bold mb-6">
                            آماده ایجاد رزومه عالی خود هستید؟
                        </h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            به هزاران جوینده کار موفق بپیوندید که با رزومه‌های ما به شغل رویایی خود دست یافتند
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/templates"
                                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-blue-700 rounded-xl hover:bg-gray-100 transition-all duration-300"
                            >
                                <span>همین حالا شروع کنید</span>
                                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/templates"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                            >
                                مشاهده نمونه‌ها
                            </Link>
                        </div>

                        <div className="mt-10 flex flex-wrap justify-center gap-6">
                            {benefits.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <CheckCircleIcon className="w-5 h-5 text-green-300" />
                                    <span className="text-blue-100">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;