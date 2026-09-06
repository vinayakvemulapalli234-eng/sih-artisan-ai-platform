import React, { useState } from 'react';
import {
  Home,
  Compass,
  Share2,
  Heart,
  User,
  ShoppingBag,
} from 'lucide-react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { ToastContainer } from '../primitives/Toast';
import { ROLES } from '../../lib/constants';
import { getNavForRole } from '../../lib/navigationConfig';

/**
 * AppShell Layout Component
 * Central shell adapting navigation according to the active role and screen size.
 */
export function AppShell({
  role = ROLES.CUSTOMER,
  onRoleChange,
  activePage = 'home',
  onNavigate,
  children,
  cartCount = 2,
  favoritesCount = 3,
  user = null,
  isAuthenticated = false,
  onLogout,
  onLogin,
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navItems = getNavForRole(role);

  const roleTitles = {
    [ROLES.CUSTOMER]: { title: 'Discover Crafts', subtitle: 'Authentic Traditional Marketplace' },
    [ROLES.ARTISAN]: { title: 'Artisan Studio', subtitle: 'Govindappa V. • Srikalahasti' },
    [ROLES.ADMIN]: { title: 'Admin Console', subtitle: 'Platform Governance & Graph Health' },
  };

  const currentRoleInfo = roleTitles[role] || roleTitles[ROLES.CUSTOMER];

  // Mobile bottom tab bar items for Customer
  const customerMobileTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'craft-graph', label: 'Graph', icon: Share2 },
    { id: 'favorites', label: 'Saved', icon: Heart, count: favoritesCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col selection:bg-primary/20 selection:text-primary-dark">
      {/* Global Top Bar */}
      <TopBar
        role={role}
        onRoleChange={onRoleChange}
        activePage={activePage}
        onNavigate={onNavigate}
        navItems={navItems}
        onOpenSidebar={() => setIsMobileSidebarOpen(true)}
        cartCount={cartCount}
        favoritesCount={favoritesCount}
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
        onLogin={onLogin}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex w-full">
        {/* Sidebar for Artisan and Admin roles, or on mobile menu for Customer */}
        {(role === ROLES.ARTISAN || role === ROLES.ADMIN) && (
          <Sidebar
            items={navItems}
            activeItem={activePage}
            onSelect={onNavigate}
            isMobileDrawerOpen={isMobileSidebarOpen}
            onCloseMobileDrawer={() => setIsMobileSidebarOpen(false)}
            title={currentRoleInfo.title}
            subtitle={currentRoleInfo.subtitle}
            role={role}
          />
        )}

        {/* Customer Mobile Drawer (when burger menu clicked on mobile) */}
        {role === ROLES.CUSTOMER && (
          <Sidebar
            items={navItems}
            activeItem={activePage}
            onSelect={onNavigate}
            isMobileDrawerOpen={isMobileSidebarOpen}
            onCloseMobileDrawer={() => setIsMobileSidebarOpen(false)}
            title="Explore KalaKriti"
            subtitle="Heritage Traditional Crafts"
          />
        )}

        {/* Page Content View */}
        <main className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Customer Mobile Bottom Tab Bar (< 1024px) */}
      {role === ROLES.CUSTOMER && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border flex items-center justify-around px-2 py-2 safe-area-bottom"
        >
          {customerMobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate?.(tab.id)}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-md transition-colors relative ${
                  isActive ? 'text-primary font-semibold' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                <span className="text-[10px] tracking-tight">{tab.label}</span>
                {tab.count > 0 && (
                  <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-primary text-surface rounded-full text-[9px] font-bold flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      )}

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
}
