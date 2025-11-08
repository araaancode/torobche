import React from 'react';
import { PiPlayCircle, PiCards, PiQrCode, PiArrowDown, PiForkKnife, PiUserCircle, PiFileText, PiBuilding, PiStar } from 'react-icons/pi';

const Hero = () => {
  const cardTypes = [
    { name: 'منوی رستوران', icon: <PiForkKnife className="text-xl" />, color: 'from-orange-500 to-red-500' },
    { name: 'کارت مطب', icon: <PiUserCircle className="text-xl" />, color: 'from-green-500 to-teal-500' },
    { name: 'رزومه دیجیتال', icon: <PiFileText className="text-xl" />, color: 'from-blue-500 to-cyan-500' },
    { name: 'کارت کسب‌وکار', icon: <PiBuilding className="text-xl" />, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden pt-32 pb-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Content Section */}
          <div className="lg:w-1/2 text-center lg:text-right">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 mb-8 shadow-xl border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-sm font-bold text-gray-700">پلتفرم شماره ۱ کارت دیجیتال</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                کارت دیجیتال
              </span>
              <br />
              <span className="text-gray-800">هوشمند برای</span>
              <br />
              <span className="text-gray-800">هر نیازی</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              با <span className="font-bold text-blue-600">کارت‌ساز</span> ما، کارت دیجیتال حرفه‌ای برای 
              <span className="font-bold text-purple-600"> رستوران، مطب، رزومه و کسب‌وکار</span> خود ایجاد کنید.
            </p>

            {/* Card Types */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {cardTypes.map((type, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-2 transform group-hover:scale-110 transition-transform duration-300`}>
                    {type.icon}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{type.name}</div>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl overflow-hidden flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <PiPlayCircle className="text-xl" />
                <span>مشاهده دمو زنده</span>
              </button>
              
              <button className="group bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-xl border border-white/50 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <PiCards className="text-purple-600 text-xl" />
                <span>ساخت کارت رایگان</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start space-x-8 rtl:space-x-reverse">
              <div className="text-center">
                <div className="text-2xl font-black text-gray-800">۱۰,۰۰۰+</div>
                <div className="text-gray-600 text-sm">کارت فعال</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-black text-gray-800">۹۸٪</div>
                <div className="text-gray-600 text-sm">رضایت مشتری</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-black text-gray-800">۲۴/۷</div>
                <div className="text-gray-600 text-sm">پشتیبانی</div>
              </div>
            </div>
          </div>
          
          {/* Card Preview Section */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Floating Animation Container */}
              <div className="animate-float">
                {/* Main Card with Restaurant Image */}
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  {/* Restaurant Image Section */}
                  <div className="relative h-64">
                    <img 
                      src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
                      alt="رستوران برگرلند"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Restaurant Logo/Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-2xl">
                        <PiForkKnife className="text-2xl text-orange-500" />
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-2xl flex items-center space-x-1 rtl:space-x-reverse">
                        <PiStar className="text-yellow-400 fill-current" />
                        <span className="font-bold text-gray-800">۴.۸</span>
                      </div>
                    </div>

                    {/* Restaurant Name */}
                    <div className="absolute bottom-4 right-4">
                      <h3 className="text-2xl font-black text-white drop-shadow-lg">برگرلند</h3>
                      <p className="text-white/90 text-sm drop-shadow">رستوران فست فود</p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Quick Info */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-black text-gray-800 mb-1">۳۰+</div>
                        <div className="text-gray-500 text-xs">انواع برگر</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-gray-800 mb-1">۱۵′</div>
                        <div className="text-gray-500 text-xs">آماده‌سازی</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-gray-800 mb-1">۲۴/۷</div>
                        <div className="text-gray-500 text-xs">سرویس‌دهی</div>
                      </div>
                    </div>

                    {/* Featured Item */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 mb-4 border border-orange-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-black text-gray-800 text-lg">برگر ویژه</h4>
                          <p className="text-gray-600 text-sm">گوشت آنگری، پنیر چدار، قارچ</p>
                        </div>
                        <div className="text-left">
                          <div className="text-xl font-black text-orange-600">۴۵,۰۰۰</div>
                          <div className="text-gray-500 text-xs">تومان</div>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-green-50 rounded-2xl p-3 border border-green-200">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-bold text-sm">همین حالا باز است</span>
                    </div>
                  </div>
                </div>
                
                {/* QR Code Card */}
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 transform -rotate-6">
                  <div className="w-28 h-28 bg-white rounded-xl flex items-center justify-center shadow-inner">
                    <div className="w-20 h-20 border-4 border-gray-800 flex items-center justify-center">
                      <PiQrCode className="text-gray-800 text-2xl" />
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs font-bold text-gray-700">اسکن برای منو</span>
                  </div>
                </div>

                {/* Delivery Badge */}
                {/* <div className="absolute -top-4 -right-4">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-2xl shadow-2xl">
                    <div className="text-center">
                      <div className="text-xs font-bold">تحویل رایگان</div>
                      <div className="text-[10px] opacity-90">سفارش بالای ۵۰٬۰۰۰</div>
                    </div>
                  </div>
                </div> */}
              </div>
              
              {/* Background Decorations */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-400 rounded-3xl blur-2xl opacity-30 -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-cyan-400 rounded-3xl blur-2xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-gray-600 text-sm font-medium">اسکرول کنید</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <PiArrowDown className="w-1 h-3 text-gray-400 mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;