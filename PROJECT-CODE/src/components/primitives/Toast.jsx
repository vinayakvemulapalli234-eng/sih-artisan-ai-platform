import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

/**
 * Toast Component & Container Primitive
 */
export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="assertive"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-4"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const { type = 'info', title, message } = toast;

  const typeConfig = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-success shrink-0" />,
      border: 'border-success/30 bg-surface',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-error shrink-0" />,
      border: 'border-error/30 bg-surface',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-warning shrink-0" />,
      border: 'border-warning/30 bg-surface',
    },
    info: {
      icon: <Info className="w-5 h-5 text-info shrink-0" />,
      border: 'border-info/30 bg-surface',
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-md animate-in slide-in-from-bottom-2 duration-200 ${config.border}`}
    >
      {config.icon}
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold text-text-primary">{title}</p>}
        {message && <p className="text-xs text-text-secondary mt-0.5">{message}</p>}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="text-neutral-400 hover:text-text-primary p-0.5 rounded-sm focus-ring"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
