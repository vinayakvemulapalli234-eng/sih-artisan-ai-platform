import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Table } from '../../components/primitives/Table';
import { Badge } from '../../components/primitives/Badge';
import { Button } from '../../components/primitives/Button';
import { useToast } from '../../hooks/useToast';

/**
 * Admin Dashboard: AdminReportsPage
 * Dispute resolution, counterfeit flagging, and artisan protections
 */
export function AdminReportsPage() {
  const { addToast } = useToast();

  const [reports, setReports] = useState([
    {
      id: 'REP-401',
      type: 'Authenticity Inquiry',
      target: 'Tarkashi Brass Box Listing #88',
      reportedBy: 'Kavita Sundaram',
      date: '2026-09-03',
      status: 'Under Investigation',
      severity: 'Medium',
    },
    {
      id: 'REP-402',
      type: 'Damaged Transit',
      target: 'Order #ORD-8921 (Blue Pottery Bowl)',
      reportedBy: 'Karan Sen',
      date: '2026-09-04',
      status: 'Refund Initiated',
      severity: 'Low',
    },
    {
      id: 'REP-403',
      type: 'GI Impersonation Warning',
      target: 'Shop: Modern Mill Fabrics',
      reportedBy: 'Artisan Welfare Board',
      date: '2026-09-05',
      status: 'Action Required',
      severity: 'High',
    },
  ]);

  const handleResolve = (rep) => {
    setReports((prev) =>
      prev.map((r) => (r.id === rep.id ? { ...r, status: 'Resolved' } : r))
    );
    addToast({
      type: 'success',
      title: 'Report Resolved',
      message: `Report ${rep.id} has been marked as resolved.`,
    });
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Disputes & Authenticity Reports"
        subtitle="Address customer inquiries, safeguard genuine artisans from industrial counterfeits, and enforce GI integrity."
      />

      <Table>
        <Table.Header>
          <Table.Row hover={false}>
            <Table.Head>Case ID</Table.Head>
            <Table.Head>Issue Type</Table.Head>
            <Table.Head>Subject / Target</Table.Head>
            <Table.Head>Severity</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head className="text-right">Action</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reports.map((rep) => (
            <Table.Row key={rep.id}>
              <Table.Cell className="font-mono text-xs font-semibold text-primary">
                {rep.id}
              </Table.Cell>

              <Table.Cell className="font-medium text-text-primary text-xs">
                {rep.type}
              </Table.Cell>

              <Table.Cell className="text-xs text-text-secondary">
                {rep.target}
              </Table.Cell>

              <Table.Cell>
                <Badge
                  variant={rep.severity === 'High' ? 'error' : rep.severity === 'Medium' ? 'warning' : 'default'}
                  size="sm"
                >
                  {rep.severity}
                </Badge>
              </Table.Cell>

              <Table.Cell>
                <Badge
                  variant={rep.status === 'Resolved' ? 'success' : 'warning'}
                  size="sm"
                  dot
                >
                  {rep.status}
                </Badge>
              </Table.Cell>

              <Table.Cell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleResolve(rep)}
                  disabled={rep.status === 'Resolved'}
                >
                  {rep.status === 'Resolved' ? 'Completed' : 'Resolve'}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </PageContainer>
  );
}
