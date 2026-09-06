import React from 'react';
import * as Icons from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../primitives/Card';

/**
 * DashboardStatCard Composite Component
 * Used in Artisan and Admin Dashboards for key KPIs and trend analysis
 */
export function DashboardStatCard({
  title,
  value,
  trend,
  isPositive = true,
  iconName = 'TrendingUp',
  description,
  className = '',
}) {
  const IconComponent = Icons[iconName] || Icons.TrendingUp;

  return (
    <Card variant="flat" padding="md" className={`flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs sm:text-sm font-medium text-text-secondary">
          {title}
        </span>
        <div className="w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center text-text-primary">
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          {value}
        </span>

        {trend && (
          <div
            className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-pill ${
              isPositive
                ? 'bg-success/15 text-success'
                : 'bg-error/15 text-error'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {description && (
        <p className="text-xs text-text-secondary mt-2">{description}</p>
      )}
    </Card>
  );
}
