import React from 'react';
import { Package } from 'lucide-react';

/**
 * TrackBulkOrderCard
 * Displays active bulk order status with 4-step horizontal progress tracker.
 * Exactly matches the bottom right card in the reference image.
 */
export function TrackBulkOrderCard({
  itemCount = '500 wooden toys',
  statusBadge = 'Sample Approved',
  currentStep = 2, // 1: Order Received, 2: In Production, 3: Packaging, 4: Shipped
  onTrackOrder,
  className = '',
}) {
  const steps = [
    { num: 1, label: 'Order Received' },
    { num: 2, label: 'In Production' },
    { num: 3, label: 'Packaging' },
    { num: 4, label: 'Shipped' },
  ];

  return (
    <div className={`p-5 rounded-3xl border border-border/80 bg-white flex flex-col justify-between shadow-xs ${className}`}>
      <div>
        <h3 className="font-heading text-base font-bold text-text-primary mb-3">
          Track Bulk Order
        </h3>

        {/* Item & Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2 text-text-primary font-bold text-sm">
            <span className="p-1.5 rounded-xl bg-neutral-100 text-text-secondary">
              <Package className="w-5 h-5" />
            </span>
            <span>{itemCount}</span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            {statusBadge}
          </span>
        </div>

        {/* 4-Step Progress Line Tracker */}
        <div className="relative mb-6 px-1">
          {/* Connecting Line Background */}
          <div className="absolute top-2 left-3 right-3 h-1 bg-neutral-200 -z-0" />
          {/* Active Line Fill (up to Step 2 = 33% progress) */}
          <div
            className="absolute top-2 left-3 h-1 bg-emerald-600 transition-all duration-300 -z-0"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {/* Stepper Dots & Labels */}
          <div className="flex items-start justify-between relative z-10">
            {steps.map((s) => {
              const isPassed = s.num < currentStep;
              const isCurrent = s.num === currentStep;

              return (
                <div key={s.num} className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full transition-all ${
                      isPassed || isCurrent
                        ? 'bg-emerald-600 ring-4 ring-emerald-100'
                        : 'bg-neutral-300'
                    }`}
                  />
                  <span
                    className={`text-[10px] mt-2 text-center whitespace-nowrap leading-tight ${
                      isCurrent
                        ? 'font-bold text-text-primary'
                        : isPassed
                        ? 'font-medium text-emerald-800'
                        : 'text-text-muted'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Track Order Action Button */}
      <button
        type="button"
        onClick={onTrackOrder}
        className="w-full py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center"
      >
        Track Order
      </button>
    </div>
  );
}

export default TrackBulkOrderCard;
