import React from 'react';
import { Heart } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

export const CustomerProductCard = ({ product, onClick }) => {
  const { favorites, toggleFavorite } = useAppData();
  const isFav = favorites.includes(product.id);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* Product Image Box */}
      <div className="w-full h-52 bg-stone-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition shadow-md ${
            isFav
              ? 'bg-red-50 text-red-500 border border-red-200'
              : 'bg-white/80 text-stone-600 hover:text-red-500'
          }`}
          aria-label="Add to favorites"
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Product Info Section — Exactly matching Reference Screenshots */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Artisan Name Line */}
          <span className="text-xs font-bold text-stone-500 block">
            By {product.artisanName}
          </span>

          {/* Product Title */}
          <h3 className="text-sm font-extrabold text-stone-900 line-clamp-2 mt-0.5 leading-snug group-hover:text-emerald-800 transition">
            {product.name}
          </h3>

          {/* Craft / Region Pill Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {product.tags ? (
              product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md truncate max-w-[130px]"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md">
                {product.craft} • {product.artisanLocation}
              </span>
            )}
          </div>
        </div>

        {/* Price Row (Current Price, Original Price, Discount % OFF) */}
        <div className="flex items-baseline gap-2 pt-1 border-t border-stone-100">
          <span className="text-base font-extrabold text-stone-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 font-semibold line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          {product.discountPercent && (
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
