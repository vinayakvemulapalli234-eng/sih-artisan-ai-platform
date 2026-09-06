import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

/**
 * Drawer Primitive
 * Off-canvas slide-out sheet (left, right, or bottom)
 */
export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'left',
  size = 'md',
  className = '',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
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

  const positionClasses = {
    left: 'left-0 top-0 bottom-0 animate-in slide-in-from-left duration-200',
    right: 'right-0 top-0 bottom-0 animate-in slide-in-from-right duration-200',
    bottom: 'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-lg animate-in slide-in-from-bottom duration-200',
  };

  const widthClasses = {
    sm: 'w-72',
    md: 'w-80 sm:w-96',
    lg: 'w-full sm:w-[480px]',
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-text-primary/40 backdrop-blur-xs flex"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        onClick={(e) => e.stopPropagation()}
        className={`fixed bg-surface shadow-lg border-border flex flex-col z-50 ${
          positionClasses[position]
        } ${position !== 'bottom' ? widthClasses[size] : ''} ${className}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {title ? (
            <h2 id="drawer-title" className="font-heading text-lg font-bold text-text-primary">
              {title}
            </h2>
          ) : (
            <div />
          )}
          <IconButton
            icon={<X className="w-5 h-5" />}
            aria-label="Close drawer"
            onClick={onClose}
            size="sm"
          />
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
