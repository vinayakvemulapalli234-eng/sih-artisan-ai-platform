import React, { useState, useEffect } from 'react';
import { ChevronLeft, X, Check } from 'lucide-react';
import { StatusBadge, ProgressBar, Button } from '../design-system';
import { mockBulkOrderService } from '../../services/mockBulkOrderService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

/**
 * Screen 10: Bulk Order Tracking (Locked Spec)
 *
 * Top Bar: Back chevron + "Bulk Order: 500" + green "Sample Approved" badge.
 * Artisan List: Avatar, name, "{completed}/{assigned}" count, status label ("Completed" green, "In Progress" orange).
 * Footer Summary: "Total: {done}/{total}" with two progress bars:
 *   - "Production" (overall count, e.g. 320/500)
 *   - "Production {%}" (e.g. 64%)
 * Button: "Track Order" (primary green #1FA97D).
 */
export function ArtisanBulkTrackingModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const data = mockBulkOrderService.getBulkOrderDetails();
      setOrderData(data);
    }
  }, [isOpen]);

  if (!isOpen || !orderData) return null;

  const { overallOrder, artisans } = orderData;
  const done = overallOrder.completedUnits || 320;
  const total = overallOrder.totalUnits || 500;
  const percent = Math.round((done / total) * 100);

  const handleTrackOrder = () => {
    addToast({
      type: 'info',
      title: 'Tracking Updates Synced',
      message: 'Active cluster production data is up to date.',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#ECECEC] flex flex-col max-h-[92vh]">
        {/* Top Bar: Back chevron + "Bulk Order: 500" + green "Sample Approved" badge */}
        <div className="p-4 flex items-center justify-between border-b border-[#ECECEC]">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="p-1 -ml-1 rounded-lg hover:bg-neutral-100 text-[#1B1B1B] transition-colors shrink-0"
              aria-label="Back"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <h2 className="text-base font-bold text-[#1B1B1B] truncate">
              Bulk Order: {total}
            </h2>

            <StatusBadge variant="solid-green" size="sm">
              Sample Approved
            </StatusBadge>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-100 text-[#6B6B6B] hover:text-[#1B1B1B] flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Artisan List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
            Artisans in this batch
          </p>

          <div className="divide-y divide-[#ECECEC] border border-[#ECECEC] rounded-2xl overflow-hidden bg-white">
            {artisans.map((artisan) => {
              const isCurrentUser = artisan.id === user?.id || artisan.id === 'artisan-1';
              const isCompleted = artisan.status === 'Completed' || artisan.completed === artisan.allocated;
              const statusText = isCompleted ? 'Completed' : 'In Progress';

              return (
                <div
                  key={artisan.id}
                  className={`p-3.5 flex items-center justify-between gap-3 ${
                    isCurrentUser ? 'bg-[#E8F7F1]/30' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={artisan.avatar}
                      alt={artisan.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#ECECEC] shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#1B1B1B] truncate">
                          {isCurrentUser && user?.name ? user.name : artisan.name}
                        </span>
                        {isCurrentUser && (
                          <span className="px-1.5 py-0.2 rounded bg-[#1FA97D] text-white text-[10px] font-bold">
                            You
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#6B6B6B] block">
                        {artisan.completed}/{artisan.allocated}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <StatusBadge variant={isCompleted ? 'green' : 'orange'} size="sm">
                      {statusText}
                    </StatusBadge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Summary: "Total: {done}/{total}" with 2 progress bars + "Track Order" button */}
        <div className="p-4 border-t border-[#ECECEC] bg-[#F4F4F4]/70 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B6B6B]">Total:</span>
            <span className="text-sm font-extrabold text-[#1B1B1B]">
              {done} / {total}
            </span>
          </div>

          {/* Progress Bar 1: "Production" */}
          <ProgressBar
            value={done}
            max={total}
            label="Production"
            height="h-2"
          />

          {/* Progress Bar 2: "Production {%}" */}
          <ProgressBar
            value={percent}
            max={100}
            label="Production (%)"
            showPercentage
            height="h-2"
          />

          {/* Button: "Track Order" (primary green #1FA97D) */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleTrackOrder}
          >
            Track Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ArtisanBulkTrackingModal;
