// client/src/components/Layout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    DocumentDuplicateIcon,
    ChevronRightIcon,
    SparklesIcon,
    Squares2X2Icon
} from '@heroicons/react/24/outline';

const Layout = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'خانه', path: '/', icon: HomeIcon },
        { name: 'قالب‌ها', path: '/templates', icon: Squares2X2Icon },
        { name: 'رزومه من', path: '/my-resume', icon: DocumentDuplicateIcon },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* هدر */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* لوگو */}
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                                <DocumentDuplicateIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">سازنده رزومه</h1>
                                <p className="text-xs text-gray-500">ایجاد رزومه‌های حرفه‌ای</p>
                            </div>
                        </Link>

                        {/* نوار ناوبری دسکتاپ */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isActive(item.path)
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}

                            <Link
                                to="/templates"
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <SparklesIcon className="w-5 h-5" />
                                <span>ساخت رزومه</span>
                            </Link>
                        </nav>

                        {/* دکمه منوی موبایل */}
                        <button
                            type="button"
                            className="md:hidden p-2 rounded-md text-gray-700"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">باز کردن منو</span>
                            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                                <span className={`block h-0.5 w-6 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                                <span className={`block h-0.5 w-6 bg-current ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`block h-0.5 w-6 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* ناوبری موبایل */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-4 py-3 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center justify-between p-3 rounded-lg ${isActive(item.path)
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <ChevronRightIcon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* محتوای اصلی */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* فوتر */}
            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <DocumentDuplicateIcon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">سازنده رزومه</span>
                            </Link>
                            <p className="mt-4 text-gray-600">
                                رزومه‌های حرفه‌ای را در چند دقیقه ایجاد کنید. نیازی به ثبت‌نام نیست.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">محصول</h3>
                            <ul className="space-y-3">
                                <li><Link to="/templates" className="text-gray-600 hover:text-blue-600">قالب‌ها</Link></li>
                                <li><Link to="/" className="text-gray-600 hover:text-blue-600">امکانات</Link></li>
                                <li><Link to="/" className="text-gray-600 hover:text-blue-600">قیمت‌گذاری</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">منابع</h3>
                            <ul className="space-y-3">
                                <li><Link to="/" className="text-gray-600 hover:text-blue-600">بلاگ</Link></li>
                                <li><Link to="/" className="text-gray-600 hover:text-blue-600">مرکز راهنما</Link></li>
                                <li><Link to="/" className="text-gray-600 hover:text-blue-600">تماس با ما</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">قانونی</h3>
                            <ul className="space-y-3">
                                <li><Link to="/" className="text-gray-600 hover:text-blue-600">حریم خصوصی</Link></li>
                                <li><Link to="/" className="text-gray-600 hover:text-blue-600">شرایط استفاده</Link></li>
                                <li><Link to="/" className="text-gray-600 hover:text-blue-600">خط‌مشی کوکی‌ها</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} سازنده رزومه. تمامی حقوق محفوظ است.</p>
                        <p className="mt-2">ساخته شده با ❤️ برای جویندگان کار در سراسر جهان</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;