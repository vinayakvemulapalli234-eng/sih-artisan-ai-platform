import React from 'react';
import { Table } from '../primitives/Table';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { formatCurrency } from '../../lib/formatters';

/**
 * InventoryRow Composite Component
 * Used in Artisan Inventory management
 */
export function InventoryRow({
  item,
  onRestock,
  onEdit,
}) {
  if (!item) return null;

  const {
    id,
    sku,
    productTitle,
    craft,
    stock,
    reorderThreshold,
    status,
    unitPrice,
  } = item;

  const statusVariant = {
    'In Stock': 'success',
    'Low Stock': 'warning',
    'Critically Low': 'error',
    'Out of Stock': 'error',
  }[status] || 'default';

  return (
    <Table.Row>
      <Table.Cell className="font-mono text-xs font-semibold text-text-secondary">
        {sku}
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col">
          <span className="font-medium text-text-primary line-clamp-1">{productTitle}</span>
          <span className="text-xs text-text-secondary">{craft}</span>
        </div>
      </Table.Cell>
      <Table.Cell className="font-semibold">
        {formatCurrency(unitPrice)}
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          <span className="font-bold text-text-primary text-sm">{stock}</span>
          <span className="text-xs text-neutral-400">/ min {reorderThreshold}</span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <Badge variant={statusVariant} size="sm" dot>
          {status}
        </Badge>
      </Table.Cell>
      <Table.Cell className="text-right">
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRestock?.(item)}
          >
            + Restock
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(item)}
          >
            Edit
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}
