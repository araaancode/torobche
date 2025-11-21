// pages/AdminSettings.js
import React, { useState, useEffect } from 'react';
import { 
  PiShield, 
  PiBell,
  PiSparkle,
  PiGear,
  PiTrendUp,
  PiTrendDown,
  PiDownload,
  PiExport,
  PiEye,
  PiEyeClosed,
  PiCheckCircle,
  PiClock,
  PiWarning,
  PiUserCircle,
  PiLock,
  PiGlobe,
  PiCreditCard,
  PiQrCode,
  PiStorefront,
  PiChartLine,
  PiMoney,
  PiList,
  PiX,
  PiCrown,
  PiShootingStar,
  PiConfetti,
  PiInfo,
  PiUpload,
  PiTrash,
  PiCopy,
  PiDatabase,
  PiShieldCheck,
  PiUsers,
  PiArrowUpRight,
  PiFloppyDisk,
  PiPalette,
  PiNotification,
  PiCloud,
  PiCpu,
  PiHardDrives,
  PiUser
} from 'react-icons/pi';

const AdminSettings = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [isVisible, setIsVisible] = useState(false);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'تربچه',
    siteDescription: 'سرویس ساخت کارت ویزیت و منو آنلاین',
    language: 'fa',
    timezone: 'Asia/Tehran',
    dateFormat: 'jalali',
    maintenanceMode: false,
    darkMode: false,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6'
  });

  // User Settings
  const [userSettings, setUserSettings] = useState({
    allowRegistration: true,
    emailVerification: true,
    defaultUserRole: 'user',
    maxMenusPerUser: 10,
    maxCardsPerUser: 5,
    autoApproveUsers: false,
    userSessionTimeout: 24
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'IRT',
    taxRate: 9,
    gateway: 'zarinpal',
    testMode: false,
    minimumAmount: 1000,
    autoRenewal: true,
    refundPolicy: '7days'
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordMinLength: 8,
    loginAttempts: 5,
    sessionTimeout: 24,
    ipWhitelist: '',
    forceHTTPS: true,
    contentSecurityPolicy: true
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true,
    userActivityLogs: true,
    systemReports: true
  });

  // Advanced Settings
  const [advancedSettings, setAdvancedSettings] = useState({
    cacheEnabled: true,
    cdnEnabled: false,
    analyticsEnabled: true,
    backupFrequency: 'daily',
    storageLimit: '10GB',
    apiRateLimit: 1000,
    debugMode: false
  });

  const navigationItems = [
    { id: 'overview', name: 'داشبورد', icon: <PiChartLine className="text-xl" />, badge: null },
    { id: 'users', name: 'مدیریت کاربران', icon: <PiUsers className="text-xl" />, badge: '۵' },
    { id: 'menus', name: 'منوها', icon: <PiStorefront className="text-xl" />, badge: '۶' },
    { id: 'business-cards', name: 'کارت ویزیت', icon: <PiUserCircle className="text-xl" />, badge: '۶' },
    { id: 'templates', name: 'قالب‌ها', icon: <PiSparkle className="text-xl" />, badge: '۶' },
    { id: 'qr-codes', name: 'QR کدها', icon: <PiQrCode className="text-xl" />, badge: '۸۹' },
    { id: 'analytics', name: 'آمار و گزارش', icon: <PiChartLine className="text-xl" />, badge: null },
    { id: 'payments', name: 'پرداخت‌ها', icon: <PiMoney className="text-xl" />, badge: 'جدید' },
    { id: 'settings', name: 'تنظیمات', icon: <PiGear className="text-xl" />, badge: null }
  ];

  const tabs = [
    { id: 'general', name: 'عمومی', icon: <PiGear className="text-lg" />, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'users', name: 'کاربران', icon: <PiUsers className="text-lg" />, gradient: 'from-green-500 to-emerald-500' },
    { id: 'payments', name: 'پرداخت', icon: <PiCreditCard className="text-lg" />, gradient: 'from-purple-500 to-pink-500' },
    { id: 'security', name: 'امنیت', icon: <PiShieldCheck className="text-lg" />, gradient: 'from-orange-500 to-amber-500' },
    { id: 'notifications', name: 'اعلان‌ها', icon: <PiUser className="text-lg" />, gradient: 'from-indigo-500 to-purple-500' },
    { id: 'advanced', name: 'پیشرفته', icon: <PiCpu className="text-lg" />, gradient: 'from-gray-600 to-gray-700' }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSaveSettings = () => {
    console.log('Settings saved:', {
      generalSettings,
      userSettings,
      paymentSettings,
      securitySettings,
      notificationSettings,
      advancedSettings
    });
    // Show success message
  };

  const toggleSwitch = (settings, setSettings, key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const SettingCard = ({ title, description, children, gradient = 'from-blue-500 to-cyan-500' }) => (
    <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl p-6 shadow-lg border border-white/60 backdrop-blur-sm">
      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
        <div className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
          <PiGear className="text-white text-lg" />
        </div>
        <div>
          <h3 className="font-black text-gray-800 text-lg">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50/50 rounded-2xl border border-gray-200/50 hover:shadow-md transition-all duration-300">
      <div className="flex-1">
        <h4 className="font-bold text-gray-800 text-sm">{label}</h4>
        <p className="text-gray-600 text-xs mt-1">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
          enabled ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-300 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <SettingCard 
        title="تنظیمات اصلی" 
        description="تنظیمات پایه و عمومی سیستم"
        gradient="from-blue-500 to-cyan-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">نام سایت</label>
            <input
              type="text"
              value={generalSettings.siteName}
              onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">توضیحات سایت</label>
            <input
              type="text"
              value={generalSettings.siteDescription}
              onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">زبان</label>
            <select
              value={generalSettings.language}
              onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="fa">فارسی</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">منطقه زمانی</label>
            <select
              value={generalSettings.timezone}
              onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="Asia/Tehran">تهران (UTC+3:30)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">فرمت تاریخ</label>
            <select
              value={generalSettings.dateFormat}
              onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="jalali">شمسی (Jalali)</option>
              <option value="gregorian">میلادی (Gregorian)</option>
            </select>
          </div>
        </div>
      </SettingCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToggleSwitch
          enabled={generalSettings.maintenanceMode}
          onChange={() => toggleSwitch(generalSettings, setGeneralSettings, 'maintenanceMode')}
          label="حالت تعمیر و نگهداری"
          description="سایت برای همه کاربران به جز مدیران غیرفعال می‌شود"
        />
        <ToggleSwitch
          enabled={generalSettings.darkMode}
          onChange={() => toggleSwitch(generalSettings, setGeneralSettings, 'darkMode')}
          label="حالت تاریک"
          description="فعال کردن تم تاریک برای پنل مدیریت"
        />
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <SettingCard 
        title="تنظیمات کاربران" 
        description="مدیریت ثبت‌نام و دسترسی کاربران"
        gradient="from-green-500 to-emerald-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">نقش پیش‌فرض کاربر</label>
            <select
              value={userSettings.defaultUserRole}
              onChange={(e) => setUserSettings({...userSettings, defaultUserRole: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="user">کاربر عادی</option>
              <option value="editor">ویرایشگر</option>
              <option value="moderator">ناظر</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">حداکثر منو برای هر کاربر</label>
            <input
              type="number"
              value={userSettings.maxMenusPerUser}
              onChange={(e) => setUserSettings({...userSettings, maxMenusPerUser: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">حداکثر کارت ویزیت برای هر کاربر</label>
            <input
              type="number"
              value={userSettings.maxCardsPerUser}
              onChange={(e) => setUserSettings({...userSettings, maxCardsPerUser: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">مدت زمان session کاربر (ساعت)</label>
            <input
              type="number"
              value={userSettings.userSessionTimeout}
              onChange={(e) => setUserSettings({...userSettings, userSessionTimeout: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>
      </SettingCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToggleSwitch
          enabled={userSettings.allowRegistration}
          onChange={() => toggleSwitch(userSettings, setUserSettings, 'allowRegistration')}
          label="اجازه ثبت‌نام"
          description="کاربران جدید می‌توانند ثبت‌نام کنند"
        />
        <ToggleSwitch
          enabled={userSettings.emailVerification}
          onChange={() => toggleSwitch(userSettings, setUserSettings, 'emailVerification')}
          label="تایید ایمیل"
          description="کاربران باید ایمیل خود را تایید کنند"
        />
        <ToggleSwitch
          enabled={userSettings.autoApproveUsers}
          onChange={() => toggleSwitch(userSettings, setUserSettings, 'autoApproveUsers')}
          label="تایید خودکار کاربران"
          description="کاربران جدید به صورت خودکار تایید شوند"
        />
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <SettingCard 
        title="تنظیمات پرداخت" 
        description="مدیریت درگاه‌های پرداخت و مالیات"
        gradient="from-purple-500 to-pink-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">ارز</label>
            <select
              value={paymentSettings.currency}
              onChange={(e) => setPaymentSettings({...paymentSettings, currency: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="IRT">تومان (IRT)</option>
              <option value="IRR">ریال (IRR)</option>
              <option value="USD">دلار (USD)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">درگاه پرداخت</label>
            <select
              value={paymentSettings.gateway}
              onChange={(e) => setPaymentSettings({...paymentSettings, gateway: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="zarinpal">زرین‌پال</option>
              <option value="parsian">پارسیان</option>
              <option value="saman">سامان</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">نرخ مالیات (٪)</label>
            <input
              type="number"
              value={paymentSettings.taxRate}
              onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">حداقل مبلغ پرداخت (تومان)</label>
            <input
              type="number"
              value={paymentSettings.minimumAmount}
              onChange={(e) => setPaymentSettings({...paymentSettings, minimumAmount: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>
      </SettingCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToggleSwitch
          enabled={paymentSettings.testMode}
          onChange={() => toggleSwitch(paymentSettings, setPaymentSettings, 'testMode')}
          label="حالت تست"
          description="پرداخت‌ها در حالت تست انجام می‌شوند"
        />
        <ToggleSwitch
          enabled={paymentSettings.autoRenewal}
          onChange={() => toggleSwitch(paymentSettings, setPaymentSettings, 'autoRenewal')}
          label="تمدید خودکار"
          description="تمدید خودکار اشتراک‌ها"
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <SettingCard 
        title="تنظیمات امنیتی" 
        description="مدیریت امنیت و دسترسی سیستم"
        gradient="from-orange-500 to-amber-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">حداقل طول رمز عبور</label>
            <input
              type="number"
              value={securitySettings.passwordMinLength}
              onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">تعداد مجاز تلاش برای ورود</label>
            <input
              type="number"
              value={securitySettings.loginAttempts}
              onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">مدت زمان انقضای session (ساعت)</label>
            <input
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">لیست سفید IP</label>
            <input
              type="text"
              value={securitySettings.ipWhitelist}
              onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.value})}
              placeholder="IP ها را با کاما جدا کنید"
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>
      </SettingCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToggleSwitch
          enabled={securitySettings.twoFactorAuth}
          onChange={() => toggleSwitch(securitySettings, setSecuritySettings, 'twoFactorAuth')}
          label="احراز هویت دو مرحله‌ای"
          description="کاربران باید از طریق کد تأیید وارد شوند"
        />
        <ToggleSwitch
          enabled={securitySettings.forceHTTPS}
          onChange={() => toggleSwitch(securitySettings, setSecuritySettings, 'forceHTTPS')}
          label="اجبار استفاده از HTTPS"
          description="همه ارتباطات از طریق HTTPS انجام شود"
        />
        <ToggleSwitch
          enabled={securitySettings.contentSecurityPolicy}
          onChange={() => toggleSwitch(securitySettings, setSecuritySettings, 'contentSecurityPolicy')}
          label="سیاست امنیت محتوا"
          description="فعال کردن CSP برای افزایش امنیت"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <SettingCard 
        title="تنظیمات اعلان‌ها" 
        description="مدیریت انواع اعلان‌های سیستم"
        gradient="from-indigo-500 to-purple-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ToggleSwitch
            enabled={notificationSettings.emailNotifications}
            onChange={() => toggleSwitch(notificationSettings, setNotificationSettings, 'emailNotifications')}
            label="اعلان‌های ایمیلی"
            description="ارسال اعلان‌ها از طریق ایمیل"
          />
          <ToggleSwitch
            enabled={notificationSettings.smsNotifications}
            onChange={() => toggleSwitch(notificationSettings, setNotificationSettings, 'smsNotifications')}
            label="اعلان‌های پیامکی"
            description="ارسال اعلان‌ها از طریق SMS"
          />
          <ToggleSwitch
            enabled={notificationSettings.pushNotifications}
            onChange={() => toggleSwitch(notificationSettings, setNotificationSettings, 'pushNotifications')}
            label="اعلان‌های push"
            description="ارسال اعلان‌های لحظه‌ای"
          />
          <ToggleSwitch
            enabled={notificationSettings.adminAlerts}
            onChange={() => toggleSwitch(notificationSettings, setNotificationSettings, 'adminAlerts')}
            label="هشدارهای مدیریتی"
            description="اعلان‌های مهم برای مدیران سیستم"
          />
        </div>
      </SettingCard>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <SettingCard 
        title="تنظیمات پیشرفته" 
        description="تنظیمات فنی و سیستمی"
        gradient="from-gray-600 to-gray-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">فرکانس پشتیبان‌گیری</label>
            <select
              value={advancedSettings.backupFrequency}
              onChange={(e) => setAdvancedSettings({...advancedSettings, backupFrequency: e.target.value})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="daily">روزانه</option>
              <option value="weekly">هفتگی</option>
              <option value="monthly">ماهانه</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">محدودیت API</label>
            <input
              type="number"
              value={advancedSettings.apiRateLimit}
              onChange={(e) => setAdvancedSettings({...advancedSettings, apiRateLimit: parseInt(e.target.value)})}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>
      </SettingCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToggleSwitch
          enabled={advancedSettings.cacheEnabled}
          onChange={() => toggleSwitch(advancedSettings, setAdvancedSettings, 'cacheEnabled')}
          label="فعال‌سازی کش"
          description="استفاده از کش برای بهبود عملکرد"
        />
        <ToggleSwitch
          enabled={advancedSettings.cdnEnabled}
          onChange={() => toggleSwitch(advancedSettings, setAdvancedSettings, 'cdnEnabled')}
          label="فعال‌سازی CDN"
          description="استفاده از شبکه تحویل محتوا"
        />
        <ToggleSwitch
          enabled={advancedSettings.analyticsEnabled}
          onChange={() => toggleSwitch(advancedSettings, setAdvancedSettings, 'analyticsEnabled')}
          label="فعال‌سازی آنالیتیکس"
          description="ردیابی و تحلیل رفتار کاربران"
        />
        <ToggleSwitch
          enabled={advancedSettings.debugMode}
          onChange={() => toggleSwitch(advancedSettings, setAdvancedSettings, 'debugMode')}
          label="حالت دیباگ"
          description="نمایش خطاهای توسعه"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'users': return renderUserSettings();
      case 'payments': return renderPaymentSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return renderNotificationSettings();
      case 'advanced': return renderAdvancedSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #666 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 opacity-10 animate-float">
        <PiSparkle className="text-5xl text-blue-500" />
      </div>
      <div className="absolute bottom-32 right-32 opacity-10 animate-float-delayed">
        <PiShootingStar className="text-4xl text-purple-500" />
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div className={`bg-white/95 backdrop-blur-xl border-l border-gray-200/50 shadow-2xl transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-20'}`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <PiShield className="text-white text-xl" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h1 className="text-xl font-black text-gray-800">پنل مدیریت</h1>
                    <p className="text-gray-500 text-sm font-medium">تربچه</p>
                  </div>
                )}
              </div>
              {sidebarOpen && (
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <PiX className="text-gray-600 text-sm" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between space-x-3 rtl:space-x-reverse p-3 rounded-xl mb-2 transition-all duration-200 group ${
                  item.id === 'settings'
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`transition-colors duration-200 ${
                    item.id === 'settings' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className={`font-medium text-sm transition-all duration-200 ${
                      item.id === 'settings' ? 'text-blue-800' : 'text-gray-700'
                    }`}>
                      {item.name}
                    </span>
                  )}
                </div>
                
                {sidebarOpen && item.badge && (
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    item.id === 'settings' 
                      ? 'bg-blue-100 text-blue-700' 
                      : item.badge === 'جدید' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          {sidebarOpen && (
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50 bg-white/80">
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm">مدیر سیستم</h4>
                  <p className="text-gray-500 text-xs">admin@torobche.ir</p>
                </div>
                <button className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <PiGear className="text-gray-600 text-sm" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto min-h-screen">
          {/* Top Bar */}
          <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors duration-200 shadow-sm"
                  >
                    <PiList className="text-gray-600 text-lg" />
                  </button>
                )}
                <div>
                  <h1 className="text-2xl font-black text-gray-800">تنظیمات سیستم</h1>
                  <p className="text-gray-500 text-sm">مدیریت کامل تنظیمات و پیکربندی سیستم</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors duration-200 shadow-sm relative">
                  <PiBell className="text-gray-600 text-lg" />
                  <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center shadow-lg animate-pulse">
                    ۳
                  </span>
                </button>
                <div className="flex items-center space-x-3 rtl:space-x-reverse bg-gray-100/80 hover:bg-gray-200/80 rounded-xl px-3 py-2 transition-colors duration-200 cursor-pointer shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    A
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">مدیر سیستم</p>
                    <p className="text-xs text-gray-500">مدیر ارشد</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black mb-2">مرکز کنترل سیستم ⚙️</h2>
                  <p className="text-blue-100">مدیریت کامل تنظیمات و پیکربندی سیستم تربچه</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse">
                    <PiDownload className="text-lg" />
                    <span>پشتیبان‌گیری</span>
                  </button>
                  <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors duration-200 font-medium">
                    بازنشانی تنظیمات
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden mb-6">
              {/* Tabs */}
              <div className="border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-gray-100/50">
                <div className="flex overflow-x-auto">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-3 rtl:space-x-reverse px-6 py-4 border-b-2 transition-all duration-300 whitespace-nowrap group ${
                        activeTab === tab.id
                          ? `border-blue-500 text-blue-700 bg-white shadow-sm`
                          : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-white/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        activeTab === tab.id 
                          ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg` 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }`}>
                        {tab.icon}
                      </div>
                      <span className="font-bold text-sm">{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {renderContent()}

                {/* Save Button */}
                <div className="flex justify-end mt-8 pt-6 border-t border-gray-200/50">
                  <button
                    onClick={handleSaveSettings}
                    className="flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105"
                  >
                    <PiFloppyDisk className="text-lg" />
                    <span className="font-bold">ذخیره تنظیمات</span>
                  </button>
                </div>
              </div>
            </div>

            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-200/50">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <PiDatabase className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800">پایگاه داده</h3>
                    <p className="text-gray-600 text-sm">MySQL 8.0</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">اندازه:</span>
                    <span className="text-gray-800 font-bold">۲۴۵ MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تعداد جداول:</span>
                    <span className="text-gray-800 font-bold">۳۴</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">وضعیت:</span>
                    <span className="text-green-600 font-bold">فعال</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg border border-blue-200/50">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <PiCpu className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800">سرور</h3>
                    <p className="text-gray-600 text-sm">PHP 8.1 • Node.js 18</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">حافظه:</span>
                    <span className="text-gray-800 font-bold">۵۱۲ MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">آپتایم:</span>
                    <span className="text-gray-800 font-bold">۹۹.۸٪</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">لود:</span>
                    <span className="text-green-600 font-bold">۲۳٪</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-200/50">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <PiShieldCheck className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800">امنیت</h3>
                    <p className="text-gray-600 text-sm">SSL • Firewall • 2FA</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">آخرین بروزرسانی:</span>
                    <span className="text-gray-800 font-bold">۱۴۰۲/۱۰/۱۵</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">اسکن امنیتی:</span>
                    <span className="text-green-600 font-bold">تایید شده</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">وضعیت:</span>
                    <span className="text-green-600 font-bold">فعال</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminSettings;