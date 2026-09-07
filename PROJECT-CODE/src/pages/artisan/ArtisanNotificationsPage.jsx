import React, { useState } from 'react';
import {
  Bell,
  MessageSquare,
  CheckCircle,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { TopBar, Card } from '../../components/design-system';
import { useToast } from '../../hooks/useToast';

const NOTIFICATIONS = [
  {
    id: 'n1',
    iconType: 'red-bell',
    title: 'New order received',
    detail: 'Order #12348 for 30 pcs Clay Owl Figurine',
    time: '2h ago',
    route: 'orders',
  },
  {
    id: 'n2',
    iconType: 'blue-chat',
    title: 'Customer message',
    detail: 'Priya asked: "Can you deliver before next Friday?"',
    time: '3h ago',
    route: 'orders',
  },
  {
    id: 'n3',
    iconType: 'green-check',
    title: 'Payment confirmed',
    detail: '₹25,000 deposited to your bank for Order #12346',
    time: '1d ago',
    route: 'orders',
  },
  {
    id: 'n4',
    iconType: 'red-bell',
    title: 'New big order available',
    detail: '500 wooden toys batch — 100 pcs allocated for you',
    time: '1d ago',
    route: 'orders',
  },
  {
    id: 'n5',
    iconType: 'green-check',
    title: 'Sample approved',
    detail: 'Quality inspector verified your sample for bulk order #500',
    time: '2d ago',
    route: 'orders',
  },
];

/**
 * Screen 11: Notifications (Locked Spec)
 *
 * Top Bar: Back chevron + "Notifications" + settings gear icon (top-right).
 * Rows: Colored icon chip:
 *  - Red bell = new order (#FDEAF0 bg, #E8577E icon)
 *  - Blue chat bubble = customer message (#E7F1FE bg, #3E8EDE icon)
 *  - Green check = payment confirmation (#E8F7F1 bg, #1FA97D icon)
 * Title, detail line, relative timestamp ("2h ago", "1d ago").
 * Tapping deep-links to destination.
 */
export function ArtisanNotificationsPage({ onNavigate }) {
  const { addToast } = useToast();
  const [notifications] = useState(NOTIFICATIONS);

  const renderIconChip = (iconType) => {
    switch (iconType) {
      case 'red-bell':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#FDEAF0] text-[#E8577E] flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
        );
      case 'blue-chat':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#E7F1FE] text-[#3E8EDE] flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
        );
      case 'green-check':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#E8F7F1] text-[#1FA97D] flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#6B6B6B] flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
        );
    }
  };

  const handleSettingsClick = () => {
    addToast({
      type: 'info',
      title: 'Notification Settings',
      message: 'Push and SMS notification preferences are enabled.',
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] pb-16">
      {/* Top Bar: Back chevron + "Notifications" + settings gear icon */}
      <TopBar
        title="Notifications"
        onBack={() => onNavigate?.('overview')}
        rightAction={
          <button
            type="button"
            onClick={handleSettingsClick}
            className="p-2 rounded-xl text-[#1B1B1B] hover:bg-neutral-100 transition-colors"
            aria-label="Notification settings"
          >
            <Settings className="w-5 h-5 stroke-[2]" />
          </button>
        }
      />

      {/* Notifications List */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-2.5">
        {notifications.map((item) => (
          <Card
            key={item.id}
            className="p-4 flex items-center justify-between gap-3 hover:border-[#1FA97D]/40 transition-all cursor-pointer"
            onClick={() => onNavigate?.(item.route)}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {renderIconChip(item.iconType)}
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#1B1B1B] leading-snug truncate">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B6B6B] truncate mt-0.5">
                  {item.detail}
                </p>
                <span className="text-[11px] text-[#A6A6A6] font-medium block mt-1">
                  {item.time}
                </span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-[#A6A6A6] shrink-0" />
          </Card>
        ))}
      </main>
    </div>
  );
}

export default ArtisanNotificationsPage;
