import React, { useState } from 'react';
import { PiUser, PiEnvelope, PiPhone, PiMapPin, PiCamera, PiCheckCircle } from 'react-icons/pi';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'علی محمدی',
    email: 'ali.mohammadi@example.com',
    phone: '09123456789',
    address: 'تهران، خیابان ولیعصر',
    bio: 'مدیر رستوران برگرلند با ۵ سال سابقه در صنعت غذا'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 floating" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-black gradient-text mb-4">پروفایل کاربری</h1>
              <p className="text-gray-600 text-lg">مدیریت اطلاعات حساب کاربری</p>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="mt-4 lg:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover-lift shadow-2xl flex items-center space-x-2 rtl:space-x-reverse"
            >
              {isEditing ? <PiCheckCircle className="text-xl" /> : <PiUser className="text-xl" />}
              <span>{isEditing ? 'ذخیره تغییرات' : 'ویرایش پروفایل'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                  <PiUser className="text-white text-4xl" />
                </div>
                <button className="absolute bottom-2 left-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover-lift">
                  <PiCamera className="text-gray-600 text-sm" />
                </button>
              </div>
              
              <h2 className="text-xl font-black text-gray-800 mb-2">{user.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{user.bio}</p>
              
              <div className="space-y-2 text-right">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600">
                  <PiEnvelope className="text-blue-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600">
                  <PiPhone className="text-green-500" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600">
                  <PiMapPin className="text-red-500" />
                  <span>{user.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-6 shadow-2xl hover-lift">
              <h3 className="text-xl font-black text-gray-800 mb-6">اطلاعات شخصی</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام کامل</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">آدرس</label>
                  <input
                    type="text"
                    value={user.address}
                    onChange={(e) => setUser({...user, address: e.target.value})}
                    disabled={!isEditing}
                    className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 disabled:opacity-50"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">درباره من</label>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({...user, bio: e.target.value})}
                    disabled={!isEditing}
                    rows="3"
                    className="w-full glass-effect rounded-2xl px-4 py-3 text-gray-800 disabled:opacity-50 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;