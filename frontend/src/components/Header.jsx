import React, { useState, useEffect } from 'react';
import { PiCards, PiUser, PiRocket, PiHouse, PiStar, PiBriefcase, PiTag, PiInfo, PiPhone, PiList, PiX } from 'react-icons/pi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'صفحه اصلی', href: '#home', icon: <PiHouse className="text-sm" /> },
    { name: 'قالب‌ها', href: '#templates', icon: <PiCards className="text-sm" /> },
    { name: 'نمونه کارها', href: '#portfolio', icon: <PiBriefcase className="text-sm" /> },
    { name: 'قیمت‌گذاری', href: '#pricing', icon: <PiTag className="text-sm" /> },
    { name: 'درباره ما', href: '#about', icon: <PiInfo className="text-sm" /> },
    { name: 'تماس', href: '#contact', icon: <PiPhone className="text-sm" /> }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-effect shadow-2xl py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse hover-lift">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl glass-card">
                <PiCards className="text-white text-lg" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shimmer"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black gradient-text">
                کارت‌ساز
              </span>
              <div className="text-xs text-gray-500 mt-[-2px] font-medium">پلتفرم چندمنظوره</div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover-lift relative group"
              >
                {item.icon}
                <span>{item.name}</span>
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full shimmer"></span>
              </a>
            ))}
          </nav>
          
          {/* CTA Buttons */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover-lift glass-effect px-4 py-2 rounded-2xl shadow-lg">
              <PiUser />
              <span className="font-medium">ورود</span>
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl flex items-center space-x-2 rtl:space-x-reverse">
              <PiRocket />
              <span>ساخت کارت رایگان</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="xl:hidden w-12 h-12 glass-effect rounded-2xl flex items-center justify-center shadow-xl hover-lift transition-transform duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <PiX className="text-gray-700 text-lg" /> : <PiList className="text-gray-700 text-lg" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden mt-6 glass-card rounded-3xl p-6 border border-white/20 shadow-2xl floating">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 rtl:space-x-reverse text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-2xl glass-effect transition-all duration-300 hover-lift"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="text-blue-500 w-5 text-center">{item.icon}</div>
                  <span>{item.name}</span>
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200/50">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 rtl:space-x-reverse hover-lift">
                  <PiRocket />
                  <span>ساخت کارت رایگان</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;