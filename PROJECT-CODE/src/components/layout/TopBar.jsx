import React from 'react';
import {
  Menu,
  Search,
  ShoppingBag,
  Heart,
  User,
  Sparkles,
  ChevronDown,
  LogIn,
} from 'lucide-react';
import { IconButton } from '../primitives/IconButton';
import { Badge } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { ROLES } from '../../lib/constants';

/**
 * TopBar Layout Component
 * Provides global branding, role switching, top navigation for customer, and quick actions
 */
export function TopBar({
  role = ROLES.CUSTOMER,
  onRoleChange,
  activePage = 'home',
  onNavigate,
  navItems = [],
  onOpenSidebar,
  cartCount = 2,
  favoritesCount = 3,
  user = null,
  isAuthenticated = false,
  onLogout,
  onLogin,
  className = '',
}) {
  return (
    <header
      className={`sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-md border-b border-border transition-all ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Button & Brand */}
        <div className="flex items-center gap-3">
          {/* Hamburger button shown when sidebar exists (artisan/admin) or on mobile */}
          {onOpenSidebar && (
            <IconButton
              icon={<Menu className="w-5 h-5 text-text-primary" />}
              aria-label="Open navigation menu"
              onClick={onOpenSidebar}
              className={role === ROLES.CUSTOMER ? 'lg:hidden' : 'md:hidden'}
              size="sm"
            />
          )}

          {/* Logo / Brand Name */}
          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2.5 text-left group focus-ring rounded-sm py-1"
          >
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-surface shadow-sm group-hover:bg-primary-dark transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-text-primary leading-tight">
                KalaKriti
              </span>
              <span className="text-[10px] tracking-wider uppercase text-secondary font-semibold">
                Artisan Heritage
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Top Nav for Customer Role */}
        {role === ROLES.CUSTOMER && navItems.length > 0 && (
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate?.(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors focus-ring flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-neutral-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-accent/15 text-accent px-1.5 py-0.5 rounded-pill font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right: Role Switcher & User Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Switcher Pill Dropdown */}
          <div className="relative flex items-center">
            <label htmlFor="role-select" className="sr-only">
              Switch Role View
            </label>
            <select
              id="role-select"
              value={role}
              onChange={(e) => onRoleChange?.(e.target.value)}
              className="appearance-none bg-neutral-100 hover:bg-neutral-200 border border-border rounded-pill pl-3 pr-7 py-1 text-xs font-semibold text-text-primary cursor-pointer focus-ring"
            >
              <option value={ROLES.CUSTOMER}>Role: Customer</option>
              <option value={ROLES.ARTISAN}>Role: Artisan</option>
              <option value={ROLES.ADMIN}>Role: Admin</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary absolute right-2.5 pointer-events-none" />
          </div>

          {/* Search Trigger for Customer */}
          {role === ROLES.CUSTOMER && (
            <IconButton
              icon={<Search className="w-5 h-5 text-text-secondary" />}
              aria-label="Search crafts and artisans"
              onClick={() => onNavigate?.('explore')}
              size="sm"
            />
          )}

          {/* Customer Favorites */}
          {role === ROLES.CUSTOMER && (
            <div className="relative">
              <IconButton
                icon={<Heart className="w-5 h-5 text-text-secondary" />}
                aria-label={`Favorites with ${favoritesCount} items`}
                onClick={() => onNavigate?.('favorites')}
                size="sm"
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-surface rounded-full text-[10px] font-bold flex items-center justify-center pointer-events-none">
                  {favoritesCount}
                </span>
              )}
            </div>
          )}

          {/* Customer Cart */}
          {role === ROLES.CUSTOMER && (
            <div className="relative">
              <IconButton
                icon={<ShoppingBag className="w-5 h-5 text-text-secondary" />}
                aria-label={`Cart with ${cartCount} items`}
                onClick={() => onNavigate?.('cart')}
                size="sm"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-surface rounded-full text-[10px] font-bold flex items-center justify-center pointer-events-none">
                  {cartCount}
                </span>
              )}
            </div>
          )}

          {/* Authenticated User Menu or Guest Sign In */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-border">
              <button
                type="button"
                onClick={() => onNavigate?.('profile')}
                aria-label="View user profile"
                className="flex items-center gap-2 rounded-full focus-ring p-0.5 group"
                title={`${user.name} (${user.email})`}
              >
                <Avatar
                  name={user.name}
                  src={user.avatar}
                  size="sm"
                  verified={role === ROLES.ARTISAN || user.verified}
                />
                <span className="hidden md:inline-block text-xs font-semibold text-text-primary max-w-[120px] truncate group-hover:text-primary transition-colors">
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {onLogout && (
                <IconButton
                  icon={<LogIn className="w-4 h-4 rotate-180 text-text-secondary hover:text-error" />}
                  aria-label="Sign Out"
                  onClick={onLogout}
                  size="sm"
                  title="Sign Out"
                />
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-1 border-l border-border">
              <button
                type="button"
                onClick={() => {
                  if (onLogin) {
                    onLogin();
                  } else {
                    const loginRoute =
                      role === ROLES.ARTISAN
                        ? 'artisan-login'
                        : role === ROLES.ADMIN
                        ? 'admin-login'
                        : 'login';
                    onNavigate?.(loginRoute);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-primary text-surface hover:bg-primary-dark transition-colors focus-ring shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

