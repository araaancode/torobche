// pages/AdminSettings.js
import React, { useState } from 'react';
import { 
  PiShield, 
  PiBell,
  PiSparkle,
  PiGear,
  PiUser,
  PiLock,
  PiNotification,
  PiGlobe,
  PiCreditCard,
  PiShieldCheck,
  PiDatabase,
  PiFloppyDisk, // به جای PiSave
  PiCheckCircle,
  PiXCircle,
  PiClock
} from 'react-icons/pi';

const AdminSettings = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'کارت‌ساز',
    siteDescription: 'سرویس ساخت کارت ویزیت و منو آنلاین',
    language: 'fa',
    timezone: 'Asia/Tehran',
    dateFormat: 'jalali',
    maintenanceMode: false
  });

  // User Settings
  const [userSettings, setUserSettings] = useState({
    allowRegistration: true,
    emailVerification: true,
    defaultUserRole: 'user',
    maxMenusPerUser: 10,
    maxCardsPerUser: 5
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'IRT',
    taxRate: 9,
    gateway: 'zarinpal',
    testMode: false,
    minimumAmount: 1000
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordMinLength: 8,
    loginAttempts: 5,
    sessionTimeout: 24,
    ipWhitelist: ''
  });

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiSparkle className="text-lg" /> },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiUser className="text-lg" /> },
    { id: 'menus', name: 'منوها', icon: <PiSparkle className="text-lg" /> },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiUser className="text-lg" /> },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-lg" /> },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiSparkle className="text-lg" /> },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiSparkle className="text-lg" /> },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiCreditCard className="text-lg" /> },
    { id: 'settings', name: 'تنظیمات', icon: <PiGear className="text-lg" /> }
  ];

  const tabs = [
    { id: 'general', name: 'عمومی', icon: <PiGear className="text-lg" /> },
    { id: 'users', name: 'کاربران', icon: <PiUser className="text-lg" /> },
    { id: 'payments', name: 'پرداخت', icon: <PiCreditCard className="text-lg" /> },
    { id: 'security', name: 'امنیت', icon: <PiShieldCheck className="text-lg" /> },
    { id: 'notifications', name: 'اعلان‌ها', icon: <PiNotification className="text-lg" /> },
    { id: 'advanced', name: 'پیشرفته', icon: <PiDatabase className="text-lg" /> }
  ];

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Settings saved:', {
      generalSettings,
      userSettings,
      paymentSettings,
      securitySettings
    });
    alert('تنظیمات با موفقیت ذخیره شد');
  };

  const toggleSwitch = (settings, setSettings, key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نام سایت</label>
          <input
            type="text"
            value={generalSettings.siteName}
            onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات سایت</label>
          <input
            type="text"
            value={generalSettings.siteDescription}
            onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">زبان</label>
          <select
            value={generalSettings.language}
            onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="fa">فارسی</option>
            <option value="en">English</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">منطقه زمانی</label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Asia/Tehran">تهران (UTC+3:30)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">فرمت تاریخ</label>
          <select
            value={generalSettings.dateFormat}
            onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="jalali">شمسی (Jalali)</option>
            <option value="gregorian">میلادی (Gregorian)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
        <div>
          <h4 className="font-medium text-gray-800">حالت تعمیر و نگهداری</h4>
          <p className="text-gray-600 text-sm">سایت برای همه کاربران به جز مدیران غیرفعال می‌شود</p>
        </div>
        <button
          onClick={() => toggleSwitch(generalSettings, setGeneralSettings, 'maintenanceMode')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            generalSettings.maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              generalSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <div>
            <h4 className="font-medium text-gray-800">اجازه ثبت‌نام</h4>
            <p className="text-gray-600 text-sm">کاربران جدید می‌توانند ثبت‌نام کنند</p>
          </div>
          <button
            onClick={() => toggleSwitch(userSettings, setUserSettings, 'allowRegistration')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              userSettings.allowRegistration ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                userSettings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <div>
            <h4 className="font-medium text-gray-800">تایید ایمیل</h4>
            <p className="text-gray-600 text-sm">کاربران باید ایمیل خود را تایید کنند</p>
          </div>
          <button
            onClick={() => toggleSwitch(userSettings, setUserSettings, 'emailVerification')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              userSettings.emailVerification ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                userSettings.emailVerification ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نقش پیش‌فرض کاربر</label>
          <select
            value={userSettings.defaultUserRole}
            onChange={(e) => setUserSettings({...userSettings, defaultUserRole: e.target.value})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="user">کاربر عادی</option>
            <option value="editor">ویرایشگر</option>
            <option value="moderator">ناظر</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر منو برای هر کاربر</label>
          <input
            type="number"
            value={userSettings.maxMenusPerUser}
            onChange={(e) => setUserSettings({...userSettings, maxMenusPerUser: parseInt(e.target.value)})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر کارت ویزیت برای هر کاربر</label>
        <input
          type="number"
          value={userSettings.maxCardsPerUser}
          onChange={(e) => setUserSettings({...userSettings, maxCardsPerUser: parseInt(e.target.value)})}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ارز</label>
          <select
            value={paymentSettings.currency}
            onChange={(e) => setPaymentSettings({...paymentSettings, currency: e.target.value})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="IRT">تومان (IRT)</option>
            <option value="IRR">ریال (IRR)</option>
            <option value="USD">دلار (USD)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">درگاه پرداخت</label>
          <select
            value={paymentSettings.gateway}
            onChange={(e) => setPaymentSettings({...paymentSettings, gateway: e.target.value})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="zarinpal">زرین‌پال</option>
            <option value="parsian">پارسیان</option>
            <option value="saman">سامان</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نرخ مالیات (٪)</label>
          <input
            type="number"
            value={paymentSettings.taxRate}
            onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: parseInt(e.target.value)})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">حداقل مبلغ پرداخت (تومان)</label>
          <input
            type="number"
            value={paymentSettings.minimumAmount}
            onChange={(e) => setPaymentSettings({...paymentSettings, minimumAmount: parseInt(e.target.value)})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
        <div>
          <h4 className="font-medium text-gray-800">حالت تست</h4>
          <p className="text-gray-600 text-sm">پرداخت‌ها در حالت تست انجام می‌شوند</p>
        </div>
        <button
          onClick={() => toggleSwitch(paymentSettings, setPaymentSettings, 'testMode')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            paymentSettings.testMode ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              paymentSettings.testMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
        <div>
          <h4 className="font-medium text-gray-800">احراز هویت دو مرحله‌ای</h4>
          <p className="text-gray-600 text-sm">کاربران باید از طریق کد تأیید وارد شوند</p>
        </div>
        <button
          onClick={() => toggleSwitch(securitySettings, setSecuritySettings, 'twoFactorAuth')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">حداقل طول رمز عبور</label>
          <input
            type="number"
            value={securitySettings.passwordMinLength}
            onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">تعداد مجاز تلاش برای ورود</label>
          <input
            type="number"
            value={securitySettings.loginAttempts}
            onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: parseInt(e.target.value)})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">مدت زمان انقضای session (ساعت)</label>
          <input
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">لیست سفید IP</label>
          <input
            type="text"
            value={securitySettings.ipWhitelist}
            onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.value})}
            placeholder="IP ها را با کاما جدا کنید"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'users': return renderUserSettings();
      case 'payments': return renderPaymentSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return <div className="text-center py-12 text-gray-500">تنظیمات اعلان‌ها به زودی اضافه خواهد شد</div>;
      case 'advanced': return <div className="text-center py-12 text-gray-500">تنظیمات پیشرفته به زودی اضافه خواهد شد</div>;
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-l border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <PiShield className="text-white text-lg" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-black text-gray-800">پنل مدیریت</h1>
                <p className="text-gray-500 text-xs">کارت‌ساز</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4">
          {navigationItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-2xl mb-2 transition-all duration-200 ${
                item.id === 'settings'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
              >
                <PiSparkle className="text-gray-600 text-lg" />
              </button>
              <h1 className="text-2xl font-black text-gray-800">تنظیمات سیستم</h1>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 relative">
                <PiBell className="text-gray-600 text-lg" />
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  ۳
                </span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-4 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderContent()}

              {/* Save Button */}
              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveSettings}
                  className="flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors duration-200"
                >
                  <PiFloppyDisk className="text-lg" />
                  <span>ذخیره تنظیمات</span>
                </button>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <PiDatabase className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">پایگاه داده</h3>
                  <p className="text-gray-600 text-sm">MySQL 8.0</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">اندازه:</span>
                  <span className="text-gray-800">۲۴۵ MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تعداد جداول:</span>
                  <span className="text-gray-800">۳۴</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <PiGear className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">سرور</h3>
                  <p className="text-gray-600 text-sm">PHP 8.1</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">حافظه:</span>
                  <span className="text-gray-800">۵۱۲ MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">آپتایم:</span>
                  <span className="text-gray-800">۹۹.۸٪</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <PiShieldCheck className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">امنیت</h3>
                  <p className="text-gray-600 text-sm">SSL فعال</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">آخرین بروزرسانی:</span>
                  <span className="text-gray-800">۱۴۰۲/۱۰/۱۵</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">وضعیت:</span>
                  <span className="text-green-600">فعال</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;