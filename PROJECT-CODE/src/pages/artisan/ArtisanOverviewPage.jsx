import React, { useState } from 'react';
import {
  Camera,
  Package,
  Bell,
  Mic,
  ArrowRight,
  Sparkles,
  Leaf,
  Globe,
} from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { ArtisanReferenceActionCard } from '../../components/artisan/ArtisanReferenceActionCard';
import { QuickHelpCard } from '../../components/artisan/QuickHelpCard';
import { SuggestedPriceCard } from '../../components/artisan/SuggestedPriceCard';
import { TrackBulkOrderCard } from '../../components/artisan/TrackBulkOrderCard';
import { LanguageSelectorModal, ARTISAN_LANGUAGES } from '../../components/artisan/LanguageSelectorModal';
import { VoiceAssistantModal } from '../../components/artisan/VoiceAssistantModal';
import { useToast } from '../../hooks/useToast';

// Reference image products
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

// Reference image recent orders
const REFERENCE_RECENT_ORDERS = [
  {
    id: '#12345',
    title: 'Kondapalli Wooden Toy',
    details: '100 pieces • ₹30,000',
    status: 'In Production',
    statusType: 'production',
    date: '5 Aug 2026',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: '#12346',
    title: 'Handmade Bag',
    details: '50 pieces • ₹25,000',
    status: 'Delivered',
    statusType: 'delivered',
    date: '3 Aug 2026',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: '#12347',
    title: 'Blue Wooden Toy',
    details: '120 pieces • ₹12,000',
    status: 'Pending',
    statusType: 'pending',
    date: '1 Aug 2026',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=150&q=80',
  },
];

/**
 * ArtisanOverviewPage (Artisan Home)
 * Pixel-perfect adaptation of the user's reference image for KalaKriti.
 */
