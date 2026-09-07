import React, { useState } from 'react';
import {
  Camera,
  Package,
  Bell,
  Mic,
  ArrowRight,
  Sparkles,
  Phone,
  HelpCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { ActionCard, BottomNav, StatusBadge, ProgressBar, Card, Button } from '../../components/design-system';
import { SuggestedPriceCard } from '../../components/artisan/SuggestedPriceCard';
import { TrackBulkOrderCard } from '../../components/artisan/TrackBulkOrderCard';
import { LanguageSelectorModal, ARTISAN_LANGUAGES } from '../../components/artisan/LanguageSelectorModal';
import { VoiceAssistantModal } from '../../components/artisan/VoiceAssistantModal';
import { ArtisanBigOrderModal } from '../../components/artisan/ArtisanBigOrderModal';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

// Mock products & orders
const REFERENCE_PRODUCTS = [
  {
    id: 'prod-konda',
    title: 'Kondapalli Wooden Toy',
    price: 650,
    tags: ['Handmade', 'Kondapalli'],
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    status: 'Live on Marketplace',
  },
  {
    id: 'prod-bag',
    title: 'Handmade Bag',
    price: 1200,
    tags: ['Eco-friendly', 'Handloom'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    status: 'Live on Marketplace',
  },
  {
    id: 'prod-owl',
    title: 'Clay Owl',
    price: 450,
    tags: ['Clay', 'Hand-painted'],
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    status: 'Live on Marketplace',
  },
];

const REFERENCE_RECENT_ORDERS = [
  {
    id: '#12345',
    title: 'Kondapalli Wooden Toy',
    details: '100 pieces • ₹30,000',
    status: 'In Production',
    progress: 60,
    date: '5 Aug 2026',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: '#12346',
    title: 'Handmade Bag',
    details: '50 pieces • ₹25,000',
    status: 'Completed',
    progress: 100,
    date: '3 Aug 2026',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: '#12347',
    title: 'Blue Wooden Toy',
    details: '120 pieces • ₹12,000',
    status: 'Pending',
    progress: 10,
    date: '1 Aug 2026',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=150&q=80',
  },
];

/**
 * Screen 2: Artisan Home (Locked Spec)
 *
 * Top Bar: Profile photo (small circle) + "Namaste, {ArtisanFirstName}" + notification bell with unread dot.
 * Subtitle: "What would you like to do?"
 * 4 ActionCards in EXACT order & tints:
 *  1. Green tint (#E8F7F1), camera: Add Product / "Take a photo and list your product"
 *  2. Pink tint (#FDEAF0), box (#E8577E): My Orders / "View your orders"
 *  3. Yellow tint (#FFF6DD), bell (#E8A93A): New Requests / "Check custom orders and big orders"
 *  4. Lavender tint (#EDEBFB), mic (#6C63C7): Speak to App / "Tap and speak in your language"
 * Bottom Navigation: Home (active), Orders, Requests, Me.
 */
export function ArtisanOverviewPage({ onNavigate }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isBigOrderOpen, setIsBigOrderOpen] = useState(false);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Artisan';

  return (
    <div className="min-h-screen bg-[#F4F4F4] pb-28">
      {/* 1. TOP BAR */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#ECECEC] px-4 py-3.5 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Small circular profile avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#1FA97D]/30 bg-[#E8F7F1] flex items-center justify-center text-sm font-bold text-[#1FA97D] shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={firstName} className="w-full h-full object-cover" />
              ) : (
                firstName.charAt(0)
              )}
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1B1B1B] leading-tight">
                Namaste, {firstName}
              </h1>
              <p className="text-xs text-[#6B6B6B]">
                What would you like to do?
              </p>
            </div>
          </div>

          {/* Notification bell with unread dot */}
          <button
            type="button"
            onClick={() => onNavigate?.('notifications')}
            className="relative p-2.5 rounded-full hover:bg-neutral-100 text-[#1B1B1B] transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="View notifications"
          >
            <Bell className="w-6 h-6 stroke-[1.8]" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#E8577E] rounded-full ring-2 ring-white" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 pt-5 space-y-6">
        {/* 2. FOUR EXACT ACTION CARDS (LOCKED ORDER & TINTS) */}
        <section aria-label="Quick Actions">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Green: Add Product */}
            <ActionCard
              icon={Camera}
              variant="green"
              title="Add Product"
              subtitle="Take a photo and list your product"
              onClick={() => onNavigate?.('add-product')}
            />

            {/* 2. Pink: My Orders */}
            <ActionCard
              icon={Package}
              variant="pink"
              title="My Orders"
              subtitle="View your orders"
              onClick={() => onNavigate?.('orders')}
            />

            {/* 3. Yellow: New Requests */}
            <ActionCard
              icon={Bell}
              variant="yellow"
              title="New Requests"
              subtitle="Check custom orders and big orders"
              onClick={() => setIsBigOrderOpen(true)}
            />

            {/* 4. Lavender: Speak to App */}
            <ActionCard
              icon={Mic}
              variant="lavender"
              title="Speak to App"
              subtitle="Tap and speak in your language"
              onClick={() => setIsVoiceOpen(true)}
            />
          </div>
        </section>

        {/* 3. RECENT ORDERS & YOUR PRODUCTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Recent Orders */}
          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#ECECEC] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#1B1B1B]">
                Recent Orders
              </h2>
              <button
                type="button"
                onClick={() => onNavigate?.('orders')}
                className="text-xs font-semibold text-[#1FA97D] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {REFERENCE_RECENT_ORDERS.map((order) => (
                <div
                  key={order.id}
                  onClick={() => onNavigate?.('orders')}
                  className="p-3 rounded-xl border border-[#ECECEC] hover:border-[#1FA97D]/40 bg-white hover:bg-neutral-50/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={order.image}
                        alt={order.title}
                        className="w-11 h-11 rounded-lg object-cover border border-[#ECECEC] shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono text-[#6B6B6B] block">
                          {order.id}
                        </span>
                        <h4 className="text-sm font-bold text-[#1B1B1B] truncate">
                          {order.title}
                        </h4>
                        <p className="text-xs text-[#6B6B6B]">
                          {order.details}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <StatusBadge variant="auto">
                        {order.status}
                      </StatusBadge>
                    </div>
                  </div>

                  {order.status === 'In Production' && (
                    <div className="mt-2 pt-2 border-t border-[#ECECEC]/60">
                      <ProgressBar
                        value={order.progress}
                        label="Production progress"
                        showPercentage
                        height="h-2"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Your Products */}
          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#ECECEC] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#1B1B1B]">
                Your Products
              </h2>
              <button
                type="button"
                onClick={() => onNavigate?.('products')}
                className="text-xs font-semibold text-[#1FA97D] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {REFERENCE_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-xl border border-[#ECECEC] overflow-hidden bg-white flex flex-col justify-between"
                >
                  <div className="aspect-square w-full bg-neutral-100 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-xs font-bold text-[#1B1B1B] truncate">
                      {prod.title}
                    </h4>
                    <span className="text-xs font-bold text-[#1FA97D] block mt-0.5">
                      ₹{prod.price}
                    </span>
                    <span className="inline-block mt-1 text-[10px] text-[#1FA97D] bg-[#E8F7F1] px-1.5 py-0.5 rounded font-medium">
                      Live
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. HELPFUL ACTIONS: NEED HELP & SUGGESTED PRICE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Quick Help Card */}
          <Card className="flex flex-col justify-between p-5 bg-[#E7F1FE]/40 border-[#3E8EDE]/20">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E7F1FE] text-[#3E8EDE] flex items-center justify-center mb-3">
                <HelpCircle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-[#1B1B1B]">
                Need Help?
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1">
                Speak your question in your language or talk directly to our artisan support team.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate?.('help')}
                className="bg-[#3E8EDE] hover:bg-[#3277bb]"
              >
                Open Help Center
              </Button>
            </div>
          </Card>

          {/* Fair Price Guide Card */}
          <Card className="flex flex-col justify-between p-5 bg-[#FFF6DD]/50 border-[#E8A93A]/20">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FFF6DD] text-[#E8A93A] flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h3 className="text-base font-bold text-[#1B1B1B]">
                Fair Price Recommendation
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1">
                Our AI analyzes material cost and craft hours so you always earn a dignified livelihood.
              </p>
            </div>
            <div className="mt-4">
              <span className="text-xs font-bold text-[#E8A93A] bg-[#FFF6DD] px-3 py-1.5 rounded-full border border-[#E8A93A]/30">
                100% Fair Price Protection
              </span>
            </div>
          </Card>
        </div>
      </main>

      {/* MODALS */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onNavigate={onNavigate}
      />

      <ArtisanBigOrderModal
        isOpen={isBigOrderOpen}
        onClose={() => setIsBigOrderOpen(false)}
        onAccepted={() => onNavigate?.('orders')}
      />

      {/* FIXED 4-ITEM BOTTOM NAVIGATION */}
      <BottomNav
        activeTab="home"
        onNavigate={onNavigate}
      />
    </div>
  );
}

export default ArtisanOverviewPage;
