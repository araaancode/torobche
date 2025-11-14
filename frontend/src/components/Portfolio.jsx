import React, { useState } from 'react';
import { 
  PiForkKnife, 
  PiCoffee, 
  PiHamburger, 
  PiArrowLeft, 
  PiStar, 
  PiClock, 
  PiUsers, 
  PiRocket, 
  PiPhone,
  PiCrown,
  PiTrendUp,
  PiShieldCheck,
  PiWhatsappLogo,
  PiInstagramLogo,
  PiPlay
} from 'react-icons/pi';

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: 'رستوران ایتالیایی ویلا',
      description: 'منوی دیجیتال کامل با قابلیت سفارش آنلاین برای یک رستوران ایتالیایی لوکس. افزایش ۴۰٪ی سفارشات آنلاین در ماه اول.',
      category: 'رستوران',
      icon: <PiForkKnife className="text-2xl" />,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      stats: { orders: '۲,۵۰۰+', rating: '۴.۹', time: '۳۰٪' },
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50',
      features: ['سفارش آنلاین', 'پشتیبانی ۲۴/۷', 'آنالیز فروش']
    },
    {
      title: 'کافه بوتیک قهوه خانه',
      description: 'منوی اختصاصی برای یک کافه مدرن با امکان نمایش عکس‌های با کیفیت از محصولات. رشد ۶۰٪ی مشتریان ثابت.',
      category: 'کافه',
      icon: <PiCoffee className="text-2xl" />,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2047&q=80',
      stats: { orders: '۱,۸۰۰+', rating: '۴.۸', time: '۴۵٪' },
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      features: ['گالری محصولات', 'سیستم امتیازدهی', 'پیشنهادات هوشمند']
    },
    {
      title: 'فست فود برگرلند',
      description: 'منوی جذاب و رنگارنگ برای یک فست فود با قابلیت دسته‌بندی محصولات. کاهش ۵۰٪ی زمان انتظار مشتری.',
      category: 'فست فود',
      icon: <PiHamburger className="text-2xl" />,
      image: 'https://images.unsplash.com/photo-1578474846611-2fe67db3f397?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      stats: { orders: '۳,۲۰۰+', rating: '۴.۷', time: '۵۰٪' },
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      features: ['دسته‌بندی هوشمند', 'سفارش سریع', 'پیگیری لحظه‌ای']
    }
  ];

  const benefits = [
    { icon: <PiTrendUp className="text-2xl" />, text: 'افزایش ۳۰ تا ۶۰٪ی فروش', color: 'text-green-500' },
    { icon: <PiClock className="text-2xl" />, text: 'صرفه‌جویی ۴۰٪ در زمان', color: 'text-blue-500' },
    { icon: <PiShieldCheck className="text-2xl" />, text: 'پشتیبانی ۲۴ ساعته', color: 'text-purple-500' },
    { icon: <PiCrown className="text-2xl" />, text: 'رتبه برتر در فروشگاه‌ها', color: 'text-yellow-500' }
  ];

  return (
    <section id="portfolio" className="relative min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 opacity-10 animate-float">
        <PiForkKnife className="text-6xl text-blue-500" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 animate-float-delayed">
        <PiCoffee className="text-6xl text-purple-500" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-3 mb-8 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <PiStar className="text-yellow-500 animate-pulse" />
            <span className="text-sm font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              نمونه کارهای موفق
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            نمونه‌های <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">واقعی</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            منوهای دیجیتالی که برای رستوران‌های مختلف طراحی کرده‌ایم و نتایج 
            <span className="font-bold text-blue-600"> درخشان </span>
            داشته‌اند
          </p>
        </div>

        {/* Benefits Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/40">
              <div className={`${benefit.color} mb-2 flex justify-center`}>
                {benefit.icon}
              </div>
              <span className="text-sm font-bold text-gray-800">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`group relative ${project.bgColor} rounded-3xl overflow-hidden border border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 backdrop-blur-sm`}
              onMouseEnter={() => setActiveProject(index)}
            >
              
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-2xl text-sm font-bold shadow-lg">
                    {project.category}
                  </span>
                  <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-2xl flex items-center justify-center shadow-2xl text-white transform group-hover:rotate-12 transition-transform duration-300`}>
                    {project.icon}
                  </div>
                </div>

                {/* Play Demo Button */}
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl">
                  <PiPlay className="text-2xl text-gray-800" />
                </button>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                  {project.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.features.map((feature, idx) => (
                    <span key={idx} className="bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-xl text-xs font-medium border border-white/40">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/40">
                    <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                      <PiUsers className="text-lg" />
                      <span className="text-lg font-black">{project.stats.orders}</span>
                    </div>
                    <div className="text-xs text-gray-600 font-medium">سفارش ماهانه</div>
                  </div>
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/40">
                    <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                      <PiStar className="text-lg" />
                      <span className="text-lg font-black">{project.stats.rating}</span>
                    </div>
                    <div className="text-xs text-gray-600 font-medium">امتیاز</div>
                  </div>
                  <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/40">
                    <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                      <PiClock className="text-lg" />
                      <span className="text-lg font-black">{project.stats.time}</span>
                    </div>
                    <div className="text-xs text-gray-600 font-medium">صرفه‌جویی در زمان</div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group/btn">
                  <span>مشاهده دمو</span>
                  <PiArrowLeft className="transform group-hover/btn:-translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl max-w-6xl mx-auto relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                رستوران شما هم می‌تواند اینگونه باشد!
              </h3>
              <p className="text-blue-100 text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                همین حالا شروع کنید و منوی دیجیتال اختصاصی خود را دریافت کنید
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center gap-2 min-w-[200px] group/cta">
                  <PiRocket className="transform group-hover/cta:-translate-y-1 transition-transform duration-300" />
                  <span>شروع رایگان</span>
                </button>
                
                <button className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border border-white/40 flex items-center justify-center gap-2 min-w-[200px] group/consult">
                  <PiPhone className="transform group-hover/consult:scale-110 transition-transform duration-300" />
                  <span>مشاوره رایگان</span>
                </button>

                <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center gap-2 min-w-[200px] group/whatsapp">
                  <PiWhatsappLogo className="transform group-hover/whatsapp:scale-110 transition-transform duration-300" />
                  <span>واتساپ</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <PiShieldCheck className="text-xl" />
                  <span className="text-sm font-medium">ضمانت بازگشت وجه</span>
                </div>
                <div className="flex items-center gap-2">
                  <PiClock className="text-xl" />
                  <span className="text-sm font-medium">راه‌اندازی ۲۴ ساعته</span>
                </div>
                <div className="flex items-center gap-2">
                  <PiInstagramLogo className="text-xl" />
                  <span className="text-sm font-medium">پشتیبانی شبکه‌های اجتماعی</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;