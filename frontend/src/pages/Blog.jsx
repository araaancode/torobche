import React, { useState, useRef, useEffect } from 'react';
import { PiCalendar, PiUser, PiClock, PiShare, PiPlayCircle, PiCards, PiQrCode, PiSparkle, PiCrown } from 'react-icons/pi';

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
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      featured: true
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
  
  const [activeCategory, setActiveCategory] = useState('همه');
  const [isScrolled, setIsScrolled] = useState(false);
  const featuredArticleRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const filteredArticles = activeCategory === 'همه' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating transition-transform duration-2000 ${
          isScrolled ? 'scale-110' : 'scale-100'
        }`} />
        <div className={`absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating transition-transform duration-2000 ${
          isScrolled ? 'scale-110' : 'scale-100'
        }`} style={{animationDelay: '1.5s'}} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-300 rounded-full blur-3xl opacity-20 floating transition-transform duration-2000 ${
          isScrolled ? 'scale-110' : 'scale-100'
        }`} style={{animationDelay: '2.5s'}} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8">
          {/* Premium Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse glass-effect rounded-2xl px-4 py-2 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <PiCrown className="text-yellow-500 text-base group-hover:scale-110 transition-transform duration-300" />
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              </div>
              <span className="text-xs font-black text-gray-800 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                مرجع تخصصی فناوری رستوران
              </span>
              <PiSparkle className="text-purple-500 text-base group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black gradient-text mb-4 animate-gradient-x">
              وبلاگ تربچه
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto glass-effect rounded-2xl p-4 backdrop-blur-sm">
              جدیدترین مقالات و راهنمایی‌ها در زمینه مدیریت رستوران، بازاریابی دیجیتال و فناوری
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`glass-effect px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-lg'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          <div ref={featuredArticleRef} className="glass-card rounded-3xl overflow-hidden shadow-2xl hover-lift mb-12 border border-white/30">
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
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
                  <PiPlayCircle className="text-lg" />
                  <span>مطالعه مقاله</span>
                </button>
              </div>
              <div className="lg:order-first relative">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Featured Article"
                  className="w-full h-64 lg:h-full object-cover"
                />
                {/* QR Code Badge */}
                <div className="absolute -bottom-4 -left-4">
                  <div className="glass-card rounded-xl p-3 shadow-lg border border-white/30 transform -rotate-6 hover:rotate-0 transition-transform duration-500 hover:shadow-xl group cursor-pointer">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-inner border border-gray-200 group-hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center rounded">
                        <PiQrCode className="text-gray-900 text-lg" />
                      </div>
                    </div>
                    <div className="text-center mt-1">
                      <span className="text-xs font-bold text-gray-900">اسکن برای اشتراک</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredArticles.map((article) => (
              <div key={article.id} className="glass-card rounded-3xl overflow-hidden shadow-2xl hover-lift transition-all duration-300 border border-white/30">
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  {article.featured && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        ویژه
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-300 glass-effect rounded-lg p-2">
                      <PiShare className="text-lg" />
                    </button>
                  </div>
                  
                  <h3 className="font-black text-gray-800 mb-3 line-clamp-2 text-lg">{article.title}</h3>
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
          <div className="glass-card rounded-3xl p-8 text-center shadow-2xl hover-lift border border-white/30 mb-12">
            <h3 className="text-2xl font-black gradient-text mb-4">در خبرنامه ما عضو شوید</h3>
            <p className="text-gray-600 mb-6">جدیدترین مقالات و راهنمایی‌ها را مستقیماً در ایمیل خود دریافت کنید</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="آدرس ایمیل شما"
                className="flex-1 glass-effect rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/30"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl whitespace-nowrap flex items-center space-x-2 rtl:space-x-reverse">
                <PiCards className="text-lg" />
                <span>عضویت در خبرنامه</span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black gradient-text mb-2">۵۰۰+</div>
                <div className="text-gray-600">مقاله تخصصی</div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black gradient-text mb-2">۱۰,۰۰۰+</div>
                <div className="text-gray-600">خواننده ماهانه</div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-black gradient-text mb-2">۹۸٪</div>
                <div className="text-gray-600">رضایت مخاطبان</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;