import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import MenuEditor from './pages/MenuEditor';
import Analytics from './pages/Analytics';
import UserProfile from './pages/UserProfile';
import MenuManager from './pages/MenuManager';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';
import Blog from './pages/Blog';
import Help from './pages/Help';
import AdminDashboard from './pages/admin/AdminDashboard';
import Templates from './pages/Templates';
import QRCodeManager from './pages/QRCodeManager';

// Import CSS
import './App.css';
import BusinessCards from './pages/BusinessCards';
import BusinessCardEditor from './pages/BusinessCardEditor';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMenus from './pages/admin/AdminMenus';
import AdminBusinessCards from './pages/admin/AdminBusinessCards';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminQRCodes from './pages/admin/AdminQRCodes';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSettings from './pages/admin/AdminSettings';

import RestaurantMenuPage from './pages/RestaurantMenuPage';
import DoctorCardPage from './pages/DoctorCardPage';
import DigitalResumePage from './pages/DigitalResumePage';
import BusinessCardPage from './pages/BusinessCardPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 pointer-events-none"></div>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<>
            <Header />
            <Home />
            <Footer />
          </>} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Template Pages */}
          <Route path="/restaurant-menu" element={<RestaurantMenuPage />} />
          <Route path="/doctor-card" element={<DoctorCardPage />} />
          <Route path="/digital-resume" element={<DigitalResumePage />} />
          <Route path="/business-card" element={<BusinessCardPage />} />

          <Route path="/pricing" element={<>
            <Header />
            <Pricing />
            <Footer />
          </>} />
          <Route path="/blog" element={<>
            <Header />
            <Blog />
            <Footer />
          </>} />
          <Route path="/help" element={<>
            <Header />
            <Help />
            <Footer />
          </>} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<>
            <Header />
            <Dashboard />
            <Footer />
          </>} />

          <Route path="/editor" element={<>
            <Header />
            <MenuEditor />
            <Footer />
          </>} />

          <Route path="/analytics" element={<>
            <Header />
            <Analytics />
            <Footer />
          </>} />

          <Route path="/profile" element={<>
            <Header />
            <UserProfile />
            <Footer />
          </>} />

          <Route path="/menus" element={<>
            <Header />
            <MenuManager />
            <Footer />
          </>} />

          <Route path="/checkout" element={<>
            <Header />
            <Checkout />
            <Footer />
          </>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<>
            <AdminDashboard />
          </>} />

          <Route path="/admin/users" element={<>
            <AdminUsers />
          </>} />

          <Route path="/admin/menus" element={<>
            <AdminMenus />
          </>} />


          <Route path="/admin/business-cards" element={<>
            <AdminBusinessCards />
          </>} />


          <Route path="/admin/templates" element={<>
            <AdminTemplates />
          </>} />


          <Route path="/admin/qr-codes" element={<>
            <AdminQRCodes />
          </>} />

          <Route path="/admin/analytics" element={<>
            <AdminAnalytics />
          </>} />


          <Route path="/admin/payments" element={<>
            <AdminPayments />
          </>} />

          <Route path="/admin/settings" element={<>
            <AdminSettings />
          </>} />

          <Route path="/templates" element={<>
            <Header />
            <Templates />
            <Footer />
          </>} />


          <Route path="/business-cards" element={<>
            <Header />
            <BusinessCards />
            <Footer />
          </>} />

          <Route path="/business-cards/editor" element={<>
            <Header />
            <BusinessCardEditor />
            <Footer />
          </>} />

          <Route path="/qr-codes" element={<>
            <Header />
            <QRCodeManager />
            <Footer />
          </>} />
        </Routes>


      </div>
    </Router>
  );
};

export default App;