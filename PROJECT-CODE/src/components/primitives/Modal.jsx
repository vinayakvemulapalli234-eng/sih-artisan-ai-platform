import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

/**
 * Modal Primitive
 * Accessible dialog component with focus management and backdrop
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'max-w-lg',
  className = '',
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-text-primary/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${maxWidth} bg-surface rounded-lg shadow-lg border border-border flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-150 ${className}`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <div>
            {title && (
              <h2 id="modal-title" className="font-heading text-xl font-bold text-text-primary">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs text-text-secondary mt-1">{description}</p>
            )}
          </div>
          <IconButton
            icon={<X className="w-5 h-5" />}
            aria-label="Close modal"
            onClick={onClose}
            size="sm"
          />
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">{children}</div>

        {/* Modal Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-border bg-neutral-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
