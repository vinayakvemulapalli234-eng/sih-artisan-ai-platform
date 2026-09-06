import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { FormField } from '../../components/primitives/FormField';
import { Input } from '../../components/primitives/Input';
import { Button } from '../../components/primitives/Button';
import { useAuth } from '../../hooks/useAuth';

/**
 * ForgotPasswordPage Component
 * Request password recovery instructions via registered email
 */
export function ForgotPasswordPage({ onNavigate, role = 'customer' }) {
  const { forgotPassword, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid registered email address.');
      return;
    }

    try {
      await forgotPassword(email);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Unable to process password reset request.');
    }
  };

  const loginRoute = role === 'artisan' ? 'artisan-login' : 'login';

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter the email address associated with your account and we will send you instructions to reset your password."
      role={role}
      badgeText="Password Recovery"
      badgeVariant="default"
      onBack={() => onNavigate?.(loginRoute)}
    >
      {isSuccess ? (
        <div className="flex flex-col items-center text-center gap-4 py-4 animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 stroke-[2]" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-xl font-bold text-text-primary">
              Instructions Sent!
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm">
              We have dispatched password recovery instructions to{' '}
              <strong className="text-text-primary">{email}</strong>. Please check your inbox and spam folder.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => onNavigate?.(loginRoute)}
            >
              Return to Sign In
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => onNavigate?.('reset-password')}
            >
              Enter New Password
            </Button>
          </div>
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

          <FormField
            label="Registered Email Address"
            htmlFor="forgot-email"
            required
            helperText="We will send a secure password reset link to this address"
          >
            <Input
              id="forgot-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              leftIcon={<Mail className="w-4 h-4 text-neutral-400" />}
              autoComplete="email"
              required
            />
          </FormField>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Send Reset Link
          </Button>

          <div className="pt-4 border-t border-border text-center text-xs text-text-secondary">
            Remembered your password?{' '}
            <button
              type="button"
              onClick={() => onNavigate?.(loginRoute)}
              className="font-semibold text-primary hover:underline focus-ring rounded-xs"
            >
              Return to Sign In
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
