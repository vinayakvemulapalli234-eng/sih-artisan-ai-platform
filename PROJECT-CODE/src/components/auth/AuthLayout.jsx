import React from 'react';
import { Sparkles, ArrowLeft, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';
import { Image } from '../primitives/Image';

/**
 * AuthLayout Component
 * Reusable split/centered authentication layout following the design system tokens
 */
export function AuthLayout({
  title,
  subtitle,
  badgeText = 'Authentic Handcraft Platform',
  badgeVariant = 'primary',
  children,
  role = 'customer',
  onBack,
  demoCredentials,
  onFillDemo,
  className = '',
}) {
  const roleConfig = {
    customer: {
      image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=1200',
      headline: 'Discover India’s living craft heritage directly from ancestral hands.',
      artisanQuote: '“When you buy handcrafted, you carry home a piece of our prayers, soil, and living memory.”',
      quoteAuthor: 'Govindappa V. • Kalamkari Master Artisan',
    },
    artisan: {
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
      headline: 'Empower your studio. Showcase your craft traditions to the world.',
      artisanQuote: '“The Living Craft Graph preserves our techniques so that future generations know our names.”',
      quoteAuthor: 'Rashida Begum • Pashmina Weavers Cooperative',
    },
    admin: {
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200',
      headline: 'Platform Governance & Living Craft Graph Administration.',
      artisanQuote: '“Guarding GI authenticity, ensuring fair compensation, and cataloging India’s sacred crafts.”',
      quoteAuthor: 'National Craft Council Oversight',
    },
  };

  const currentConfig = roleConfig[role] || roleConfig.customer;

  return (
    <div className={`min-h-screen w-full bg-background flex flex-col lg:flex-row ${className}`}>
      {/* Brand Hero Visual Column (Desktop >= 1024px) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-neutral-900 flex-col justify-between p-12 text-surface select-none">
        {/* Background Image with Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentConfig.image}
            alt="Traditional Indian Craftsmanship"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary via-text-primary/70 to-transparent" />
        </div>

        {/* Top Branding */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-surface shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight leading-tight">
                KalaKriti
              </span>
              <span className="text-[10px] tracking-wider uppercase text-neutral-300 font-semibold">
                Living Craft Heritage
              </span>
            </div>
          </div>

          <Badge variant="outline" size="sm" className="text-surface border-surface/30">
            SIH Artisan Initiative
          </Badge>
        </div>

        {/* Bottom Narrative & Quote */}
        <div className="relative z-10 flex flex-col gap-6 max-w-lg">
          <h2 className="font-heading text-3xl font-bold leading-tight">
            {currentConfig.headline}
          </h2>

          <div className="p-4 rounded-lg bg-surface/10 backdrop-blur-xs border border-surface/15">
            <p className="text-sm italic font-serif leading-relaxed text-neutral-200">
              {currentConfig.artisanQuote}
            </p>
            <p className="text-xs font-semibold text-secondary mt-2">
              — {currentConfig.quoteAuthor}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-300 pt-2 border-t border-surface/20">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              100% GI Verification
            </span>
            <span className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-primary" />
              Fair Direct Payouts
            </span>
          </div>
        </div>
      </div>

      {/* Form Interaction Column */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-y-auto">
        {/* Mobile Header / Back Navigation */}
        <div className="flex items-center justify-between mb-6">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors focus-ring rounded-xs py-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portal</span>
            </button>
          ) : (
            <div />
          )}

          {/* 1-Click Demo Credentials Auto-Fill Button */}
          {demoCredentials && onFillDemo && (
            <button
              type="button"
              onClick={onFillDemo}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/25 px-2.5 py-1 rounded-pill transition-colors focus-ring"
              title={`Auto-fill demo credentials for ${demoCredentials.label || 'testing'}`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Auto-Fill Demo Account</span>
            </button>
          )}
        </div>

        {/* Form Card Container */}
        <div className="max-w-md w-full mx-auto my-auto flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            {badgeText && (
              <div className="w-fit mx-auto sm:mx-0">
                <Badge variant={badgeVariant} size="sm">
                  {badgeText}
                </Badge>
              </div>
            )}
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <Card variant="flat" padding="md" className="bg-surface shadow-xs">
            {children}
          </Card>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-text-secondary">
          <p>
            Protected by KalaKriti Artisan Authentication • Smart India Hackathon 2026
          </p>
        </div>
      </div>
    </div>
  );
}
