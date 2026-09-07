import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Section A.1 Button Component
 * - Primary: Solid green #1FA97D, white text
 * - Secondary: White with 1.5px border #ECECEC, dark text
 * - Text-link: No fill, colored text + small icon
 * - Radius: ~16px (rounded-2xl / pill)
 * - Min-height: 52px on mobile
 */
export const Button = React.forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    className = '',
    type = 'button',
    onClick,
    ...props
  },
  ref
) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold text-base transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-[#1FA97D] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const sizeStyles = {
    sm: 'min-h-[40px] px-4 py-2 text-sm rounded-xl gap-2',
    md: 'min-h-[52px] px-5 py-3.5 text-base rounded-2xl gap-2.5',
    lg: 'min-h-[56px] px-6 py-4 text-base rounded-2xl gap-3',
  };

  const variantStyles = {
    primary:
      'bg-[#1FA97D] text-white hover:bg-[#178964] shadow-sm',
    secondary:
      'bg-white text-[#1B1B1B] border-[1.5px] border-[#ECECEC] hover:bg-gray-50 hover:border-gray-300 shadow-xs',
    outline:
      'bg-transparent text-[#1FA97D] border-[1.5px] border-[#1FA97D] hover:bg-[#E8F7F1]',
    textLink:
      'bg-transparent text-[#1FA97D] hover:text-[#178964] min-h-0 p-0 font-medium text-sm underline-offset-4 hover:underline shadow-none',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variant !== 'textLink' ? sizeStyles[size] : 'gap-1.5'} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin shrink-0" aria-hidden="true" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
});

export default Button;
