import React, { useState } from 'react';
import { Package, Eye } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { OrderTable } from '../../components/domain/OrderRow';
import { Modal } from '../../components/primitives/Modal';
import { Button } from '../../components/primitives/Button';
import { Badge } from '../../components/primitives/Badge';
import { formatCurrency, formatDate } from '../../lib/formatters';
import { mockOrders } from '../../lib/mockData';

/**
 * Customer: OrderHistoryPage
 * Tracking and past craft purchases
 */
export function OrderHistoryPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <PageContainer>
      <SectionHeader
        title="Your Orders"
        subtitle="Track your artisanal purchases and follow their journey from the master's studio to your doorstep."
      />

      <OrderTable
        orders={mockOrders}
        role="customer"
        onViewOrder={(order) => setSelectedOrder(order)}
      />

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          title={`Order ${selectedOrder.id}`}
          description={`Placed on ${formatDate(selectedOrder.date)}`}
          footer={
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </Button>
          }
        >
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md border border-border">
              <span>Delivery Status</span>
              <Badge variant="info" size="md">
                {selectedOrder.status}
              </Badge>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-semibold text-text-primary">
                {selectedOrder.productTitle}
              </span>
              <span className="text-xs text-secondary">
                Master Artisan: {selectedOrder.artisanName}
              </span>
              <span className="text-xs text-text-secondary">
                Quantity: {selectedOrder.itemsCount} piece(s)
              </span>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between font-bold">
              <span>Total Paid:</span>
              <span className="text-primary font-heading text-lg">
                {formatCurrency(selectedOrder.total)}
              </span>
            </div>

            <p className="text-xs text-text-secondary bg-background p-3 rounded-md border border-border/80">
              Each package includes a physical certificate of authenticity and the cultural story card signed by the master artisan.
            </p>
          </div>
        </Modal>
      )}
    </PageContainer>
  );
}
