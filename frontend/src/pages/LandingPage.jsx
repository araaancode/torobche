import React, { useState } from 'react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      {/* هدر */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-800">منوی دیجیتال</span>
          </div>
          
          {/* منوی موبایل */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-orange-500 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* منوی دسکتاپ */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-orange-500 transition-colors">ویژگی‌ها</a>
            <a href="#pricing" className="text-gray-600 hover:text-orange-500 transition-colors">قیمت‌گذاری</a>
            <a href="#testimonials" className="text-gray-600 hover:text-orange-500 transition-colors">نظرات مشتریان</a>
            <a href="#contact" className="text-gray-600 hover:text-orange-500 transition-colors">تماس با ما</a>
          </nav>
          
          <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
            ثبت نام رایگان
          </button>
        </div>
        
        {/* منوی موبایل باز شده */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-md">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-orange-500 transition-colors">ویژگی‌ها</a>
              <a href="#pricing" className="text-gray-600 hover:text-orange-500 transition-colors">قیمت‌گذاری</a>
              <a href="#testimonials" className="text-gray-600 hover:text-orange-500 transition-colors">نظرات مشتریان</a>
              <a href="#contact" className="text-gray-600 hover:text-orange-500 transition-colors">تماس با ما</a>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors w-full">
                ثبت نام رایگان
              </button>
            </div>
          </div>
        )}
      </header>

      {/* بخش اصلی */}
      <main>
        {/* هیرو */}
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              منوی دیجیتال هوشمند برای <span className="text-orange-500">رستوران‌ شما</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              تجربه سفارش‌دهی مدرن و بدون تماس برای مشتریان شما. منوی دیجیتال ما سفارش‌گیری را ساده‌تر، سریع‌تر و جذاب‌تر می‌کند.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
                شروع کنید - رایگان
              </button>
              <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg font-medium transition-colors">
                مشاهده دمو
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">رستوران ایتالیایی ویلا</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-medium text-gray-800">پاستا کاربونارا</h4>
                    <p className="text-sm text-gray-600 mt-1">پاستا با سس خامه، پنیر پارمزان و بیکن</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-orange-500 font-medium">45,000 تومان</span>
                      <button className="bg-orange-500 text-white text-sm px-3 py-1 rounded">+ افزودن</button>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-medium text-gray-800">پیتزا مارگاریتا</h4>
                    <p className="text-sm text-gray-600 mt-1">پیتزا با پنیر موزارلا و ریحان تازه</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-orange-500 font-medium">65,000 تومان</span>
                      <button className="bg-orange-500 text-white text-sm px-3 py-1 rounded">+ افزودن</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-200 rounded-full -z-10"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-amber-200 rounded-full -z-10"></div>
            </div>
          </div>
        </section>

        {/* ویژگی‌ها */}
        <section id="features" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">چرا منوی دیجیتال ما؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-orange-50 p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">سفارش بدون تماس</h3>
                <p className="text-gray-600">مشتریان شما می‌توانند با اسکن QR کد، منو را مشاهده و سفارش خود را بدون تماس فیزیکی ثبت کنند.</p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">سفارش‌گیری سریع‌تر</h3>
                <p className="text-gray-600">کاهش زمان انتظار و افزایش رضایت مشتری با سیستم سفارش‌دهی سریع و کارآمد.</p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">گزارش‌های تحلیلی</h3>
                <p className="text-gray-600">دسترسی به آمار و گزارش‌های دقیق از فروش و رفتار مشتریان برای تصمیم‌گیری بهتر.</p>
              </div>
            </div>
          </div>
        </section>

        {/* نحوه کار */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">نحوه کار منوی دیجیتال</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">1</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">ثبت نام کنید</h3>
                <p className="text-gray-600">در کمتر از 5 دقیقه در سرویس ما ثبت نام کنید.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">2</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">منو را تنظیم کنید</h3>
                <p className="text-gray-600">منوی خود را با عکس و توضیحات جذاب آپلود کنید.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">3</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">QR کد دریافت کنید</h3>
                <p className="text-gray-600">QR کد مخصوص رستوران خود را دریافت و چاپ کنید.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">4</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">شروع به کار کنید</h3>
                <p className="text-gray-600">مشتریان با اسکن کد، منو را مشاهده و سفارش می‌دهند.</p>
              </div>
            </div>
          </div>
        </section>

        {/* قیمت‌گذاری */}
        <section id="pricing" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">پلن‌های قیمت‌گذاری</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">پلن مناسب برای رستوران‌های کوچک و بزرگ با امکانات متنوع</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2">پایه</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-800">رایگان</span>
                  <span className="text-gray-600">/همیشه</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>منوی دیجیتال پایه</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>QR کد اختصاصی</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>پشتیبانی ایمیلی</span>
                  </li>
                </ul>
                <button className="mt-auto border border-orange-500 text-orange-500 hover:bg-orange-50 py-2 rounded-lg font-medium transition-colors">
                  شروع کنید
                </button>
              </div>
              
              <div className="bg-white border-2 border-orange-500 rounded-xl shadow-lg p-6 flex flex-col relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">پیشنهادی</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">حرفه‌ای</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-800">99,000</span>
                  <span className="text-gray-600">/ماه</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>همه امکانات پلن پایه</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>گزارش‌های پیشرفته</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>برندسازی اختصاصی</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>پشتیبانی تلفنی</span>
                  </li>
                </ul>
                <button className="mt-auto bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors">
                  انتخاب پلن
                </button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2">سازمانی</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-800">199,000</span>
                  <span className="text-gray-600">/ماه</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>همه امکانات پلن حرفه‌ای</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>چند شعبه</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>API اختصاصی</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>پشتیبانی VIP</span>
                  </li>
                </ul>
                <button className="mt-auto border border-orange-500 text-orange-500 hover:bg-orange-50 py-2 rounded-lg font-medium transition-colors">
                  انتخاب پلن
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* نظرات مشتریان */}
        <section id="testimonials" className="py-16 bg-gradient-to-br from-orange-50 to-amber-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">نظرات رستوران‌داران</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                    <span className="text-orange-700 font-bold">ع.ر</span>
                  </div>
                  <div className="mr-4">
                    <h4 className="font-bold text-gray-800">علی رضایی</h4>
                    <p className="text-sm text-gray-600">رستوران ایتالیایی ویلا</p>
                  </div>
                </div>
                <p className="text-gray-600">"با استفاده از این سرویس، زمان سفارش‌گیری 40% کاهش یافته و رضایت مشتریان ما به شدت افزایش پیدا کرده است."</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                    <span className="text-orange-700 font-bold">م.ک</span>
                  </div>
                  <div className="mr-4">
                    <h4 className="font-bold text-gray-800">مریم کریمی</h4>
                    <p className="text-sm text-gray-600">کافه بوتیک قهوه خانه</p>
                  </div>
                </div>
                <p className="text-gray-600">"منوی دیجیتال به ما کمک کرد تا در دوران کرونا با خیال راحت به کار خود ادامه دهیم و حتی فروشمان افزایش یافت."</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                    <span className="text-orange-700 font-bold">ح.م</span>
                  </div>
                  <div className="mr-4">
                    <h4 className="font-bold text-gray-800">حسین محمدی</h4>
                    <p className="text-sm text-gray-600">فست فود برگرلند</p>
                  </div>
                </div>
                <p className="text-gray-600">"گزارش‌های تحلیلی این سرویس به ما کمک کرده تا محبوب‌ترین آیتم‌های منو را شناسایی و بر اساس آن برنامه‌ریزی کنیم."</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-orange-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">منوی دیجیتال خود را همین امروز راه‌اندازی کنید</h2>
            <p className="text-orange-100 max-w-2xl mx-auto mb-8">ثبت نام رایگان است و در کمتر از 5 دقیقه می‌توانید منوی دیجیتال رستوران خود را فعال کنید.</p>
            <button className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium shadow-md transition-colors">
              شروع کنید - رایگان
            </button>
          </div>
        </section>
      </main>

      {/* فوتر */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="mr-2 text-xl font-bold">منوی دیجیتال</span>
              </div>
              <p className="text-gray-400">راهکار مدرن برای منوی رستوران‌ها و کافه‌ها</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">لینک‌های مفید</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">صفحه اصلی</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">ویژگی‌ها</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">قیمت‌گذاری</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">نظرات مشتریان</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">پشتیبانی</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">تماس با ما</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">سوالات متداول</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">مستندات</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">وبلاگ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mt-0.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>021-12345678</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mt-0.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@digitalmenu.ir</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mt-0.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>تهران، خیابان ولیعصر</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} منوی دیجیتال. تمام حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;