export function ArtisanOverviewPage({ onNavigate }) {
  const { addToast } = useToast();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(ARTISAN_LANGUAGES[0]); // English default or Hindi

  const handleUseSuggestedPrice = (price) => {
    addToast({
      type: 'success',
      title: `₹${price} Price Applied!`,
      message: `Recommended price ₹${price} set for your latest product draft.`,
    });
  };

  const handleTrackBulkOrder = () => {
    onNavigate?.('orders');
    addToast({
      type: 'info',
      title: 'Bulk Order Tracking',
      message: 'Opening 500 wooden toys production schedule.',
    });
  };

  const handleTalkToPerson = () => {
    addToast({
      type: 'info',
      title: 'Connecting Support Officer',
      message: 'Calling KalaKriti Artisan Helpline (1800-208-CRAFT)...',
    });
  };

  return (
    <PageContainer className="py-6 space-y-6">
      {/* 1. TOP HEADER & GREETING */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Namaste, Lakshmi Devi! 👋
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Let's showcase your craft to the world.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher Pill */}
          <button
            type="button"
            onClick={() => setIsLangOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-border text-xs font-semibold text-text-primary transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-text-secondary" />
            <span>{currentLang.nativeName}</span>
          </button>

          {/* Quote Pill / Card */}
          <div className="p-2.5 sm:px-4 sm:py-2 rounded-2xl bg-[#FBF6EE] border border-amber-200/60 flex items-center gap-2 text-xs text-amber-950 font-medium shadow-2xs">
            <span className="italic">"Every handmade product tells a story."</span>
            <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
          </div>
        </div>
      </div>

      {/* 2. TOP 4 PASTEL ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Add Product */}
        <ArtisanReferenceActionCard
          icon={Camera}
          iconBgColor="bg-emerald-600"
          iconTextColor="text-white"
          cardBgColor="bg-[#E8F8F0]"
          cardBorderColor="border-emerald-200/70"
          title="Add Product"
          subtitle="Take a photo and list your product"
          onClick={() => onNavigate?.('add-product')}
        />

        {/* Card 2: My Orders */}
        <ArtisanReferenceActionCard
          icon={Package}
          iconBgColor="bg-[#E5634D]"
          iconTextColor="text-white"
          cardBgColor="bg-[#FDF0ED]"
          cardBorderColor="border-orange-200/70"
          title="My Orders"
          subtitle="View and manage your orders"
          onClick={() => onNavigate?.('orders')}
        />

        {/* Card 3: Notifications */}
        <ArtisanReferenceActionCard
          icon={Bell}
          iconBgColor="bg-[#E5A93C]"
          iconTextColor="text-white"
          cardBgColor="bg-[#FEF8E7]"
          cardBorderColor="border-amber-200/70"
          title="Notifications"
          subtitle="Check updates and new requests"
          onClick={() => onNavigate?.('notifications')}
        />

        {/* Card 4: Speak to App */}
        <ArtisanReferenceActionCard
          icon={Mic}
          iconBgColor="bg-[#3B82F6]"
          iconTextColor="text-white"
          cardBgColor="bg-[#EBF3FE]"
          cardBorderColor="border-blue-200/70"
          title="Speak to App"
          subtitle="Tap and speak in your language"
          onClick={() => setIsVoiceOpen(true)}
        />
      </div>

      {/* 3. MIDDLE SECTION: RECENT ORDERS & YOUR PRODUCTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT: Recent Orders (approx 5 cols on lg) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl border border-border/80 bg-white shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="font-heading text-base sm:text-lg font-bold text-text-primary">
                Recent Orders
              </h2>
              <button
                type="button"
                onClick={() => onNavigate?.('orders')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
              >
                <span>View All</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
              {REFERENCE_RECENT_ORDERS.map((order) => {
                const isProduction = order.statusType === 'production';
                const isDelivered = order.statusType === 'delivered';

                return (
                  <div
                    key={order.id}
                    onClick={() => onNavigate?.('orders')}
                    className="p-3 rounded-2xl border border-border/60 hover:border-emerald-500/40 hover:bg-neutral-50/50 transition-all flex items-center justify-between gap-3 cursor-pointer"
                  >
                    {/* Thumbnail & Title */}
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={order.image}
                        alt={order.title}
                        className="w-12 h-12 rounded-xl object-cover border border-border shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
                          <span>{order.id}</span>
                        </div>
                        <h4 className="font-heading text-sm font-bold text-text-primary truncate">
                          {order.title}
                        </h4>
                        <p className="text-xs text-text-secondary mt-0.5 font-medium">
                          {order.details}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill & Date */}
                    <div className="text-right shrink-0 flex flex-col items-end">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isProduction
                            ? 'bg-[#E8F8F0] text-emerald-800'
                            : isDelivered
                            ? 'bg-[#EBF3FE] text-blue-800'
                            : 'bg-[#FEF4E6] text-amber-900'
                        }`}
                      >
                        {isProduction && <span className="mr-1">⚡</span>}
                        {isDelivered && <span className="mr-1">✓</span>}
                        {!isProduction && !isDelivered && <span className="mr-1">⏳</span>}
                        {order.status}
                      </span>
                      <span className="text-[11px] text-text-muted mt-1.5">
                        {order.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Your Products (approx 7 cols on lg) */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl border border-border/80 bg-white shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h2 className="font-heading text-base sm:text-lg font-bold text-text-primary">
              Your Products
            </h2>
            <button
              type="button"
              onClick={() => onNavigate?.('products')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
            >
              <span>View All</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>

          {/* 3 Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {REFERENCE_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl border border-border/70 overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-4/3 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-3">
                    <h4 className="font-heading text-xs font-bold text-text-primary truncate">
                      {prod.title}
                    </h4>
                    <span className="font-heading text-sm font-extrabold text-text-primary block mt-0.5">
                      ₹{prod.price}
                    </span>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {prod.tags.map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded bg-neutral-100 text-[10px] text-text-secondary font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-3 pb-3 pt-1">
                  <span className="w-full py-1 rounded-lg bg-[#E8F8F0] text-emerald-800 text-[10px] font-bold text-center block">
                    {prod.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM SECTION: QUICK HELP, SUGGESTED PRICE, TRACK BULK ORDER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Quick Help */}
        <QuickHelpCard
          onSpeakQuestion={() => setIsVoiceOpen(true)}
          onTalkToPerson={handleTalkToPerson}
        />

        {/* Suggested Price */}
        <SuggestedPriceCard
          price={650}
          minRange={600}
          maxRange={700}
          onUsePrice={handleUseSuggestedPrice}
        />

        {/* Track Bulk Order */}
        <TrackBulkOrderCard
          itemCount="500 wooden toys"
          statusBadge="Sample Approved"
          currentStep={2} // In Production
          onTrackOrder={handleTrackBulkOrder}
        />
      </div>

      {/* MODALS */}
      <LanguageSelectorModal
        isOpen={isLangOpen}
        onClose={() => setIsLangOpen(false)}
        currentLanguage={currentLang.code}
        onSelectLanguage={(lang) => {
          setCurrentLang(lang);
          addToast({
            type: 'success',
            title: `Language changed to ${lang.nativeName}`,
            message: `Selected ${lang.name}`,
          });
        }}
      />

      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onNavigate={onNavigate}
      />
    </PageContainer>
  );
}

export default ArtisanOverviewPage;
