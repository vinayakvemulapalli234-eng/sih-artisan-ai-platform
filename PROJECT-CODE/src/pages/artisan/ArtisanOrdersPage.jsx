import React, { useState } from 'react';
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle2,
  Users,
  Volume2,
  Phone,
  Clock,
  MapPin,
  Check,
  X,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Button } from '../../components/primitives/Button';
import { Badge } from '../../components/primitives/Badge';
import { Card } from '../../components/primitives/Card';
import { formatCurrency } from '../../lib/formatters';
import { mockOrders } from '../../lib/mockData';
import { useToast } from '../../hooks/useToast';
import { TrackBulkOrderCard } from '../../components/artisan/TrackBulkOrderCard';

const EXTENDED_ORDERS = [
  {
    id: 'ORD-8944',
    customerName: 'Priya Mukherjee',
    city: 'Kolkata, WB',
    phone: '+91 98310 44521',
    productTitle: 'Hand-Painted Tree of Life Kalamkari Wall Hanging',
    date: 'आज, 11:30 AM',
    total: 3450,
    quantity: 1,
    status: 'new', // New Requests
    paymentStatus: 'Paid Online (UPI)',
    giTagged: true,
  },
  {
    id: 'ORD-8945',
    customerName: 'Anand R. Verma',
    city: 'Bengaluru, KA',
    phone: '+91 94480 12890',
    productTitle: 'Pure Silk Natural Dye Kalamkari Stole',
    date: 'आज, 09:15 AM',
    total: 6200,
    quantity: 2,
    status: 'new', // New Requests
    paymentStatus: 'Paid Online (NetBanking)',
    giTagged: true,
  },
  {
    id: 'ORD-8942',
    customerName: 'Meera Nambiar',
    city: 'Chennai, TN',
    phone: '+91 98840 98112',
    productTitle: 'Floral Motifs Kalamkari Table Runner',
    date: 'कल / Yesterday',
    total: 3700,
    quantity: 1,
    status: 'packing', // In Progress
    paymentStatus: 'Paid Online (UPI)',
    giTagged: true,
  },
  {
    id: 'ORD-8946',
    customerName: 'Suresh Trivedi',
    city: 'Ahmedabad, GJ',
    phone: '+91 98250 33412',
    productTitle: 'Tamarind Reed Pen Heritage Scroll',
    date: 'कल / Yesterday',
    total: 4800,
    quantity: 1,
    status: 'packing', // In Progress
    paymentStatus: 'Paid Online',
    giTagged: true,
  },
  {
    id: 'ORD-8943',
    customerName: 'Karan Sen',
    city: 'New Delhi, DL',
    phone: '+91 98111 23098',
    productTitle: 'Kalamkari Divine Deity Tapestry',
    date: '3 दिन पहले / 3 days ago',
    total: 12500,
    quantity: 1,
    status: 'transit', // In Transit
    paymentStatus: 'Paid Online',
    trackingNumber: 'INPOST-AP-89104',
    deliveryPartner: 'India Post Speed Post',
    giTagged: true,
  },
  {
    id: 'ORD-8941',
    customerName: 'Aarav Sharma',
    city: 'Mumbai, MH',
    phone: '+91 98200 45678',
    productTitle: 'Hand-Painted Tree of Life Kalamkari Wall Hanging',
    date: '5 दिन पहले / 5 days ago',
    total: 3450,
    quantity: 1,
    status: 'completed', // Delivered
    paymentStatus: 'Paid & Settled to Bank',
    giTagged: true,
  },
  {
    id: 'ORD-8947',
    customerName: 'FabIndia Craft Sourcing',
    city: 'Gurugram, HR',
    phone: '+91 124 498 7000',
    productTitle: 'Bulk Order: 25 pcs Kalamkari Cotton Cushion Covers',
    date: '4 दिन पहले / 4 days ago',
    total: 45000,
    quantity: 25,
    status: 'bulk', // Bulk Orders
    paymentStatus: '50% Advance Received (₹22,500)',
    giTagged: true,
  },
];

