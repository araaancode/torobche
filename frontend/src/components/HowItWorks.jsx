import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'ثبت نام سریع',
      description: 'در کمتر از ۲ دقیقه ثبت نام کنید و پنل مدیریت را فعال نمایید',
      icon: 'fa-user-plus',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'طراحی منو',
      description: 'منوی خود را با عکس‌های باکیفیت و توضیحات جذاب طراحی کنید',
      icon: 'fa-palette',
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'دریافت QR کد',
      description: 'QR کدهای اختصاصی برای هر میز دریافت و چاپ کنید',
      icon: 'fa-qrcode',
      color: 'from-green-500 to-teal-500'
    },
    {
      number: '04',
      title: 'شروع کار',
      description: 'مشتریان با اسکن کد، منو را مشاهده و سفارش می‌دهند',
      icon: 'fa-rocket',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236667ee' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 mb-6 shadow-lg border border-white/20">
            <i className="fas fa-play-circle text-blue-500"></i>
            <span className="text-sm font-bold text-gray-700">آموزش سریع</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-6">
            در <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">۴ مرحله</span> ساده
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            منوی دیجیتال خود را راه‌اندازی کنید و تجربه جدیدی برای مشتریان ایجاد نمایید
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-white font-black text-lg">{step.number}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <i className={`fas ${step.icon} text-white text-2xl`}></i>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.description}
                  </p>
                  
                  {/* Arrow for Desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                        <i className="fas fa-arrow-left text-blue-500 text-lg"></i>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">
              همین حالا شروع کنید!
            </h3>
            <p className="text-blue-100 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              نیازی به منتظر ماندن نیست. همین الان اولین منوی دیجیتال خود را بسازید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <i className="fas fa-play"></i>
                <span>شروع رایگان</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border border-white/20 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <i className="fas fa-question-circle"></i>
                <span>راهنمایی می‌خواهید؟</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;