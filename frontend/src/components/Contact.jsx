import React, { useState } from 'react';
import { PiMapPin, PiPhone, PiEnvelope, PiClock, PiPaperPlane, PiUser, PiChatText } from 'react-icons/pi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('پیام شما با موفقیت ارسال شد!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <PiMapPin className="text-2xl" />,
      title: 'آدرس',
      details: 'تهران، خیابان ولیعصر، پلاک ۱۲۳۴',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <PiPhone className="text-2xl" />,
      title: 'تلفن',
      details: '۰۲۱-۱۲۳۴۵۶۷۸',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: <PiEnvelope className="text-2xl" />,
      title: 'ایمیل',
      details: 'info@menudigital.ir',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <PiClock className="text-2xl" />,
      title: 'ساعات کاری',
      details: 'شنبه تا چهارشنبه: ۹:۰۰ - ۱۸:۰۰',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
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
            <PiChatText className="text-blue-500" />
            <span className="text-sm font-bold text-gray-700">در تماس باشید</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">تماس</span> با ما
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            برای دریافت مشاوره رایگان و راهنمایی بیشتر با ما در ارتباط باشید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <h3 className="text-2xl font-black text-gray-800 mb-6">پیام بفرستید</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    <PiUser className="inline ml-1" />
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="نام شما"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    <PiEnvelope className="inline ml-1" />
                    ایمیل
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    <PiPhone className="inline ml-1" />
                    تلفن همراه
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    موضوع
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">انتخاب موضوع</option>
                    <option value="consultation">مشاوره</option>
                    <option value="support">پشتیبانی</option>
                    <option value="partnership">همکاری</option>
                    <option value="other">سایر</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  <PiChatText className="inline ml-1" />
                  پیام
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="پیام خود را بنویسید..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <PiPaperPlane />
                <span>ارسال پیام</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
                  <div className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center shadow-lg mb-4`}>
                    {info.icon}
                  </div>
                  <h4 className="font-black text-gray-800 text-lg mb-2">{info.title}</h4>
                  <p className="text-gray-600">{info.details}</p>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
              <h4 className="font-black text-gray-800 text-lg mb-4">موقعیت ما روی نقشه</h4>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-48 flex items-center justify-center">
                <div className="text-center">
                  <PiMapPin className="text-3xl text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">تهران، خیابان ولیعصر</p>
                  <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300">
                    مشاهده در نقشه
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white shadow-2xl">
              <h4 className="font-black text-lg mb-3">نیاز به پاسخ فوری دارید؟</h4>
              <p className="text-blue-100 mb-4">می‌توانید مستقیماً با ما تماس بگیرید</p>
              <button className="w-full bg-white text-blue-600 hover:bg-gray-100 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <PiPhone />
                <span>تماس فوری</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;