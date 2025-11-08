import React, { useState } from 'react';
import { PiLock, PiEye, PiEyeSlash, PiArrowRight, PiRocket, PiCheckCircle } from 'react-icons/pi';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSuccess(true), 1000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-20 floating"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="min-h-screen flex items-center justify-center py-12">
            <div className="max-w-md w-full text-center">
              <div className="glass-card rounded-3xl p-8 shadow-2xl hover-lift">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <PiCheckCircle className="text-white text-3xl" />
                </div>
                <h2 className="text-2xl font-black gradient-text mb-4">رمز عبور با موفقیت تغییر کرد!</h2>
                <p className="text-gray-600 mb-6">اکنون می‌توانید با رمز عبور جدید وارد حساب خود شوید</p>
                <a 
                  href="/login"
                  className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl"
                >
                  <span>ورود به حساب</span>
                  <PiArrowRight className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="min-h-screen flex items-center justify-center py-12">
          <div className="max-w-md w-full">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6 hover-lift">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl glass-card">
                    <PiRocket className="text-white text-2xl" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white shimmer"></div>
                </div>
              </div>
              
              <h1 className="text-4xl font-black gradient-text mb-4">
                تنظیم رمز جدید
              </h1>
              <p className="text-gray-600 text-lg">
                رمز عبور جدید خود را وارد کنید
              </p>
            </div>

            {/* Reset Password Form */}
            <div className="glass-card rounded-3xl p-8 shadow-2xl hover-lift">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* New Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">رمز عبور جدید</label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <PiLock className="text-xl" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
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

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">تکرار رمز عبور</label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <PiLock className="text-xl" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <PiEyeSlash className="text-xl" /> : <PiEye className="text-xl" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full group relative bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl overflow-hidden flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 shimmer"></div>
                  <span>تغییر رمز عبور</span>
                  <PiArrowRight className="text-xl" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;