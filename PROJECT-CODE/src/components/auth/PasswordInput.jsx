import React, { useState } from 'react';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { Input } from '../primitives/Input';

/**
 * PasswordInput Component
 * Reusable password input with show/hide toggle and optional strength indicator
 */
export const PasswordInput = React.forwardRef(function PasswordInput(
  {
    value = '',
    onChange,
    showStrength = false,
    placeholder = '••••••••',
    error = false,
    disabled = false,
    id,
    name = 'password',
    className = '',
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  // Password strength calculation
  const calculateStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strengthScore = showStrength ? calculateStrength(value) : 0;
  const strengthLabels = ['Too weak', 'Weak', 'Good', 'Strong'];
  const strengthColors = ['bg-error', 'bg-warning', 'bg-info', 'bg-success'];

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Input
        ref={ref}
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        className={className}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="text-text-secondary hover:text-text-primary p-1 focus-ring rounded-xs"
            tabIndex={0}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        }
        {...props}
      />

      {/* Password Strength Indicator */}
      {showStrength && value && (
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  step <= strengthScore
                    ? strengthColors[strengthScore - 1] || 'bg-error'
                    : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-text-secondary font-medium">
            Strength: {strengthLabels[strengthScore - 1] || 'Too weak'}
          </span>
        </div>
      )}
    </div>
  );
});
