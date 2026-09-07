import React from 'react';
import { Home, Package, Bell, User } from 'lucide-react';

/**
 * ArtisanBottomNav
 * 4-Tab bottom navigation bar matching the mobile-first reference screens.
 * Tabs: Home, Orders, Requests, Me
 */
export function ArtisanBottomNav({ activeTab = 'home', onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, route: 'overview' },
    { id: 'orders', label: 'Orders', icon: Package, route: 'orders' },
    { id: 'requests', label: 'Requests', icon: Bell, route: 'requests' },
    { id: 'me', label: 'Me', icon: User, route: 'profile' },
  ];

  return (
    <nav
      aria-label="Artisan Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border/80 shadow-lg px-4 py-2 sm:hidden"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab?.(tab.route || tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 ${
                isActive ? 'text-emerald-700 font-bold' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.5px]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.id === 'requests' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </div>
              <span className={`text-[11px] mt-1 leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default ArtisanBottomNav;
