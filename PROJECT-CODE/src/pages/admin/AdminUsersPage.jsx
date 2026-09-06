import React, { useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Table } from '../../components/primitives/Table';
import { Badge } from '../../components/primitives/Badge';
import { Button } from '../../components/primitives/Button';
import { Avatar } from '../../components/primitives/Avatar';
import { useToast } from '../../hooks/useToast';

/**
 * Admin Dashboard: AdminUsersPage
 * User accounts, role administration, and platform moderation
 */
export function AdminUsersPage() {
  const { addToast } = useToast();

  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', role: 'Customer', date: '2026-08-14', status: 'Active' },
    { id: 'usr-2', name: 'Govindappa V.', email: 'govindappa.v@kalakriti.in', role: 'Artisan', date: '2026-06-10', status: 'Active' },
    { id: 'usr-3', name: 'Rashida Begum', email: 'rashida.begum@kalakriti.in', role: 'Artisan', date: '2026-07-22', status: 'Active' },
    { id: 'usr-4', name: 'Meera Nambiar', email: 'meera.n@example.com', role: 'Customer', date: '2026-09-01', status: 'Active' },
    { id: 'usr-5', name: 'Suspicious Buyer', email: 'bot99@tempmail.com', role: 'Customer', date: '2026-09-05', status: 'Flagged' },
  ]);

  const handleToggleStatus = (user) => {
    // TODO: integrate with backend
    const nextStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
    );
    addToast({
      type: nextStatus === 'Suspended' ? 'warning' : 'success',
      title: 'User Status Changed',
      message: `${user.name} is now ${nextStatus}.`,
    });
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Platform Users & Members"
        subtitle="Manage registered buyers, verified artisans, and platform administrators."
      />

      <Table>
        <Table.Header>
          <Table.Row hover={false}>
            <Table.Head>User</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>Joined Date</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head className="text-right">Action</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((u) => (
            <Table.Row key={u.id}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <Avatar name={u.name} size="sm" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-text-primary text-sm">{u.name}</span>
                    <span className="text-xs text-text-secondary">{u.email}</span>
                  </div>
                </div>
              </Table.Cell>

              <Table.Cell>
                <Badge
                  variant={u.role === 'Artisan' ? 'primary' : u.role === 'Admin' ? 'accent' : 'default'}
                  size="sm"
                >
                  {u.role}
                </Badge>
              </Table.Cell>

              <Table.Cell className="text-xs text-text-secondary">
                {u.date}
              </Table.Cell>

              <Table.Cell>
                <Badge
                  variant={u.status === 'Active' ? 'success' : 'error'}
                  size="sm"
                  dot
                >
                  {u.status}
                </Badge>
              </Table.Cell>

              <Table.Cell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(u)}
                >
                  {u.status === 'Active' ? 'Suspend' : 'Activate'}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </PageContainer>
  );
}
