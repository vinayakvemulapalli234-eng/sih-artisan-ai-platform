import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { fetchMyOrders } from '../../services/productService';

const STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};

export const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      const result = await fetchMyOrders();
      if (result.success) {
        setOrders(result.orders);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-4 select-none">
      <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight mb-4 flex items-center gap-2">
        <Package size={24} className="text-emerald-700" />
        <span>My Orders</span>
      </h2>

      {loading && (
        <div className="py-16 text-center text-stone-400 font-semibold text-xs">
          Loading your orders...
        </div>
      )}

      {!loading && error && (
        <div className="py-16 text-center text-red-500 font-semibold text-xs">
          {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="py-16 text-center text-stone-400 font-semibold text-xs">
          You haven't placed any orders yet.
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
      <div className="space-y-4">
          {orders.map((ord) => (
          <div
            key={ord.id}
              className="bg-white rounded-3xl p-5 border border-stone-200 shadow-md space-y-3"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                  <span className="text-xs font-extrabold text-stone-900">Order #{ord.id}</span>
                  <span className="text-[10px] text-stone-400 font-medium block">
                    Placed on {new Date(ord.created_at).toLocaleDateString()}
                  </span>
              </div>
              <span className="text-sm font-extrabold text-emerald-800">
                  ₹{ord.total_price.toLocaleString()}
              </span>
            </div>

              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <span>Product #{ord.product_id} × {ord.quantity}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${STATUS_COLORS[ord.status] || 'bg-stone-100 text-stone-700'}`}>
                  {STATUS_LABELS[ord.status] || ord.status}
                      </span>
                    </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};