import React, { useState } from 'react';
import { PiCheck, PiStar, PiCrown, PiRocket, PiCheckCircle } from 'react-icons/pi';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'رایگان',
      price: { monthly: 0, yearly: 0 },
      description: 'مناسب برای شروع',
      popular: false,
      features: [
        '۱ منوی فعال',
        '۵۰ آیتم در منو',
        'آمار بازدید پایه',
        'پشتیبانی ایمیلی',
        'QR کد رایگان',
        'قالب استاندارد'
      ],
      buttonText: 'شروع رایگان',
      buttonColor: 'from-gray-600 to-gray-700'
    },
    {
      name: 'حرفه‌ای',
      price: { monthly: 29000, yearly: 290000 },
      description: 'مناسب برای رستوران‌ها',
      popular: true,
      features: [
        '۵ منوی فعال',
        '۲۰۰ آیتم در منو',
        'آمار پیشرفته',
        'پشتیبانی تلفنی',
        'QR کد اختصاصی',
        '۱۰ قالب حرفه‌ای',
        'سفارشی‌سازی لوگو',
        'پشتیبانی ۲۴/۷'
      ],
      buttonText: 'شروع حرفه‌ای',
      buttonColor: 'from-blue-600 to-purple-600'
    },
    {
      name: 'تجاری',
      price: { monthly: 59000, yearly: 590000 },
      description: 'مناسب برای برندها',
      popular: false,
      features: [
        'منوی نامحدود',
        'آیتم‌های نامحدود',
        'آمار کامل و آنالیتیکس',
        'پشتیبانی اختصاصی',
        'QR کد پیشرفته',
        'تمامی قالب‌ها',
        'سفارشی‌سازی کامل',
        'API دسترسی',
        'پشتیبانی VIP'
      ],
      buttonText: 'شروع تجاری',
      buttonColor: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8 text-center">
          <h1 className="text-4xl font-black gradient-text mb-4">تعرفه‌ها و قیمت‌ها</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            پلن مناسب کسب‌وکار خود را انتخاب کنید. همه پلن‌ها شامل ۱۴ روز试用 رایگان هستند
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="glass-effect rounded-2xl p-1 flex items-center">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-2xl font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              پرداخت ماهانه
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-2xl font-medium transition-all duration-300 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              پرداخت سالانه
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full mr-2">۲۰٪ تخفیف</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card rounded-3xl p-6 relative transition-all duration-300 hover-lift ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1 rtl:space-x-reverse">
                    <PiStar className="text-yellow-300" />
                    <span>پیشنهاد ویژه</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                  {plan.popular && <PiCrown className="text-yellow-500 text-xl" />}
                  <h3 className="text-2xl font-black text-gray-800">{plan.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center space-x-1 rtl:space-x-reverse">
                  <span className="text-4xl font-black text-gray-800">
                    {plan.price[billingCycle].toLocaleString()}
                  </span>
                  <span className="text-gray-600">تومان</span>
                </div>
                <div className="text-gray-500 text-sm">
                  {billingCycle === 'monthly' ? 'ماهیانه' : 'سالانه'}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                    <PiCheck className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full bg-gradient-to-r ${plan.buttonColor} hover:shadow-xl text-white py-3 rounded-2xl font-bold transition-all duration-300 hover-lift`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl hover-lift mb-16">
          <h2 className="text-2xl font-black text-center gradient-text mb-8">سوالات متداول</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'آیا می‌توانم پلن خود را بعداً تغییر دهم؟',
                answer: 'بله، شما در هر زمان می‌توانید پلن خود را ارتقا یا کاهش دهید.'
              },
              {
                question: 'آیا امکان کنسل کردن اشتراک وجود دارد؟',
                answer: 'بله، شما در هر زمان می‌توانید اشتراک خود را کنسل کنید.'
              },
              {
                question: 'پشتیبانی شامل چه چیزهایی می‌شود؟',
                answer: 'پشتیبانی بر اساس پلن انتخابی از ایمیل تا پشتیبانی تلفنی ۲۴/۷ متغیر است.'
              },
              {
                question: 'آیا امکان تست رایگان وجود دارد؟',
                answer: 'بله، همه پلن‌ها شامل ۱۴ روز试用 رایگان هستند.'
              }
            ].map((faq, index) => (
              <div key={index} className="glass-effect rounded-2xl p-4 hover-lift">
                <h4 className="font-bold text-gray-800 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;