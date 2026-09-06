import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './hooks/useToast';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { AppShell } from './components/layout/AppShell';
import { ROLES } from './lib/constants';
import { mockProducts, mockArtisans, mockStories } from './lib/mockData';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { ExplorePage } from './pages/customer/ExplorePage';
import { CraftGraphPage } from './pages/customer/CraftGraphPage';
import { ProductDetailPage } from './pages/customer/ProductDetailPage';
import { ArtisanProfilePage } from './pages/customer/ArtisanProfilePage';
import { FavoritesPage } from './pages/customer/FavoritesPage';
import { CartPage } from './pages/customer/CartPage';
import { OrderHistoryPage } from './pages/customer/OrderHistoryPage';
import { CustomerProfilePage } from './pages/customer/CustomerProfilePage';

// Artisan Dashboard Pages
import { ArtisanOverviewPage } from './pages/artisan/ArtisanOverviewPage';
import { ArtisanProductsPage } from './pages/artisan/ArtisanProductsPage';
import { ArtisanAddProductPage } from './pages/artisan/ArtisanAddProductPage';
import { ArtisanOrdersPage } from './pages/artisan/ArtisanOrdersPage';
import { ArtisanInventoryPage } from './pages/artisan/ArtisanInventoryPage';
import { ArtisanInsightsPage } from './pages/artisan/ArtisanInsightsPage';
import { ArtisanProfilePage as ArtisanStudioProfilePage } from './pages/artisan/ArtisanProfilePage';
import { ArtisanNotificationsPage } from './pages/artisan/ArtisanNotificationsPage';
import { ArtisanHelpPage } from './pages/artisan/ArtisanHelpPage';

// Admin Dashboard Pages
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminArtisansPage } from './pages/admin/AdminArtisansPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminCraftsPage } from './pages/admin/AdminCraftsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';

