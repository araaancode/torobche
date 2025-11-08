import React, { useState } from 'react';
import { PiCheck, PiX, PiCrown, PiRocket, PiBuilding, PiLightning, PiShieldCheck, PiChartLine, PiInfinity, PiClock, PiStar } from 'react-icons/pi';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'پایه',
      price: { monthly: 'رایگان', yearly: 'رایگان' },
      description: 'مناسب برای رستوران‌های کوچک',
      icon: <PiRocket className="text-2xl" />,
      color: 'from-blue-500 to-cyan-500',
      features: [
        { text: 'منوی دیجیتال پایه', included: true },
        { text: 'QR کد اختصاصی', included: true },
        { text: 'پشتیبانی ایمیلی', included: true },
        { text: '۱۰۰ سفارش در ماه', included: true },
        { text: 'گزارش‌های پیشرفته', included: false },
        { text: 'برندسازی اختصاصی', included: false },
        { text: 'آنالیتیکس پیشرفته', included: false }
      ],
      popular: false
    },
    {
      name: 'حرفه‌ای',
      price: { monthly: '۹۹,۰۰۰', yearly: '۹۹۰,۰۰۰' },
      description: 'مناسب برای رستوران‌های متوسط',
      icon: <PiCrown className="text-2xl" />,
      color: 'from-purple-500 to-pink-500',
      features: [
        { text: 'همه امکانات پلن پایه', included: true },
        { text: 'گزارش‌های پیشرفته', included: true },
        { text: 'برندسازی اختصاصی', included: true },
        { text: 'پشتیبانی تلفنی', included: true },
        { text: 'آنالیز فروش', included: true },
        { text: 'سفارش‌های نامحدود', included: true },
        { text: 'API دسترسی', included: false }
      ],
      popular: true
    },
    {
      name: 'سازمانی',
      price: { monthly: '۱۹۹,۰۰۰', yearly: '۱,۹۹۰,۰۰۰' },
      description: 'مناسب برای رستوران‌های زنجیره‌ای',
      icon: <PiBuilding className="text-2xl" />,
      color: 'from-orange-500 to-red-500',
      features: [
        { text: 'همه امکانات پلن حرفه‌ای', included: true },
        { text: 'چند شعبه', included: true },
        { text: 'API اختصاصی', included: true },
        { text: 'پشتیبانی VIP', included: true },
        { text: 'امنیت پیشرفته', included: true },
        { text: 'شخصی‌سازی کامل', included: true },
        { text: 'مشاوره اختصاصی', included: true }
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 mb-6 shadow-lg border border-white/20">
            <PiStar className="text-yellow-500" />
            <span className="text-sm font-bold text-gray-700">قیمت‌گذاری منصفانه</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-6">
            پلن‌های <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">قیمت‌گذاری</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            پلن مناسب برای رستوران‌های کوچک و بزرگ با امکانات متنوع
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              ماهانه
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              سالانه (۲۰٪ تخفیف)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group ${
                plan.popular ? 'lg:scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-2xl font-bold shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
                    <PiStar className="text-yellow-300" />
                    <span>پیشنهادی</span>
                  </div>
                </div>
              )}

              <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 h-full border-2 transition-all duration-500 hover:scale-105 ${
                plan.popular
                  ? 'border-purple-500 shadow-2xl'
                  : 'border-white/20 shadow-xl hover:shadow-2xl'
              }`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                    <span className="text-4xl lg:text-5xl font-black text-gray-800">
                      {plan.price[billingCycle]}
                    </span>
                    {plan.price[billingCycle] !== 'رایگان' && (
                      <span className="text-gray-600 text-lg">تومان</span>
                    )}
                  </div>
                  {plan.price[billingCycle] !== 'رایگان' && (
                    <div className="text-gray-500">
                      {billingCycle === 'yearly' ? 'سالانه' : 'ماهانه'}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3 rtl:space-x-reverse">
                      {feature.included ? (
                        <PiCheck className="text-green-500 text-lg flex-shrink-0" />
                      ) : (
                        <PiX className="text-gray-300 text-lg flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:scale-105'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl hover:scale-105'
                }`}>
                  {plan.price[billingCycle] === 'رایگان' ? 'شروع رایگان' : 'انتخاب پلن'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-white/20 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-800 mb-6">
              سوالی دارید؟
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <PiShieldCheck className="text-3xl text-blue-600" />
                <div className="text-lg font-bold text-gray-800">ضمانت بازگشت وجه</div>
                <p className="text-gray-600 text-sm">۳۰ روز ضمانت بازگشت وجه</p>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <PiClock className="text-3xl text-green-600" />
                <div className="text-lg font-bold text-gray-800">راه‌اندازی سریع</div>
                <p className="text-gray-600 text-sm">راه‌اندازی در کمتر از ۵ دقیقه</p>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <PiInfinity className="text-3xl text-purple-600" />
                <div className="text-lg font-bold text-gray-800">آپدیت رایگان</div>
                <p className="text-gray-600 text-sm">همه آپدیت‌ها رایگان هستند</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;