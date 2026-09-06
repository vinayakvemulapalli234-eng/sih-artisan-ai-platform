import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';
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
 * CustomerRegisterPage Component
 * New customer account creation with validation and artisan support consent
 */
export function CustomerRegisterPage({
  onNavigate,
  onRegisterSuccess,
}) {
  const { register, isLoading } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (phone && !/^[0-9+\s-]{10,15}$/.test(phone)) {
      setError('Please provide a valid 10-digit phone number.');
      return;
    }
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the terms of service and artisan fair policy.');
      return;
    }

    try {
      const newUser = await register({
        name,
        email,
        phone,
        password,
        role: ROLES.CUSTOMER,
      });

      addToast({
        type: 'success',
        title: 'Account Created',
        message: `Welcome to KalaKriti, ${name}! Your account has been created.`,
      });

      if (onRegisterSuccess) {
        onRegisterSuccess(newUser);
      } else {
        onNavigate?.('home');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Create Buyer Account"
      subtitle="Join India’s traditional craft discovery platform. Experience verified provenance and fair artisan support."
      role="customer"
      badgeText="New Buyer Registration"
      badgeVariant="primary"
      onBack={() => onNavigate?.('login')}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {error && (
          <div
            role="alert"
            className="p-3 rounded-md bg-error/10 border border-error/25 text-xs text-error flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <FormField label="Full Name" htmlFor="reg-name" required>
          <Input
            id="reg-name"
            placeholder="Aarav Sharma"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            autoComplete="name"
            required
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Email Address" htmlFor="reg-email" required>
            <Input
              id="reg-email"
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

          <FormField label="Mobile Number" htmlFor="reg-phone">
            <Input
              id="reg-phone"
              type="tel"
              placeholder="+91 98450 12345"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError('');
              }}
              autoComplete="tel"
            />
          </FormField>
        </div>

        <FormField label="Password (min 8 chars)" htmlFor="reg-password" required>
          <PasswordInput
            id="reg-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            showStrength={true}
            placeholder="Create a strong password"
            autoComplete="new-password"
            required
          />
        </FormField>

        <FormField label="Confirm Password" htmlFor="reg-confirm-password" required>
          <PasswordInput
            id="reg-confirm-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (error) setError('');
            }}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            required
          />
        </FormField>

        {/* Terms Agreement */}
        <div className="pt-1">
          <Checkbox
            id="agree-terms"
            label="I agree to the Terms of Service & Artisan Welfare Policy"
            description="Supports 100% genuine GI craft verification and direct artisan fair compensation."
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Create Customer Account
        </Button>

        {/* Link back to login */}
        <div className="pt-3 border-t border-border text-center text-xs text-text-secondary">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate?.('login')}
            className="font-semibold text-primary hover:underline focus-ring rounded-xs"
          >
            Sign In here
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
