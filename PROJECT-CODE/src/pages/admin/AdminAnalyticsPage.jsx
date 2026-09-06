import React from 'react';
import { BarChart3, TrendingUp, Share2, MapPin, Award } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Grid } from '../../components/layout/Grid';
import { Card } from '../../components/primitives/Card';
import { Badge } from '../../components/primitives/Badge';
import { formatCurrency } from '../../lib/formatters';

/**
 * Admin Dashboard: AdminAnalyticsPage
 * Platform-wide volume, craft growth metrics, and Living Craft Graph expansion analytics
 */
export function AdminAnalyticsPage() {
  const regionalData = [
    { state: 'Rajasthan', craftTypes: 8, artisans: 42, sales: '₹6,40,000' },
    { state: 'Andhra Pradesh', craftTypes: 6, artisans: 34, sales: '₹4,80,000' },
    { state: 'Kashmir', craftTypes: 4, artisans: 26, sales: '₹8,20,000' },
    { state: 'Chhattisgarh & Odisha', craftTypes: 5, artisans: 22, sales: '₹3,10,000' },
    { state: 'Karnataka', craftTypes: 4, artisans: 18, sales: '₹2,90,000' },
  ];

  return (
    <PageContainer>
      <SectionHeader
        title="Platform Analytics & Craft Growth"
        subtitle="Evaluate national craft revival, buyer discovery trends, and economic empowerment of artisan clusters."
      />

      <div className="flex flex-col gap-8">
        {/* Living Craft Graph Metrics Overview */}
        <Grid cols={3} gap={6}>
          <Card variant="flat" padding="md">
            <span className="text-xs font-semibold text-secondary uppercase">
              Total Graph Connections
            </span>
            <h3 className="font-heading text-3xl font-bold text-text-primary mt-1">
              8,490
            </h3>
            <p className="text-xs text-success font-medium mt-1">
              +28% month-over-month node growth
            </p>
          </Card>

          <Card variant="flat" padding="md">
            <span className="text-xs font-semibold text-secondary uppercase">
              Average Craft Discovery Depth
            </span>
            <h3 className="font-heading text-3xl font-bold text-text-primary mt-1">
              4.2 Nodes
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Customers traverse Technique → Material → Region
            </p>
          </Card>

          <Card variant="flat" padding="md">
            <span className="text-xs font-semibold text-secondary uppercase">
              Direct Artisan Revenue Payout
            </span>
            <h3 className="font-heading text-3xl font-bold text-primary mt-1">
              91.4%
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Only 8.6% platform operational fee
            </p>
          </Card>
        </Grid>

        {/* Regional Cluster Performance */}
        <Card variant="flat" padding="lg">
          <Card.Header
            title="Regional Craft Cluster Distribution"
            subtitle="Artisan density and sales performance mapped across Indian states"
          />

          <div className="flex flex-col gap-3 pt-4">
            {regionalData.map((reg) => (
              <div
                key={reg.state}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-md bg-neutral-50 border border-border gap-2"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-bold text-text-primary text-sm">
                    {reg.state}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-xs text-text-secondary flex-wrap">
                  <span>{reg.craftTypes} Traditions</span>
                  <span>{reg.artisans} Registered Artisans</span>
                  <span className="font-semibold text-text-primary">
                    {reg.sales} Gross Trade
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
