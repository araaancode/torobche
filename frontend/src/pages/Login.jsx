// components/Login.js
import React, { useState, useEffect } from 'react';
import {
  PiPhone,
  PiLock,
  PiEye,
  PiEyeSlash,
  PiArrowRight,
  PiKey,
  PiShieldCheck,
  PiPhoneCall,
  PiClock
} from 'react-icons/pi';
import useAuthStore from '../stores/authStore';
import OTPVerification from './OTPVerification';

const Login = () => {
  const [activeTab, setActiveTab] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [tabAnimation, setTabAnimation] = useState('');

  const {
    loginWithPassword,
    requestLoginOTP,
    isLoading,
    error,
    clearError,
    requiresVerification,
    verificationPhone
  } = useAuthStore();

  // انیمیشن هنگام تغییر تب
  useEffect(() => {
    setTabAnimation('fade-in');
    const timer = setTimeout(() => setTabAnimation(''), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!phone) {
      set({ error: 'شماره موبایل الزامی است' });
      return;
    }

    // اعتبارسنجی شماره موبایل
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      set({ error: 'شماره موبایل معتبر نیست' });
      return;
    }

    if (activeTab === 'password') {
      if (!password) {
        set({ error: 'رمز عبور الزامی است' });
        return;
      }
      if (password.length < 6) {
        set({ error: 'رمز عبور باید حداقل ۶ کاراکتر باشد' });
        return;
      }
      await loginWithPassword(phone, password);
    } else {
      await requestLoginOTP(phone);
    }
  };

  if (requiresVerification && verificationPhone) {
    return (
      <OTPVerification
        phone={verificationPhone}
        type="login"
        onBack={() => {
          clearError();
          useAuthStore.setState({ requiresVerification: false, verificationPhone: null });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="min-h-screen flex items-center justify-center py-12">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="flex justify-center mb-6 hover-lift">
                <div className="relative">
                  <div className="w-30 h-30 rounded-3xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                    <div className="w-full h-full bg-white rounded-3xl flex items-center justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/7217/7217779.png"
                        alt="logo"
                        className="w-16 h-16"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl font-black gradient-text mb-4">
                ورود به حساب
              </h1>
              <p className="text-gray-600 text-lg">
                به پلتفرم تربچه خوش آمدید
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 animate-fade-in">
                <div className="glass-card rounded-2xl p-4 border-l-4 border-red-500 bg-red-50 flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="text-red-500 mt-0.5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-red-600 text-sm font-medium flex-1">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <div className="glass-card rounded-3xl p-8 shadow-2xl hover-lift animate-fade-in">
              {/* Tabs Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  روش ورود را انتخاب کنید
                </h2>
                <p className="text-gray-600 text-sm">
                  یکی از روش‌های زیر را برای ورود انتخاب نمایید
                </p>
              </div>

              {/* Tabs Navigation */}
              <div className="flex mb-8 bg-gray-100 rounded-2xl p-1 relative">
                {/* Animated Background Slider */}
                <div
                  className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-xl shadow-md transition-all duration-300 ${activeTab === 'password' ? 'right-1' : 'left-1'
                    }`}
                />

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('password');
                    clearError();
                  }}
                  className={`flex-1 flex items-center justify-center space-x-3 rtl:space-x-reverse py-4 rounded-xl font-medium transition-all duration-300 relative z-10 ${activeTab === 'password'
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  <div className={`p-2 rounded-lg ${activeTab === 'password' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                    <PiShieldCheck className="text-xl" />
                  </div>
                  <div className="text-right mx-3">
                    <div className="font-bold">ورود با رمز عبور</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('otp');
                    clearError();
                  }}
                  className={`flex-1 flex items-center justify-center space-x-3 rtl:space-x-reverse py-4 rounded-xl font-medium transition-all duration-300 relative z-10 ${activeTab === 'otp'
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  <div className={`p-2 rounded-lg ${activeTab === 'otp' ? 'bg-purple-100' : 'bg-gray-200'}`}>
                    <PiPhoneCall className="text-xl" />
                  </div>
                  <div className="text-right mx-3">
                    <div className="font-bold">ورود با کد یکبارمصرف</div>
                  </div>
                </button>
              </div>

              {/* Form Content */}
              <div className={`tab-content ${tabAnimation}`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      شماره موبایل
                      <span className="text-red-500 mr-1">*</span>
                      {activeTab === 'otp' && (
                        <span className="mr-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          کد به این شماره ارسال می‌شود
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className={`p-2 rounded-lg ${phone ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                          <PiPhone className="text-xl" />
                        </div>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 11) {
                            setPhone(value);
                          }
                        }}
                        className="w-full glass-effect rounded-2xl px-4 py-4 pr-16 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg font-medium"
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        required
                        dir="ltr"
                      />
                    </div>
                    {phone && (
                      <div className="flex items-center text-sm text-green-600">
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>شماره موبایل معتبر است</span>
                      </div>
                    )}
                  </div>

                  {/* Password Input (only for password login) */}
                  {activeTab === 'password' && (
                    <div className="space-y-2 animate-slide-down">
                      <label className="text-sm font-bold text-gray-700 flex items-center">
                        رمز عبور
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className={`p-2 rounded-lg ${password ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                            <PiLock className="text-xl" />
                          </div>
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full glass-effect rounded-2xl px-4 py-4 pr-16 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                          placeholder="••••••••"
                          required
                          minLength="6"
                        />
                        <button
                          type="button"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300 rounded-lg hover:bg-gray-100"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <PiEyeSlash className="text-xl" /> : <PiEye className="text-xl" />}
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          {password.length > 0 && (
                            <span className={password.length >= 6 ? 'text-green-600' : 'text-yellow-600'}>
                              {password.length} کاراکتر
                            </span>
                          )}
                        </p>
                        {password.length > 0 && password.length < 6 && (
                          <p className="text-xs text-yellow-600">
                            نیاز به حداقل ۶ کاراکتر
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Info for OTP login */}
                  {activeTab === 'otp' && (
                    <div className="animate-slide-down">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4">
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <PiKey className="text-xl" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-purple-800">
                              نحوه کار کد یکبار مصرف
                            </h4>
                            <ul className="mt-2 space-y-2">
                              <li className="flex items-center text-xs text-purple-700">
                                <PiClock className="ml-1 text-purple-500" />
                                <span>کد به مدت ۲ دقیقه معتبر است</span>
                              </li>
                              <li className="flex items-center text-xs text-purple-700">
                                <svg className="w-3 h-3 ml-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                </svg>
                                <span>کد فقط یکبار قابل استفاده است</span>
                              </li>
                              <li className="flex items-center text-xs text-purple-700">
                                <svg className="w-3 h-3 ml-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span>کد از طریق پیامک ارسال می‌شود</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Remember & Forgot (only for password login) */}
                  {activeTab === 'password' && (
                    <div className="flex items-center justify-between animate-fade-in">
                      <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            id="remember-me"
                          />
                          <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center">
                            <svg className="w-3 h-3 text-blue-600 opacity-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <span>مرا به خاطر بسپار</span>
                      </label>
                      <a
                        href="/forgot-password"
                        className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium transition-all duration-300 hover-lift hover:scale-105"
                      >
                        رمز عبور را فراموش کردید؟
                      </a>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !phone}
                    className={`w-full group relative text-white py-4 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl overflow-hidden flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === 'password'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      }`}
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 shimmer"></div>
                    {isLoading ? (
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>
                          {activeTab === 'password' ? 'در حال ورود...' : 'در حال ارسال کد...'}
                        </span>
                      </div>
                    ) : (
                      <>
                        <span>
                          {activeTab === 'password' ? 'ورود به حساب' : 'دریافت کد تایید'}
                        </span>
                        <PiArrowRight className="text-xl" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 h-px glass-effect"></div>
                <span className="px-4 text-sm text-gray-500">یا</span>
                <div className="flex-1 h-px glass-effect"></div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  حساب کاربری ندارید؟{' '}
                  <a
                    href="/register"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold transition-all duration-300 hover-lift hover:scale-105 inline-flex items-center"
                  >
                    ثبت‌نام کنید
                    <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .tab-content {
          transition: all 0.3s ease;
        }
        
        input:checked + div {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }
        
        input:checked + div svg {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Login;