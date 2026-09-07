/**
 * Mock Custom Request Service
 * Handles customer-initiated customization requests and connects them directly
 * to the Artisan's "Custom Requests" inbox and notifications.
 */

const CUSTOM_REQUESTS_KEY = 'kalakriti_mock_custom_requests';

const DEFAULT_CUSTOM_REQUESTS = [
  {
    id: 'req-101',
    productId: 'prod-konda',
    productName: 'Kondapalli Wooden Toy',
    productImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80',
    customerName: 'Pooja Iyer',
    quantity: 20,
    unitPrice: 600,
    totalAmount: 12000,
    color: 'Blue',
    deadline: 'Due in 5 days',
    message: 'Can you make these in special royal blue colour for our school annual day?',
    status: 'Pending',
    createdAt: '5 hours ago',
  },
];

class MockCustomRequestService {
  /**
   * Get all custom requests
   */
  getCustomRequests() {
    try {
      const stored = localStorage.getItem(CUSTOM_REQUESTS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_CUSTOM_REQUESTS;
    } catch {
      return DEFAULT_CUSTOM_REQUESTS;
    }
  }

  /**
   * Submit a new customer custom order request
   */
  async submitCustomRequest({
    productId = 'prod-konda',
    productName = 'Kondapalli Wooden Toy',
    productImage = 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80',
    quantity = 20,
    color = 'Blue',
    deadline = '15 days',
    message = '',
    customerName = 'Customer',
  }) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newRequest = {
      id: `req-${Date.now().toString().slice(-4)}`,
      productId,
      productName,
      productImage,
      customerName,
      quantity,
      unitPrice: 600,
      totalAmount: quantity * 600,
      color,
      deadline: `Due in ${deadline}`,
      message: message || 'Custom variation requested.',
      status: 'Pending',
      createdAt: 'Just now',
    };

    const current = this.getCustomRequests();
    const updated = [newRequest, ...current];
    localStorage.setItem(CUSTOM_REQUESTS_KEY, JSON.stringify(updated));

    return newRequest;
  }
}

export const mockCustomRequestService = new MockCustomRequestService();
