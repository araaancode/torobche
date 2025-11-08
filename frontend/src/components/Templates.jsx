import React from 'react';
import { PiForkKnife, PiUserCircle, PiFileText, PiBuilding, PiArrowLeft, PiStar } from 'react-icons/pi';

const Templates = () => {
  const templates = [
    {
      title: 'منوی رستوران',
      description: 'منوی دیجیتال تعاملی با قابلیت سفارش آنلاین و دسته‌بندی محصولات',
      icon: <PiForkKnife className="text-3xl" />,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['سفارش آنلاین', 'دسته‌بندی محصولات', 'مدیریت موجودی', 'گزارش‌گیری'],
      color: 'from-orange-500 to-red-500',
      popular: true
    },
    {
      title: 'کارت مطب',
      description: 'کارت دیجیتال پزشکان با قابلیت نوبت‌گیری و نمایش تخصص‌ها',
      icon: <PiUserCircle className="text-3xl" />,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['نوبت‌گیری آنلاین', 'نمایش تخصص‌ها', 'مسیریابی', 'تماس مستقیم'],
      color: 'from-green-500 to-teal-500',
      popular: false
    },
    {
      title: 'رزومه دیجیتال',
      description: 'رزومه حرفه‌ای با قابلیت اشتراک‌گذاری آسان و نمایش مهارت‌ها',
      icon: <PiFileText className="text-3xl" />,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      features: ['اشتراک‌گذاری آسان', 'نمایش مهارت‌ها', 'لینک مستقیم', 'طراحی حرفه‌ای'],
      color: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      title: 'کارت کسب‌وکار',
      description: 'کارت ویزیت دیجیتال با امکانات پیشرفته و قابلیت ذخیره مخاطب',
      icon: <PiBuilding className="text-3xl" />,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
      features: ['ذخیره مخاطب', 'شبکه‌های اجتماعی', 'موقعیت مکانی', 'لینک‌های سریع'],
      color: 'from-purple-500 to-pink-500',
      popular: false
    }
  ];

  return (
    <section id="templates" className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
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
            <span className="text-sm font-bold text-gray-700">قالب‌های آماده</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">قالب‌های</span> متنوع
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            از بین صدها قالب آماده انتخاب کنید یا کارت دیجیتال خود را از صفر طراحی کنید
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {templates.map((template, index) => (
            <div key={index} className="group relative">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    {template.popular && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-2xl text-sm font-bold">
                        محبوب
                      </span>
                    )}
                  </div>
                  <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${template.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                    {template.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {template.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {template.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2 rtl:space-x-reverse">
                    <span>استفاده از این قالب</span>
                    <PiArrowLeft />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Design CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">
              طراحی سفارشی می‌خواهید؟
            </h3>
            <p className="text-blue-100 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              تیم طراحی ما آماده ایجاد کارت دیجیتال کاملاً سفارشی متناسب با برند شماست
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <PiFileText />
                <span>درخواست طراحی سفارشی</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border border-white/20 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <PiStar />
                <span>مشاهده نمونه‌کارها</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;