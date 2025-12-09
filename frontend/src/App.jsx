import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
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
import Templates from './pages/Templates';
import QRCodeManager from './pages/QRCodeManager';
import BusinessCards from './pages/BusinessCards';
import BusinessCardEditor from './pages/BusinessCardEditor';
import RestaurantMenuPage from './pages/RestaurantMenuPage';
import DoctorCardPage from './pages/DoctorCardPage';
import DigitalResumePage from './pages/DigitalResumePage';
import BusinessCardPage from './pages/BusinessCardPage';
// import BusinessCardsApiPage from "./pages/BusinessCardsApiPage"

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMenus from './pages/admin/AdminMenus';
import AdminBusinessCards from './pages/admin/AdminBusinessCards';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminQRCodes from './pages/admin/AdminQRCodes';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSettings from './pages/admin/AdminSettings';

// Styles
import './App.css';
import RestaurantMenuBuilder from './pages/RestaurantMenuBuilder';
import VisitCardBuilder from './pages/VisitCardBuilder';
import BusinessCardBuilder from './pages/BusinessCardBuilder';
import ResumeBuilder from './pages/ResumeBuilder';


import MenuPage from "./pages/MenuPage"
import AddFoodToMenu from "./pages/AddFoodToMenu"
import VisitCardDetail from './pages/VisitCardDetail';

import BusinessCardDetailePage from "./pages/BusinessCardDetailPage"

// Constants
const ROUTE_TYPES = {
  PUBLIC: 'public',
  PROTECTED: 'protected',
  ADMIN: 'admin'
};

const LAYOUT_TYPES = {
  WITH_HEADER_FOOTER: 'withHeaderFooter',
  ADMIN_LAYOUT: 'adminLayout',
  AUTH_LAYOUT: 'authLayout'
};

// Route Configuration
const appRoutes = [
  // Public Routes with Header & Footer
  {
    path: '/',
    component: Home,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },

  {
    path: '/add-food/:menuId',
    component: AddFoodToMenu,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/pricing',
    component: Pricing,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/blog',
    component: Blog,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/help',
    component: Help,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },

  // Public Routes without Header & Footer (Auth pages)
  {
    path: '/login',
    component: Login,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.AUTH_LAYOUT
  },
  {
    path: '/register',
    component: Register,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.AUTH_LAYOUT
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.AUTH_LAYOUT
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.AUTH_LAYOUT
  },

  // Template Preview Pages
  {
    path: '/restaurant-menu',
    component: RestaurantMenuPage,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.AUTH_LAYOUT
  },
  {
    path: '/doctor-card',
    component: DoctorCardPage,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.AUTH_LAYOUT
  },
  {
    path: '/digital-resume',
    component: DigitalResumePage,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.AUTH_LAYOUT
  },
  {
    path: '/business-card',
    component: BusinessCardPage,
    type: ROUTE_TYPES.PUBLIC,
    layout: LAYOUT_TYPES.AUTH_LAYOUT
  },

  // Protected Routes (User Dashboard)
  {
    path: '/profile',
    component: Dashboard,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/editor',
    component: MenuEditor,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/analytics',
    component: Analytics,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/profile',
    component: UserProfile,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/menus',
    component: MenuManager,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/checkout',
    component: Checkout,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/templates',
    component: Templates,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  // {
  //   path: '/business-cards/api',
  //   component: BusinessCardsApiPage,
  //   type: ROUTE_TYPES.PROTECTED,
  //   layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  // },
  {
    path: '/business-cards',
    component: BusinessCards,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  // {
  //   path: '/business-cards/:id',
  //   component: BusinessCardPage,
  //   type: ROUTE_TYPES.PROTECTED,
  //   layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  // },
  {
    path: '/business-cards/editor',
    component: BusinessCardEditor,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/menu/:id/foods',
    component: MenuPage,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },
  {
    path: '/qr-codes',
    component: QRCodeManager,
    type: ROUTE_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.WITH_HEADER_FOOTER
  },

  // builder pages
  {
    path: '/restaurant-menu-builder',
    component: RestaurantMenuBuilder,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },

  {
    path: '/visit-card-builder',
    component: VisitCardBuilder,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },
  {
    path: '/visit-cards/:id/view',
    component: VisitCardDetail,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },

  {
    path: '/business-card-builder',
    component: BusinessCardBuilder,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },

  {
    path: '/business-cards/:id',
    component: BusinessCardDetailePage,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },

  {
    path: '/resume-builder',
    component: ResumeBuilder,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },

  {
    path: '/visit-template-builder',
    component: VisitCardBuilder,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },


  // Admin Routes
  {
    path: '/admin',
    component: AdminDashboard,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },
  {
    path: '/admin/users',
    component: AdminUsers,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },
  {
    path: '/admin/menus',
    component: AdminMenus,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },
  {
    path: '/admin/business-cards',
    component: AdminBusinessCards,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },
  {
    path: '/admin/templates',
    component: AdminTemplates,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },
  {
    path: '/admin/qr-codes',
    component: AdminQRCodes,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },
  {
    path: '/admin/analytics',
    component: AdminAnalytics,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },
  {
    path: '/admin/payments',
    component: AdminPayments,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },
  {
    path: '/admin/settings',
    component: AdminSettings,
    type: ROUTE_TYPES.ADMIN,
    layout: LAYOUT_TYPES.ADMIN_LAYOUT
  },


];

// Layout Components
const LayoutWithHeaderFooter = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const LayoutAdmin = ({ children }) => <>{children}</>;

const LayoutAuth = ({ children }) => <>{children}</>;

const getLayoutComponent = (layoutType) => {
  const layoutComponents = {
    [LAYOUT_TYPES.WITH_HEADER_FOOTER]: LayoutWithHeaderFooter,
    [LAYOUT_TYPES.ADMIN_LAYOUT]: LayoutAdmin,
    [LAYOUT_TYPES.AUTH_LAYOUT]: LayoutAuth
  };

  return layoutComponents[layoutType] || LayoutAuth;
};

// Route Component
const AppRoute = ({ route }) => {
  const { component: Component, layout } = route;
  const LayoutComponent = getLayoutComponent(layout);

  return (
    <LayoutComponent>
      <Component />
    </LayoutComponent>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 pointer-events-none" />

        <Routes>
          {appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<AppRoute route={route} />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;