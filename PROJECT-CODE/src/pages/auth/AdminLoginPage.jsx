import React, { useState } from 'react';
import { ShieldCheck, LogIn, AlertCircle, KeyRound, Lock } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { FormField } from '../../components/primitives/FormField';
import { Input } from '../../components/primitives/Input';
import { Button } from '../../components/primitives/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { ROLES } from '../../lib/constants';

/**
 * AdminLoginPage Component
 * Dedicated administrative access console for platform governance
 * NOTE: Admin registration is not publicly accessible.
 */
export function AdminLoginPage({
  onNavigate,
  onLoginSuccess,
}) {
  const { login, demoAccounts, isLoading } = useAuth();
  const { addToast } = useToast();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [error, setError] = useState('');

  const demoAdmin = demoAccounts[ROLES.ADMIN];

  const handleFillDemo = () => {
    setIdentifier(demoAdmin.email);
    setPassword('password123');
    setSecurityCode('SIH2026');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier) {
      setError('Please provide your administrative email or staff ID.');
      return;
    }
    if (!password) {
      setError('Please enter your administrative passphrase.');
      return;
    }

    try {
      const user = await login({
        identifier,
        password,
        role: ROLES.ADMIN,
        securityCode: securityCode || 'SIH2026',
      });

      addToast({
        type: 'success',
        title: 'Governance Console Unlocked',
        message: `Authenticated as ${user.name} (${user.staffId || 'Admin'}).`,
      });

      if (onLoginSuccess) {
        onLoginSuccess(user);
      } else {
        onNavigate?.('overview');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials and security token.');
    }
  };

  return (
    <AuthLayout
      title="Platform Governance Console"
      subtitle="Authorized personnel access for Living Craft Graph oversight, GI certification screening, and dispute management."
      role="admin"
      badgeText="Administrative Access Only"
      badgeVariant="accent"
      onBack={() => onNavigate?.('home')}
      demoCredentials={{ label: 'Admin Officer' }}
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

        <FormField label="Administrator Official Email / Staff ID" htmlFor="admin-id" required>
          <Input
            id="admin-id"
            placeholder="admin@kalakriti.in or GOV-IND-8940"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (error) setError('');
            }}
            autoComplete="username"
            required
          />
        </FormField>

        <FormField label="Master Passphrase" htmlFor="admin-pwd" required>
          <PasswordInput
            id="admin-pwd"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter administrative passphrase"
            autoComplete="current-password"
            required
          />
        </FormField>

        <FormField
          label="Administrative Security Key (2FA Token)"
          htmlFor="admin-token"
          helperText="For demo evaluation, use SIH2026 or click Auto-Fill Demo Account above"
        >
          <Input
            id="admin-token"
            placeholder="SIH2026"
            value={securityCode}
            onChange={(e) => {
              setSecurityCode(e.target.value);
              if (error) setError('');
            }}
            leftIcon={<KeyRound className="w-4 h-4 text-accent" />}
          />
        </FormField>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
          leftIcon={<Lock className="w-4 h-4" />}
        >
          Authenticate to Admin Console
        </Button>

        <div className="pt-4 border-t border-border text-center text-xs text-text-secondary">
          <p className="text-neutral-500 text-[11px] mb-2">
            Protected government & administrative boundary. Unauthorized access attempts are monitored and logged.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="font-semibold text-primary hover:underline focus-ring rounded-xs"
          >
            ← Return to KalaKriti Marketplace
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
