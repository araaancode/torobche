import React from 'react';
import { 
  PiPlayCircle, 
  PiCards, 
  PiQrCode, 
  PiArrowDown, 
  PiForkKnife, 
  PiUserCircle, 
  PiFileText, 
  PiBuilding, 
  PiStar,
  PiClock,
  PiHamburger,
  PiCheckCircle,
  PiSparkle,
  PiCrown
} from 'react-icons/pi';

const Hero = () => {
  const cardTypes = [
    { 
      name: 'منوی رستوران', 
      icon: <PiForkKnife className="text-2xl" />, 
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      borderColor: 'border-orange-200'
    },
    { 
      name: 'کارت مطب', 
      icon: <PiUserCircle className="text-2xl" />, 
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-teal-50',
      borderColor: 'border-green-200'
    },
    { 
      name: 'رزومه دیجیتال', 
      icon: <PiFileText className="text-2xl" />, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    { 
      name: 'کارت کسب‌وکار', 
      icon: <PiBuilding className="text-2xl" />, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      borderColor: 'border-purple-200'
    }
  ];

  const features = [
    { icon: <PiCheckCircle className="text-green-500" />, text: 'ساخت در ۵ دقیقه' },
    { icon: <PiCheckCircle className="text-green-500" />, text: 'پشتیبانی ۲۴/۷' },
    { icon: <PiCheckCircle className="text-green-500" />, text: 'به‌روزرسانی رایگان' }
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 md:w-96 md:h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 md:w-96 md:h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-20">
          
          {/* Content Section */}
          <div className="lg:w-1/2 text-center lg:text-right order-2 lg:order-1">
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/90 backdrop-blur-lg rounded-2xl px-4 py-3 mb-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <PiCrown className="text-yellow-500 text-lg" />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-bold text-gray-800 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                پلتفرم شماره ۱ کارت دیجیتال
              </span>
              <PiSparkle className="text-purple-500 text-lg" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 lg:mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                کارت دیجیتال
              </span>
              <br />
              <span className="text-gray-900">هوشمند برای</span>
              <br />
              <span className="text-gray-900">هر نیازی</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              با <span className="font-black text-blue-600">کارت‌ساز</span> ما، کارت دیجیتال حرفه‌ای برای 
              <span className="font-black text-purple-600"> رستوران، مطب، رزومه و کسب‌وکار</span> خود ایجاد کنید.
            </p>

            {/* Features List */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6 lg:mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                  {feature.icon}
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Card Types */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 mb-8 lg:mb-12">
              {cardTypes.map((type, index) => (
                <div key={index} className="text-center group cursor-pointer transform hover:-translate-y-2 transition-all duration-300">
                  <div className={`${type.bgColor} border ${type.borderColor} rounded-2xl p-4 shadow-lg mx-auto mb-3 transform group-hover:scale-110 transition-transform duration-300 group-hover:shadow-2xl`}>
                    <div className={`w-14 h-14 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-2`}>
                      {type.icon}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {type.name}
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 lg:mb-12">
              <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl overflow-hidden flex items-center justify-center space-x-2 rtl:space-x-reverse min-w-[200px]">
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <PiPlayCircle className="text-xl" />
                <span className="relative z-10">مشاهده دمو زنده</span>
              </button>
              
              <button className="group bg-white/90 backdrop-blur-lg hover:bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl border border-white/50 flex items-center justify-center space-x-2 rtl:space-x-reverse min-w-[200px]">
                <PiCards className="text-purple-600 text-xl" />
                <span>ساخت کارت رایگان</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 lg:space-x-8 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/50">
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-black text-gray-900">۱۰,۰۰۰+</div>
                <div className="text-gray-600 text-xs lg:text-sm">کارت فعال</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-black text-gray-900">۹۸٪</div>
                <div className="text-gray-600 text-xs lg:text-sm">رضایت مشتری</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-black text-gray-900">۲۴/۷</div>
                <div className="text-gray-600 text-xs lg:text-sm">پشتیبانی</div>
              </div>
            </div>
          </div>
          
          {/* Card Preview Section */}
          <div className="lg:w-1/2 relative order-1 lg:order-2 mb-12 lg:mb-0">
            <div className="relative max-w-lg mx-auto lg:mx-0 lg:max-w-none">
              {/* Floating Animation Container */}
              <div className="animate-float">
                {/* Main Card with Restaurant Image */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-3xl border border-white/30 transform rotate-3 hover:rotate-0 transition-transform duration-500 hover:shadow-4xl">
                  
                  {/* Restaurant Image Section */}
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <img 
                      src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
                      alt="رستوران برگرلند"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Restaurant Logo/Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-3 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                        <PiHamburger className="text-2xl text-orange-500" />
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/95 backdrop-blur-lg rounded-2xl px-3 py-2 shadow-2xl flex items-center space-x-1 rtl:space-x-reverse transform hover:scale-105 transition-transform duration-300">
                        <PiStar className="text-yellow-400 fill-current" />
                        <span className="font-black text-gray-900">۴.۸</span>
                      </div>
                    </div>

                    {/* Restaurant Name */}
                    <div className="absolute bottom-4 right-4">
                      <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-2xl">برگرلند</h3>
                      <p className="text-white/90 text-sm drop-shadow-lg">رستوران فست فود</p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6">
                    {/* Quick Info */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="text-center bg-gray-50 rounded-2xl p-3 transform hover:scale-105 transition-transform duration-300">
                        <div className="text-lg sm:text-2xl font-black text-gray-900 mb-1">۳۰+</div>
                        <div className="text-gray-500 text-xs">انواع برگر</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-2xl p-3 transform hover:scale-105 transition-transform duration-300">
                        <PiClock className="mx-auto text-blue-500 text-lg mb-1" />
                        <div className="text-xs text-gray-500">آماده‌سازی</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-2xl p-3 transform hover:scale-105 transition-transform duration-300">
                        <div className="text-lg sm:text-2xl font-black text-gray-900 mb-1">۲۴/۷</div>
                        <div className="text-gray-500 text-xs">سرویس‌دهی</div>
                      </div>
                    </div>

                    {/* Featured Item */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 mb-4 border border-orange-200 transform hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-black text-gray-900 text-base sm:text-lg">برگر ویژه</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">گوشت آنگری، پنیر چدار، قارچ</p>
                        </div>
                        <div className="text-left">
                          <div className="text-lg sm:text-xl font-black text-orange-600">۴۵,۰۰۰</div>
                          <div className="text-gray-500 text-xs">تومان</div>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-3 border border-green-300 transform hover:scale-105 transition-transform duration-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-800 font-bold text-sm">همین حالا باز است</span>
                    </div>
                  </div>
                </div>
                
                {/* QR Code Card */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-3xl border border-white/30 transform -rotate-6 hover:rotate-0 transition-transform duration-300 hover:shadow-4xl">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-xl flex items-center justify-center shadow-inner border border-gray-200">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-900 flex items-center justify-center rounded">
                      <PiQrCode className="text-gray-900 text-xl sm:text-2xl" />
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs font-bold text-gray-900">اسکن برای منو</span>
                  </div>
                </div>

                {/* Delivery Badge */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 transform hover:scale-110 transition-transform duration-300">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-2xl shadow-3xl">
                    <div className="text-center">
                      <div className="text-xs font-black">تحویل رایگان</div>
                      <div className="text-[10px] opacity-90">سفارش بالای ۵۰٬۰۰۰</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute -top-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-400 rounded-3xl blur-2xl opacity-30 -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-28 h-28 sm:w-40 sm:h-40 bg-cyan-400 rounded-3xl blur-2xl opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-gray-600 text-sm font-medium">اسکرول کنید</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center backdrop-blur-sm bg-white/50">
            <PiArrowDown className="w-1 h-3 text-gray-600 mt-2 animate-bounce" />
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

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .shadow-4xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
        }

        .hover\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
};

export default Hero;