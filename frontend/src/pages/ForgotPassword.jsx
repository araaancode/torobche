import React from 'react';
import { PiEnvelope, PiArrowRight, PiRocket, PiArrowLeft } from 'react-icons/pi';

const ForgotPassword = () => {
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
                بازیابی رمز عبور
              </h1>
              <p className="text-gray-600 text-lg">
                لینک بازیابی رمز به ایمیل شما ارسال خواهد شد
              </p>
            </div>

            {/* Forgot Password Form */}
            <div className="glass-card rounded-3xl p-8 shadow-2xl hover-lift">
              <form className="space-y-6">
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

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full group relative bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-700 hover:to-pink-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl overflow-hidden flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 shimmer"></div>
                  <span>ارسال لینک بازیابی</span>
                  <PiArrowRight className="text-xl" />
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <a 
                  href="/login" 
                  className="inline-flex items-center space-x-2 rtl:space-x-reverse text-cyan-600 hover:text-cyan-700 font-medium transition-colors duration-300 hover-lift"
                >
                  <PiArrowLeft className="text-lg" />
                  <span>بازگشت به صفحه ورود</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;