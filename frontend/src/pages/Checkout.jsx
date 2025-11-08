import React, { useState } from 'react';
import { PiCreditCard, PiLock, PiCheckCircle, PiArrowLeft, PiShieldCheck } from 'react-icons/pi';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const plan = {
    name: 'حرفه‌ای',
    price: 29000,
    period: 'ماهانه',
    features: ['۵ منوی فعال', '۲۰۰ آیتم در منو', 'آمار پیشرفته', 'پشتیبانی تلفنی']
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black gradient-text mb-4">تکمیل خرید</h1>
              <p className="text-gray-600 text-lg">پلن انتخابی خود را نهایی کنید</p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-8 rtl:space-x-reverse">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        step >= stepNumber
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step > stepNumber ? <PiCheckCircle className="text-xl" /> : stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div
                        className={`w-16 h-1 transition-all duration-300 ${
                          step > stepNumber ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
                  {step === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-black text-gray-800 mb-4">انتخاب روش پرداخت</h3>
                      
                      <div className="space-y-4">
                        <button
                          onClick={() => setPaymentMethod('card')}
                          className={`w-full glass-effect rounded-2xl p-4 text-right transition-all duration-300 hover-lift ${
                            paymentMethod === 'card' ? 'ring-2 ring-blue-500' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                              <PiCreditCard className="text-blue-500 text-xl" />
                              <div>
                                <h4 className="font-bold text-gray-800">کارت بانکی</h4>
                                <p className="text-gray-600 text-sm">پرداخت آنلاین با کارت بانکی</p>
                              </div>
                            </div>
                            {paymentMethod === 'card' && <PiCheckCircle className="text-green-500 text-xl" />}
                          </div>
                        </button>

                        <button
                          onClick={() => setPaymentMethod('zarinpal')}
                          className={`w-full glass-effect rounded-2xl p-4 text-right transition-all duration-300 hover-lift ${
                            paymentMethod === 'zarinpal' ? 'ring-2 ring-blue-500' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                              <PiShieldCheck className="text-green-500 text-xl" />
                              <div>
                                <h4 className="font-bold text-gray-800">زرین‌پال</h4>
                                <p className="text-gray-600 text-sm">پرداخت امن با زرین‌پال</p>
                              </div>
                            </div>
                            {paymentMethod === 'zarinpal' && <PiCheckCircle className="text-green-500 text-xl" />}
                          </div>
                        </button>
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="space-y-4 mt-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">شماره کارت</label>
                            <input
                              type="text"
                              placeholder="۶۳۶۲ - ۱۶۱۱ - ۱۲۳۴ - ۵۶۷۸"
                              className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">تاریخ انقضا</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">CVV2</label>
                              <input
                                type="text"
                                placeholder="۱۲۳"
                                className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={nextStep}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse"
                      >
                        <span>ادامه</span>
                        <PiLock className="text-xl" />
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-black text-gray-800 mb-4">تأیید اطلاعات</h3>
                      
                      <div className="glass-effect rounded-2xl p-4">
                        <h4 className="font-bold text-gray-800 mb-3">خلاصه خرید</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">پلن:</span>
                            <span className="font-bold">{plan.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">دوره:</span>
                            <span className="font-bold">{plan.period}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">مبلغ:</span>
                            <span className="font-bold">{plan.price.toLocaleString()} تومان</span>
                          </div>
                          <div className="border-t border-gray-200 pt-2 mt-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">جمع کل:</span>
                              <span className="font-bold text-lg text-green-600">{plan.price.toLocaleString()} تومان</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-4 rtl:space-x-reverse">
                        <button
                          onClick={prevStep}
                          className="flex-1 glass-effect text-gray-700 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift flex items-center justify-center space-x-2 rtl:space-x-reverse"
                        >
                          <PiArrowLeft className="text-xl" />
                          <span>بازگشت</span>
                        </button>
                        <button
                          onClick={nextStep}
                          className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl"
                        >
                          پرداخت نهایی
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <PiCheckCircle className="text-white text-3xl" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-800 mb-4">پرداخت با موفقیت انجام شد!</h3>
                      <p className="text-gray-600 mb-6">اشتراک شما با موفقیت فعال شد. اکنون می‌توانید از تمامی امکانات پلن حرفه‌ای استفاده کنید.</p>
                      <div className="flex space-x-4 rtl:space-x-reverse">
                        <button className="flex-1 glass-effect text-gray-700 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift">
                          بازگشت به داشبورد
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl">
                          ساخت منوی جدید
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift sticky top-32">
                  <h3 className="text-xl font-black text-gray-800 mb-4">پلن انتخابی</h3>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-black text-gray-800 mb-2">{plan.name}</div>
                      <div className="text-2xl font-black text-green-600">{plan.price.toLocaleString()} تومان</div>
                      <div className="text-gray-600 text-sm">{plan.period}</div>
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                          <PiCheckCircle className="text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">مبلغ پلن:</span>
                        <span>{plan.price.toLocaleString()} تومان</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">مالیات:</span>
                        <span>۰ تومان</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                        <span>جمع کل:</span>
                        <span className="text-green-600">{plan.price.toLocaleString()} تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;