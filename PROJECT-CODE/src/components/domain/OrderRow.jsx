import React from 'react';
import { Table } from '../primitives/Table';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { formatCurrency, formatDate } from '../../lib/formatters';

/**
 * OrderRow & OrderTable Composite Component
 */
export function OrderRow({
  order,
  role = 'customer',
  onViewOrder,
}) {
  if (!order) return null;

  const {
    id,
    customerName,
    productTitle,
    artisanName,
    date,
    total,
    status,
    paymentStatus,
    itemsCount,
  } = order;

  const statusVariant = {
    Delivered: 'success',
    Shipped: 'info',
    Processing: 'warning',
    Pending: 'default',
    Cancelled: 'error',
  }[status] || 'default';

  return (
    <Table.Row>
      <Table.Cell className="font-semibold font-mono text-xs text-primary">
        {id}
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col">
          <span className="font-medium text-text-primary line-clamp-1">
            {productTitle}
          </span>
          <span className="text-xs text-text-secondary">
            {role === 'artisan' ? `Customer: ${customerName}` : `Artisan: ${artisanName}`}
            {itemsCount > 1 && ` (+${itemsCount - 1} more items)`}
          </span>
        </div>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap text-text-secondary text-xs">
        {formatDate(date)}
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-semibold">
        {formatCurrency(total)}
      </Table.Cell>
      <Table.Cell>
        <Badge variant={statusVariant} size="sm" dot>
          {status}
        </Badge>
      </Table.Cell>
      <Table.Cell className="text-right">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewOrder?.(order)}
        >
          Details
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export function OrderTable({
  orders = [],
  role = 'customer',
  onViewOrder,
  className = '',
}) {
  return (
    <Table className={className}>
      <Table.Header>
        <Table.Row hover={false}>
          <Table.Head>Order ID</Table.Head>
          <Table.Head>Details</Table.Head>
          <Table.Head>Date</Table.Head>
          <Table.Head>Total</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head className="text-right">Action</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            role={role}
            onViewOrder={onViewOrder}
          />
        ))}
      </Table.Body>
    </Table>
  );
}
