/**
 * Mock Price Estimation Service
 * Calculates fair market benchmarks, cost breakdown, and suggested pricing for handcrafted goods.
 * Can be swapped with an AI pricing algorithm without touching UI components.
 */

class MockPriceEstimationService {
  /**
   * Estimate fair price based on craft attributes
   * @param {Object} params
   * @returns {Promise<Object>}
   */
  async estimatePrice({ material = 'Wood', craft = 'Kondapalli' } = {}) {
    // Simulated calculation delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    return {
      suggestedPrice: 650,
      minRange: 600,
      maxRange: 700,
      costBreakdown: [
        { label: 'Material cost', amount: 250 },
        { label: 'Your work (labour/time)', amount: 200 },
        { label: 'Other costs (platform, logistics)', amount: 100 },
        { label: 'Estimated cost', amount: 550, isTotal: true },
      ],
      tipMessage:
        'This price helps you cover your material and work. You can earn more with this price!',
    };
  }
}

export const mockPriceEstimationService = new MockPriceEstimationService();
