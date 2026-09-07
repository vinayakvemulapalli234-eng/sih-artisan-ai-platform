import React from 'react';
import { Palette, ShoppingBag, ShieldCheck, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { Card } from '../../components/primitives/Card';
import { Badge } from '../../components/primitives/Badge';
import { ROLES } from '../../lib/constants';

export function RoleSelectionPage({ onSelectRole, onNavigate }) {
  const roles = [
    {
      id: ROLES.ARTISAN,
      title: 'Artisan / शिल्पकार',
      badge: 'Creator Portal',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description: 'I handcraft authentic pieces and want to showcase my craft to the world.',
      hindi: 'मैं अपने हस्तशिल्प और कलाकृतियों को सीधे खरीदारों तक पहुंचाना चाहता हूँ।',
      icon: Palette,
      color: 'bg-[#E8F8F0] border-emerald-200 text-emerald-800 hover:border-emerald-500',
      iconBg: 'bg-emerald-600 text-white',
      route: 'artisan-login',
      registerRoute: 'artisan-register',
    },
    {
      id: ROLES.CUSTOMER,
      title: 'Customer / ग्राहक',
      badge: 'Craft Marketplace',
      badgeColor: 'bg-primary/15 text-primary',
      description: 'I want to discover authentic Indian heritage crafts and support traditional artisans.',
      hindi: 'मैं भारत के पारंपरिक शिल्प, हथकरघा और कलाकृतियों की खरीदारी करना चाहता हूँ।',
      icon: ShoppingBag,
      color: 'bg-amber-50/60 border-amber-200 text-amber-900 hover:border-amber-500',
      iconBg: 'bg-primary text-white',
      route: 'login',
      registerRoute: 'register',
    },
    {
      id: ROLES.ADMIN,
      title: 'Platform Admin / प्रशासक',
      badge: 'Governance & GI',
      badgeColor: 'bg-blue-100 text-blue-800',
      description: 'Official oversight, GI certificate verification, and Living Craft Graph management.',
      hindi: 'शिल्पकार सत्यापन, जीआई टैग प्रामाणिकता एवं शिल्प ग्राफ प्रबंधन।',
      icon: ShieldCheck,
      color: 'bg-neutral-50 border-neutral-200 text-text-primary hover:border-neutral-400',
      iconBg: 'bg-stone-800 text-white',
      route: 'admin-login',
    },
  ];

  const handleChoose = (roleItem) => {
    if (onSelectRole) onSelectRole(roleItem.id);
    if (onNavigate) onNavigate(roleItem.route);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white shadow-md mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            KalaKriti
          </h1>
          <p className="text-xs uppercase tracking-widest text-secondary font-bold mt-1">
            Indian Craft Heritage & Living Graph
          </p>
          <div className="mt-6 max-w-xl mx-auto">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
              Who are you? / आप कौन हैं?
            </h2>
            <p className="text-sm text-text-secondary mt-1.5">
              Please select your role to access your dedicated portal.
            </p>
          </div>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                onClick={() => handleChoose(r)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleChoose(r);
                  }
                }}
                role="button"
                tabIndex={0}
                className={`p-6 rounded-3xl border-2 transition-all duration-200 text-left flex flex-col justify-between shadow-xs hover:shadow-lg active:scale-98 group cursor-pointer ${r.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform ${r.iconBg}`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${r.badgeColor}`}>
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-primary transition-colors mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    {r.description}
                  </p>
                  <p className="text-[11px] text-text-muted italic border-t border-black/5 pt-2">
                    {r.hindi}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-black/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                    <span>Sign In as {r.id === 'artisan' ? 'Artisan' : r.id === 'admin' ? 'Admin' : 'Customer'} →</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  {r.registerRoute && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectRole) onSelectRole(r.id);
                        if (onNavigate) onNavigate(r.registerRoute);
                      }}
                      className="text-[11px] text-left text-text-secondary hover:text-primary font-medium underline underline-offset-2 py-1"
                    >
                      New here? Register as {r.id === 'artisan' ? 'Artisan' : 'Customer'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center text-xs text-text-muted mt-10">
        <p>KalaKriti • Smart India Hackathon Artisan Platform</p>
      </div>
    </div>
  );
}

export default RoleSelectionPage;
