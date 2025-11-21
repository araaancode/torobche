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
      buttonColor: 'from-gray-600 to-gray-700',
      icon: <PiRocket className="text-2xl" />
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
      buttonColor: 'from-blue-600 to-purple-600',
      icon: <PiCrown className="text-2xl" />
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
      buttonColor: 'from-orange-500 to-red-500',
      icon: <PiStar className="text-2xl" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section - Matching Hero Style */}
        <div className="pt-32 pb-8 text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/90 backdrop-blur-lg rounded-2xl px-4 py-2 mb-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <PiCrown className="text-yellow-500 text-base group-hover:scale-110 transition-transform duration-300" />
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping backdrop-blur-sm" />
            </div>
            <span className="text-xs font-black text-gray-800 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              پلن‌های قیمت‌گذاری
            </span>
            <PiStar className="text-purple-500 text-base group-hover:rotate-180 transition-transform duration-500" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
              تعرفه‌ها
            </span>
            <br />
            <span className="text-gray-900">و قیمت‌ها</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
            پلن مناسب کسب‌وکار خود را انتخاب کنید. همه پلن‌ها شامل ۱۴ روز تست رایگان هستند
          </p>
        </div>

        {/* Billing Toggle - Matching Hero Style */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-1 flex items-center shadow-lg border border-white/30">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span>پرداخت ماهانه</span>
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span>پرداخت سالانه</span>
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">۲۰٪ تخفیف</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white/95 backdrop-blur-xl rounded-3xl p-6 relative transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/30 ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105 shadow-2xl' : 'shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1 rtl:space-x-reverse shadow-lg">
                    <PiStar className="text-yellow-300" />
                    <span>پیشنهاد ویژه</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${plan.buttonColor} text-white shadow-lg`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-800">{plan.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
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

              {/* Features List */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                    <PiCheckCircle className="text-green-500 flex-shrink-0 text-lg" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full bg-gradient-to-r ${plan.buttonColor} hover:shadow-xl text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Stats Section - Matching Hero Stats */}
        <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 mb-16">
          {[
            { value: '۱۰,۰۰۰+', label: 'کاربر فعال', trend: '+۲۴٪' },
            { value: '۹۸٪', label: 'رضایت مشتری', trend: '+۵٪' },
            { value: '۲۴/۷', label: 'پشتیبانی', trend: '۱۰۰٪' }
          ].map((stat, index) => (
            <React.Fragment key={index}>
              <div className="text-center transform transition-all duration-700 ease-out">
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-1">
                  <div className="text-xl lg:text-2xl font-black text-gray-900">
                    {stat.value}
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-bold backdrop-blur-sm">
                    {stat.trend}
                  </span>
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
              {index < 2 && (
                <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 mb-16 border border-white/30">
          <h2 className="text-2xl font-black text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            سوالات متداول
          </h2>
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
                answer: 'بله، همه پلن‌ها شامل ۱۴ روز تست رایگان هستند.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 hover:scale-105 transition-all duration-300 shadow-lg border border-white/30">
                <h4 className="font-bold text-gray-800 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-20px); 
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-position: right center;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }

        .shadow-2xl {
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Pricing;