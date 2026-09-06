import React, { useState } from 'react';
import { KeyRound, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { FormField } from '../../components/primitives/FormField';
import { Button } from '../../components/primitives/Button';
import { useAuth } from '../../hooks/useAuth';

/**
 * ResetPasswordPage Component
 * Set a new secure password with live requirements checklist
 */
export function ResetPasswordPage({ onNavigate, role = 'customer' }) {
  const { resetPassword, isLoading } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Password requirements check
  const hasMinLength = newPassword.length >= 8;
  const hasUpperLower = /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const isMatch = newPassword && newPassword === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!hasMinLength) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!hasUpperLower || !hasNumber) {
      setError('Password must include both uppercase/lowercase letters and at least one number.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await resetPassword({ newPassword, confirmPassword });
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
    }
  };

  const loginRoute = role === 'artisan' ? 'artisan-login' : 'login';

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Your new password must meet the security requirements below to protect your craft account."
      role={role}
      badgeText="Security Verification"
      badgeVariant="primary"
      onBack={() => onNavigate?.(loginRoute)}
    >
      {isSuccess ? (
        <div className="flex flex-col items-center text-center gap-4 py-4 animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 stroke-[2]" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-xl font-bold text-text-primary">
              Password Changed!
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm">
              Your password has been successfully updated. You can now sign in with your new credentials.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full mt-2"
            onClick={() => onNavigate?.(loginRoute)}
          >
            Sign In with New Password
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div
              role="alert"
              className="p-3 rounded-md bg-error/10 border border-error/25 text-xs text-error flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <FormField label="New Password" htmlFor="reset-new-pwd" required>
            <PasswordInput
              id="reset-new-pwd"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (error) setError('');
              }}
              showStrength={true}
              placeholder="Enter new password"
              autoComplete="new-password"
              required
            />
          </FormField>

          <FormField label="Confirm New Password" htmlFor="reset-confirm-pwd" required>
            <PasswordInput
              id="reset-confirm-pwd"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Re-enter new password"
              autoComplete="new-password"
              required
            />
          </FormField>

          {/* Requirements Checklist */}
          <div className="p-3 bg-neutral-50 rounded-md border border-border/80 text-xs flex flex-col gap-1.5">
            <span className="font-semibold text-text-primary">Password Requirements:</span>
            <div className="flex items-center gap-1.5">
              <Check className={`w-3.5 h-3.5 ${hasMinLength ? 'text-success' : 'text-neutral-300'}`} />
              <span className={hasMinLength ? 'text-text-primary font-medium' : 'text-text-secondary'}>
                At least 8 characters
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className={`w-3.5 h-3.5 ${hasUpperLower ? 'text-success' : 'text-neutral-300'}`} />
              <span className={hasUpperLower ? 'text-text-primary font-medium' : 'text-text-secondary'}>
                Both uppercase and lowercase letters
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className={`w-3.5 h-3.5 ${hasNumber ? 'text-success' : 'text-neutral-300'}`} />
              <span className={hasNumber ? 'text-text-primary font-medium' : 'text-text-secondary'}>
                At least one numerical digit (0–9)
              </span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-1"
            isLoading={isLoading}
          >
            Update Password
          </Button>

          <div className="pt-3 border-t border-border text-center text-xs text-text-secondary">
            <button
              type="button"
              onClick={() => onNavigate?.(loginRoute)}
              className="font-semibold text-primary hover:underline focus-ring rounded-xs"
            >
              Cancel and Return to Sign In
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
