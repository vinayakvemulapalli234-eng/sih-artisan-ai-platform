import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Splash = () => {
  const { setCurrentStep } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 bg-[#FAF7F2] relative overflow-hidden select-none">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-200/40 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl"></div>

      {/* Top Branding Section */}
      <div className="pt-8 text-center flex flex-col items-center z-10">
        <div className="w-20 h-20 rounded-3xl bg-emerald-700 text-white flex items-center justify-center shadow-xl mb-4 border-4 border-emerald-100/50">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" fill="#15803D" stroke="#166534" />
            <path d="M12 4v16M4 12h16M7 7l10 10M7 17l10-10" stroke="#FAF7F2" strokeWidth="2.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-950 tracking-tight">
          KalaKriti
        </h1>
        <p className="text-xs font-bold tracking-widest text-emerald-700 uppercase mt-0.5">
          ARTISAN HERITAGE
        </p>
      </div>

      {/* Center Illustration — Warm Artisan Woman with Pottery */}
      <div className="my-auto py-6 flex flex-col items-center text-center z-10">
        <div className="w-64 h-64 rounded-full bg-amber-100/80 border-4 border-white shadow-xl flex items-center justify-center p-4 relative">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-50 to-emerald-50 flex items-center justify-center text-6xl">
            👩‍🌾🏽🏺
          </div>
          <div className="absolute -bottom-2 bg-emerald-800 text-white text-[11px] font-semibold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles size={12} className="text-amber-300" /> Preserving Indian Heritage
          </div>
        </div>

        <p className="mt-8 text-stone-700 text-sm font-semibold max-w-xs leading-relaxed">
          {t('heritage_tagline')}
        </p>
      </div>

      {/* Bottom Pinned Button */}
      <div className="w-full pb-6 z-10">
        <button
          onClick={() => setCurrentStep('language')}
          className="w-full py-4 px-6 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white rounded-2xl font-bold text-base shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
        >
          <span>{t('get_started')}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
