import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { fetchMyProducts } from '../../services/productService';

export const MyProducts = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchMyProducts();
      if (result.success) {
        setProducts(result.products);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-4 select-none">
      <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight mb-4">
        My Products
      </h2>

      {loading && (
        <div className="py-12 text-center text-stone-400 font-semibold text-xs">
          Loading your products...
        </div>
      )}

      {!loading && error && (
        <div className="py-12 text-center text-red-500 font-semibold text-xs">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="py-12 text-center text-stone-400 font-semibold text-xs">
          You haven't added any products yet.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-4 border border-stone-200 shadow-md flex items-center gap-4"
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-16 h-16 rounded-2xl object-cover border border-stone-100 shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                  <Package size={24} className="text-stone-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-extrabold text-stone-900 truncate">
                  {product.title}
                </h4>
                <p className="text-xs font-semibold text-stone-500 mt-0.5 truncate">
                  {product.category}
                </p>
                <p className="text-sm font-extrabold text-emerald-800 mt-1">
                  ₹{product.dynamic_price ?? product.base_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};