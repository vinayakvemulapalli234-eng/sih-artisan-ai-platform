import React, { useState } from 'react';
import { User, MapPin, Bell, Shield } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Card } from '../../components/primitives/Card';
import { Avatar } from '../../components/primitives/Avatar';
import { FormField } from '../../components/primitives/FormField';
import { Input } from '../../components/primitives/Input';
import { Tag } from '../../components/primitives/Tag';
import { Toggle } from '../../components/primitives/Toggle';
import { Button } from '../../components/primitives/Button';
import { useToast } from '../../hooks/useToast';

import { useAuth } from '../../hooks/useAuth';

/**
 * Customer: CustomerProfilePage
 * Preferences, craft affinities, and shipping address
 */
export function CustomerProfilePage() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || 'Customer');
  const [email, setEmail] = useState(user?.email || 'customer@kalakriti.in');
  const [phone, setPhone] = useState(user?.phone || '+91 98450 12345');
  const [interests, setInterests] = useState(user?.interests || ['Kalamkari', 'Dhokra Metal', 'Pashmina']);
  const [notifyCraftStories, setNotifyCraftStories] = useState(true);
  const [notifyNewArrivals, setNotifyNewArrivals] = useState(false);

  const availableCrafts = [
    'Kalamkari',
    'Blue Pottery',
    'Pashmina',
    'Dhokra Metal',
    'Bidriware',
    'Madhubani',
    'Channapatna Woodcraft',
  ];

  const toggleInterest = (craft) => {
    setInterests((prev) =>
      prev.includes(craft) ? prev.filter((c) => c !== craft) : [...prev, craft]
    );
  };

  const handleSave = () => {
    if (updateProfile) {
      updateProfile({
        name,
        email,
        phone,
        interests,
      });
    }

    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your craft preferences and contact information have been saved.',
    });
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Buyer Profile & Craft Affinities"
        subtitle="Manage your personal details and tailor your Living Craft Graph discovery experience."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Card */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card variant="flat" padding="lg">
            <Card.Header
              title="Personal Information"
              subtitle="Used for order communications and artisan certificates"
            />

            <div className="flex items-center gap-4 py-4 border-b border-border/60">
              <Avatar name={name} size="lg" />
              <div>
                <h3 className="font-heading text-lg font-bold text-text-primary">{name}</h3>
                <p className="text-xs text-text-secondary">Heritage Collector Member</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <FormField label="Full Name" htmlFor="cust-name">
                <Input
                  id="cust-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormField>

              <FormField label="Email Address" htmlFor="cust-email">
                <Input
                  id="cust-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormField>

              <FormField label="Mobile Number" htmlFor="cust-phone">
                <Input
                  id="cust-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormField>
            </div>
          </Card>

          {/* Living Craft Graph Preferences */}
          <Card variant="flat" padding="lg">
            <Card.Header
              title="Craft Interests & Preferences"
              subtitle="Powers your personalized recommendations in the Living Craft Graph"
            />

            <div className="flex flex-col gap-3 pt-4">
              <span className="text-xs font-semibold text-text-secondary uppercase">
                Tap to toggle preferred crafts:
              </span>
              <div className="flex flex-wrap gap-2">
                {availableCrafts.map((craft) => {
                  const isSelected = interests.includes(craft);
                  return (
                    <Tag
                      key={craft}
                      variant={isSelected ? 'craft' : 'default'}
                      active={isSelected}
                      onClick={() => toggleInterest(craft)}
                    >
                      {craft}
                    </Tag>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card variant="flat" padding="lg">
            <Card.Header
              title="Notifications"
              subtitle="Select what artisan updates you wish to receive"
            />

            <div className="flex flex-col gap-4 pt-4">
              <Toggle
                label="Cultural Story Letters"
                description="Receive weekly stories about forgotten Indian crafts and master artisan profiles."
                checked={notifyCraftStories}
                onChange={setNotifyCraftStories}
              />
              <Toggle
                label="Limited Batch Releases"
                description="Get notified when rare seasonal batches are produced."
                checked={notifyNewArrivals}
                onChange={setNotifyNewArrivals}
              />
            </div>
          </Card>

          <div className="flex justify-end">
            <Button variant="primary" size="md" onClick={handleSave}>
              Save Profile Changes
            </Button>
          </div>
        </div>

        {/* Shipping Address Sidebar */}
        <div className="lg:col-span-1">
          <Card variant="flat" padding="md" className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-heading text-base font-bold text-text-primary flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                Default Address
              </h3>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>

            <div className="text-xs text-text-secondary leading-relaxed">
              <p className="font-semibold text-text-primary">Aarav Sharma</p>
              <p>#402, Heritage Residency, 12th Main</p>
              <p>Indiranagar, Bengaluru</p>
              <p>Karnataka - 560038</p>
              <p className="mt-1">Phone: +91 98450 12345</p>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
