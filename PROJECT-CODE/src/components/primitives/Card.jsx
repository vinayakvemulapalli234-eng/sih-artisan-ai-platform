import React from 'react';

/**
 * Card Primitive
 * Composable container with Header, Body, and Footer subcomponents
 */
export function Card({
  children,
  variant = 'flat',
  padding = 'md',
  className = '',
  onClick,
  ...props
}) {
  const variantStyles = {
    flat: 'bg-surface border border-border',
    elevated: 'bg-surface border border-border shadow-md',
    interactive:
      'bg-surface border border-border hover:border-neutral-400 hover:shadow-md transition-all duration-200 cursor-pointer',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const isClickable = Boolean(onClick);

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className={`rounded-lg overflow-hidden ${variantStyles[variant]} ${paddingStyles[padding]} ${
        isClickable ? 'focus-ring' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({
  title,
  subtitle,
  action,
  children,
  className = '',
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 pb-4 border-b border-border/60 ${className}`}
    >
      {children ? (
        children
      ) : (
        <div className="flex flex-col gap-1">
          {title && (
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-text-primary">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>
      )}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`py-4 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return (
    <div
      className={`pt-4 border-t border-border/60 flex items-center justify-between gap-3 ${className}`}
    >
      {children}
    </div>
  );
};
