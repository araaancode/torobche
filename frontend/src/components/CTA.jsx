import React from 'react';
import { PiRocket, PiPlay } from 'react-icons/pi';

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
            آماده ایجاد منوی دیجیتال خود هستید؟
          </h2>
          <p className="text-blue-100 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            همین امروز شروع کنید و در کمتر از ۵ دقیقه منوی دیجیتال رستوران خود را فعال کنید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <PiRocket />
              <span>شروع رایگان</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 border border-white/20 flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <PiPlay />
              <span>مشاهده دمو</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;