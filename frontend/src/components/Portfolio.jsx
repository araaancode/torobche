import React from 'react';
import { PiForkKnife, PiCoffee, PiHamburger, PiArrowLeft, PiStar, PiClock, PiUsers, PiRocket, PiPhone } from 'react-icons/pi';

const Portfolio = () => {
  const projects = [
    {
      title: 'رستوران ایتالیایی ویلا',
      description: 'منوی دیجیتال کامل با قابلیت سفارش آنلاین برای یک رستوران ایتالیایی لوکس',
      category: 'رستوران',
      icon: <PiForkKnife className="text-4xl" />,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      stats: { orders: '۲,۵۰۰+', rating: '۴.۹', time: '۳۰٪' },
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'کافه بوتیک قهوه خانه',
      description: 'منوی اختصاصی برای یک کافه مدرن با امکان نمایش عکس‌های با کیفیت از محصولات',
      category: 'کافه',
      icon: <PiCoffee className="text-4xl" />,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80',
      stats: { orders: '۱,۸۰۰+', rating: '۴.۸', time: '۴۵٪' },
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'فست فود برگرلند',
      description: 'منوی جذاب و رنگارنگ برای یک فست فود با قابلیت دسته‌بندی محصولات',
      category: 'فست فود',
      icon: <PiHamburger className="text-4xl" />,
      image: 'https://images.unsplash.com/photo-1578474846611-2fe67db3f397?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      stats: { orders: '۳,۲۰۰+', rating: '۴.۷', time: '۵۰٪' },
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
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
            <PiStar className="text-yellow-500" />
            <span className="text-sm font-bold text-gray-700">نمونه کارهای موفق</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-6">
            نمونه‌های <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">واقعی</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            منوهای دیجیتالی که برای رستوران‌های مختلف طراحی کرده‌ایم و نتایج درخشان داشته‌اند
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-2xl text-sm font-bold">
                      {project.category}
                    </span>
                  </div>
                  <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${project.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                    {project.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse text-blue-600 mb-1">
                        <PiUsers />
                        <span className="text-lg font-black">{project.stats.orders}</span>
                      </div>
                      <div className="text-xs text-gray-500">سفارش ماهانه</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse text-yellow-500 mb-1">
                        <PiStar />
                        <span className="text-lg font-black">{project.stats.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500">امتیاز</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse text-green-500 mb-1">
                        <PiClock />
                        <span className="text-lg font-black">{project.stats.time}</span>
                      </div>
                      <div className="text-xs text-gray-500">صرفه‌جویی در زمان</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2 rtl:space-x-reverse">
                    <span>مشاهده دمو</span>
                    <PiArrowLeft />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">
              رستوران شما هم می‌تواند اینگونه باشد!
            </h3>
            <p className="text-blue-100 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              همین حالا شروع کنید و منوی دیجیتال اختصاصی خود را دریافت کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <PiRocket />
                <span>شروع رایگان</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border border-white/20 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <PiPhone />
                <span>مشاوره رایگان</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;