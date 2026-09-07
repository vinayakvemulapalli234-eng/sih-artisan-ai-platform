import React, { useState } from 'react';
import { X, Calendar, Check, Send } from 'lucide-react';
import { Button } from '../design-system';
import { mockCustomRequestService } from '../../services/mockCustomRequestService';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

const COLOR_SWATCHES = [
  { id: 'earth', name: 'Natural Earth', hex: '#8B5A2B' },
  { id: 'indigo', name: 'Indigo Blue', hex: '#3E8EDE' },
  { id: 'terracotta', name: 'Terracotta Red', hex: '#E8577E' },
  { id: 'ochre', name: 'Golden Ochre', hex: '#E8A93A' },
  { id: 'emerald', name: 'Forest Green', hex: '#1FA97D' },
];

/**
 * Screen 14: Custom Order Request Modal (Locked Spec)
 *
 * Header: "Request Customization" title with "×" close button.
 * Top: Product thumbnail + name + price.
 * Form:
 *  - Quantity stepper (−/+ buttons around numeric value, default 20).
 *  - Color swatch picker (circular swatches with active ring).
 *  - "Deadline" field with calendar icon ("15 days").
 *  - "Additional message (optional)" textarea with placeholder "Can you make it in blue and add our logo?".
 * Button: "Send Request" (primary green #1FA97D, full width).
 */
export function RequestCustomizationModal({ isOpen, onClose, product }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [quantity, setQuantity] = useState(20);
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[1]); // Indigo Blue
  const [deadline, setDeadline] = useState('15 days');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await mockCustomRequestService.createCustomRequest({
        productTitle: product.title || product.name || 'Handmade Craft Item',
        artisanId: product.artisanId || 'artisan-1',
        customerName: user?.name || 'Customer / Buyer',
        customerEmail: user?.email || 'buyer@example.com',
        quantity,
        colorOption: selectedColor.name,
        deadline,
        notes: message.trim() || 'Can you make it in blue and add our logo?',
        estimatedTotal: (product.price || 650) * quantity,
      });

      addToast({
        type: 'success',
        title: 'Custom Request Sent! 🎨',
        message: 'Your customization request has been sent to the artisan.',
      });

      onClose();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Submission Failed',
        message: 'Could not send customization request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#ECECEC] flex flex-col max-h-[92vh]">
        {/* Header: "Request Customization" title with "×" close button */}
        <div className="p-4 flex items-center justify-between border-b border-[#ECECEC]">
          <h2 className="text-lg font-bold text-[#1B1B1B]">
            Request Customization
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 text-[#6B6B6B] hover:text-[#1B1B1B] flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          {/* Top: Product thumbnail + name + price */}
          <div className="flex items-center gap-3 p-3 bg-[#F4F4F4] rounded-2xl border border-[#ECECEC]">
            <img
              src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=150&q=80'}
              alt={product.title || product.name}
              className="w-14 h-14 rounded-xl object-cover border border-[#ECECEC] shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-sm text-[#1B1B1B] truncate">
                {product.title || product.name}
              </h3>
              <p className="text-xs font-bold text-[#1FA97D] mt-0.5">
                ₹{product.price || 650}
              </p>
            </div>
          </div>

          {/* Quantity Stepper (default 20) */}
          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase tracking-wider mb-1.5">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-11 rounded-xl bg-white border border-[#ECECEC] hover:bg-neutral-50 font-bold text-xl flex items-center justify-center active:scale-95 text-[#1B1B1B]"
              >
                −
              </button>
              <span className="text-lg font-extrabold text-[#1B1B1B] w-14 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-11 h-11 rounded-xl bg-white border border-[#ECECEC] hover:bg-neutral-50 font-bold text-xl flex items-center justify-center active:scale-95 text-[#1B1B1B]"
              >
                +
              </button>
              <span className="text-xs text-[#6B6B6B] ml-2 font-medium">
                Est: ₹{((product.price || 650) * quantity).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Color Swatch Picker (circular swatches with active ring) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">
                Color & Finish
              </label>
              <span className="text-xs font-semibold text-[#1FA97D]">
                {selectedColor.name}
              </span>
            </div>

            <div className="flex items-center gap-3 py-1">
              {COLOR_SWATCHES.map((swatch) => {
                const isSelected = selectedColor.id === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => setSelectedColor(swatch)}
                    title={swatch.name}
                    className={`relative w-10 h-10 rounded-full transition-transform active:scale-95 flex items-center justify-center ${
                      isSelected
                        ? 'ring-3 ring-[#1FA97D] ring-offset-2 scale-105'
                        : 'border border-black/10 hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  >
                    {isSelected && (
                      <Check className="w-4 h-4 text-white stroke-[3] drop-shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deadline Field with Calendar Icon */}
          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase tracking-wider mb-1.5">
              Deadline
            </label>
            <div className="relative">
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="15 days"
                className="w-full pl-3.5 pr-10 py-3 rounded-xl border border-[#ECECEC] text-sm font-semibold text-[#1B1B1B] focus:outline-none focus:border-[#1FA97D]"
              />
              <Calendar className="w-4 h-4 text-[#6B6B6B] absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Additional Message (optional) Textarea */}
          <div>
            <label className="block text-xs font-bold text-[#1B1B1B] uppercase tracking-wider mb-1.5">
              Additional message (optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Can you make it in blue and add our logo?"
              className="w-full p-3 rounded-xl border border-[#ECECEC] text-sm text-[#1B1B1B] placeholder-[#A6A6A6] focus:outline-none focus:border-[#1FA97D] resize-none"
            />
          </div>

          {/* Submit Button: "Send Request" (primary green #1FA97D, full width) */}
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <span>Sending…</span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Send className="w-4 h-4" />
                  <span>Send Request</span>
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestCustomizationModal;
