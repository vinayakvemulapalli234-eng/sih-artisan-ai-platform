import React from 'react';
import { Home, Package, Sparkles, User } from 'lucide-react';

/**
 * BottomNav — Locked 4-item bottom navigation for Artisan mobile UI
 * Items: Home, Orders, Requests, Me
 * Active item in #1FA97D
 * Fixed bottom bar with #FFFFFF bg and #ECECEC top border
 */
export function BottomNav({
  activeTab = 'home',
  onTabChange,
  onNavigate,
  className = '',
}) {
  const items = [
    { id: 'home', label: 'Home', icon: Home, route: 'overview' },
    { id: 'orders', label: 'Orders', icon: Package, route: 'orders' },
    { id: 'requests', label: 'Requests', icon: Sparkles, route: 'requests' },
    { id: 'me', label: 'Me', icon: User, route: 'profile' },
  ];

  const handleSelect = (item) => {
    if (onTabChange) {
      onTabChange(item.id);
    }
    if (onNavigate) {
      if (item.id === 'requests') {
        // Requests routes to orders with custom requests or big order modal
        onNavigate('orders', { tab: 'requests' });
      } else {
        onNavigate(item.route);
      }
    }
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#ECECEC] shadow-[0_-2px_10px_rgba(0,0,0,0.04)] px-4 py-2 safe-area-pb ${className}`}
      aria-label="Bottom Navigation"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className={`flex flex-col items-center justify-center py-1 px-3 min-w-[64px] min-h-[48px] rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#1FA97D]'
                  : 'text-[#6B6B6B] hover:text-[#1B1B1B]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1FA97D] rounded-full" />
                )}
              </div>
              <span
                className={`text-[11px] mt-1 font-semibold ${
                  isActive ? 'text-[#1FA97D]' : 'text-[#6B6B6B]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
