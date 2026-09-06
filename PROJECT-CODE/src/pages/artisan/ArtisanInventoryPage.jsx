import React, { useState } from 'react';
import { AlertTriangle, Plus, RotateCcw } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Table } from '../../components/primitives/Table';
import { Modal } from '../../components/primitives/Modal';
import { FormField } from '../../components/primitives/FormField';
import { Input } from '../../components/primitives/Input';
import { Button } from '../../components/primitives/Button';
import { InventoryRow } from '../../components/domain/InventoryRow';
import { mockInventory } from '../../lib/mockData';
import { useToast } from '../../hooks/useToast';

/**
 * Artisan Dashboard: ArtisanInventoryPage
 * Stock levels, low-inventory alerts, and restock tracking
 */
export function ArtisanInventoryPage() {
  const [inventory, setInventory] = useState(mockInventory);
  const [restockItem, setRestockItem] = useState(null);
  const [addQty, setAddQty] = useState('5');
  const { addToast } = useToast();

  const handleRestockSubmit = () => {
    if (!restockItem) return;
    const added = parseInt(addQty, 10) || 0;
    // TODO: integrate with backend
    setInventory((prev) =>
      prev.map((item) =>
        item.id === restockItem.id
          ? { ...item, stock: item.stock + added, status: 'In Stock' }
          : item
      )
    );
    addToast({
      type: 'success',
      title: 'Inventory Restocked',
      message: `Added ${added} pieces to ${restockItem.productTitle}.`,
    });
    setRestockItem(null);
  };

  const lowStockCount = inventory.filter((i) => i.status !== 'In Stock').length;

  return (
    <PageContainer>
      <SectionHeader
        title="Craft Inventory & Stock"
        subtitle="Keep track of authentic handmade batches and prevent sudden stock-outs during peak cultural seasons."
      />

      {lowStockCount > 0 && (
        <div className="mb-6 p-4 rounded-md bg-warning/10 border border-warning/30 flex items-center justify-between gap-3 text-xs sm:text-sm text-text-primary">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
            <span>
              <strong>{lowStockCount} items</strong> require restock before upcoming festival seasons.
            </span>
          </div>
        </div>
      )}

      <Table>
        <Table.Header>
          <Table.Row hover={false}>
            <Table.Head>SKU</Table.Head>
            <Table.Head>Craft Item</Table.Head>
            <Table.Head>Unit Price</Table.Head>
            <Table.Head>Stock Level</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {inventory.map((item) => (
            <InventoryRow
              key={item.id}
              item={item}
              onRestock={(i) => setRestockItem(i)}
              onEdit={(i) => alert(`Editing SKU ${i.sku}`)}
            />
          ))}
        </Table.Body>
      </Table>

      {/* Restock Modal */}
      {restockItem && (
        <Modal
          isOpen={Boolean(restockItem)}
          onClose={() => setRestockItem(null)}
          title={`Restock ${restockItem.productTitle}`}
          description={`Current on-hand: ${restockItem.stock} units`}
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRestockItem(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleRestockSubmit}
              >
                Confirm Restock
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <FormField label="Units Completed from Studio" htmlFor="add-qty">
              <Input
                id="add-qty"
                type="number"
                value={addQty}
                onChange={(e) => setAddQty(e.target.value)}
              />
            </FormField>
            <p className="text-xs text-text-secondary">
              Updating this count will immediately update availability across the customer catalog and Living Craft Graph connections.
            </p>
          </div>
        </Modal>
      )}
    </PageContainer>
  );
}
