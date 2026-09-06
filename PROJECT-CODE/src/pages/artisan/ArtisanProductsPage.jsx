import React, { useState } from 'react';
import { PlusCircle, Edit3, Trash2, ExternalLink } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Table } from '../../components/primitives/Table';
import { Badge } from '../../components/primitives/Badge';
import { Button } from '../../components/primitives/Button';
import { Image } from '../../components/primitives/Image';
import { formatCurrency } from '../../lib/formatters';
import { mockProducts } from '../../lib/mockData';
import { useToast } from '../../hooks/useToast';

/**
 * Artisan Dashboard: ArtisanProductsPage
 * Manage craft listings and catalog status
 */
export function ArtisanProductsPage({ onNavigate }) {
  const [products, setProducts] = useState(mockProducts);
  const { addToast } = useToast();

  const handleDelete = (prod) => {
    // TODO: integrate with backend
    setProducts((prev) => prev.filter((p) => p.id !== prod.id));
    addToast({
      type: 'info',
      title: 'Craft Deleted',
      message: `${prod.title} has been removed from your catalog.`,
    });
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Your Craft Catalog"
        subtitle="Manage your handcrafted pieces, verify stock, and keep craft graph relationships up to date."
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate?.('add-product')}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Add New Craft
          </Button>
        }
      />

      <Table>
        <Table.Header>
          <Table.Row hover={false}>
            <Table.Head>Product</Table.Head>
            <Table.Head>Craft Lineage</Table.Head>
            <Table.Head>Price</Table.Head>
            <Table.Head>Inventory</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((prod) => (
            <Table.Row key={prod.id}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-neutral-100 shrink-0">
                    <Image
                      src={prod.images[0]}
                      alt={prod.title}
                      aspectRatio="square"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 max-w-xs">
                    <span className="font-semibold text-text-primary text-sm truncate">
                      {prod.title}
                    </span>
                    <span className="text-xs text-text-secondary truncate">
                      SKU: ART-{prod.id.slice(0, 6).toUpperCase()}
                    </span>
                  </div>
                </div>
              </Table.Cell>

              <Table.Cell>
                <div className="flex flex-col text-xs">
                  <span className="font-medium text-text-primary">{prod.craft}</span>
                  <span className="text-text-secondary truncate max-w-[160px]">
                    {prod.technique}
                  </span>
                </div>
              </Table.Cell>

              <Table.Cell className="font-semibold text-sm">
                {formatCurrency(prod.price)}
              </Table.Cell>

              <Table.Cell>
                <span className="text-xs font-bold text-text-primary">
                  {prod.inStock} units
                </span>
              </Table.Cell>

              <Table.Cell>
                <Badge
                  variant={prod.inStock > 0 ? 'success' : 'warning'}
                  size="sm"
                  dot
                >
                  {prod.inStock > 0 ? 'Active Listing' : 'Low Stock'}
                </Badge>
              </Table.Cell>

              <Table.Cell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.('add-product')}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(prod)}
                    className="text-error hover:bg-error/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </PageContainer>
  );
}
