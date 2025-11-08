import React from 'react';
import { PiForkKnife, PiEnvelope, PiPhone, PiMapPin, PiInstagramLogo, PiTelegramLogo, PiLinkedinLogo } from 'react-icons/pi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <PiForkKnife className="text-white text-lg" />
              </div>
              <div>
                <div className="text-2xl font-black">منوی دیجیتال</div>
                <div className="text-gray-400 text-sm">پلتفرم هوشمند</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              پلتفرم هوشمند منوهای دیجیتال برای رستوران‌ها و کافه‌ها. تجربه سفارش‌دهی مدرن و بدون تماس برای مشتریان شما.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                <PiInstagramLogo className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-blue-500 transition-colors duration-300">
                <PiTelegramLogo className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                <PiLinkedinLogo className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black mb-6">لینک‌های سریع</h3>
            <ul className="space-y-3">
              {['صفحه اصلی', 'ویژگی‌ها', 'نمونه کارها', 'قیمت‌گذاری', 'درباره ما', 'تماس'].map((item, index) => (
                <li key={index}>
                  <a href={`#${item.replace(' ', '')}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-black mb-6">پشتیبانی</h3>
            <ul className="space-y-3">
              {['مرکز راهنمایی', 'مستندات', 'وبلاگ', 'قوانین و مقررات', 'حریم خصوصی'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-black mb-6">تماس با ما</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <PiMapPin className="text-blue-400 text-lg flex-shrink-0" />
                <span className="text-gray-400">تهران، خیابان ولیعصر</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <PiPhone className="text-green-400 text-lg flex-shrink-0" />
                <span className="text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <PiEnvelope className="text-purple-400 text-lg flex-shrink-0" />
                <span className="text-gray-400">info@menudigital.ir</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 rounded-3xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black mb-2">در خبرنامه ما عضو شوید</h3>
              <p className="text-gray-400">آخرین اخبار و تخفیف‌ها را دریافت کنید</p>
            </div>
            <div className="flex flex-1 max-w-md">
              <input 
                type="email" 
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-4 py-3 bg-gray-700 rounded-r-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-l-2xl font-bold transition-all duration-300">
                عضویت
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col lg:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm mb-4 lg:mb-0">
            © ۲۰۲۳ منوی دیجیتال. تمام حقوق محفوظ است.
          </div>
          <div className="flex space-x-6 rtl:space-x-reverse text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors duration-300">قوانین</a>
            <a href="#" className="hover:text-white transition-colors duration-300">حریم خصوصی</a>
            <a href="#" className="hover:text-white transition-colors duration-300">کوکی‌ها</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;