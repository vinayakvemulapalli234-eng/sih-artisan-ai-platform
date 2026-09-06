import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Card } from '../../components/primitives/Card';
import { Button } from '../../components/primitives/Button';
import { EmptyState } from '../../components/primitives/EmptyState';
import { CartItemRow } from '../../components/domain/CartItemRow';
import { formatCurrency } from '../../lib/formatters';
import { mockProducts } from '../../lib/mockData';
import { useToast } from '../../hooks/useToast';

/**
 * Customer: CartPage
 * Shopping bag with item breakdown and direct artisan compensation summary
 */
export function CartPage({ onNavigate }) {
  const [items, setItems] = useState([
    {
      id: mockProducts[0].id,
      title: mockProducts[0].title,
      artisanName: mockProducts[0].artisanName,
      price: mockProducts[0].price,
      quantity: 1,
      image: mockProducts[0].images[0],
      craft: mockProducts[0].craft,
    },
    {
      id: mockProducts[1].id,
      title: mockProducts[1].title,
      artisanName: mockProducts[1].artisanName,
      price: mockProducts[1].price,
      quantity: 2,
      image: mockProducts[1].images[0],
      craft: mockProducts[1].craft,
    },
  ]);

  const { addToast } = useToast();

  const handleQuantityChange = (item, newQuantity) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: newQuantity } : i))
    );
  };

  const handleRemove = (item) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    addToast({
      type: 'info',
      title: 'Item removed',
      message: `${item.title} removed from your cart.`,
    });
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 150;
  const artisanFairFund = Math.round(subtotal * 0.05);
  const total = subtotal + shipping;

  const handleCheckout = () => {
    addToast({
      type: 'success',
      title: 'Order Placed (Mock)',
      message: 'Your order has been placed directly with the artisan masters.',
    });
    setItems([]);
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Your Shopping Bag"
        subtitle="Review your handcrafted selections. Every order directly supports verified traditional artisans."
      />

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="w-6 h-6 stroke-[1.5]" />}
          title="Your shopping bag is empty"
          description="Explore our collection of authentic Indian crafts, direct from the artisans who preserve them."
          actionLabel="Start Exploring"
          onAction={() => onNavigate?.('explore')}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-1">
            <Card variant="elevated" padding="md" className="flex flex-col gap-4">
              <Card.Header
                title="Order Summary"
                subtitle={`${items.length} unique crafts`}
              />

              <div className="flex flex-col gap-3 text-sm text-text-secondary pt-2">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Insured Craft Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-success font-semibold">FREE</strong> : formatCurrency(shipping)}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-accent">
                  <span className="flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    Artisan Welfare Fund (included)
                  </span>
                  <span>{formatCurrency(artisanFairFund)}</span>
                </div>

                <div className="border-t border-border pt-3 mt-1 flex items-baseline justify-between text-base">
                  <span className="font-bold text-text-primary">Total Amount</span>
                  <span className="font-heading text-xl font-bold text-primary">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Checkout
                </Button>
              </div>

              <div className="text-[11px] text-text-secondary flex items-center justify-center gap-1 text-center mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Protected by GI Authenticity Guarantee</span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
