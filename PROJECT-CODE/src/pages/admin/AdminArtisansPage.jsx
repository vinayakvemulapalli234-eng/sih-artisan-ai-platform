import React, { useState } from 'react';
import { ShieldCheck, MapPin, Star } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Table } from '../../components/primitives/Table';
import { Badge } from '../../components/primitives/Badge';
import { Button } from '../../components/primitives/Button';
import { Avatar } from '../../components/primitives/Avatar';
import { mockArtisans } from '../../lib/mockData';
import { useToast } from '../../hooks/useToast';

/**
 * Admin Dashboard: AdminArtisansPage
 * Verification, credentials audit, and master artisan registry
 */
export function AdminArtisansPage() {
  const [artisans, setArtisans] = useState(mockArtisans);
  const { addToast } = useToast();

  const handleToggleVerify = (art) => {
    // TODO: integrate with backend
    setArtisans((prev) =>
      prev.map((a) => (a.id === art.id ? { ...a, verified: !a.verified } : a))
    );
    addToast({
      type: art.verified ? 'warning' : 'success',
      title: 'Verification Status Changed',
      message: `${art.name} is now ${art.verified ? 'Unverified' : 'GI Verified'}.`,
    });
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Master Artisan Registry"
        subtitle="Ensure adherence to traditional craft authenticity standards and GI certification."
      />

      <Table>
        <Table.Header>
          <Table.Row hover={false}>
            <Table.Head>Artisan</Table.Head>
            <Table.Head>Craft Specialty</Table.Head>
            <Table.Head>Region</Table.Head>
            <Table.Head>Catalog Items</Table.Head>
            <Table.Head>Rating</Table.Head>
            <Table.Head>Verification</Table.Head>
            <Table.Head className="text-right">Action</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {artisans.map((art) => (
            <Table.Row key={art.id}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={art.avatar}
                    name={art.name}
                    size="sm"
                    verified={art.verified}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-text-primary text-sm">
                      {art.name}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {art.experienceYears} yrs experience
                    </span>
                  </div>
                </div>
              </Table.Cell>

              <Table.Cell className="font-medium text-secondary text-xs">
                {art.specialty}
              </Table.Cell>

              <Table.Cell className="text-xs text-text-secondary">
                {art.region}
              </Table.Cell>

              <Table.Cell className="text-xs font-bold text-text-primary">
                {art.productsCount || 12} items
              </Table.Cell>

              <Table.Cell>
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-warning stroke-warning" />
                  <span>{art.rating}</span>
                </div>
              </Table.Cell>

              <Table.Cell>
                <Badge
                  variant={art.verified ? 'success' : 'warning'}
                  size="sm"
                  dot
                >
                  {art.verified ? 'GI Verified' : 'Pending'}
                </Badge>
              </Table.Cell>

              <Table.Cell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleVerify(art)}
                >
                  {art.verified ? 'Revoke Tag' : 'Verify'}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </PageContainer>
  );
}
