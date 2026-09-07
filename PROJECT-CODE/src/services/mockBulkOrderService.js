/**
 * Mock Bulk Order Service
 * Manages institutional bulk orders, transparent artisan quotas, and production progress tracking.
 * Ensures each artisan sees their own individually agreed quantity, price, progress, and direct payout status.
 */

const BULK_ORDER_STORE_KEY = 'kalakriti_mock_bulk_order';

const DEFAULT_BULK_ORDER = {
  id: 'bulk-ord-500',
  title: '500 wooden toys required',
  productName: 'Kondapalli Wooden Toy',
  description: 'A customer wants 500 wooden toys for an event.',
  totalQuantity: 500,
  sampleStatus: 'Sample Approved',
  overallProgress: 90,
  artisanShare: {
    allocatedQuantity: 100,
    unitPrice: 300,
    totalPayout: 30000,
    deliveryDays: 20,
    status: 'In Production', // 'Pending' | 'In Production' | 'Completed'
    paymentStatus: 'Direct Escrow Secured (₹30,000)',
    completedQuantity: 50,
  },
  artisans: [
    {
      id: 'art-a',
      name: 'Artisan A',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
      allocated: 100,
      completed: 100,
      status: 'Completed',
      directPayout: '₹30,000 Paid',
    },
    {
      id: 'art-b',
      name: 'Artisan B',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      allocated: 150,
      completed: 150,
      status: 'Completed',
      directPayout: '₹45,000 Paid',
    },
    {
      id: 'art-c',
      name: 'Artisan C',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      allocated: 100,
      completed: 100,
      status: 'Completed',
      directPayout: '₹30,000 Paid',
    },
    {
      id: 'art-d',
      name: 'Artisan D (You)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      allocated: 100,
      completed: 50,
      status: 'In Progress',
      directPayout: '₹15,000 Settled / ₹15,000 on Dispatch',
    },
    {
      id: 'art-e',
      name: 'Artisan E',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
      allocated: 100,
      completed: 100,
      status: 'Completed',
      directPayout: '₹30,000 Paid',
    },
  ],
};

class MockBulkOrderService {
  /**
   * Fetch active bulk order and individual quota
   */
  async getBulkOrder() {
    try {
      const stored = localStorage.getItem(BULK_ORDER_STORE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_BULK_ORDER;
    } catch {
      return DEFAULT_BULK_ORDER;
    }
  }

  /**
   * Accept artisan share in bulk order
   */
  async acceptShare() {
    const current = await this.getBulkOrder();
    const updated = {
      ...current,
      artisanShare: {
        ...current.artisanShare,
        status: 'In Production',
      },
    };
    localStorage.setItem(BULK_ORDER_STORE_KEY, JSON.stringify(updated));
    return updated;
  }
}

export const mockBulkOrderService = new MockBulkOrderService();
