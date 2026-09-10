import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Eye, PlusCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';

export const ProductListedSuccess = ({ product, onViewProduct, onAddAnother }) => {
  const { t } = useLanguage();
  const { speakPrompt } = useVoice();

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    speakPrompt("Congratulations! Your product is now live on the marketplace.");
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-[#FAF7F2] select-none text-center">
      <div className="my-auto py-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 shadow-md">
          <CheckCircle2 size={40} />
        </div>

        <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
          {t('your_product_ready')}
        </h2>
        <p className="text-xs text-stone-500 font-medium mt-1">
          {t('now_live')}
        </p>

        {/* Product Card Preview */}
        <div className="w-full max-w-xs mt-6 bg-white rounded-3xl p-4 border border-stone-200 shadow-xl text-left">
          <div className="w-full h-44 rounded-2xl overflow-hidden bg-stone-100 relative mb-3">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
              Live
            </span>
          </div>

          <h3 className="text-sm font-bold text-stone-900 line-clamp-1">
  {product.name}
          </h3>
          <div className="text-lg font-extrabold text-emerald-800 mt-1">
  ₹{product.price}
          </div>

      
          {/* Craft/Region Pill Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
  {product.craft && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md">
      {product.craft}
            </span>
  )}
    {product.artisanLocation && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md">
      {product.artisanLocation}
            </span>
  )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 pb-2 space-y-2.5">
        <button
          onClick={onViewProduct}
          className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white rounded-2xl font-bold text-base shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition"
        >
          <Eye size={20} />
          <span>{t('view_product')}</span>
        </button>

        <button
          onClick={onAddAnother}
          className="w-full py-3.5 bg-white border-2 border-emerald-700 text-emerald-800 hover:bg-emerald-50 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-xs"
        >
          <PlusCircle size={18} />
          <span>{t('add_another')}</span>
        </button>
      </div>
    </div>
  );
};
