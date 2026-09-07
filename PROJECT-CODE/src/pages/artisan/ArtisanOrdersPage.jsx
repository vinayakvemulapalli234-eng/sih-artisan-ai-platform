import React, { useState } from 'react';
import {
  Package,
  CheckCircle2,
  Users,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  TopBar,
  BottomNav,
  StatusBadge,
  ProgressBar,
  Card,
  Button,
} from '../../components/design-system';
import { ArtisanBulkTrackingModal } from '../../components/artisan/ArtisanBulkTrackingModal';
import { mockCustomRequestService } from '../../services/mockCustomRequestService';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

const ORDERS_DATA = [
  {
    id: '#12345',
    productName: 'Kondapalli Wooden Toy',
    qty: 100,
    total: '30,000',
    status: 'In Production',
    progress: 60,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=200&q=80',
    isBulk: true,
  },
  {
    id: '#12346',
    productName: 'Handmade Bag',
    qty: 50,
    total: '25,000',
    status: 'Completed',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80',
    isBulk: false,
  },
  {
    id: '#12347',
    productName: 'Blue Wooden Toy',
    qty: 120,
    total: '12,000',
    status: 'Pending',
    progress: 15,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=200&q=80',
    isBulk: false,
  },
  {
    id: '#12348',
    productName: 'Clay Owl Figurine',
    qty: 30,
    total: '13,500',
    status: 'In Production',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=200&q=80',
    isBulk: false,
  },
];

/**
 * Screen 9: My Orders / Requests (Locked Spec)
 *
 * Top Bar: Back chevron + "My Orders"
 * Tabs: Active (default), Completed, Custom Requests
 * Cards: Order ID, Product Name, "{qty} pieces • ₹{total}", status pill, green progress bar for in-production
 * Bottom Nav: Home, Orders (active), Requests, Me
 */
export function ArtisanOrdersPage({ onNavigate, initialTab = 'active' }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState(initialTab); // 'active' | 'completed' | 'requests'
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [customRequests, setCustomRequests] = useState(() =>
    mockCustomRequestService.getCustomRequests(user?.id || 'artisan-1')
  );

  const activeOrders = ORDERS_DATA.filter((o) => o.status !== 'Completed');
  const completedOrders = ORDERS_DATA.filter((o) => o.status === 'Completed');

  return (
    <div className="min-h-screen bg-[#F4F4F4] pb-28">
      {/* Top Bar: Back chevron + "My Orders" */}
      <TopBar
        title="My Orders"
        onBack={() => onNavigate?.('overview')}
      />

      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Tabs: Active (default), Completed, Custom Requests */}
        <div className="flex rounded-2xl bg-white p-1 border border-[#ECECEC] shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'active'
                ? 'bg-[#1FA97D] text-white shadow-xs'
                : 'text-[#6B6B6B] hover:text-[#1B1B1B]'
            }`}
          >
            Active ({activeOrders.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'completed'
                ? 'bg-[#1FA97D] text-white shadow-xs'
                : 'text-[#6B6B6B] hover:text-[#1B1B1B]'
            }`}
          >
            Completed ({completedOrders.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'requests'
                ? 'bg-[#1FA97D] text-white shadow-xs'
                : 'text-[#6B6B6B] hover:text-[#1B1B1B]'
            }`}
          >
            Custom Requests ({customRequests.length})
          </button>
        </div>

        {/* Collective Bulk Order Banner (Screen 10 affordance) */}
        <div
          onClick={() => setIsBulkModalOpen(true)}
          className="p-4 rounded-2xl bg-[#FFF6DD] border border-[#E8A93A]/30 flex items-center justify-between gap-3 cursor-pointer hover:shadow-xs transition-all"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#E8A93A] text-white flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[#1B1B1B] truncate">
                Bulk Order: 500 Wooden Toys
              </h4>
              <p className="text-[11px] text-[#6B6B6B]">
                Sample Approved • Tap to track cluster progress
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#E8A93A] shrink-0" />
        </div>

        {/* TAB 1: ACTIVE ORDERS */}
        {activeTab === 'active' && (
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <Card
                key={order.id}
                className="p-4 space-y-3 hover:border-[#1FA97D]/40 transition-all cursor-pointer"
                onClick={() => {
                  if (order.isBulk) setIsBulkModalOpen(true);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#6B6B6B]">
                    {order.id}
                  </span>
                  <StatusBadge variant="auto">
                    {order.status}
                  </StatusBadge>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={order.image}
                    alt={order.productName}
                    className="w-14 h-14 rounded-xl object-cover border border-[#ECECEC] shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#1B1B1B] truncate">
                      {order.productName}
                    </h3>
                    <p className="text-xs font-semibold text-[#1FA97D] mt-0.5">
                      {order.qty} pieces • ₹{order.total}
                    </p>
                  </div>
                </div>

                {order.status === 'In Production' && (
                  <div className="pt-2 border-t border-[#ECECEC]">
                    <ProgressBar
                      value={order.progress}
                      label="In Production"
                      showPercentage
                      height="h-2"
                    />
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* TAB 2: COMPLETED ORDERS */}
        {activeTab === 'completed' && (
          <div className="space-y-3">
            {completedOrders.map((order) => (
              <Card key={order.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#6B6B6B]">
                    {order.id}
                  </span>
                  <StatusBadge variant="green">
                    Completed
                  </StatusBadge>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={order.image}
                    alt={order.productName}
                    className="w-14 h-14 rounded-xl object-cover border border-[#ECECEC] shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#1B1B1B] truncate">
                      {order.productName}
                    </h3>
                    <p className="text-xs font-semibold text-[#1FA97D] mt-0.5">
                      {order.qty} pieces • ₹{order.total}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 3: CUSTOM REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-3">
            {customRequests.length === 0 ? (
              <div className="text-center py-12 text-[#6B6B6B] text-xs">
                No custom requests at the moment.
              </div>
            ) : (
              customRequests.map((req) => (
                <Card key={req.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#6B6B6B]">
                      {req.id}
                    </span>
                    <StatusBadge variant="orange">
                      Custom Request
                    </StatusBadge>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#1B1B1B]">
                      {req.productTitle}
                    </h3>
                    <p className="text-xs font-semibold text-[#1FA97D] mt-0.5">
                      {req.quantity} units • ₹{req.estimatedTotal?.toLocaleString('en-IN') || '1,300'}
                    </p>
                  </div>

                  <div className="text-xs text-[#6B6B6B] space-y-1 bg-[#F4F4F4] p-2.5 rounded-xl">
                    <p>Buyer: <strong className="text-[#1B1B1B]">{req.customerName}</strong></p>
                    <p>Color / Tone: <strong className="text-[#1B1B1B]">{req.colorOption}</strong></p>
                    <p>Deadline: <strong className="text-[#1B1B1B]">{req.deadline}</strong></p>
                    {req.notes && <p className="italic">"{req.notes}"</p>}
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      addToast({
                        type: 'success',
                        title: 'Request Accepted! 🎨',
                        message: `Order for ${req.customerName} added to your active queue.`,
                      });
                    }}
                  >
                    Accept Custom Request
                  </Button>
                </Card>
              ))
            )}
          </div>
        )}
      </main>

      {/* Screen 10 Modal */}
      <ArtisanBulkTrackingModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
      />

      {/* Bottom Navigation: Home, Orders (active), Requests, Me */}
      <BottomNav
        activeTab="orders"
        onNavigate={onNavigate}
      />
    </div>
  );
}

export default ArtisanOrdersPage;
