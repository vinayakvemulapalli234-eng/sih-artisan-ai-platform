import React, { useState } from 'react';
import { LogIn, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { FormField } from '../../components/primitives/FormField';
import { Input } from '../../components/primitives/Input';
import { Checkbox } from '../../components/primitives/Checkbox';
import { Button } from '../../components/primitives/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { ROLES } from '../../lib/constants';

/**
 * CustomerLoginPage Component
 * Accessible customer login experience with demo fill and validation
 */
export function CustomerLoginPage({
  onNavigate,
  onLoginSuccess,
}) {
  const { login, demoAccounts, isLoading } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const demoCustomer = demoAccounts[ROLES.CUSTOMER];

  const handleFillDemo = () => {
    setEmail(demoCustomer.email);
    setPassword('password123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const user = await login({
        identifier: email,
        password,
        role: ROLES.CUSTOMER,
      });

      addToast({
        type: 'success',
        title: 'Welcome Back!',
        message: `Signed in as ${user.name}.`,
      });

      if (onLoginSuccess) {
        onLoginSuccess(user);
      } else {
        onNavigate?.('home');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please verify your credentials.');
    }
  };

  return (
    <AuthLayout
      title="Customer Sign In"
      subtitle="Access your craft favorites, order status, and personalized Living Craft Graph recommendations."
      role="customer"
      badgeText="Customer Portal"
      badgeVariant="primary"
      onBack={() => onNavigate?.('home')}
      demoCredentials={{ label: 'Customer' }}
      onFillDemo={handleFillDemo}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Error Alert Message */}
        {error && (
          <div
            role="alert"
            className="p-3 rounded-md bg-error/10 border border-error/25 text-xs text-error flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <FormField label="Email Address" htmlFor="cust-email" required>
          <Input
            id="cust-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            autoComplete="email"
            required
          />
        </FormField>

        <FormField label="Password" htmlFor="cust-password" required>
          <PasswordInput
            id="cust-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </FormField>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <Checkbox
            id="remember-me"
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <button
            type="button"
            onClick={() => onNavigate?.('forgot-password')}
            className="text-xs font-semibold text-primary hover:underline focus-ring rounded-xs"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
          leftIcon={<LogIn className="w-4 h-4" />}
        >
          Sign In as Buyer
        </Button>

        {/* Registration Link */}
        <div className="pt-4 border-t border-border text-center text-xs text-text-secondary">
          Don’t have an account yet?{' '}
          <button
            type="button"
            onClick={() => onNavigate?.('register')}
            className="font-semibold text-primary hover:underline focus-ring rounded-xs"
          >
            Create Customer Account
          </button>
        </div>

        {/* Artisan Login Shortcut */}
        <div className="text-center text-[11px] text-text-secondary">
          Are you a traditional artisan?{' '}
          <button
            type="button"
            onClick={() => onNavigate?.('artisan-login')}
            className="font-medium text-secondary hover:underline"
          >
            Artisan Studio Sign In →
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
