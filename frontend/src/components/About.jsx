import React from 'react';
import { PiUsers, PiCoffee, PiChartLine, PiShieldCheck, PiClock, PiStar, PiLightning, PiHandshake, PiTrophy } from 'react-icons/pi';

const About = () => {
  const stats = [
    { number: '۵۰۰+', label: 'رستوران فعال', icon: <PiCoffee className="text-2xl" />, color: 'text-blue-600' },
    { number: '۵۰,۰۰۰+', label: 'سفارش روزانه', icon: <PiChartLine className="text-2xl" />, color: 'text-green-600' },
    { number: '۹۸٪', label: 'رضایت مشتری', icon: <PiUsers className="text-2xl" />, color: 'text-purple-600' },
    { number: '۲۴/۷', label: 'پشتیبانی', icon: <PiShieldCheck className="text-2xl" />, color: 'text-orange-600' }
  ];

  const values = [
    {
      icon: <PiLightning className="text-3xl" />,
      title: 'نوآوری',
      description: 'همیشه در حال توسعه ویژگی‌های جدید و بهبود تجربه کاربری هستیم',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <PiHandshake className="text-3xl" />,
      title: 'اعتماد',
      description: 'شفافیت و صداقت اساس رابطه ما با مشتریان است',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: <PiStar className="text-3xl" />,
      title: 'کیفیت',
      description: 'بالاترین استانداردهای کیفیت در تمام محصولات و خدمات',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <PiClock className="text-3xl" />,
      title: 'پشتیبانی',
      description: 'پشتیبانی ۲۴ ساعته برای حل سریع مشکلات شما',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 mb-6 shadow-lg border border-white/20">
              <PiStar className="text-blue-500" />
              <span className="text-sm font-bold text-gray-700">درباره ما</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-6">
              داستان <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">موفقیت</span> ما
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              ما در تیم <span className="font-bold text-blue-600">منوی دیجیتال</span>، با هدف تسهیل فرآیند سفارش‌گیری و بهبود تجربه مشتری در رستوران‌ها و کافه‌ها گرد هم آمدیم.
            </p>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              با توجه به رشد روزافزون استفاده از تلفن‌های هوشمند و نیاز به کاهش تماس فیزیکی، راهکار منوی دیجیتال را توسعه دادیم که هم برای صاحبان رستوران و هم برای مشتریان مزایای بسیاری دارد.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              تیم ما متشکل از متخصصان طراحی، توسعه و بازاریابی است که با همکاری یکدیگر، بهترین تجربه کاربری را برای شما و مشتریان‌تان فراهم می‌کنند.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
                <PiHandshake />
                <span>همکاری با ما</span>
              </button>
              <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-xl border border-white/50 flex items-center space-x-2 rtl:space-x-reverse">
                <PiUsers />
                <span>مشاهده تیم</span>
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="lg:w-1/2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100">
                    <div className={`${stat.color} mb-3 flex justify-center`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-black text-gray-800 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Achievement Badge */}
              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl text-white text-center">
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                  <PiTrophy className="text-2xl" />
                  <span className="text-lg font-bold">برنده جایزه بهترین استارتاپ ۱۴۰۲</span>
                </div>
                <p className="text-yellow-100 text-sm">توسط انجمن فناوری اطلاعات ایران</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-12">
            ارزش‌های <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ما</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                  <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    {value.icon}
                  </div>
                  
                  <h4 className="text-2xl font-black text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {value.title}
                  </h4>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;