// Authentication Pages
import {
  CustomerLoginPage,
  CustomerRegisterPage,
  ArtisanLoginPage,
  ArtisanRegisterPage,
  AdminLoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from './pages/auth';

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const { addToast } = useToast();

  const [role, setRole] = useState(user?.role || ROLES.CUSTOMER);
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [selectedArtisan, setSelectedArtisan] = useState(mockArtisans[0]);
  const [selectedStory, setSelectedStory] = useState(mockStories[0]);

  // Synchronize role state if authenticated user changes
  useEffect(() => {
    if (user?.role && user.role !== role) {
      setRole(user.role);
    }
  }, [user]);

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash) {
        const parts = hash.split('/');
        // Auth standalone routes: #/login, #/register, #/artisan-login, etc.
        const authRoutes = [
          'login',
          'register',
          'artisan-login',
          'artisan-register',
          'admin-login',
          'forgot-password',
          'reset-password',
        ];

        if (authRoutes.includes(parts[0])) {
          setActivePage(parts[0]);
        } else if (parts[0] === 'artisan' || parts[0] === 'admin' || parts[0] === 'customer') {
          setRole(parts[0]);
          if (parts[1]) setActivePage(parts[1]);
        } else {
          setActivePage(parts[0]);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleRoleChange = (newRole) => {
    setRole(newRole);

    // Protected role transition handling
    if (newRole === ROLES.ARTISAN && (!isAuthenticated || user?.role !== ROLES.ARTISAN)) {
      setActivePage('artisan-login');
      window.location.hash = `#/artisan-login`;
      return;
    }

    if (newRole === ROLES.ADMIN && (!isAuthenticated || user?.role !== ROLES.ADMIN)) {
      setActivePage('admin-login');
      window.location.hash = `#/admin-login`;
      return;
    }

    const defaultPage = newRole === ROLES.CUSTOMER ? 'home' : 'overview';
    setActivePage(defaultPage);
    window.location.hash = `#/${newRole}/${defaultPage}`;
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    const authRoutes = [
      'login',
      'register',
      'artisan-login',
      'artisan-register',
      'admin-login',
      'forgot-password',
      'reset-password',
    ];

    if (authRoutes.includes(page)) {
      window.location.hash = `#/${page}`;
    } else {
      window.location.hash = `#/${role}/${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await logout();
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been successfully signed out.',
    });
    setRole(ROLES.CUSTOMER);
    setActivePage('home');
    window.location.hash = `#/customer/home`;
  };

  const handleLoginSuccess = (authUser) => {
    setRole(authUser.role);
    const destination = authUser.role === ROLES.CUSTOMER ? 'home' : 'overview';
    setActivePage(destination);
    window.location.hash = `#/${authUser.role}/${destination}`;
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.location.hash = `#/${role}/product-detail`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArtisanClick = (artisan) => {
    setSelectedArtisan(artisan);
    setActivePage('artisan-profile');
    window.location.hash = `#/${role}/artisan-profile`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. STANDALONE AUTHENTICATION PAGES
  if (activePage === 'login') {
    return (
      <CustomerLoginPage
        onNavigate={handleNavigate}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (activePage === 'register') {
    return (
      <CustomerRegisterPage
        onNavigate={handleNavigate}
        onRegisterSuccess={handleLoginSuccess}
      />
    );
  }

  if (activePage === 'artisan-login') {
    return (
      <ArtisanLoginPage
        onNavigate={handleNavigate}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (activePage === 'artisan-register') {
    return (
      <ArtisanRegisterPage
        onNavigate={handleNavigate}
        onRegisterSuccess={handleLoginSuccess}
      />
    );
  }

  if (activePage === 'admin-login') {
    return (
      <AdminLoginPage
        onNavigate={handleNavigate}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (activePage === 'forgot-password') {
    return (
      <ForgotPasswordPage
        onNavigate={handleNavigate}
        role={role}
      />
    );
  }

  if (activePage === 'reset-password') {
    return (
      <ResetPasswordPage
        onNavigate={handleNavigate}
        role={role}
      />
    );
  }

  // 2. PROTECTED ROLE CHECKS FOR DASHBOARDS
  if (role === ROLES.ARTISAN && (!isAuthenticated || user?.role !== ROLES.ARTISAN)) {
    return (
      <ArtisanLoginPage
        onNavigate={handleNavigate}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (role === ROLES.ADMIN && (!isAuthenticated || user?.role !== ROLES.ADMIN)) {
    return (
      <AdminLoginPage
        onNavigate={handleNavigate}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // 3. RENDER ROLE VIEWS INSIDE APPSHELL
  const renderCurrentView = () => {
    // A. CUSTOMER ROLE VIEWS
    if (role === ROLES.CUSTOMER) {
      switch (activePage) {
        case 'home':
          return (
            <HomePage
              onNavigate={handleNavigate}
              onProductClick={handleProductClick}
              onArtisanClick={handleArtisanClick}
              onStoryClick={handleStoryClick}
            />
          );
        case 'explore':
          return (
            <ExplorePage
              onProductClick={handleProductClick}
              onNavigate={handleNavigate}
            />
          );
        case 'craft-graph':
          return <CraftGraphPage onNavigate={handleNavigate} />;
        case 'product-detail':
          return (
            <ProductDetailPage
              product={selectedProduct}
              onBack={() => handleNavigate('explore')}
              onNavigate={handleNavigate}
            />
          );
        case 'artisans':
        case 'artisan-profile':
          return (
            <ArtisanProfilePage
              artisan={selectedArtisan}
              onBack={() => handleNavigate('home')}
              onProductClick={handleProductClick}
              onNavigate={handleNavigate}
            />
          );
        case 'favorites':
          return (
            <FavoritesPage
              onProductClick={handleProductClick}
              onNavigate={handleNavigate}
            />
          );
        case 'cart':
          return <CartPage onNavigate={handleNavigate} />;
        case 'orders':
          return <OrderHistoryPage onNavigate={handleNavigate} />;
        case 'profile':
          return <CustomerProfilePage onNavigate={handleNavigate} />;
        default:
          return (
            <HomePage
              onNavigate={handleNavigate}
              onProductClick={handleProductClick}
              onArtisanClick={handleArtisanClick}
              onStoryClick={handleStoryClick}
            />
          );
      }
    }

    // B. ARTISAN ROLE VIEWS
    if (role === ROLES.ARTISAN) {
      switch (activePage) {
        case 'home':
        case 'overview':
          return <ArtisanOverviewPage onNavigate={handleNavigate} />;
        case 'products':
          return <ArtisanProductsPage onNavigate={handleNavigate} />;
        case 'add-product':
          return (
            <ArtisanAddProductPage
              onBack={() => handleNavigate('products')}
              onNavigate={handleNavigate}
            />
          );
        case 'orders':
          return <ArtisanOrdersPage onNavigate={handleNavigate} />;
        case 'notifications':
          return <ArtisanNotificationsPage onNavigate={handleNavigate} />;
        case 'inventory':
          return <ArtisanInventoryPage onNavigate={handleNavigate} />;
        case 'insights':
          return <ArtisanInsightsPage onNavigate={handleNavigate} />;
        case 'profile':
          return <ArtisanStudioProfilePage onNavigate={handleNavigate} />;
        case 'help':
          return <ArtisanHelpPage onNavigate={handleNavigate} />;
        default:
          return <ArtisanOverviewPage onNavigate={handleNavigate} />;
      }
    }

    // C. ADMIN ROLE VIEWS
    if (role === ROLES.ADMIN) {
      switch (activePage) {
        case 'overview':
          return <AdminOverviewPage onNavigate={handleNavigate} />;
        case 'users':
          return <AdminUsersPage onNavigate={handleNavigate} />;
        case 'artisans':
          return <AdminArtisansPage onNavigate={handleNavigate} />;
        case 'products':
          return <AdminProductsPage onNavigate={handleNavigate} />;
        case 'crafts':
          return <AdminCraftsPage onNavigate={handleNavigate} />;
        case 'reports':
          return <AdminReportsPage onNavigate={handleNavigate} />;
        case 'analytics':
          return <AdminAnalyticsPage onNavigate={handleNavigate} />;
        default:
          return <AdminOverviewPage onNavigate={handleNavigate} />;
      }
    }

    return null;
  };

  return (
    <AppShell
      role={role}
      onRoleChange={handleRoleChange}
      activePage={activePage}
      onNavigate={handleNavigate}
      user={user}
      isAuthenticated={isAuthenticated}
      onLogout={handleLogout}
      onLogin={() => {
        const loginRoute =
          role === ROLES.ARTISAN
            ? 'artisan-login'
            : role === ROLES.ADMIN
            ? 'admin-login'
            : 'login';
        handleNavigate(loginRoute);
      }}
    >
      {renderCurrentView()}
    </AppShell>
  );
}

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
