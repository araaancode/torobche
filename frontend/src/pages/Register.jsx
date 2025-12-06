// components/Register.js
import React, { useState } from 'react';
import { PiUser, PiLock, PiEye, PiEyeSlash, PiArrowRight, PiPhone, PiCheckCircle, PiXCircle } from 'react-icons/pi';
import useAuthStore from '../stores/authStore';
import OTPVerification from './OTPVerification';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const {
    register,
    isLoading,
    error,
    clearError,
    requiresVerification,
    verificationPhone
  } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };

    setFormData(newFormData);

    // بررسی تطابق رمز عبور و تأیید آن
    if (name === 'password' || name === 'confirmPassword') {
      if (newFormData.password && newFormData.confirmPassword) {
        setPasswordMatch(newFormData.password === newFormData.confirmPassword);
      } else {
        setPasswordMatch(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const { firstName, lastName, phone, password, confirmPassword } = formData;

    // اعتبارسنجی
    if (!firstName || !lastName || !phone || !password || !confirmPassword) {
      set({ error: 'تمامی فیلدها الزامی هستند' });
      return;
    }

    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      set({ error: 'شماره موبایل معتبر نیست' });
      return;
    }

    if (password.length < 6) {
      set({ error: 'رمز عبور باید حداقل ۶ کاراکتر باشد' });
      return;
    }

    if (password !== confirmPassword) {
      set({ error: 'رمز عبور و تأیید رمز عبور مطابقت ندارند' });
      return;
    }

    await register(firstName, lastName, phone, password, confirmPassword);
  };

  if (requiresVerification && verificationPhone) {
    return <OTPVerification phone={verificationPhone} type="register" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20 floating" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="min-h-screen flex items-center justify-center py-12">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6 hover-lift">
                <div className="relative">
                  <div className="w-30 h-30 rounded-3xl flex items-center justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/7217/7217779.png" alt="logo" />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl font-black gradient-text mb-4">
                ساخت حساب جدید
              </h1>
              <p className="text-gray-600 text-lg">
                به خانواده تربچه بپیوندید
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 glass-card rounded-2xl p-4 border-l-4 border-red-500 bg-red-50">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Register Form */}
            <div className="glass-card rounded-3xl p-8 shadow-2xl hover-lift">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    نام
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <PiUser className="text-xl" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="نام"
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    نام خانوادگی
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <PiUser className="text-xl" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="نام خانوادگی"
                      required
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    شماره موبایل
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <PiPhone className="text-xl" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 11) {
                          setFormData(prev => ({ ...prev, phone: value }));
                        }
                      }}
                      className="w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="09123456789"
                      required
                      dir="ltr"
                    />
                  </div>
                  <p className="text-xs text-gray-500">کد تایید به این شماره ارسال می‌شود</p>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    رمز عبور
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <PiLock className="text-xl" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="••••••••"
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <PiEyeSlash className="text-xl" /> : <PiEye className="text-xl" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      رمز عبور باید حداقل ۶ کاراکتر داشته باشد
                    </p>
                    {formData.password.length > 0 && (
                      <div className={`text-xs flex items-center ${formData.password.length >= 6 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {formData.password.length >= 6 ? (
                          <PiCheckCircle className="ml-1" />
                        ) : (
                          <PiXCircle className="ml-1" />
                        )}
                        <span>{formData.password.length} کاراکتر</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    تأیید رمز عبور
                    <span className="text-red-500 mr-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <PiLock className="text-xl" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full glass-effect rounded-2xl px-4 py-4 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 ${formData.confirmPassword && !passwordMatch ? 'border-2 border-red-500' : ''
                        }`}
                      placeholder="••••••••"
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <PiEyeSlash className="text-xl" /> : <PiEye className="text-xl" />}
                    </button>
                  </div>
                  {formData.confirmPassword && (
                    <div className={`text-xs flex items-center ${passwordMatch ? 'text-green-600' : 'text-red-600'}`}>
                      {passwordMatch ? (
                        <>
                          <PiCheckCircle className="ml-1" />
                          <span>رمز عبور مطابقت دارد</span>
                        </>
                      ) : (
                        <>
                          <PiXCircle className="ml-1" />
                          <span>رمز عبور مطابقت ندارد</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-gray-700 mb-2">نیازمندی‌های رمز عبور:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li className={`flex items-center ${formData.password.length >= 6 ? 'text-green-600' : ''}`}>
                      {formData.password.length >= 6 ? <PiCheckCircle className="ml-1" /> : <div className="w-3 h-3 rounded-full border border-gray-400 ml-1"></div>}
                      <span>حداقل ۶ کاراکتر</span>
                    </li>
                    <li className={`flex items-center ${passwordMatch ? 'text-green-600' : ''}`}>
                      {passwordMatch ? <PiCheckCircle className="ml-1" /> : <div className="w-3 h-3 rounded-full border border-gray-400 ml-1"></div>}
                      <span>تطابق با تأیید رمز عبور</span>
                    </li>
                  </ul>
                </div>

                {/* Terms */}
                <label className="flex items-start space-x-3 rtl:space-x-reverse text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500 glass-effect mt-1"
                    required
                  />
                  <span>
                    با <a href="/terms" className="gradient-text font-medium hover-lift">قوانین و شرایط</a> موافقم
                    <span className="text-red-500 mr-1">*</span>
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !passwordMatch || formData.password.length < 6 || !formData.confirmPassword}
                  className="w-full group relative bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-700 hover:to-pink-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl overflow-hidden flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 shimmer"></div>
                  {isLoading ? (
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>در حال ثبت نام...</span>
                    </div>
                  ) : (
                    <>
                      <span>ساخت حساب</span>
                      <PiArrowRight className="text-xl" />
                    </>
                  )}
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
                  قبلا حساب دارید؟{' '}
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