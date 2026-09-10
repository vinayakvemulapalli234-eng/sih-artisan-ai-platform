import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { placeOrderOnServer } from '../../services/productService';
import { useVoice } from '../../context/VoiceContext';
import { useLanguage } from '../../context/LanguageContext';

export const CartView = ({ onOrderPlaced }) => {
  const { cart, removeFromCart, clearCart } = useAppData();
  const { speakPrompt } = useVoice();
  const { t } = useLanguage();
  const [isOrdered, setIsOrdered] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
const [orderError, setOrderError] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = async () => {
    setIsPlacingOrder(true);
    setOrderError('');

    // Place each cart item as a separate real order on the backend
    const results = await Promise.all(
      cart.map(item => placeOrderOnServer(item.product.id, item.quantity))
    );

    const allSucceeded = results.every(r => r.success);
    setIsPlacingOrder(false);

    if (allSucceeded) {
      clearCart(); // clear cart — see note below, may need per-item clearing
      setIsOrdered(true);
      speakPrompt("Order placed successfully! Track your handicraft delivery in My Orders.");
      setTimeout(() => {
        if (onOrderPlaced) onOrderPlaced();
      }, 2000);
    } else {
      const firstError = results.find(r => !r.success);
      setOrderError(firstError?.error || 'Some items could not be ordered. Please try again.');
    }
  };

  if (isOrdered) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#FAF7F2]">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-extrabold text-stone-900">Order Confirmed!</h2>
        <p className="text-xs text-stone-500 font-medium mt-1">
          Your order has been routed to master artisans for crafting.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FAF7F2] p-4 select-none">
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight mb-4 flex items-center gap-2">
          <ShoppingCart size={24} className="text-emerald-700" />
          <span>{t('nav_cart')}</span>
        </h2>

        {cart.length === 0 ? (
          <div className="py-16 text-center text-stone-400 font-semibold text-xs">
            Your cart is empty. Explore authentic handicrafts to add.
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-3xl p-3.5 border border-stone-200 shadow-md flex items-center gap-3.5"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-stone-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-stone-400 block">By {item.product.artisanName}</span>
                  <h4 className="text-xs font-extrabold text-stone-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-sm font-extrabold text-emerald-800 mt-0.5">
                    ₹{item.product.price.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Price Summary */}
            <div className="mt-5 bg-white rounded-3xl p-4 border border-stone-200 shadow-md space-y-2 text-xs font-semibold text-stone-700">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Artisan Shipping & Logistics</span>
                <span className="text-emerald-700 font-extrabold">FREE</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-extrabold text-stone-900">
                <span>Total Amount</span>
                <span className="text-emerald-800">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="pt-4 pb-2">
          <>
            {orderError && (
              <p className="text-xs font-bold text-red-600 text-center mb-2">{orderError}</p>
            )}
          <button
            onClick={handleCheckout}
              disabled={isPlacingOrder}
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white rounded-2xl font-bold text-base shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition"
          >
              <span>{isPlacingOrder ? 'Placing order...' : `Proceed to Checkout (₹${totalAmount.toLocaleString()})`}</span>
              {!isPlacingOrder && <ArrowRight size={20} />}
          </button>
          </>
        </div>
      )}
    </div>
  );
};
