import React, { useState } from 'react';
import { UserPlus, AlertCircle, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { FormField } from '../../components/primitives/FormField';
import { Input } from '../../components/primitives/Input';
import { Select } from '../../components/primitives/Select';
import { Checkbox } from '../../components/primitives/Checkbox';
import { Button } from '../../components/primitives/Button';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { CRAFT_CATEGORIES, REGIONS, ROLES } from '../../lib/constants';

/**
 * ArtisanRegisterPage Component
 * Onboarding form for traditional master craftsmen and studios
 */
export function ArtisanRegisterPage({
  onNavigate,
  onRegisterSuccess,
}) {
  const { register, isLoading } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [studioName, setStudioName] = useState('');
  const [craft, setCraft] = useState(CRAFT_CATEGORIES[1] || 'Textiles & Weaving');
  const [region, setRegion] = useState(REGIONS[1] || 'Andhra Pradesh');
  const [experience, setExperience] = useState('20');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [giTagNumber, setGiTagNumber] = useState('');
  const [declareHeritage, setDeclareHeritage] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide the master artisan name.');
      return;
    }
    if (!studioName.trim()) {
      setError('Please provide your studio or workshop name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address for order notifications.');
      return;
    }
    if (!phone) {
      setError('Please enter your mobile contact number.');
      return;
    }
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!declareHeritage) {
      setError('Please confirm the traditional heritage declaration.');
      return;
    }

    try {
      const newArtisan = await register({
        name,
        studioName,
        specialty: craft,
        region,
        experienceYears: parseInt(experience, 10) || 10,
        email,
        phone,
        giTagNumber: giTagNumber || 'Pending Verification',
        password,
        role: ROLES.ARTISAN,
      });

      addToast({
        type: 'success',
        title: 'Studio Onboarded',
        message: `Welcome Master ${name}! Your studio has been registered on KalaKriti.`,
      });

      if (onRegisterSuccess) {
        onRegisterSuccess(newArtisan);
      } else {
        onNavigate?.('overview');
      }
    } catch (err) {
      setError(err.message || 'Artisan registration failed.');
    }
  };

  return (
    <AuthLayout
      title="Register Traditional Studio"
      subtitle="Join the national Living Craft Graph registry. Connect directly with buyers without intermediaries."
      role="artisan"
      badgeText="Artisan Verification Registry"
      badgeVariant="secondary"
      onBack={() => onNavigate?.('artisan-login')}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Master Artisan Name" htmlFor="art-name" required>
            <Input
              id="art-name"
              placeholder="e.g. Govindappa V."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </FormField>

          <FormField label="Studio / Workshop Name" htmlFor="art-studio" required>
            <Input
              id="art-studio"
              placeholder="e.g. Swarnamukhi Heritage Studio"
              value={studioName}
              onChange={(e) => {
                setStudioName(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Primary Craft Tradition" htmlFor="art-craft" required>
            <Select
              id="art-craft"
              value={craft}
              onChange={(e) => setCraft(e.target.value)}
              options={CRAFT_CATEGORIES.filter((c) => c !== 'All Crafts').map((c) => ({
                value: c,
                label: c,
              }))}
            />
          </FormField>

          <FormField label="Origin Region / State" htmlFor="art-region" required>
            <Select
              id="art-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              options={REGIONS.filter((r) => r !== 'All Regions').map((r) => ({
                value: r,
                label: r,
              }))}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <FormField label="Years of Practice" htmlFor="art-exp" required>
            <Input
              id="art-exp"
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </FormField>

          <div className="sm:col-span-2">
            <FormField
              label="GI Tag / Craft Certificate ID (Optional)"
              htmlFor="art-gi"
              helperText="Enables faster GI-verified badge issuance"
            >
              <Input
                id="art-gi"
                placeholder="e.g. GI-AP-KALAMKARI-0492"
                value={giTagNumber}
                onChange={(e) => setGiTagNumber(e.target.value)}
              />
            </FormField>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Contact Email" htmlFor="art-email" required>
            <Input
              id="art-email"
              type="email"
              placeholder="artisan@studio.in"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </FormField>

          <FormField label="Mobile Number" htmlFor="art-phone" required>
            <Input
              id="art-phone"
              type="tel"
              placeholder="+91 94401 23456"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Password (min 8 chars)" htmlFor="art-password" required>
            <PasswordInput
              id="art-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              showStrength={true}
              required
            />
          </FormField>

          <FormField label="Confirm Password" htmlFor="art-confirm-password" required>
            <PasswordInput
              id="art-confirm-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </FormField>
        </div>

        {/* Heritage Declaration */}
        <div className="pt-1">
          <Checkbox
            id="declare-heritage"
            label="Traditional Craft Authenticity Declaration"
            description="I confirm our products are made following authentic traditional methods with natural/indigenous materials without machine imitation."
            checked={declareHeritage}
            onChange={(e) => setDeclareHeritage(e.target.checked)}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Submit Artisan Registration
        </Button>

        <div className="pt-3 border-t border-border text-center text-xs text-text-secondary">
          Already registered your studio?{' '}
          <button
            type="button"
            onClick={() => onNavigate?.('artisan-login')}
            className="font-semibold text-secondary hover:underline focus-ring rounded-xs"
          >
            Sign In to Studio
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
