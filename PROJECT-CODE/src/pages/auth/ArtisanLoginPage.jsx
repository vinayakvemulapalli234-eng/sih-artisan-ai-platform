import React, { useState } from 'react';
import { LogIn, AlertCircle, Sparkles } from 'lucide-react';
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
 * ArtisanLoginPage Component
 * Studio sign-in experience for traditional artisans
 */
export function ArtisanLoginPage({
  onNavigate,
  onLoginSuccess,
}) {
  const { login, demoAccounts, isLoading } = useAuth();
  const { addToast } = useToast();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const demoArtisan = demoAccounts[ROLES.ARTISAN];

  const handleFillDemo = () => {
    setIdentifier(demoArtisan.email);
    setPassword('password123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier) {
      setError('Please provide your registered artisan email or phone number.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const user = await login({
        identifier,
        password,
        role: ROLES.ARTISAN,
      });

      addToast({
        type: 'success',
        title: 'Namaste Master Artisan!',
        message: `Signed in as ${user.name}. Entering Studio Dashboard.`,
      });

      if (onLoginSuccess) {
        onLoginSuccess(user);
      } else {
        onNavigate?.('overview');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please verify your artisan credentials.');
    }
  };

  return (
    <AuthLayout
      title="Artisan Studio Sign In"
      subtitle="Manage your craft catalog, receive direct buyer orders, and update your Living Craft Graph techniques."
      role="artisan"
      badgeText="Master Craftsman Portal"
      badgeVariant="secondary"
      onBack={() => onNavigate?.('home')}
      demoCredentials={{ label: 'Master Artisan' }}
      onFillDemo={handleFillDemo}
    >
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
          label="Registered Email or Mobile Number"
          htmlFor="artisan-id"
          required
          helperText="Use the email or 10-digit mobile registered with your craft studio"
        >
          <Input
            id="artisan-id"
            placeholder="e.g. govindappa.v@kalakriti.in or 9440123456"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (error) setError('');
            }}
            required
          />
        </FormField>

        <FormField label="Studio Password" htmlFor="artisan-pwd" required>
          <PasswordInput
            id="artisan-pwd"
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

        <div className="flex items-center justify-between text-xs pt-1">
          <Checkbox
            id="artisan-remember"
            label="Keep me signed in on this studio device"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <button
            type="button"
            onClick={() => onNavigate?.('forgot-password')}
            className="text-xs font-semibold text-secondary hover:underline focus-ring rounded-xs"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
          leftIcon={<LogIn className="w-4 h-4" />}
        >
          Sign In to Studio Dashboard
        </Button>

        <div className="pt-4 border-t border-border text-center text-xs text-text-secondary">
          New artisan studio?{' '}
          <button
            type="button"
            onClick={() => onNavigate?.('artisan-register')}
            className="font-semibold text-primary hover:underline focus-ring rounded-xs"
          >
            Register as a Traditional Artisan
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
