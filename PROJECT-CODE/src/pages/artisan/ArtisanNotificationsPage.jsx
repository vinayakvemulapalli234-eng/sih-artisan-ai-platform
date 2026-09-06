import React, { useState } from 'react';
import {
  Bell,
  Volume2,
  CheckCircle2,
  ShoppingBag,
  CreditCard,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Button } from '../../components/primitives/Button';
import { Badge } from '../../components/primitives/Badge';
import { Card } from '../../components/primitives/Card';
import { useToast } from '../../hooks/useToast';

const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'order',
    category: 'orders',
    title: 'नया ऑर्डर प्राप्त हुआ / New Order Received',
    body: 'Aarti Sharma from Mumbai ordered 2 pcs of Hand-Painted Kalamkari Stole. Value: ₹6,400.',
    hindiBody: 'आरती शर्मा (मुंबई) ने 2 कलमकारी स्टोल का ऑर्डर दिया। कुल राशि ₹6,400।',
    time: '10 मिनट पहले / 10 mins ago',
    unread: true,
    actionLabel: 'ऑर्डर देखें / View Order',
    actionRoute: 'orders',
    icon: ShoppingBag,
    iconBg: 'bg-primary/10 text-primary',
  },
  {
    id: 'n2',
    type: 'payment',
    category: 'payments',
    title: 'खाते में पैसे भेजे गए / Payment Deposited',
    body: '₹12,800 has been credited to your Bank of India account (A/c **4102) for Order #ORD-8821.',
    hindiBody: 'आपके बैंक खाते में ₹12,800 भेज दिए गए हैं। ऑर्डर संख्या #ORD-8821 के लिए।',
    time: '2 घंटे पहले / 2 hours ago',
    unread: true,
    actionLabel: 'कमाई देखें / View Earnings',
    actionRoute: 'insights',
    icon: CreditCard,
    iconBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'n3',
    type: 'review',
    category: 'studio',
    title: 'ग्राहक ने 5 स्टार दिए / 5-Star Buyer Review',
    body: 'Rohan Mehta gave 5 stars: "The natural indigo colors and tree of life details are truly divine!"',
    hindiBody: 'रोहन मेहता ने आपको 5 स्टार दिए: "प्राकृतिक रंग और बनावट बेहद सुंदर है!"',
    time: 'कल / Yesterday',
    unread: false,
    actionLabel: 'दुकान प्रोफाइल / View Profile',
    actionRoute: 'profile',
    icon: Star,
    iconBg: 'bg-amber-100 text-amber-800',
  },
  {
    id: 'n4',
    type: 'demand',
    category: 'orders',
    title: 'त्योहारी मांग सूचना / Festival Demand Surge',
    body: 'Diwali festive season demand for Kalamkari wall hangings is up +45%. Consider listing 3 more units.',
    hindiBody: 'दीवाली के लिए कलमकारी की मांग 45% बढ़ी है। 3 नए उत्पाद जोड़ने का अच्छा अवसर है।',
    time: '2 दिन पहले / 2 days ago',
    unread: false,
    actionLabel: 'सामान जोड़ें / Add Craft',
    actionRoute: 'add-product',
    icon: Sparkles,
    iconBg: 'bg-purple-100 text-purple-800',
  },
  {
    id: 'n5',
    type: 'gi',
    category: 'studio',
    title: 'जीआई टैग प्रमाण पत्र मान्य / GI Certificate Active',
    body: 'Your GI tag registration for Srikalahasti Kalamkari is valid until Dec 2028. All items get digital seal.',
    hindiBody: 'आपका जीआई टैग प्रमाण पत्र दिसंबर 2028 तक पूरी तरह मान्य है।',
    time: '1 हफ्ता पहले / 1 week ago',
    unread: false,
    actionLabel: 'प्रमाण पत्र देखें / View Badge',
    actionRoute: 'profile',
    icon: ShieldCheck,
    iconBg: 'bg-blue-100 text-blue-800',
  },
];

export function ArtisanNotificationsPage({ onNavigate }) {
  const { addToast } = useToast();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [speakingId, setSpeakingId] = useState(null);

  const handleReadAloud = (notif) => {
    setSpeakingId(notif.id);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `${notif.title}. ${notif.hindiBody || notif.body}`
      );
      utterance.rate = 0.9;
      utterance.lang = 'hi-IN';
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setSpeakingId(null), 2500);
    }

    addToast({
      type: 'info',
      title: '🔊 संदेश सुनाया जा रहा है',
      message: notif.title,
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    addToast({
      type: 'success',
      title: 'सभी पढ़े गए / All Marked Read',
      message: 'All notifications marked as read.',
    });
  };

  const filtered =
    filter === 'all'
      ? notifications
      : notifications.filter((n) => n.category === filter);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <Bell className="w-6 h-6" />
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
              सूचनाएं और संदेश / Alerts & Updates
            </h1>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            नए ऑर्डर, बैंक भुगतान, और ग्राहकों के संदेश यहां देखें। (सुनने के लिए 🔊 दबाएं)
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="self-start sm:self-auto"
          >
            सभी को पढ़ा हुआ चिह्नित करें / Mark Read
          </Button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {[
          { id: 'all', label: 'सभी / All', count: notifications.length },
          {
            id: 'orders',
            label: 'ऑर्डर / Orders',
            count: notifications.filter((n) => n.category === 'orders').length,
          },
          {
            id: 'payments',
            label: 'भुगतान / Payments',
            count: notifications.filter((n) => n.category === 'payments').length,
          },
          {
            id: 'studio',
            label: 'दुकान / Studio',
            count: notifications.filter((n) => n.category === 'studio').length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 border ${
              filter === tab.id
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white text-text-secondary border-border hover:border-primary/40'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                filter === tab.id ? 'bg-white/20 text-white' : 'bg-neutral-100 text-text-secondary'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notification Cards List */}
      <div className="space-y-4 max-w-3xl">
        {filtered.map((notif) => {
          const Icon = notif.icon;
          const isSpeaking = speakingId === notif.id;

          return (
            <Card
              key={notif.id}
              variant="flat"
              padding="lg"
              className={`transition-all border-2 ${
                notif.unread
                  ? 'border-primary/40 bg-amber-50/20 shadow-sm'
                  : 'border-border/60 bg-white'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Large Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${notif.iconBg}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="font-heading text-base font-bold text-text-primary">
                      {notif.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{notif.time}</span>
                      {notif.unread && (
                        <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block ml-1" />
                      )}
                    </div>
                  </div>

                  {/* Hindi & English text */}
                  <p className="text-sm font-medium text-text-primary mb-1">
                    {notif.hindiBody}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {notif.body}
                  </p>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-border/50">
                    {/* Read Aloud Button */}
                    <button
                      type="button"
                      onClick={() => handleReadAloud(notif)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isSpeaking
                          ? 'bg-primary text-white border-primary animate-pulse'
                          : 'bg-primary/5 text-primary border-primary/20 hover:bg-primary/10'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isSpeaking ? 'बोल रहे हैं...' : '🔊 संदेश सुनें / Listen'}</span>
                    </button>

                    {/* Direct Action Button */}
                    {notif.actionRoute && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onNavigate?.(notif.actionRoute)}
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                        className="ml-auto"
                      >
                        {notif.actionLabel}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}

export default ArtisanNotificationsPage;
