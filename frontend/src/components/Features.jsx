import React from 'react';
import { PiQrCode, PiChartLine, PiPalette, PiLightning, PiShieldCheck, PiArrowsClockwise, PiStar, PiPlay, PiArrowLeft, PiForkKnife, PiUserCircle, PiFileText, PiBuilding } from 'react-icons/pi';

const Features = () => {
  const features = [
    {
      icon: <PiQrCode className="text-2xl" />,
      title: 'QR کد هوشمند',
      description: 'QR کدهای داینامیک و قابل پیگیری برای هر نوع کارت دیجیتال',
      color: 'from-blue-500 to-cyan-500',
      stats: '۱۰۰٪ خودکار'
    },
    {
      icon: <PiPalette className="text-2xl" />,
      title: 'قالب‌های متنوع',
      description: 'صدها قالب آماده برای رستوران، مطب، رزومه و کسب‌وکار',
      color: 'from-purple-500 to-pink-500',
      stats: '۵۰+ قالب'
    },
    {
      icon: <PiLightning className="text-2xl" />,
      title: 'ساخت سریع',
      description: 'کارت دیجیتال خود را در کمتر از ۵ دقیقه ایجاد کنید',
      color: 'from-green-500 to-teal-500',
      stats: '۵ دقیقه‌ای'
    },
    {
      icon: <PiChartLine className="text-2xl" />,
      title: 'آنالیتیکس پیشرفته',
      description: 'تحلیل بازدیدها و تعاملات با کارت دیجیتال شما',
      color: 'from-orange-500 to-red-500',
      stats: '۴۰+ متریک'
    },
    {
      icon: <PiShieldCheck className="text-2xl" />,
      title: 'امنیت بالا',
      description: 'رمزنگاری پیشرفته و محافظت از اطلاعات شما',
      color: 'from-indigo-500 to-blue-500',
      stats: '۱۰۰٪ امن'
    },
    {
      icon: <PiArrowsClockwise className="text-2xl" />,
      title: 'همگام‌سازی آنی',
      description: 'بروزرسانی لحظه‌ای در تمام پلتفرم‌ها',
      color: 'from-yellow-500 to-orange-500',
      stats: '۰ تاخیر'
    }
  ];

  const useCases = [
    {
      icon: <PiForkKnife className="text-2xl" />,
      title: 'منوی رستوران',
      description: 'منوی دیجیتال تعاملی با قابلیت سفارش آنلاین'
    },
    {
      icon: <PiUserCircle className="text-2xl" />,
      title: 'کارت مطب',
      description: 'کارت دیجیتال پزشکان با قابلیت نوبت‌گیری'
    },
    {
      icon: <PiFileText className="text-2xl" />,
      title: 'رزومه دیجیتال',
      description: 'رزومه حرفه‌ای با قابلیت اشتراک‌گذاری آسان'
    },
    {
      icon: <PiBuilding className="text-2xl" />,
      title: 'کارت کسب‌وکار',
      description: 'کارت ویزیت دیجیتال با امکانات پیشرفته'
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 mb-6 shadow-lg border border-white/20">
            <PiStar className="text-yellow-500" />
            <span className="text-sm font-bold text-gray-700">ویژگی‌های منحصربه‌فرد</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-6">
            چرا <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">کارت‌ساز</span> ما؟
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            با قابلیت‌های پیشرفته‌ای که ساخت کارت دیجیتال را برای هر نیازی متحول می‌کند
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 h-full border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-white/20">
                    <span className="text-xs font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {index + 1}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {feature.title}
                    </h3>
                    <span className="text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full">
                      {feature.stats}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-bold">اطلاعات بیشتر</span>
                    <PiArrowLeft className="text-sm" />
                  </div>
                </div>
              </div>
              
              {/* Hover Effect Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Use Cases Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-12">
            مناسب برای <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">هر نیازی</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                  {useCase.icon}
                </div>
                <h4 className="text-xl font-black text-gray-800 mb-2">{useCase.title}</h4>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border border-white/20 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-4">
              آماده <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ساخت</span> کارت دیجیتال خود هستید؟
            </h3>
            <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              همین حالا شروع کنید و در کمتر از ۵ دقیقه اولین کارت دیجیتال خود را بسازید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <PiLightning />
                <span>شروع رایگان</span>
              </button>
              <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-xl border border-white/50 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <PiPlay />
                <span>مشاهده ویدیو</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;