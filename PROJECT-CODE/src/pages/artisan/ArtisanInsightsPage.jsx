import React from 'react';
import { Sparkles, TrendingUp, Calendar, Users, Award, Info } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Grid } from '../../components/layout/Grid';
import { Card } from '../../components/primitives/Card';
import { Badge } from '../../components/primitives/Badge';
import { Tag } from '../../components/primitives/Tag';

/**
 * Artisan Dashboard: ArtisanInsightsPage
 * 
 * STUB: AI feature
 * Person 5 (AI) will plug machine learning demand forecasting,
 * customer craft preference trends, and seasonal insight models here.
 */
export function ArtisanInsightsPage() {
  const trends = [
    {
      title: 'Upcoming Festival Demand Spike',
      category: 'Seasonal Demand',
      impact: '+55% projected interest',
      description: 'Deepavali and wedding seasons indicate high preference for large Kalamkari Tree of Life wall hangings in urban centers.',
      badge: 'High Impact',
    },
    {
      title: 'Top Customer Material Search',
      category: 'Customer Preference',
      impact: 'Organic Khadi & Iron Molasses Dyes',
      description: 'Buyers are increasingly filtering for chemical-free vegetable mordants and natural fermented inks.',
      badge: 'Preference Trend',
    },
    {
      title: 'Technique Preservation Badge',
      category: 'Craft Heritage',
      impact: 'Rank #1 in Andhra Pradesh',
      description: 'Your freehand tamarind pen technique is the most saved traditional method in the Living Craft Graph this month.',
      badge: 'GI Recognition',
    },
  ];

  return (
    <PageContainer>
      <SectionHeader
        title="Artisan Market & Graph Insights"
        subtitle="Data-driven insights to help traditional artisans understand customer interest, seasonal demand, and craft graph discovery."
        tag={
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/15 px-2.5 py-0.5 rounded-pill">
            <Sparkles className="w-3.5 h-3.5" />
            AI Living Graph Intelligence
          </span>
        }
      />

      <div className="flex flex-col gap-6">
        {/* Insight Cards */}
        <Grid cols={3} gap={6}>
          {trends.map((item, idx) => (
            <Card key={idx} variant="flat" padding="md" className="flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    {item.category}
                  </span>
                  <Badge variant="primary" size="sm">
                    {item.badge}
                  </Badge>
                </div>

                <h3 className="font-heading text-lg font-bold text-text-primary mt-1">
                  {item.title}
                </h3>

                <p className="text-xs font-bold text-accent">
                  {item.impact}
                </p>

                <p className="text-xs text-text-secondary leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-border text-[11px] text-neutral-400">
                Source: Living Craft Graph Interaction Telemetry
              </div>
            </Card>
          ))}
        </Grid>

        {/* Regional Customer Discovery Distribution */}
        <Card variant="flat" padding="lg">
          <Card.Header
            title="Where Are Your Craft Appreciators Located?"
            subtitle="Geographic reach from verified customer inquiries in the last 30 days"
          />

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 text-center">
            <div className="p-4 bg-background rounded-md border border-border">
              <span className="text-2xl font-bold font-heading text-primary">38%</span>
              <p className="text-xs text-text-secondary mt-1">Bengaluru & Hyderabad</p>
            </div>
            <div className="p-4 bg-background rounded-md border border-border">
              <span className="text-2xl font-bold font-heading text-primary">27%</span>
              <p className="text-xs text-text-secondary mt-1">Mumbai & Pune</p>
            </div>
            <div className="p-4 bg-background rounded-md border border-border">
              <span className="text-2xl font-bold font-heading text-primary">21%</span>
              <p className="text-xs text-text-secondary mt-1">Delhi NCR</p>
            </div>
            <div className="p-4 bg-background rounded-md border border-border">
              <span className="text-2xl font-bold font-heading text-primary">14%</span>
              <p className="text-xs text-text-secondary mt-1">International Cultural Buyers</p>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
