import React from 'react';
import { CheckCircle, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Grid } from '../../components/layout/Grid';
import { DashboardStatCard } from '../../components/domain/DashboardStatCard';
import { Table } from '../../components/primitives/Table';
import { Badge } from '../../components/primitives/Badge';
import { Button } from '../../components/primitives/Button';
import { formatCurrency } from '../../lib/formatters';
import { mockAdminStats } from '../../lib/mockData';

/**
 * Admin Dashboard: AdminOverviewPage
 * Platform-wide health, artisan onboarding verification queue, and metrics
 */
export function AdminOverviewPage({ onNavigate }) {
  const pendingArtisans = [
    {
      id: 'art-pending-1',
      name: 'Rameshwar Lal',
      craft: 'Tarkashi Brass Wire Inlay',
      region: 'Jaipur, Rajasthan',
      appliedDate: '2026-09-04',
      status: 'Pending Review',
    },
    {
      id: 'art-pending-2',
      name: 'Sitara Devi',
      craft: 'Sujani Kantha Embroidery',
      region: 'Muzaffarpur, Bihar',
      appliedDate: '2026-09-05',
      status: 'Documents Uploaded',
    },
  ];

  return (
    <PageContainer>
      <SectionHeader
        title="Admin Governance Console"
        subtitle="Platform supervision, Living Craft Graph verification, and artisan verification pipelines."
      />

      {/* 4 Stat Cards */}
      <Grid cols={4} gap={4} className="mb-8">
        <DashboardStatCard
          title="Active Artisans"
          value={mockAdminStats.activeArtisans}
          trend={mockAdminStats.artisansTrend}
          isPositive={true}
          iconName="Users"
          description="Verified master craftsmen"
        />
        <DashboardStatCard
          title="Catalog Craft Works"
          value={mockAdminStats.catalogProducts}
          trend={mockAdminStats.productsTrend}
          isPositive={true}
          iconName="Box"
          description="Connected into Living Graph"
        />
        <DashboardStatCard
          title="Monthly Platform GMV"
          value={formatCurrency(mockAdminStats.monthlyVolume)}
          trend={mockAdminStats.volumeTrend}
          isPositive={true}
          iconName="TrendingUp"
          description="Direct-to-artisan trade"
        />
        <DashboardStatCard
          title="Traditions Preserved"
          value={mockAdminStats.craftTraditionsPreserved}
          trend={mockAdminStats.traditionsTrend}
          isPositive={true}
          iconName="Award"
          description="Recognized GI craft categories"
        />
      </Grid>

      {/* Artisan Verification Queue */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-text-primary">
              Artisan Verification Queue
            </h2>
            <p className="text-xs text-text-secondary">
              Review GI tagging and heritage lineage credentials before granting verified status.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate?.('artisans')}
          >
            All artisans
          </Button>
        </div>

        <Table>
          <Table.Header>
            <Table.Row hover={false}>
              <Table.Head>Applicant</Table.Head>
              <Table.Head>Craft Specialty</Table.Head>
              <Table.Head>Region</Table.Head>
              <Table.Head>Submission Date</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head className="text-right">Review</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pendingArtisans.map((a) => (
              <Table.Row key={a.id}>
                <Table.Cell className="font-semibold text-text-primary">
                  {a.name}
                </Table.Cell>
                <Table.Cell className="text-secondary font-medium">
                  {a.craft}
                </Table.Cell>
                <Table.Cell>{a.region}</Table.Cell>
                <Table.Cell className="text-xs text-text-secondary">
                  {a.appliedDate}
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="warning" size="sm" dot>
                    {a.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => alert(`Approved ${a.name}`)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Reviewing documents for ${a.name}`)}
                    >
                      Inspect
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
    </PageContainer>
  );
}
