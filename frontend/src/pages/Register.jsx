import React from 'react';
import { PiUser, PiLock, PiEye, PiEyeSlash, PiEnvelope, PiArrowRight, PiRocket } from 'react-icons/pi';

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="min-h-screen flex items-center justify-center py-12">
          <div className="max-w-md w-full">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6 hover-lift">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl glass-card">
                    <PiRocket className="text-white text-2xl" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white shimmer"></div>
                </div>
              </div>
              
              <h1 className="text-4xl font-black gradient-text mb-4">
                ساخت حساب جدید
              </h1>
              <p className="text-gray-600 text-lg">
                به خانواده کارت‌ساز بپیوندید
              </p>
            </div>

            {/* Register Form */}
            <div className="glass-card rounded-3xl p-8 shadow-2xl hover-lift">
              <form className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">نام کامل</label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <PiUser className="text-xl" />
                    </div>
                    <input
                      type="text"
                      className="w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="نام و نام خانوادگی"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">ایمیل</label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <PiEnvelope className="text-xl" />
                    </div>
                    <input
                      type="email"
                      className="w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">رمز عبور</label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <PiLock className="text-xl" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <PiEyeSlash className="text-xl" /> : <PiEye className="text-xl" />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start space-x-3 rtl:space-x-reverse text-sm text-gray-600">
                  <input type="checkbox" className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500 glass-effect mt-1" />
                  <span>
                    با <a href="/terms" className="gradient-text font-medium hover-lift">قوانین و شرایط</a> موافقم
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full group relative bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-700 hover:to-pink-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl overflow-hidden flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 shimmer"></div>
                  <span>ساخت حساب</span>
                  <PiArrowRight className="text-xl" />
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 h-px glass-effect"></div>
                <span className="px-4 text-sm text-gray-500">یا</span>
                <div className="flex-1 h-px glass-effect"></div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  قبلاً حساب دارید؟{' '}
                  <a href="/login" className="gradient-text font-bold transition-colors duration-300 hover-lift">
                    وارد شوید
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;