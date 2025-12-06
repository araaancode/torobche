import React, { useState, useEffect, useRef } from 'react';
import { PiKey, PiClock, PiArrowRight, PiArrowLeft } from 'react-icons/pi';
import useAuthStore from '../stores/authStore';

const OTPVerification = ({ phone, type = 'login', onBack }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef([]);

    const {
        verifyRegisterOTP,
        verifyLoginOTP,
        resendVerificationCode,
        isLoading,
        error,
        clearError
    } = useAuthStore();

    /* -------------------- فوکوس اولیه فقط یک بار -------------------- */
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    /* -------------------- تایمر -------------------- */
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    /* -------------------- تغییر مقدار OTP -------------------- */
    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // حرکت خودکار به اینپوت بعدی
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // ارسال خودکار پس از تکمیل
        if (newOtp.join('').length === 6) {
            setTimeout(() => handleSubmit(), 100);
        }
    };

    /* -------------------- مدیریت Backspace -------------------- */
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    /* -------------------- Paste کامل -------------------- */
    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').trim();

        if (!/^\d{6}$/.test(pasted)) return;

        const digits = pasted.split('');
        setOtp(digits);

        setTimeout(() => {
            inputRefs.current[5]?.focus();
            handleSubmit();
        }, 100);
    };

    /* -------------------- ارسال -------------------- */
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        clearError();

        const otpCode = otp.join('');
        if (otpCode.length !== 6) return;

        if (type === 'register') {
            await verifyRegisterOTP(phone, otpCode);
        } else {
            await verifyLoginOTP(phone, otpCode);
        }
    };

    /* -------------------- ارسال مجدد -------------------- */
    const handleResendCode = async () => {
        if (!canResend) return;

        setIsResending(true);
        clearError();

        const result = await resendVerificationCode(phone, type);

        setIsResending(false);
        if (result.success) {
            setTimeLeft(120);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);

            inputRefs.current[0]?.focus();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="min-h-screen flex items-center justify-center py-12">
                    <div className="max-w-md w-full">

                        <div className="text-center mb-10">
                            <div className="flex justify-center mb-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                    <PiKey className="text-3xl text-white" />
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold mb-3">
                                {type === 'register' ? 'تایید شماره موبایل' : 'ورود با کد تایید'}
                            </h1>

                            <p className="text-gray-600 mb-2">
                                {type === 'register'
                                    ? 'کد تایید به شماره زیر ارسال شد'
                                    : 'کد یکبار مصرف به شماره زیر ارسال شد'}
                            </p>

                            <p className="font-mono text-lg" dir="ltr">
                                {phone}
                            </p>
                        </div>

                        {/* نمایش خطا */}
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-xl">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* OTP Inputs */}
                                <div className="flex justify-center space-x-3" dir="ltr">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={el => inputRefs.current[index] = el}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            onFocus={(e) => e.target.select()}
                                            autoComplete="one-time-code"
                                            className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    ))}
                                </div>

                                {/* تایمر */}
                                <div className="text-center">
                                    <div className="inline-flex items-center space-x-2 text-gray-600">
                                        <PiClock />
                                        <span className="font-mono" dir="ltr">
                                            {formatTime(timeLeft)}
                                        </span>
                                    </div>
                                </div>

                                {/* ارسال مجدد */}
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={handleResendCode}
                                        disabled={!canResend || isLoading}
                                        className={`text-sm ${canResend ? 'text-green-600' : 'text-gray-400 cursor-not-allowed'}`}
                                    >
                                        {canResend ? 'ارسال مجدد کد' : 'امکان ارسال مجدد بعداً'}
                                    </button>
                                </div>

                                {/* دکمه تایید */}
                                <button
                                    type="submit"
                                    disabled={isLoading || otp.some(d => d === '')}
                                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isLoading ? 'در حال پردازش...' : 'تایید و ادامه'}
                                    <PiArrowRight className="text-lg" />
                                </button>

                                {/* دکمه بازگشت */}
                                {onBack && (
                                    <button
                                        type="button"
                                        onClick={onBack}
                                        className="w-full text-gray-600 flex items-center justify-center gap-2"
                                    >
                                        <PiArrowLeft />
                                        بازگشت
                                    </button>
                                )}

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
