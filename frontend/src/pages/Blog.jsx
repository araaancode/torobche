import React from 'react';
import { PiCalendar, PiUser, PiClock, PiArrowLeft, PiShare } from 'react-icons/pi';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: 'چگونه منوی دیجیتال می‌تواند فروش رستوران شما را افزایش دهد؟',
      excerpt: 'در این مقاله به بررسی تأثیر منوی دیجیتال بر افزایش فروش و بهبود تجربه مشتری می‌پردازیم.',
      author: 'علی محمدی',
      date: '۱۴۰۲/۱۰/۱۵',
      readTime: '۵ دقیقه',
      category: 'بازاریابی',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      title: '۱۰ نکته طلایی برای طراحی منوی رستوران جذاب',
      excerpt: 'طراحی منوی مناسب اولین قدم برای جذب مشتریان بیشتر است. در این مقاله با نکات طلایی آشنا شوید.',
      author: 'سارا احمدی',
      date: '۱۴۰۲/۱۰/۱۲',
      readTime: '۷ دقیقه',
      category: 'طراحی',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: 'تحلیل رفتار مشتریان در منوی دیجیتال',
      excerpt: 'با تحلیل داده‌های منوی دیجیتال می‌توانید رفتار مشتریان را بهتر درک کرده و سرویس بهتری ارائه دهید.',
      author: 'محمد رضایی',
      date: '۱۴۰۲/۱۰/۱۰',
      readTime: '۶ دقیقه',
      category: 'آنالیتیکس',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      title: 'بهینه‌سازی منو برای افزایش میانگین سفارش',
      excerpt: 'راهکارهای ساده اما مؤثر برای افزایش میانگین ارزش هر سفارش در رستوران شما.',
      author: 'فاطمه کریمی',
      date: '۱۴۰۲/۱۰/۰۸',
      readTime: '۴ دقیقه',
      category: 'مدیریت',
      image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const categories = ['همه', 'بازاریابی', 'طراحی', 'آنالیتیکس', 'مدیریت', 'فناوری'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black gradient-text mb-4">وبلاگ کارت‌ساز</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              جدیدترین مقالات و راهنمایی‌ها در زمینه مدیریت رستوران، بازاریابی دیجیتال و فناوری
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className="glass-effect px-6 py-2 rounded-2xl font-medium transition-all duration-300 hover-lift hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl hover-lift mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                  مقاله ویژه
                </span>
                <h2 className="text-2xl font-black text-gray-800 mb-4">
                  انقلاب منوی دیجیتال: از سنتی به مدرن
                </h2>
                <p className="text-gray-600 mb-6">
                  چگونه منوی دیجیتال می‌تواند تجربه مشتری را متحول کند و کارایی رستوران را به میزان قابل توجهی افزایش دهد.
                </p>
                <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <PiUser className="text-blue-500" />
                    <span>علی محمدی</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <PiCalendar className="text-green-500" />
                    <span>۱۴۰۲/۱۰/۱۸</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <PiClock className="text-orange-500" />
                    <span>۸ دقیقه</span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl">
                  مطالعه مقاله
                </button>
              </div>
              <div className="lg:order-first">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Featured Article"
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {articles.map((article) => (
              <div key={article.id} className="glass-card rounded-3xl overflow-hidden shadow-2xl hover-lift transition-all duration-300">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                      <PiShare className="text-lg" />
                    </button>
                  </div>
                  
                  <h3 className="font-black text-gray-800 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <PiUser className="text-blue-500" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <PiCalendar className="text-green-500" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <PiClock className="text-orange-500" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="glass-card rounded-3xl p-8 text-center shadow-2xl hover-lift">
            <h3 className="text-2xl font-black gradient-text mb-4">در خبرنامه ما عضو شوید</h3>
            <p className="text-gray-600 mb-6">جدیدترین مقالات و راهنمایی‌ها را مستقیماً در ایمیل خود دریافت کنید</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="آدرس ایمیل شما"
                className="flex-1 glass-effect rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl whitespace-nowrap">
                عضویت در خبرنامه
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;