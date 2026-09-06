import React, { useState } from 'react';
import { ShieldCheck, Flag, Check, AlertCircle } from 'lucide-react';
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
 * Admin Dashboard: AdminProductsPage
 * Catalog moderation, authenticity screening, and listing verification
 */
export function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const { addToast } = useToast();

  const handleApprove = (prod) => {
    addToast({
      type: 'success',
      title: 'Craft Approved',
      message: `${prod.title} verified and published across the Living Craft Graph.`,
    });
  };

  const handleFlag = (prod) => {
    addToast({
      type: 'warning',
      title: 'Craft Flagged',
      message: `${prod.title} flagged for artisan technique verification review.`,
    });
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Product Moderation & Authenticity"
        subtitle="Screen craft listings to ensure handcraft purity, no synthetic industrial substitutions, and legitimate regional claims."
      />

      <Table>
        <Table.Header>
          <Table.Row hover={false}>
            <Table.Head>Product</Table.Head>
            <Table.Head>Artisan</Table.Head>
            <Table.Head>Craft / Technique</Table.Head>
            <Table.Head>Price</Table.Head>
            <Table.Head>Provenance</Table.Head>
            <Table.Head className="text-right">Moderation</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((p) => (
            <Table.Row key={p.id}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-neutral-100 shrink-0">
                    <Image src={p.images[0]} alt={p.title} aspectRatio="square" />
                  </div>
                  <span className="font-semibold text-text-primary text-xs sm:text-sm line-clamp-1 max-w-xs">
                    {p.title}
                  </span>
                </div>
              </Table.Cell>

              <Table.Cell className="text-xs font-medium text-secondary">
                {p.artisanName}
              </Table.Cell>

              <Table.Cell className="text-xs">
                <span className="font-medium block text-text-primary">{p.craft}</span>
                <span className="text-text-secondary truncate max-w-[140px] block">
                  {p.technique}
                </span>
              </Table.Cell>

              <Table.Cell className="font-semibold text-xs whitespace-nowrap">
                {formatCurrency(p.price)}
              </Table.Cell>

              <Table.Cell>
                <Badge variant="success" size="sm">
                  Verified Raw Material
                </Badge>
              </Table.Cell>

              <Table.Cell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApprove(p)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFlag(p)}
                    className="text-warning hover:bg-warning/10"
                  >
                    <Flag className="w-3.5 h-3.5" />
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
