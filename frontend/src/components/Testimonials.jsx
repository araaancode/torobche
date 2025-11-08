import React from 'react';
import { PiStar, PiQuotes, PiUser, PiCoffee, PiForkKnife, PiHamburger } from 'react-icons/pi';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'علی رضایی',
      position: 'مدیر رستوران ایتالیایی ویلا',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      content: 'با استفاده از این سرویس، زمان سفارش‌گیری ۴۰٪ کاهش یافته و رضایت مشتریان ما به شدت افزایش پیدا کرده است. مشتریان از تجربه مدرن سفارش‌دهی لذت می‌برند.',
      rating: 5,
      icon: <PiForkKnife className="text-blue-500" />
    },
    {
      name: 'مریم کریمی',
      position: 'مالک کافه بوتیک قهوه خانه',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      content: 'منوی دیجیتال به ما کمک کرد تا در دوران کرونا با خیال راحت به کار خود ادامه دهیم و حتی فروشمان افزایش یافت. رابط کاربری بسیار ساده و زیبا است.',
      rating: 5,
      icon: <PiCoffee className="text-green-500" />
    },
    {
      name: 'حسین محمدی',
      position: 'مدیر فست فود برگرلند',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      content: 'گزارش‌های تحلیلی این سرویس به ما کمک کرده تا محبوب‌ترین آیتم‌های منو را شناسایی و بر اساس آن برنامه‌ریزی کنیم. صرفه‌جویی در هزینه‌ها قابل توجه است.',
      rating: 5,
      icon: <PiHamburger className="text-orange-500" />
    }
  ];

  const stats = [
    { number: '۹۸٪', label: 'رضایت مشتریان' },
    { number: '۴۰٪', label: 'کاهش زمان سفارش' },
    { number: '۳۵٪', label: 'افزایش فروش' },
    { number: '۵۰۰+', label: 'رستوران راضی' }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 mb-6 shadow-lg border border-white/20">
            <PiQuotes className="text-blue-500" />
            <span className="text-sm font-bold text-gray-700">نظرات مشتریان</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">تجربیات</span> واقعی
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            آنچه صاحبان رستوران‌ها درباره تجربه استفاده از منوی دیجیتال ما می‌گویند
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center border border-white/20 shadow-2xl">
              <div className="text-3xl lg:text-4xl font-black text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 h-full border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                {/* Quote Icon */}
                <div className="text-blue-500 mb-6">
                  <PiQuotes className="text-3xl" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 rtl:space-x-reverse mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <PiStar key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="relative">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      {testimonial.icon}
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">
              به خانواده موفق ما بپیوندید
            </h3>
            <p className="text-blue-100 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              همین حالا شروع کنید و تجربه مدیریت رستوران خود را متحول کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <PiUser />
                <span>ثبت نام رایگان</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border border-white/20 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <PiQuotes />
                <span>مشاهده نظرات بیشتر</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;