import React, { useState } from 'react';
import { Users, Clock, X, Check, ChevronLeft } from 'lucide-react';
import { StatusBadge, Button, Card } from '../design-system';
import { mockBulkOrderService } from '../../services/mockBulkOrderService';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

/**
 * Screen 8: New Big Order Request (Locked Spec)
 *
 * Top Bar: Back chevron + "New Big Order" + red "New" badge.
 * Header: People icon + "500 wooden toys required" + "A customer wants 500 wooden toys for an event."
 * Card: "Your possible share" — large "100 pieces".
 * Details: "₹450 / piece" and "Delivery: 25 days".
 * Buttons: "Accept" (primary green #1FA97D) and "Not Now" (secondary outline).
 */
export function ArtisanBigOrderModal({ isOpen, onClose, onAccepted }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await mockBulkOrderService.acceptOrderShare(
        user?.id || 'artisan-1',
        100,
        user?.name || 'Artisan'
      );
      addToast({
        type: 'success',
        title: 'Big Order Accepted! 🎉',
        message: 'You have accepted 100 pieces. Direct payout of ₹45,000 guaranteed.',
      });
      onAccepted?.();
      onClose();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Could not accept order share at this moment.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#ECECEC] flex flex-col max-h-[92vh]">
        {/* Top Bar: Back chevron / Close + "New Big Order" + red "New" badge */}
        <div className="p-4 flex items-center justify-between border-b border-[#ECECEC]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 -ml-1.5 rounded-lg hover:bg-neutral-100 text-[#1B1B1B] transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold text-[#1B1B1B]">
              New Big Order
            </h2>
            <StatusBadge variant="solid-red" size="sm">
              New
            </StatusBadge>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 text-[#6B6B6B] hover:text-[#1B1B1B] flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Header: People icon + 500 wooden toys required + subtitle */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#E8F7F1] border border-[#1FA97D]/20">
            <div className="w-12 h-12 rounded-xl bg-[#1FA97D] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">
                500 wooden toys required
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                A customer wants 500 wooden toys for an event.
              </p>
            </div>
          </div>

          {/* Card: "Your possible share" — large "100 pieces" */}
          <Card className="p-5 space-y-4 border-[#1FA97D]/30 shadow-sm bg-gradient-to-b from-white to-[#E8F7F1]/20">
            <div className="text-center py-2 border-b border-[#ECECEC]">
              <span className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider block">
                Your possible share
              </span>
              <span className="text-3xl font-extrabold text-[#1FA97D] block mt-1">
                100 pieces
              </span>
            </div>

            {/* Details: "₹450 / piece" and "Delivery: 25 days" */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between py-1 border-b border-[#ECECEC]">
                <span className="text-[#6B6B6B]">Price per piece:</span>
                <span className="font-bold text-[#1B1B1B]">₹450 / piece</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#ECECEC]">
                <span className="text-[#6B6B6B]">Total payout:</span>
                <span className="font-extrabold text-[#1FA97D]">₹45,000</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-[#6B6B6B] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#6B6B6B]" />
                  <span>Delivery:</span>
                </span>
                <span className="font-semibold text-[#1B1B1B]">25 days</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons: "Accept" (primary green #1FA97D) and "Not Now" (secondary outline) */}
        <div className="p-4 pt-2 border-t border-[#ECECEC] bg-[#F4F4F4]/60 flex items-center gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={onClose}
          >
            Not Now
          </Button>

          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={isProcessing}
            onClick={handleAccept}
          >
            {isProcessing ? (
              <span>Confirming…</span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Accept</span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ArtisanBigOrderModal;
