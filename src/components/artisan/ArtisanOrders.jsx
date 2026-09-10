import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle2 } from 'lucide-react';
import { fetchIncomingOrders, updateOrderStatus } from '../../services/productService';
import { useLanguage } from '../../context/LanguageContext';

export const ArtisanOrders = ({ initialTab = 'active' }) => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSubTab, setActiveSubTab] = useState(initialTab);

  useEffect(() => {
    const load = async () => {
      const result = await fetchIncomingOrders();
      if (result.success) {
        setOrders(result.orders);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };
    load();
  }, []);

  // Map real backend statuses to your 3 tabs
  const STATUS_KEYS = {
    pending: 'status_pending',
    confirmed: 'status_confirmed',
    shipped: 'status_shipped',
    delivered: 'status_delivered',
    cancelled: 'status_cancelled',
  };

  const NEXT_STATUS = {
    pending: { next: 'confirmed', labelKey: 'mark_confirmed' },
    confirmed: { next: 'shipped', labelKey: 'mark_shipped' },
    shipped: { next: 'delivered', labelKey: 'mark_delivered' },
  };

  const handleAdvanceStatus = async (orderId, currentStatus) => {
    const nextStep = NEXT_STATUS[currentStatus];
    if (!nextStep) return;
    const result = await updateOrderStatus(orderId, nextStep.next);
    if (result.success) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStep.next } : o));
    }
  };
  const filteredOrders = orders.filter(o => {
    if (activeSubTab === 'active') return ['pending', 'confirmed', 'shipped'].includes(o.status);
    if (activeSubTab === 'completed') return o.status === 'delivered';
    if (activeSubTab === 'requests') return false; // no custom-request system exists yet
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-4 select-none">
      <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight mb-4">
        {t('nav_orders')}
      </h2>

      <div className="flex bg-stone-200/80 p-1 rounded-2xl mb-4">
        {[
          { id: 'active', label: t('active') },
          { id: 'completed', label: t('completed') },
          { id: 'requests', label: t('custom_requests') }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeSubTab === tab.id
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3">
        {loading && (
          <div className="py-12 text-center text-stone-400 font-semibold text-xs">Loading orders...</div>
        )}

        {!loading && error && (
          <div className="py-12 text-center text-red-500 font-semibold text-xs">{error}</div>
        )}

        {!loading && !error && filteredOrders.length === 0 && (
          <div className="py-12 text-center text-stone-400 font-semibold text-xs">
            No orders in this category yet.
          </div>
        )}

        {!loading && !error && filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-4 border border-stone-200 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <span className="text-xs font-extrabold text-stone-800">Order #{order.id}</span>
                <span className="text-[11px] font-bold text-stone-500">
                Customer: {order.buyer_name}
                </span>
              </div>

              <div className="flex items-center gap-3">
              {order.product_image ? (
                <img
                  src={order.product_image}
                  alt={order.product_title}
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-100 shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                  <Package size={22} className="text-stone-400" />
                </div>
              )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-extrabold text-stone-900 truncate">
                  {order.product_title || `Product #${order.product_id}`}
                  </h4>
                  <p className="text-xs font-semibold text-stone-500 mt-0.5">
                  Qty: {order.quantity} • Total: <span className="text-emerald-800 font-extrabold">₹{order.total_price.toLocaleString()}</span>
                  </p>
                </div>
              </div>

                <div className="flex items-center justify-between text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-2xl">
                  <span className="flex items-center gap-1.5">
                <Clock size={16} /> {t(STATUS_KEYS[order.status] || order.status)}
                  </span>
              <span className="text-[11px] text-stone-500 font-normal">
                {new Date(order.created_at).toLocaleDateString()}
                  </span>
            </div>

            {NEXT_STATUS[order.status] && (
              <button
                onClick={() => handleAdvanceStatus(order.id, order.status)}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition"
              >
                {t(NEXT_STATUS[order.status].labelKey)}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};