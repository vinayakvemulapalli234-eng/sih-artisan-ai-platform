import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Drawer } from '../primitives/Drawer';

/**
 * Dynamic Icon Helper for Config-driven Navigation
 */
function NavIcon({ name, className = 'w-5 h-5 shrink-0' }) {
  const IconComponent = Icons[name] || Icons.Circle;
  return <IconComponent className={className} aria-hidden="true" />;
}

/**
 * Sidebar Layout Component
 * Renders left sidebar for Artisan/Admin, collapsible on desktop,
 * and converts to an off-canvas drawer on tablet & mobile (<1024px).
 */
export function Sidebar({
  items = [],
  activeItem,
  onSelect,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer,
  title = 'Menu',
  subtitle,
  role,
  className = '',
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isArtisan = role === 'artisan';

  const renderNavList = (collapsed = false) => (
    <nav className="flex flex-col gap-1.5 p-3" aria-label="Sidebar Navigation">
      {items.map((item) => {
        const isActive = activeItem === item.id || (item.id === 'overview' && activeItem === 'home');
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onSelect?.(item.id);
              if (onCloseMobileDrawer) onCloseMobileDrawer();
            }}
            title={collapsed ? item.label : undefined}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors focus-ring w-full text-left ${
              isActive
                ? isArtisan
                  ? 'bg-[#E8F8F0] text-emerald-900 font-bold shadow-xs'
                  : 'bg-primary text-surface shadow-xs font-semibold'
                : 'text-text-secondary hover:text-text-primary hover:bg-neutral-100'
            } ${collapsed ? 'justify-center px-2' : ''}`}
          >
            <NavIcon
              name={item.icon}
              className={`w-5 h-5 shrink-0 ${
                isActive
                  ? isArtisan
                    ? 'text-emerald-700'
                    : 'text-surface'
                  : 'text-text-secondary'
              }`}
            />
            {!collapsed && <span className="truncate flex-1">{item.label}</span>}
            {!collapsed && item.badge && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isArtisan
                    ? 'bg-rose-500 text-white'
                    : isActive
                    ? 'bg-surface/20 text-surface'
                    : 'bg-neutral-200 text-text-primary'
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Off-canvas mobile/tablet drawer (< 1024px) */}
      <Drawer
        isOpen={isMobileDrawerOpen}
        onClose={onCloseMobileDrawer}
        title={title}
        position="left"
        size="sm"
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {subtitle && (
              <p className="text-xs text-text-secondary px-3 mb-2">{subtitle}</p>
            )}
            {renderNavList(false)}
          </div>
        </div>
      </Drawer>

      {/* Desktop Persistent Sidebar (>= 1024px) */}
      <aside
        aria-label="Desktop Sidebar"
        className={`hidden lg:flex flex-col justify-between border-r border-border bg-surface shrink-0 transition-all duration-200 min-h-[calc(100vh-4rem)] ${
          isCollapsed ? 'w-18' : 'w-64'
        } ${className}`}
      >
        <div className="flex flex-col">
          {/* Header with Title & Collapse Toggle */}
          <div
            className={`p-4 border-b border-border/70 flex items-center justify-between ${
              isCollapsed ? 'justify-center p-2' : ''
            }`}
          >
            {!isCollapsed && (
              isArtisan ? (
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250"
                    alt="Lakshmi Devi"
                    className="w-10 h-10 rounded-full object-cover border border-border shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-text-secondary leading-tight">Welcome,</span>
                    <span className="font-heading text-sm font-bold text-text-primary leading-tight truncate">
                      Lakshmi Devi
                    </span>
                    <span className="text-[11px] text-text-secondary leading-tight mt-0.5">
                      Artisan <span className="text-emerald-700 font-semibold">• Online</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col min-w-0">
                  <span className="font-heading text-base font-bold text-text-primary truncate">
                    {title}
                  </span>
                  {subtitle && (
                    <span className="text-xs text-text-secondary truncate">{subtitle}</span>
                  )}
                </div>
              )
            )}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="p-1 rounded-md text-text-secondary hover:bg-neutral-100 focus-ring"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          {renderNavList(isCollapsed)}
        </div>

        {/* Bottom decorative section */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border/70 bg-neutral-50/50">
            {isArtisan ? (
              <div className="flex flex-col items-center justify-center py-2 text-center">
                <svg
                  className="w-9 h-9 text-emerald-600/70 mb-1"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M32 46 C32 46 22 36 22 26 C22 20 27 16 32 16 C37 16 42 20 42 26 C42 36 32 46 32 46 Z"
                    fill="currentColor"
                    fillOpacity="0.15"
                  />
                  <path
                    d="M32 46 C26 40 14 34 14 26 C14 20 18 18 24 22 C28 25 32 46 32 46 Z"
                    fill="currentColor"
                    fillOpacity="0.1"
                  />
                  <path
                    d="M32 46 C38 40 50 34 50 26 C50 20 46 18 40 22 C36 25 32 46 32 46 Z"
                    fill="currentColor"
                    fillOpacity="0.1"
                  />
                  <path
                    d="M32 46 C20 44 8 40 8 32 C8 26 12 26 18 30 C24 34 32 46 32 46 Z"
                    strokeLinecap="round"
                  />
                  <path
                    d="M32 46 C44 44 56 40 56 32 C56 26 52 26 46 30 C40 34 32 46 32 46 Z"
                    strokeLinecap="round"
                  />
                  <path d="M22 50 C28 52 36 52 42 50" strokeLinecap="round" />
                </svg>
                <p className="font-heading text-xs font-bold text-text-secondary tracking-tight">
                  Crafting Better Tomorrows
                </p>
              </div>
            ) : (
              <div className="p-3 bg-surface rounded-md border border-border/80">
                <p className="text-xs font-semibold text-text-primary">Living Craft Graph</p>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  Active connections verified: 1,240 nodes
                </p>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