export function ArtisanOrdersPage() {
  const { addToast } = useToast();
  const [orders, setOrders] = useState(EXTENDED_ORDERS);
  const [activeTab, setActiveTab] = useState('new');
  const [speakingId, setSpeakingId] = useState(null);

  // Status Tabs matching user requirements
  const tabs = [
    {
      id: 'all',
      label: 'My Orders',
      hi: 'सभी ऑर्डर',
      icon: ShoppingBag,
      count: orders.length,
      badgeColor: 'bg-primary text-white',
    },
    {
      id: 'new',
      label: 'New Requests',
      hi: 'नए अनुरोध',
      icon: ShoppingBag,
      count: orders.filter((o) => o.status === 'new').length,
      badgeColor: 'bg-primary text-white',
    },
    {
      id: 'bulk',
      label: 'Bulk Orders',
      hi: 'थोक ऑर्डर',
      icon: Users,
      count: orders.filter((o) => o.status === 'bulk').length,
      badgeColor: 'bg-purple-700 text-white',
    },
    {
      id: 'progress',
      label: 'Order Progress',
      hi: 'प्रगति / ट्रैकिंग',
      icon: Truck,
      count: orders.filter((o) => o.status === 'packing' || o.status === 'transit').length,
      badgeColor: 'bg-blue-600 text-white',
    },
    {
      id: 'completed',
      label: 'Completed Orders',
      hi: 'पूरे हुए ऑर्डर',
      icon: CheckCircle2,
      count: orders.filter((o) => o.status === 'completed').length,
      badgeColor: 'bg-emerald-700 text-white',
    },
  ];

  const filteredOrders =
    activeTab === 'all'
      ? orders
      : activeTab === 'progress'
      ? orders.filter((o) => o.status === 'packing' || o.status === 'transit')
      : orders.filter((o) => o.status === activeTab);

  // Audio Readout
  const handleReadAloud = (order) => {
    setSpeakingId(order.id);
    const speechText = `ऑर्डर संख्या ${order.id}. ग्राहक ${order.customerName}, शहर ${order.city}. वस्तु: ${order.productTitle}. मात्रा: ${order.quantity}. कुल कीमत: ₹${order.total}.`;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setSpeakingId(null), 2000);
    }

    addToast({
      type: 'info',
      title: '🔊 ऑर्डर सुनाया जा रहा है',
      message: `${order.customerName} - ₹${order.total}`,
    });
  };

  // Actions
  const handleAcceptOrder = (id) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'packing' } : o))
    );
    addToast({
      type: 'success',
      title: 'ऑर्डर स्वीकार किया गया! ✓',
      message: 'Moved to "In Progress / Pack". Please pack with GI seal.',
    });
  };

  const handleDeclineOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    addToast({
      type: 'warning',
      title: 'ऑर्डर अस्वीकार किया गया',
      message: 'Order cancelled and buyer informed.',
    });
  };

  const handleMarkPacked = (id) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'transit', trackingNumber: 'INPOST-AP-99212' } : o))
    );
    addToast({
      type: 'success',
      title: 'पैकिंग पूरी! कूरियर पिकअप अनुरोध भेजा गया 📦',
      message: 'Moved to "In Transit". India Post agent will collect from workshop.',
    });
  };

  const handleCallDeliveryPartner = (order) => {
    addToast({
      type: 'info',
      title: '📞 कूरियर कॉल लगाया जा रहा है',
      message: 'Connecting to India Post Rural Speed Post Dispatcher...',
    });
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          शिल्प ऑर्डर प्रबंधन / Studio Orders
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          नए ऑर्डर स्वीकारें, पैकिंग करें, और जीआई प्रामाणिकता मुहर के साथ भेजें।
        </p>
      </div>

      {/* VISUAL STATUS TABS (LARGE TOUCH TARGETS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between text-left min-h-[90px] shadow-xs active:scale-98 ${
                isActive
                  ? 'border-primary bg-primary/5 text-primary shadow-sm ring-2 ring-primary/20'
                  : 'border-border bg-white text-text-primary hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-primary text-white' : 'bg-neutral-100 text-text-secondary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? 'bg-primary text-white' : 'bg-neutral-100 text-text-secondary'
                  }`}
                >
                  {tab.count}
                </span>
              </div>
              <div className="mt-2">
                <span className="font-heading text-sm font-bold block leading-tight">
                  {tab.label}
                </span>
                <span className="text-[10px] text-text-secondary font-medium block leading-tight mt-0.5">
                  {tab.hi}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Bulk Tracker Banner when on Bulk Orders */}
      {activeTab === 'bulk' && (
        <div className="mb-6 max-w-4xl">
          <TrackBulkOrderCard
            itemCount="500 wooden toys"
            statusBadge="Sample Approved"
            currentStep={2}
            onTrackOrder={() =>
              addToast({
                type: 'info',
                title: 'Bulk Order Tracking Details',
                message: 'Production: 180/500 carved and lacquered.',
              })
            }
          />
        </div>
      )}

      {/* ORDERS LIST CONTAINER */}
      {filteredOrders.length === 0 ? (
        <Card variant="flat" padding="lg" className="text-center py-12 border-2 border-dashed border-border">
          <Package className="w-12 h-12 text-text-muted mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
            इस श्रेणी में कोई ऑर्डर नहीं है
          </h3>
          <p className="text-xs text-text-secondary">
            No orders currently in this status tab.
          </p>
        </Card>
      ) : (
        <div className="space-y-4 max-w-4xl">
          {filteredOrders.map((order) => {
            const isSpeaking = speakingId === order.id;

            return (
              <Card
                key={order.id}
                variant="flat"
                padding="lg"
                className="bg-white border-2 border-border hover:border-primary/50 transition-all shadow-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Column: Order Header & Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono text-sm font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg">
                        {order.id}
                      </span>
                      {order.giTagged && (
                        <Badge variant="accent" size="sm" className="bg-emerald-100 text-emerald-800">
                          GI मुहर मान्य
                        </Badge>
                      )}
                      <span className="text-xs text-text-secondary flex items-center gap-1 ml-auto">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{order.date}</span>
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                      {order.productTitle}
                    </h3>

                    {/* Buyer Details */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-text-secondary mb-3 pt-1">
                      <span>
                        ग्राहक: <strong className="text-text-primary">{order.customerName}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-text-muted" />
                        <span>{order.city}</span>
                      </span>
                      <span className="text-emerald-700 font-semibold">
                        ✓ {order.paymentStatus}
                      </span>
                    </div>

                    {/* Tracking details if in transit */}
                    {order.trackingNumber && (
                      <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 mb-2 flex items-center justify-between">
                        <span>कूरियर: {order.deliveryPartner || 'India Post Speed Post'}</span>
                        <span className="font-mono font-bold">ट्रैकिंग: {order.trackingNumber}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Price & High Contrast Amount Box */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0 p-3 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                    <div className="text-left lg:text-right">
                      <span className="text-[10px] text-text-secondary block">
                        मात्रा: {order.quantity} पीस
                      </span>
                      <span className="font-heading text-2xl font-extrabold text-primary">
                        {formatCurrency(order.total)}
                      </span>
                    </div>

                    {/* Listen Button */}
                    <button
                      type="button"
                      onClick={() => handleReadAloud(order)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        isSpeaking
                          ? 'bg-primary text-white border-primary animate-pulse'
                          : 'bg-white text-primary border-primary/30 hover:bg-primary/5'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isSpeaking ? 'बोल रहे हैं...' : '🔊 विवरण सुनें'}</span>
                    </button>
                  </div>
                </div>

                {/* SINGLE-CLICK LARGE ACTION BUTTONS BAR */}
                <div className="mt-4 pt-3 border-t border-border/70 flex flex-wrap items-center gap-3">
                  {/* If New Order */}
                  {order.status === 'new' && (
                    <>
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => handleAcceptOrder(order.id)}
                        className="flex-1 min-h-[48px] bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                        leftIcon={<Check className="w-5 h-5" />}
                      >
                        ✓ ऑर्डर स्वीकारें (Accept Order)
                      </Button>
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => handleDeclineOrder(order.id)}
                        className="min-h-[48px] text-rose-700 border-rose-300 hover:bg-rose-50"
                        leftIcon={<X className="w-4 h-4" />}
                      >
                        अस्वीकारें
                      </Button>
                    </>
                  )}

                  {/* If In Packing */}
                  {order.status === 'packing' && (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleMarkPacked(order.id)}
                      className="w-full min-h-[50px] font-bold text-base bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
                      leftIcon={<Package className="w-5 h-5" />}
                    >
                      📦 सामान पैक हो गया - कूरियर बुलाएं (Mark Packed & Ready)
                    </Button>
                  )}

                  {/* If In Transit */}
                  {order.status === 'transit' && (
                    <>
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => handleCallDeliveryPartner(order)}
                        className="flex-1 min-h-[48px] font-bold text-primary border-primary/40"
                        leftIcon={<Phone className="w-4 h-4" />}
                      >
                        📞 डिलीवरी एजेंट को कॉल करें
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() =>
                          addToast({
                            type: 'info',
                            title: 'ट्रैकिंग स्थिति',
                            message: 'Parcel is out for delivery in New Delhi Hub.',
                          })
                        }
                        className="flex-1 min-h-[48px] font-bold"
                        leftIcon={<Truck className="w-4 h-4" />}
                      >
                        पार्सल ट्रैक करें
                      </Button>
                    </>
                  )}

                  {/* If Completed */}
                  {order.status === 'completed' && (
                    <div className="w-full flex items-center justify-between gap-3 text-xs text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>सफलतापूर्वक पहुंचाया गया • भुगतान बैंक खाते में जमा</span>
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          addToast({
                            type: 'info',
                            title: 'जीआई रसीद',
                            message: 'Downloading GI Authenticity Certificate PDF...',
                          })
                        }
                        leftIcon={<FileText className="w-4 h-4" />}
                      >
                        रसीद देखें
                      </Button>
                    </div>
                  )}

                  {/* If Bulk */}
                  {order.status === 'bulk' && (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() =>
                        addToast({
                          type: 'info',
                          title: 'थोक ऑर्डर विवरण',
                          message: 'FabIndia institutional delivery contract opened.',
                        })
                      }
                      className="w-full min-h-[48px] font-bold bg-purple-700 hover:bg-purple-800 text-white"
                      leftIcon={<Users className="w-5 h-5" />}
                    >
                      थोक अनुबंध व डिलीवरी शेड्यूल देखें (Manage Bulk Order)
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}

export default ArtisanOrdersPage;
